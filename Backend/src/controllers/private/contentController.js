import Content from '../../models/Content.js';

export const getAllContent = async (req, res) => {
  try {
    const content = await Content.findAll({ order: [['order', 'ASC'], ['createdAt', 'DESC']] });
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createContent = async (req, res) => {
  try {
    const { key, title, body, type, metaTitle, metaDescription, metaKeywords, status, order } = req.body;
    if (!key) {
      return res.status(400).json({ error: 'A unique key is required' });
    }
    const existing = await Content.findOne({ where: { key } });
    if (existing) {
      return res.status(400).json({ error: 'Content with this key already exists. Use update instead.' });
    }
    const content = await Content.create({
      key,
      title: title || null,
      body: body != null ? String(body) : null,
      type: type || 'section',
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      metaKeywords: metaKeywords || null,
      status: status || 'published',
      order: order != null ? Number(order) : 0
    });
    res.status(201).json({ message: 'Content created successfully', data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    const { key, title, body, type, metaTitle, metaDescription, metaKeywords, status, order } = req.body;
    await content.update({
      key: key !== undefined ? key : content.key,
      title: title !== undefined ? title : content.title,
      body: body !== undefined ? (body != null ? String(body) : null) : content.body,
      type: type !== undefined ? type : content.type,
      metaTitle: metaTitle !== undefined ? metaTitle : content.metaTitle,
      metaDescription: metaDescription !== undefined ? metaDescription : content.metaDescription,
      metaKeywords: metaKeywords !== undefined ? metaKeywords : content.metaKeywords,
      status: status !== undefined ? status : content.status,
      order: order !== undefined ? Number(order) : content.order
    });
    res.json({ message: 'Content updated successfully', data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    await content.destroy();
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
