import { ContactMessage } from '../../models/ContactMessage.js';

export const getAllContactMessages = async (req, res) => {
  try {
    const { status } = req.query;
    let messages;
    
    if (status === 'unread') {
      messages = await ContactMessage.findUnread();
    } else {
      messages = await ContactMessage.findAll();
    }
    
    res.json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    
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
    const { status } = req.body;
    
    const message = await ContactMessage.updateById(id, { status });
    
    if (!message) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    
    res.json({ data: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

