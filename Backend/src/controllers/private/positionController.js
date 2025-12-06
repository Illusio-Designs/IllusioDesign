import Position from '../../models/Position.js';
import SEO from '../../models/SEO.js';

export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.findAll();
    res.json({ data: positions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to create SEO-friendly page name from position title
const createSEOPageName = (title) => {
  if (!title) return null;
  return `position-apply-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;
};

export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id);
    
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    res.json({ data: position });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPosition = async (req, res) => {
  try {
    const {
      title,
      experience,
      location,
      type,
      description,
      requirements,
      isActive
    } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const newPosition = await Position.create({
      title,
      experience: experience || null,
      location: location || null,
      type: type || null,
      description: description || null,
      requirements: requirements || null,
      isActive: isActive !== undefined ? (isActive === 'true' || isActive === true) : true
    });
    
    // Create SEO entry automatically
    if (title) {
      try {
        const seoPageName = createSEOPageName(title);
        if (seoPageName) {
          // Check if SEO entry already exists
          const existingSEO = await SEO.findOne({ where: { page: seoPageName } });
          
          if (existingSEO) {
            // Update existing SEO entry
            await existingSEO.update({
              title: title,
              description: description ? description.substring(0, 160) : `Apply for ${title} position at Illusio Design`,
              ogTitle: title,
              ogDescription: description ? description.substring(0, 160) : `Apply for ${title} position at Illusio Design`,
              ogImage: null
            });
          } else {
            // Create new SEO entry
            await SEO.create({
              page: seoPageName,
              title: title,
              description: description ? description.substring(0, 160) : `Apply for ${title} position at Illusio Design`,
              ogTitle: title,
              ogDescription: description ? description.substring(0, 160) : `Apply for ${title} position at Illusio Design`,
              ogImage: null
            });
          }
        }
      } catch (seoError) {
        // Log error but don't fail the position creation
        console.error('Error creating SEO entry:', seoError);
      }
    }
    
    res.status(201).json({ data: newPosition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    // Handle boolean fields
    if (updates.isActive !== undefined) {
      updates.isActive = updates.isActive === 'true' || updates.isActive === true;
    }
    
    const position = await Position.findByPk(id);
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    // Store old title before update to handle SEO entry migration
    const oldTitle = position.title;
    const oldSeoPageName = oldTitle ? createSEOPageName(oldTitle) : null;
    
    await position.update(updates);
    
    // Refresh position to get updated data
    await position.reload();
    
    // Update SEO entry automatically
    const finalTitle = updates.title || position.title;
    const finalDescription = updates.description !== undefined ? updates.description : position.description;
    
    if (finalTitle) {
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
              title: finalTitle,
              description: finalDescription ? finalDescription.substring(0, 160) : `Apply for ${finalTitle} position at Illusio Design`,
              ogTitle: finalTitle,
              ogDescription: finalDescription ? finalDescription.substring(0, 160) : `Apply for ${finalTitle} position at Illusio Design`,
              ogImage: null
            });
          } else {
            // Create new SEO entry
            await SEO.create({
              page: newSeoPageName,
              title: finalTitle,
              description: finalDescription ? finalDescription.substring(0, 160) : `Apply for ${finalTitle} position at Illusio Design`,
              ogTitle: finalTitle,
              ogDescription: finalDescription ? finalDescription.substring(0, 160) : `Apply for ${finalTitle} position at Illusio Design`,
              ogImage: null
            });
          }
        }
      } catch (seoError) {
        // Log error but don't fail the position update
        console.error('Error updating SEO entry:', seoError);
      }
    }
    
    res.json({ data: position });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const position = await Position.findByPk(id);
    
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    // Delete associated SEO entry
    if (position.title) {
      try {
        const seoPageName = createSEOPageName(position.title);
        if (seoPageName) {
          const seoEntry = await SEO.findOne({ where: { page: seoPageName } });
          if (seoEntry) {
            await seoEntry.destroy();
          }
        }
      } catch (seoError) {
        // Log error but don't fail the position deletion
        console.error('Error deleting SEO entry:', seoError);
      }
    }
    
    await position.destroy();
    res.json({ message: 'Position deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

