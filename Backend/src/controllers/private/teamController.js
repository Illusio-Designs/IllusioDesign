import { Team } from '../../models/Team.js';

export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.findAll();
    res.json({ data: teamMembers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ data: teamMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const { name, role, description, order } = req.body;
    
    const image = req.file ? `/uploads/images/${req.file.filename}` : req.body.image;
    
    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }
    
    const teamMember = await Team.create({
      name,
      role,
      description: description || null,
      image: image || null,
      order: order ? parseInt(order) : undefined
    });
    
    res.status(201).json({ data: teamMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (req.file) {
      updates.image = `/uploads/images/${req.file.filename}`;
    }
    
    if (updates.order !== undefined) {
      updates.order = parseInt(updates.order);
    }
    
    const teamMember = await Team.updateById(id, updates);
    
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ data: teamMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Team.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

