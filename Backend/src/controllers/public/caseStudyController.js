import CaseStudy from '../../models/CaseStudy.js';

import { Op } from 'sequelize';
import { sequelize } from '../../config/db.js';

export const getAllCaseStudies = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build where clause
    const whereConditions = { published: true };
    
    if (category) {
      // Case-insensitive category matching
      const dialect = sequelize.getDialect();
      if (dialect === 'postgres') {
        whereConditions.category = { [Op.iLike]: category };
      } else {
        // For MySQL, use LOWER() for case-insensitive matching
        whereConditions[Op.and] = [
          { published: true },
          sequelize.where(
            sequelize.fn('LOWER', sequelize.col('category')),
            category.toLowerCase()
          )
        ];
        // Remove published from top level since it's in Op.and
        delete whereConditions.published;
      }
    }
    
    const caseStudies = await CaseStudy.findAll({
      where: whereConditions,
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

