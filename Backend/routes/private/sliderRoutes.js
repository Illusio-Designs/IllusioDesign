const express = require('express');
const privateSliderController = require('../../controllers/Private/sliderController'); // Ensure this path is correct
const { authenticate } = require('../../middleware/auth'); // Import your authentication middleware
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/sliders'); // Path for image uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename format: timestamp + extension
    }
});

const upload = multer({ storage: storage });

// Slider routes

// Route to create a new slider with image upload
router.post(
    '/',
    authenticate,
    upload.single('media'), // Use multer middleware for handling single file upload
    privateSliderController.createSlider
);

// Route to edit an existing slider, including image upload if necessary
router.put(
    '/edit/:id',
    authenticate,
    upload.single('media'), // Use multer middleware for handling single file upload
    privateSliderController.editSlider
);

// Route to delete a slider by ID
router.delete(
    '/delete/:id',
    authenticate,
    privateSliderController.deleteSlider
);

// Route to get all sliders
router.get(
    '/',
    authenticate,
    privateSliderController.getAllSliders
);

// Route for additional image uploads, if necessary
router.post(
    '/uploads',
    authenticate,
    upload.single('media'), // Use multer for handling single file upload
    privateSliderController.uploadImage // Ensure this function exists in your controller
);

module.exports = router;
