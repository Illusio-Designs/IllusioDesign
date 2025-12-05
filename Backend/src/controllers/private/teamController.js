import Team from '../../models/Team.js';

export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json({ data: teamMembers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await Team.findByPk(req.params.id);
    
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
    const { name, role, bio, order } = req.body;
    
    // Use webpPath if available (set by convertToWebP middleware), otherwise construct path
    const image = req.file ? (req.file.webpPath || `/uploads/images/${req.file.filename}`) : req.body.image;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const teamMember = await Team.create({
      name,
      role: role || null,
      bio: bio || null,
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
    const updates = { ...req.body };
    
    // Use webpPath if available (set by convertToWebP middleware), otherwise construct path
    if (req.file) {
      updates.image = req.file.webpPath || `/uploads/images/${req.file.filename}`;
    }
    
    if (updates.order !== undefined) {
      updates.order = parseInt(updates.order);
    }
    
    const teamMember = await Team.findByPk(id);
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    await teamMember.update(updates);
    res.json({ data: teamMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByPk(id);
    
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    await teamMember.destroy();
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

