const express = require('express');
const projectController = require('../../controllers/Private/projectController');
const upload = require('../../config/multer');

const router = express.Router();

router.post('/create', upload.single('image'), projectController.createProject);

module.exports = router;
