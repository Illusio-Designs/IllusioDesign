import { Position } from '../../models/Position.js';

export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.findActive();
    res.json({ data: positions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    
    if (!position || position.isActive === false) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    res.json({ data: position });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

