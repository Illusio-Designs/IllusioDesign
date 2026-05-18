import Milestone from '../../models/Milestone.js';

// Public roadmap — only published milestones, in timeline order.
export const getPublicMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.findAll({
      where: { status: 'published' },
      order: [['order', 'ASC'], ['id', 'ASC']]
    });
    res.json({ data: milestones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
