import { Position } from '../../models/Position.js';

export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.findAll();
    res.json({ data: positions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    
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
      description,
      position,
      workType,
      location,
      experience,
      software,
      isActive
    } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    const newPosition = await Position.create({
      title,
      description,
      position: position || '1 Position',
      workType: workType || 'Work From Office',
      location: location || null,
      experience: experience || null,
      software: software || null,
      isActive: isActive !== undefined ? isActive : true
    });
    
    res.status(201).json({ data: newPosition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const position = await Position.updateById(id, updates);
    
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    res.json({ data: position });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Position.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    res.json({ message: 'Position deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

