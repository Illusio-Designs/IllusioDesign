import Application from '../../models/Application.js';
import Position from '../../models/Position.js';
import { sendApplicationNotification, sendConfirmationEmail } from '../../services/emailService.js';
import { trackJobApplication } from '../../integration/googleAnalytics.js';
import { trackJobApplication as trackFBApplication } from '../../integration/facebookPixel.js';

export const createApplication = async (req, res) => {
  try {
    const { positionId, name, email, contact, portfolio } = req.body;
    const resume = req.file ? `/uploads/resumes/${req.file.filename}` : null;
    
    if (!positionId || !name || !email || !contact) {
      return res.status(400).json({ error: 'Position ID, name, email, and contact are required' });
    }
    
    // Verify position exists and is active
    const position = await Position.findByPk(positionId);
    if (!position || position.isActive === false) {
      return res.status(404).json({ error: 'Position not found or not active' });
    }
    
    if (!resume) {
      return res.status(400).json({ error: 'Resume file is required' });
    }
    
    const application = await Application.create({
      positionId: parseInt(positionId),
      name,
      email,
      contact,
      portfolio: portfolio || null,
      resume
    });
    
    // Send notification email to admin (non-blocking)
    sendApplicationNotification({ name, email, contact, position }).catch(err => {
      console.error('Failed to send notification email:', err);
    });
    
    // Send confirmation email to applicant (non-blocking)
    sendConfirmationEmail(email, 'application', { name, position: position.title }).catch(err => {
      console.error('Failed to send confirmation email:', err);
    });
    
    // Track analytics (non-blocking)
    const clientId = req.headers['x-client-id'] || 'anonymous';
    trackJobApplication(positionId, clientId).catch(err => {
      console.error('Failed to track GA:', err);
    });
    
    trackFBApplication(positionId, {
      client_ip_address: req.ip,
      client_user_agent: req.get('user-agent')
    }).catch(err => {
      console.error('Failed to track FB Pixel:', err);
    });
    
    res.status(201).json({ 
      data: application,
      message: 'Application submitted successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

