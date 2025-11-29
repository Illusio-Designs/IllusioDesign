import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

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
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
            text: text || html.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

/**
 * Send contact form notification email
 * @param {Object} contactData - Contact form data
 * @returns {Promise}
 */
export const sendContactNotification = async (contactData) => {
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

    return await sendEmail({
        to: process.env.EMAIL_USER, // Send to admin email
        subject: `New Contact Form: ${subject}`,
        html
    });
};

/**
 * Send application notification email
 * @param {Object} applicationData - Application data
 * @returns {Promise}
 */
export const sendApplicationNotification = async (applicationData) => {
    const { name, email, contact, position } = applicationData;

    const html = `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Position:</strong> ${position?.title || 'N/A'}</p>
    `;

    return await sendEmail({
        to: process.env.EMAIL_USER, // Send to admin email
        subject: `New Job Application: ${name}`,
        html
    });
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

