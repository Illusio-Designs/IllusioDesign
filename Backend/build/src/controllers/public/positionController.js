import Position from '../../models/Position.js';

const createPositionSlug = (title) => {
  if (!title) return null;
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });
    res.json({ data: positions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findByPk(req.params.id);
    
    if (!position || position.isActive === false) {
      return res.status(404).json({ error: 'Position not found' });
    }
    
    res.json({ data: position });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPositionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    const positions = await Position.findAll({
      where: { isActive: true }
    });

    const matched = positions.find((pos) => createPositionSlug(pos.title) === slug);

    if (!matched) {
      return res.status(404).json({ error: 'Position not found' });
    }

    res.json({ data: matched });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

