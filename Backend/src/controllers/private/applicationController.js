import Application from '../../models/Application.js';
import Position from '../../models/Position.js';

export const getAllApplications = async (req, res) => {
  try {
    const { positionId } = req.query;
    const where = {};
    
    if (positionId) {
      where.positionId = positionId;
    }
    
    const applications = await Application.findAll({
      where,
      include: [{
        model: Position,
        as: 'position'
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ data: applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [{
        model: Position,
        as: 'position'
      }]
    });
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json({ data: application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    const application = await Application.findByPk(id, {
      include: [{
        model: Position,
        as: 'position'
      }]
    });
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    await application.update(updates);
    await application.reload({ include: [{ model: Position, as: 'position' }] });
    res.json({ data: application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    await application.destroy();
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

