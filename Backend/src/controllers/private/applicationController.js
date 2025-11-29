import { Application } from '../../models/Application.js';
import { Position } from '../../models/Position.js';

export const getAllApplications = async (req, res) => {
  try {
    const { positionId } = req.query;
    let applications;
    
    if (positionId) {
      applications = await Application.findByPositionId(positionId);
    } else {
      applications = await Application.findAll();
    }
    
    // Populate position details
    const applicationsWithPosition = await Promise.all(
      applications.map(async (app) => {
        const position = await Position.findById(app.positionId);
        return {
          ...app,
          position: position || null
        };
      })
    );
    
    res.json({ data: applicationsWithPosition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    const position = await Position.findById(application.positionId);
    
    res.json({ 
      data: {
        ...application,
        position: position || null
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const updates = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    
    const application = await Application.updateById(id, updates);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json({ data: application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Application.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

