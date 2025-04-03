import nodemailer from 'nodemailer';

// Define a transporter for nodemailer
let transporter: nodemailer.Transporter | null = null;
let testAccount: any = null; // For ethereal email testing

// Initialize the mail service with SMTP configuration or fallback to test account
export async function initializeMailService() {
  try {
    // If we're in production and have credentials, use real SMTP
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.NODE_ENV === 'production') {
      // Create reusable transporter object using SMTP settings for SpaceMail
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'mail.spacemail.com',   // Use SpaceMail server
        port: parseInt(process.env.EMAIL_PORT || '587'),        // Default SMTP port
        secure: process.env.EMAIL_SECURE === 'true',            // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,                         // Your email address 
          pass: process.env.EMAIL_PASSWORD,                     // Your email password
        }
      });
      
      console.log('Email service initialized with real SMTP transport');
      return true;
    } 
    // Otherwise use test account (development/testing environment)
    else {
      // Generate test SMTP service account for development (doesn't actually send emails)
      console.log('Creating ethereal test account for email testing...');
      testAccount = await nodemailer.createTestAccount();
      
      // Create reusable transporter using the test account
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      
      console.log('Email service initialized with test account');
      console.log('Test account credentials:', { user: testAccount.user, pass: testAccount.pass });
      return true;
    }
  } catch (error) {
    console.error('Failed to initialize email service:', error);
    return false;
  }
}

// Email interface
export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

// Send email function
export async function sendEmail(params: EmailMessage): Promise<boolean> {
  try {
    // Ensure transporter is initialized
    if (!transporter) {
      const initialized = await initializeMailService();
      
      if (!initialized) {
        console.warn('Email not sent: mail service not initialized');
        return false;
      }
      
      // If we still don't have a transporter, abort
      if (!transporter) {
        return false;
      }
    }
    
    // Prepare email content
    const mailOptions: nodemailer.SendMailOptions = {
      from: params.from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
      cc: params.cc,
      bcc: params.bcc,
    };
    
    // Add reply-to if specified
    if (params.replyTo) {
      mailOptions.replyTo = params.replyTo;
    }
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`Email sent to ${params.to}, message ID: ${info.messageId}`);
    
    // If using Ethereal (test account), provide the URL to view the email in browser
    if (testAccount) {
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

// Helper function for contact form submissions
export async function sendContactFormNotification(
  name: string,
  email: string,
  message: string,
  phone: string | undefined,
  company: string
): Promise<boolean> {
  const ceoEmail = 'CEO@futurewith.co';
  const notificationEmail = 'info@futurewith.co';
  
  // Email content
  const subject = `New Contact Form Submission from ${name}`;
  const text = `
    New contact form submission received:
    
    Name: ${name}
    Email: ${email}
    ${phone ? `Phone: ${phone}` : ''}
    ${company ? `Company: ${company}` : ''}
    
    Message:
    ${message}
  `;
  
  const html = `
    <h2>New Contact Form Submission</h2>
    <p>You've received a new inquiry from the website contact form.</p>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
      </tr>
      ${phone ? `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
      </tr>
      ` : ''}
      ${company ? `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
      </tr>
      ` : ''}
    </table>
    <h3>Message:</h3>
    <p style="background-color: #f9f9f9; padding: 12px; border-left: 4px solid #4E89AE;">${message.replace(/\n/g, '<br>')}</p>
  `;
  
  // Send to CEO
  return sendEmail({
    to: ceoEmail,
    from: notificationEmail,
    subject,
    text,
    html,
    replyTo: email,
  });
}

// Auto-response to contact form submissions
export async function sendContactFormAutoResponse(
  name: string,
  email: string
): Promise<boolean> {
  const notificationEmail = 'info@futurewith.co';
  
  // Email content
  const subject = 'Thank you for contacting Future With';
  const text = `
    Dear ${name},
    
    Thank you for reaching out to Future With. We have received your inquiry and a member of our team will be in touch with you shortly.
    
    In the meantime, feel free to explore our website for more information about our services and success stories.
    
    Best regards,
    The Future With Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #2D3748; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #eaeaea; background-color: #ffffff;">
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Future With. We have received your inquiry and a member of our team will be in touch with you shortly.</p>
        <p>In the meantime, feel free to explore our website for more information about our services and success stories.</p>
        <p>Best regards,<br>The Future With Team</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>© ${new Date().getFullYear()} Future With. All rights reserved.</p>
        <p>Phone: +967730600011 | Email: info@futurewith.co</p>
      </div>
    </div>
  `;
  
  // Send auto-response
  return sendEmail({
    to: email,
    from: notificationEmail,
    subject,
    text,
    html,
  });
}