import CaseStudy from '../../models/CaseStudy.js';

export const getAllCaseStudies = async (req, res) => {
  try {
    const { category } = req.query;
    const where = { published: true };
    
    if (category) {
      where.category = category;
    }
    
    const caseStudies = await CaseStudy.findAll({
      where,
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
    
    if (!caseStudy || caseStudy.published === false) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json({ data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

