import { Content } from '../../models/Content.js';
import { User } from '../../models/User.js';

// Content Management
export const getAllContent = async (req, res) => {
  try {
    const content = await Content.findAll();
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createContent = async (req, res) => {
  try {
    const { title, body, published } = req.body;
    
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }
    
    // Handle image if uploaded
    const imageData = req.file ? {
      image: req.file.webpPath || `/uploads/images/${req.file.filename}`,
      imageUrl: `${req.protocol}://${req.get('host')}${req.file.webpPath || `/uploads/images/${req.file.filename}`}`
    } : {};
    
    const content = await Content.create({
      title,
      body,
      published: published || false,
      ...imageData
    });
    
    res.status(201).json({
      message: 'Content created successfully',
      data: content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    // Handle image if uploaded
    if (req.file) {
      updates.image = req.file.webpPath || `/uploads/images/${req.file.filename}`;
      updates.imageUrl = `${req.protocol}://${req.get('host')}${req.file.webpPath || `/uploads/images/${req.file.filename}`}`;
    }
    
    const content = await Content.updateById(id, updates);
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({
      message: 'Content updated successfully',
      data: content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Content.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Management
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Valid role is required (user or admin)' });
    }
    
    const user = await User.updateById(id, { role });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }
    
    const deleted = await User.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
