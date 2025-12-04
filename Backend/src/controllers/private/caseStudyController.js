import CaseStudy from '../../models/CaseStudy.js';

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
      seoUrl
    } = req.body;
    
    // Handle main image
    let image = null;
    if (req.files && req.files.image && req.files.image[0]) {
      image = `/uploads/images/${req.files.image[0].filename}`;
    } else if (req.file) {
      image = `/uploads/images/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }
    
    // Handle additional images
    let additionalImagesArray = [];
    if (req.files && req.files.additionalImages && req.files.additionalImages.length > 0) {
      additionalImagesArray = req.files.additionalImages.map(file => `/uploads/images/${file.filename}`);
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
      description: description || null,
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
      seoUrl: seoUrl || null
    });
    
    res.status(201).json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    // Get case study first to access current data
    const caseStudy = await CaseStudy.findByPk(id);
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    // Handle main image
    if (req.files && req.files.image && req.files.image[0]) {
      updates.image = `/uploads/images/${req.files.image[0].filename}`;
    } else if (req.file) {
      updates.image = `/uploads/images/${req.file.filename}`;
    } else if (updates.image === '') {
      // If empty string sent, remove the image
      updates.image = null;
    }
    
    // Handle additional images
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
    
    // Add new uploaded images
    if (req.files && req.files.additionalImages && req.files.additionalImages.length > 0) {
      const newAdditionalImages = req.files.additionalImages.map(file => `/uploads/images/${file.filename}`);
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
    
    await caseStudy.update(updates);
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
    
    await caseStudy.destroy();
    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

