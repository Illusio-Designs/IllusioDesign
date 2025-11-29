import { CaseStudy } from '../../models/CaseStudy.js';

export const getAllCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.findAll();
    res.json({ data: caseStudies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    
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
      additionalImages,
      published
    } = req.body;
    
    const image = req.file ? `/uploads/images/${req.file.filename}` : req.body.image;
    
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, description, and category are required' });
    }
    
    const caseStudy = await CaseStudy.create({
      title,
      description,
      image,
      link: link || null,
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',') : []),
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',') : []),
      timeline: timeline || null,
      results: Array.isArray(results) ? results : (results ? results.split(',') : []),
      location: location || null,
      projectName: projectName || null,
      overview: overview || null,
      overviewExtended: overviewExtended || null,
      industry: industry || null,
      additionalImages: Array.isArray(additionalImages) ? additionalImages : (additionalImages ? additionalImages.split(',') : []),
      published: published !== undefined ? published : true
    });
    
    res.status(201).json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (req.file) {
      updates.image = `/uploads/images/${req.file.filename}`;
    }
    
    // Handle array fields
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',');
    }
    if (updates.techStack && typeof updates.techStack === 'string') {
      updates.techStack = updates.techStack.split(',');
    }
    if (updates.results && typeof updates.results === 'string') {
      updates.results = updates.results.split(',');
    }
    if (updates.additionalImages && typeof updates.additionalImages === 'string') {
      updates.additionalImages = updates.additionalImages.split(',');
    }
    
    const caseStudy = await CaseStudy.updateById(id, updates);
    
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CaseStudy.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

