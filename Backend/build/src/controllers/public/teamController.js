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

