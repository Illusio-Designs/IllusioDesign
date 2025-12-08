import CaseStudy from '../../models/CaseStudy.js';
import SEO from '../../models/SEO.js';

export const getAllCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json({ data: caseStudies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to create SEO-friendly page name from project title
const createSEOPageName = (title) => {
  if (!title) return null;
  return `case-study-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;
};

export const getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByPk(req.params.id);
    
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCaseStudy = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const {
      title,
      description,
      link,
      category,
      tags,
      techStack,
      timeline,
      results,
      location,
      projectName,
      overview,
      overviewExtended,
      industry,
      industries,
      year,
      services,
      duration,
      additionalImages,
      published,
      seoTitle,
      metaDescription,
      seoKeywords,
      seoUrl
    } = req.body;
    
    // Ensure description is properly decoded as UTF-8 string to preserve emojis
    const decodedDescription = description ? String(description) : null;
    
    // Handle main image - use webpPath if available (from convertToWebP middleware)
    let image = null;
    if (req.files && req.files.image && req.files.image[0]) {
      image = req.files.image[0].webpPath || `/uploads/images/project/${req.files.image[0].filename}`;
    } else if (req.file) {
      image = req.file.webpPath || `/uploads/images/project/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }
    
    // Handle additional images - use webpPath if available
    let additionalImagesArray = [];
    if (req.files && req.files.additionalImages && req.files.additionalImages.length > 0) {
      additionalImagesArray = req.files.additionalImages.map(file => 
        file.webpPath || `/uploads/images/project/${file.filename}`
      );
    } else if (additionalImages) {
      if (Array.isArray(additionalImages)) {
        additionalImagesArray = additionalImages;
      } else if (typeof additionalImages === 'string') {
        additionalImagesArray = additionalImages.split(',').map(t => t.trim()).filter(t => t);
      }
    }
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const caseStudy = await CaseStudy.create({
      title,
      description: decodedDescription || null, // Use decoded description to preserve emojis
      image: image || null,
      link: link || null,
      category: category || services || null,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(t => t.trim()) : []),
      timeline: timeline || duration || null,
      results: Array.isArray(results) ? results : (results ? results.split(',').map(t => t.trim()) : []),
      location: location || null,
      projectName: projectName || null,
      overview: overview || description || null,
      overviewExtended: overviewExtended || null,
      industry: industry || industries || null,
      year: year || null,
      services: services || category || null,
      duration: duration || timeline || null,
      additionalImages: additionalImagesArray,
      published: published !== undefined ? (published === 'true' || published === true) : true,
      seoTitle: seoTitle || null,
      metaDescription: metaDescription || null,
      seoKeywords: seoKeywords || null,
      seoUrl: seoUrl || null
    });
    
    // Create SEO entry automatically
    if (title && (seoTitle || metaDescription)) {
      try {
        const seoPageName = createSEOPageName(title);
        if (seoPageName) {
          // Check if SEO entry already exists
          const existingSEO = await SEO.findOne({ where: { page: seoPageName } });
          
          if (existingSEO) {
            // Update existing SEO entry
            await existingSEO.update({
              title: seoTitle || title,
              description: metaDescription || description || null,
              ogTitle: seoTitle || title,
              ogDescription: metaDescription || description || null,
              ogImage: image || null
            });
          } else {
            // Create new SEO entry
            await SEO.create({
              page: seoPageName,
              title: seoTitle || title,
              description: metaDescription || description || null,
              ogTitle: seoTitle || title,
              ogDescription: metaDescription || description || null,
              ogImage: image || null
            });
          }
        }
      } catch (seoError) {
        // Log error but don't fail the case study creation
        console.error('Error creating SEO entry:', seoError);
      }
    }
    
    res.status(201).json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCaseStudy = async (req, res) => {
  try {
    // Ensure UTF-8 encoding for response
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const { id } = req.params;
    const updates = { ...req.body };
    
    // Ensure description is properly decoded as UTF-8 string if present
    if (updates.description !== undefined) {
      updates.description = updates.description ? String(updates.description) : null;
    }
    
    // Get case study first to access current data
    const caseStudy = await CaseStudy.findByPk(id);
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    // Handle main image - use webpPath if available (from convertToWebP middleware)
    if (req.files && req.files.image && req.files.image[0]) {
      updates.image = req.files.image[0].webpPath || `/uploads/images/project/${req.files.image[0].filename}`;
    } else if (req.file) {
      updates.image = req.file.webpPath || `/uploads/images/project/${req.file.filename}`;
    } else if (updates.image === '') {
      // If empty string sent, remove the image
      updates.image = null;
    }
    
    // Handle additional images - use webpPath if available
    let finalAdditionalImages = [];
    
    // Check if existingAdditionalImages was explicitly sent
    // FormData sends multiple values with same key as array or comma-separated
    if (req.body.existingAdditionalImages !== undefined) {
      const existingImages = req.body.existingAdditionalImages;
      if (Array.isArray(existingImages)) {
        finalAdditionalImages = existingImages.filter(img => img && img.trim() !== '');
      } else if (typeof existingImages === 'string') {
        if (existingImages.trim() !== '') {
          finalAdditionalImages = existingImages.split(',').map(t => t.trim()).filter(t => t);
        }
        // If empty string, finalAdditionalImages stays empty (all removed)
      }
    } else if (caseStudy.additionalImages && Array.isArray(caseStudy.additionalImages)) {
      // If no existing images specified in form, keep all current ones
      finalAdditionalImages = [...caseStudy.additionalImages];
    }
    
    // Add new uploaded images - use webpPath if available
    if (req.files && req.files.additionalImages && req.files.additionalImages.length > 0) {
      const newAdditionalImages = req.files.additionalImages.map(file => 
        file.webpPath || `/uploads/images/project/${file.filename}`
      );
      finalAdditionalImages = [...finalAdditionalImages, ...newAdditionalImages];
    }
    
    updates.additionalImages = finalAdditionalImages;
    delete updates.existingAdditionalImages;
    
    // Handle industries field - map to industry
    if (updates.industries !== undefined && updates.industry === undefined) {
      updates.industry = updates.industries;
      delete updates.industries;
    }
    
    // Handle array fields - convert string to array
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim()).filter(t => t);
    }
    if (updates.techStack && typeof updates.techStack === 'string') {
      updates.techStack = updates.techStack.split(',').map(t => t.trim()).filter(t => t);
    }
    if (updates.results && typeof updates.results === 'string') {
      updates.results = updates.results.split(',').map(t => t.trim()).filter(t => t);
    }
    if (updates.additionalImages && typeof updates.additionalImages === 'string') {
      updates.additionalImages = updates.additionalImages.split(',').map(t => t.trim()).filter(t => t);
    }
    
    // Handle boolean fields
    if (updates.published !== undefined) {
      updates.published = updates.published === 'true' || updates.published === true;
    }
    
    // Store old title before update to handle SEO entry migration
    const oldTitle = caseStudy.title;
    const oldSeoPageName = oldTitle ? createSEOPageName(oldTitle) : null;
    
    await caseStudy.update(updates);
    
    // Refresh case study to get updated data
    await caseStudy.reload();
    
    // Update SEO entry automatically
    const finalTitle = updates.title || caseStudy.title;
    const finalSeoTitle = updates.seoTitle !== undefined ? updates.seoTitle : caseStudy.seoTitle;
    const finalMetaDescription = updates.metaDescription !== undefined ? updates.metaDescription : caseStudy.metaDescription;
    const finalImage = updates.image !== undefined ? updates.image : caseStudy.image;
    const finalDescription = updates.description !== undefined ? updates.description : caseStudy.description;
    
    if (finalTitle && (finalSeoTitle || finalMetaDescription)) {
      try {
        const newSeoPageName = createSEOPageName(finalTitle);
        if (newSeoPageName) {
          // If title changed, delete old SEO entry
          if (oldSeoPageName && oldSeoPageName !== newSeoPageName) {
            const oldSEO = await SEO.findOne({ where: { page: oldSeoPageName } });
            if (oldSEO) {
              await oldSEO.destroy();
            }
          }
          
          // Check if SEO entry already exists (with new page name)
          const existingSEO = await SEO.findOne({ where: { page: newSeoPageName } });
          
          if (existingSEO) {
            // Update existing SEO entry
            await existingSEO.update({
              title: finalSeoTitle || finalTitle,
              description: finalMetaDescription || finalDescription || null,
              ogTitle: finalSeoTitle || finalTitle,
              ogDescription: finalMetaDescription || finalDescription || null,
              ogImage: finalImage || null
            });
          } else {
            // Create new SEO entry
            await SEO.create({
              page: newSeoPageName,
              title: finalSeoTitle || finalTitle,
              description: finalMetaDescription || finalDescription || null,
              ogTitle: finalSeoTitle || finalTitle,
              ogDescription: finalMetaDescription || finalDescription || null,
              ogImage: finalImage || null
            });
          }
        }
      } catch (seoError) {
        // Log error but don't fail the case study update
        console.error('Error updating SEO entry:', seoError);
      }
    }
    
    res.json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const caseStudy = await CaseStudy.findByPk(id);
    
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    // Delete associated SEO entry
    if (caseStudy.title) {
      try {
        const seoPageName = createSEOPageName(caseStudy.title);
        if (seoPageName) {
          const seoEntry = await SEO.findOne({ where: { page: seoPageName } });
          if (seoEntry) {
            await seoEntry.destroy();
          }
        }
      } catch (seoError) {
        // Log error but don't fail the case study deletion
        console.error('Error deleting SEO entry:', seoError);
      }
    }
    
    await caseStudy.destroy();
    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

