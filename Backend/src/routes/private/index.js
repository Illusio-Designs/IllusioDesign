import express from 'express';
import { authenticateToken, isAdmin } from '../../middleware/auth.js';
import dashboardRoutes from './dashboard.js';
import authRoutes from './auth.js';

// Import controllers for read operations (accessible to all authenticated users)
import { getAllCaseStudies, getCaseStudyById } from '../../controllers/private/caseStudyController.js';
import { getAllBlogs, getBlogById } from '../../controllers/private/blogController.js';
import { getAllPositions, getPositionById } from '../../controllers/private/positionController.js';
import { getAllApplications, getApplicationById } from '../../controllers/private/applicationController.js';
import { getAllContactMessages, getContactMessageById } from '../../controllers/private/contactController.js';
import { getAllTeamMembers, getTeamMemberById } from '../../controllers/private/teamController.js';
import { getAllSEO, getSEOByPage } from '../../controllers/private/seoController.js';
import { getAllUsers, getUserById } from '../../controllers/private/adminController.js';
import privacyPolicyRoutes from './privacyPolicy.js';
import termsOfServiceRoutes from './termsOfService.js';

// Import controllers and middleware for write operations (accessible to all authenticated users)
import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from '../../controllers/private/caseStudyController.js';
import { createBlog, updateBlog, deleteBlog } from '../../controllers/private/blogController.js';
import { createPosition, updatePosition, deletePosition } from '../../controllers/private/positionController.js';
import { updateApplication, deleteApplication } from '../../controllers/private/applicationController.js';
import { updateContactMessage, deleteContactMessage } from '../../controllers/private/contactController.js';
import { createTeamMember, updateTeamMember, deleteTeamMember } from '../../controllers/private/teamController.js';
import { createSEO, updateSEO, deleteSEO } from '../../controllers/private/seoController.js';
import { createUser, updateUser, updateUserRole, deleteUser } from '../../controllers/private/adminController.js';
import { uploadImage, uploadMultipleImages, deleteImage, getAllImages } from '../../controllers/private/imageController.js';
import { upload, uploadBlog, uploadProject, convertToWebP, convertMultipleToWebP } from '../../middleware/upload.js';

const router = express.Router();

// Auth routes (login/register don't require authentication, logout is optional)
router.use('/auth', authRoutes);

// All other private routes require authentication
router.use(authenticateToken);

// Dashboard routes (authenticated users)
router.use('/dashboard', dashboardRoutes);

// GET routes - accessible to all authenticated users (must come before admin routes)
router.get('/case-studies', getAllCaseStudies);
router.get('/case-studies/:id', getCaseStudyById);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.get('/positions', getAllPositions);
router.get('/positions/:id', getPositionById);
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplicationById);
router.get('/contact-messages', getAllContactMessages);
router.get('/contact-messages/:id', getContactMessageById);
router.get('/team', getAllTeamMembers);
router.get('/team/:id', getTeamMemberById);
router.get('/seo', getAllSEO);
router.get('/seo/page/:page', getSEOByPage);

// User read routes (authenticated users can view users) - must come before admin routes
router.get('/admin/users', getAllUsers);
router.get('/admin/users/:id', getUserById);

// Write routes (POST, PUT, DELETE) - accessible to all authenticated users
router.post('/case-studies', uploadProject.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), convertToWebP, convertMultipleToWebP, createCaseStudy);
router.put('/case-studies/:id', uploadProject.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additionalImages', maxCount: 10 }
]), convertToWebP, convertMultipleToWebP, updateCaseStudy);
router.delete('/case-studies/:id', deleteCaseStudy);

router.post('/blogs', uploadBlog.single('image'), convertToWebP, createBlog);
router.put('/blogs/:id', uploadBlog.single('image'), convertToWebP, updateBlog);
router.delete('/blogs/:id', deleteBlog);

router.post('/positions', createPosition);
router.put('/positions/:id', updatePosition);
router.delete('/positions/:id', deletePosition);

router.put('/applications/:id', updateApplication);
router.delete('/applications/:id', deleteApplication);

router.put('/contact-messages/:id', updateContactMessage);
router.delete('/contact-messages/:id', deleteContactMessage);

router.post('/team', upload.single('image'), convertToWebP, createTeamMember);
router.put('/team/:id', upload.single('image'), convertToWebP, updateTeamMember);
router.delete('/team/:id', deleteTeamMember);

router.post('/seo', upload.single('ogImage'), convertToWebP, createSEO);
router.put('/seo/page/:page', upload.single('ogImage'), convertToWebP, updateSEO);
router.delete('/seo/:id', deleteSEO);

// User write routes (accessible to all authenticated users)
router.post('/admin/users', createUser);
router.put('/admin/users/:id', updateUser);
router.put('/admin/users/:id/role', updateUserRole);
router.delete('/admin/users/:id', deleteUser);

// Admin image routes (admin only)
router.post('/admin/images/upload', isAdmin, upload.single('image'), convertToWebP, uploadImage);
router.post('/admin/images/upload-multiple', isAdmin, upload.array('images', 10), convertMultipleToWebP, uploadMultipleImages);
router.get('/admin/images', isAdmin, getAllImages);
router.delete('/admin/images/:filename', isAdmin, deleteImage);

// Privacy Policy and Terms of Service routes
router.use('/privacy-policy', privacyPolicyRoutes);
router.use('/terms-of-service', termsOfServiceRoutes);

export default router;
