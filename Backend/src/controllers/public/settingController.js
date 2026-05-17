import Setting from '../../models/Setting.js';

/**
 * Public settings — returns only keys flagged `isPublic` as a flat
 * { key: value } object (safe to expose to the browser).
 */
export const getPublicSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll({ where: { isPublic: true } });
    const map = {};
    settings.forEach((s) => { map[s.key] = s.value; });
    res.json({ data: map });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
