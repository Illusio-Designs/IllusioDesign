import { CaseStudy } from '../../models/CaseStudy.js';

export const getAllCaseStudies = async (req, res) => {
  try {
    const { category } = req.query;
    let caseStudies;
    
    if (category) {
      caseStudies = await CaseStudy.findByCategory(category);
    } else {
      caseStudies = await CaseStudy.findPublished();
    }
    
    res.json({ data: caseStudies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    
    if (!caseStudy || caseStudy.published === false) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

