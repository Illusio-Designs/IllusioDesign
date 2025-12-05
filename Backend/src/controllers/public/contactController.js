import ContactMessage from '../../models/ContactMessage.js';
import { sendContactNotification, sendConfirmationEmail } from '../../services/emailService.js';
import { trackContactForm } from '../../integration/googleAnalytics.js';
import { trackContactForm as trackFBContact } from '../../integration/facebookPixel.js';

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message
    });
    
    // Send notification email to admin (non-blocking but with better error handling)
    (async () => {
      try {
        console.log('📧 Starting email send process...');
        const result = await sendContactNotification({ name, email, phone, subject, message });
        if (result && result.success) {
          console.log('✅ Contact notification email sent successfully');
          console.log('   Message ID:', result.messageId);
        } else {
          console.error('❌ Failed to send contact notification email:', result?.error || 'Unknown error');
          console.error('   Result:', JSON.stringify(result, null, 2));
        }
      } catch (err) {
        console.error('❌ Exception in email send:', err.message || err);
        console.error('   Stack:', err.stack);
      }
    })();
    
    // Send confirmation email to user (non-blocking)
    sendConfirmationEmail(email, 'contact', { name }).catch(err => {
      console.error('Failed to send confirmation email:', err);
    });
    
    // Track analytics (non-blocking)
    const clientId = req.headers['x-client-id'] || 'anonymous';
    trackContactForm(clientId).catch(err => {
      console.error('Failed to track GA:', err);
    });
    
    trackFBContact({
      ip_address: req.ip,
      user_agent: req.get('user-agent')
    }).catch(err => {
      console.error('Failed to track FB Pixel:', err);
    });
    
    res.status(201).json({ 
      data: contactMessage,
      message: 'Message sent successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

