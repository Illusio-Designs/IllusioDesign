import Content from '../../models/Content.js';

// Returns only published content blocks.
export const getAllContent = async (req, res) => {
  try {
    const where = { status: 'published' };
    if (req.query.type) where.type = req.query.type;
    const content = await Content.findAll({
      where,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContentByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const content = await Content.findOne({ where: { key, status: 'published' } });
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
