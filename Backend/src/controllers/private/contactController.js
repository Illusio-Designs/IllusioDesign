import ContactMessage from '../../models/ContactMessage.js';

export const getAllContactMessages = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    
    if (status === 'unread') {
      where.status = 'unread';
    }
    
    const messages = await ContactMessage.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    
    if (!message) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    
    res.json({ data: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    
    await message.update(updates);
    res.json({ data: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    
    await message.destroy();
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

