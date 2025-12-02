import Position from '../../models/Position.js';

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
      department,
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
      department: department || null,
      location: location || null,
      type: type || null,
      description: description || null,
      requirements: requirements || null,
      isActive: isActive !== undefined ? (isActive === 'true' || isActive === true) : true
    });
    
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
    
    await position.update(updates);
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
    
    await position.destroy();
    res.json({ message: 'Position deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

