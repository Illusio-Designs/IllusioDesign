import Setting from '../../models/Setting.js';

export const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll({ order: [['category', 'ASC'], ['key', 'ASC']] });
    res.json({ data: settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ where: { key } });
    if (!setting) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    res.json({ data: setting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update one setting, creating it if it does not exist yet.
export const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, category, label, isPublic } = req.body;

    let setting = await Setting.findOne({ where: { key } });
    if (setting) {
      await setting.update({
        value: value !== undefined ? value : setting.value,
        category: category !== undefined ? category : setting.category,
        label: label !== undefined ? label : setting.label,
        isPublic: isPublic !== undefined ? isPublic : setting.isPublic
      });
    } else {
      setting = await Setting.create({
        key,
        value: value ?? null,
        category: category || 'general',
        label: label || null,
        isPublic: isPublic !== undefined ? isPublic : true
      });
    }
    res.json({ message: 'Setting saved successfully', data: setting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Bulk update settings. Accepts either:
 *   { settings: { key: value, ... } }   or   { key: value, ... }
 * Existing keys keep their category / label / isPublic.
 */
export const updateSettings = async (req, res) => {
  try {
    const payload = req.body && req.body.settings ? req.body.settings : req.body;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Provide settings as a key/value object' });
    }

    const entries = Object.entries(payload);
    for (const [key, value] of entries) {
      const existing = await Setting.findOne({ where: { key } });
      if (existing) {
        await existing.update({ value: value == null ? null : String(value) });
      } else {
        await Setting.create({ key, value: value == null ? null : String(value), category: 'general' });
      }
    }

    const settings = await Setting.findAll({ order: [['category', 'ASC'], ['key', 'ASC']] });
    res.json({ message: 'Settings saved successfully', data: settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ where: { key } });
    if (!setting) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    await setting.destroy();
    res.json({ message: 'Setting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
