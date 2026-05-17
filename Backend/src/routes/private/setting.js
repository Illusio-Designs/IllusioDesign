import express from 'express';
import {
  getAllSettings,
  getSettingByKey,
  updateSetting,
  updateSettings,
  deleteSetting
} from '../../controllers/private/settingController.js';

const router = express.Router();

router.get('/', getAllSettings);
router.put('/', updateSettings); // bulk update
router.get('/:key', getSettingByKey);
router.put('/:key', updateSetting);
router.delete('/:key', deleteSetting);

export default router;
