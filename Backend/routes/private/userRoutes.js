const express = require('express');
const userController = require('../../controllers/Private/userController');
const upload = require('../../config/multer');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.post('/create', upload.single('userImage'), userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', authenticate, userController.logoutUser);

module.exports = router;
