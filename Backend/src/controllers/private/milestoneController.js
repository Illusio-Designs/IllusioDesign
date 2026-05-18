import Milestone from '../../models/Milestone.js';

export const getAllMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.findAll({
      order: [['order', 'ASC'], ['id', 'ASC']]
    });
    res.json({ data: milestones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMilestoneById = async (req, res) => {
  try {
    const milestone = await Milestone.findByPk(req.params.id);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    res.json({ data: milestone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMilestone = async (req, res) => {
  try {
    const { label, title, description, order, status } = req.body;
    if (!label || !title) {
      return res.status(400).json({ error: 'A label and title are required' });
    }
    const milestone = await Milestone.create({
      label,
      title,
      description: description != null ? String(description) : null,
      order: order != null ? Number(order) : 0,
      status: status || 'published'
    });
    res.status(201).json({ message: 'Milestone created successfully', data: milestone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByPk(req.params.id);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    const { label, title, description, order, status } = req.body;
    await milestone.update({
      label: label !== undefined ? label : milestone.label,
      title: title !== undefined ? title : milestone.title,
      description: description !== undefined ? (description != null ? String(description) : null) : milestone.description,
      order: order !== undefined ? Number(order) : milestone.order,
      status: status !== undefined ? status : milestone.status
    });
    res.json({ message: 'Milestone updated successfully', data: milestone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByPk(req.params.id);
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    await milestone.destroy();
    res.json({ message: 'Milestone deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
