import dotenv from 'dotenv';

dotenv.config();

let transporter = null;
let emailServiceAvailable = false;
let nodemailer = null;
let initPromise = null;

// Initialize nodemailer
const initializeEmailService = async () => {
    if (initPromise) return initPromise;
    
    initPromise = (async () => {
        try {
            const nodemailerModule = await import('nodemailer');
            nodemailer = nodemailerModule.default || nodemailerModule;
            
            // Create transporter for Gmail (only if email config is available)
            if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
                transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_APP_PASSWORD
                    }
                });
                
                // Verify connection
                try {
                    await transporter.verify();
                    emailServiceAvailable = true;
                    console.log('✅ Email service initialized and verified');
                    console.log(`   Sending from: ${process.env.EMAIL_USER}`);
                } catch (verifyError) {
                    console.error('❌ Email service verification failed:', verifyError.message);
                    emailServiceAvailable = false;
                }
            } else {
                console.warn('⚠️  Email service not configured. EMAIL_USER and EMAIL_APP_PASSWORD not set in .env');
                emailServiceAvailable = false;
            }
        } catch (error) {
            console.error('❌ Failed to load nodemailer:', error.message);
            emailServiceAvailable = false;
        }
    })();
    
    return initPromise;
};

// Initialize on module load
initializeEmailService();

// Diagnostic function to check email service status
export const checkEmailServiceStatus = () => {
    return {
        initialized: emailServiceAvailable,
        hasTransporter: !!transporter,
        hasNodemailer: !!nodemailer,
        emailUser: process.env.EMAIL_USER ? 'Set' : 'Not set',
        emailPassword: process.env.EMAIL_APP_PASSWORD ? 'Set' : 'Not set',
        adminEmail: process.env.ADMIN_EMAIL || process.env.EMAIL_ADMIN || 'illusiodesigns@gmail.com (fallback)'
    };
};

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 * @param {string} options.text - Email text content (optional)
 * @returns {Promise}
 */
export const sendEmail = async ({ to, subject, html, text }) => {
    // Ensure email service is initialized
    await initializeEmailService();
    
    if (!emailServiceAvailable || !transporter) {
        const errorMsg = 'Email service not available. EMAIL_USER and EMAIL_APP_PASSWORD must be set in .env';
        console.error('❌', errorMsg);
        return { success: false, error: errorMsg };
    }
    
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
            text: text || html.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
        };

        console.log(`📧 Attempting to send email to: ${to}`);
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        console.log(`   To: ${to}`);
        console.log(`   Subject: ${subject}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        console.error('   Full error:', error);
        throw error;
    }
};

/**
 * Send contact form notification email
 * @param {Object} contactData - Contact form data
 * @returns {Promise}
 */
export const sendContactNotification = async (contactData) => {
    try {
        const { name, email, phone, subject, message } = contactData;

        const html = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `;

        // Use ADMIN_EMAIL from env, fallback to illusiodesigns@gmail.com
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_ADMIN || 'illusiodesigns@gmail.com';
        
        console.log(`📧 Preparing to send contact notification to: ${adminEmail}`);
        console.log(`   From: ${process.env.EMAIL_USER || 'Not set'}`);
        
        const result = await sendEmail({
            to: adminEmail,
            subject: `New Contact Form: ${subject}`,
            html
        });
        
        if (!result || !result.success) {
            console.error('❌ Email send returned failure:', result);
        }
        
        return result;
    } catch (error) {
        console.error('❌ Error in sendContactNotification:', error);
        throw error;
    }
};

/**
 * Send application notification email
 * @param {Object} applicationData - Application data
 * @returns {Promise}
 */
export const sendApplicationNotification = async (applicationData) => {
    try {
        const { name, email, contact, position } = applicationData;

        const html = `
            <h2>New Job Application</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Position:</strong> ${position?.title || 'N/A'}</p>
        `;

        // Use ADMIN_EMAIL from env, fallback to illusiodesigns@gmail.com
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_ADMIN || 'illusiodesigns@gmail.com';
        
        console.log(`📧 Preparing to send application notification to: ${adminEmail}`);
        
        const result = await sendEmail({
            to: adminEmail,
            subject: `New Job Application: ${name}`,
            html
        });
        
        if (!result || !result.success) {
            console.error('❌ Email send returned failure:', result);
        }
        
        return result;
    } catch (error) {
        console.error('❌ Error in sendApplicationNotification:', error);
        throw error;
    }
};

/**
 * Send confirmation email to user
 * @param {string} to - Recipient email
 * @param {string} type - Type of confirmation (contact, application)
 * @param {Object} data - Additional data
 * @returns {Promise}
 */
export const sendConfirmationEmail = async (to, type, data = {}) => {
    let subject, html;

    if (type === 'contact') {
        subject = 'Thank you for contacting Illusio Design';
        html = `
            <h2>Thank you for contacting us!</h2>
            <p>Dear ${data.name || 'Customer'},</p>
            <p>We have received your message and will get back to you soon.</p>
            <p>Best regards,<br>Illusio Design Team</p>
        `;
    } else if (type === 'application') {
        subject = 'Application Received - Illusio Design';
        html = `
            <h2>Application Received</h2>
            <p>Dear ${data.name || 'Applicant'},</p>
            <p>Thank you for applying to ${data.position || 'the position'}. We have received your application and will review it shortly.</p>
            <p>Best regards,<br>Illusio Design Team</p>
        `;
    }

    if (subject && html) {
        return await sendEmail({ to, subject, html });
    }
};
