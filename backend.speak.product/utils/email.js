// utils/email.js
const nodemailer = require('nodemailer');

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEnrollmentEmail = async (parentEmail, studentName, courseName, frontendUrl, parentName) => {

  console.log()
  // Check for required environment variables for SMTP
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP environment variables are not configured. Email not sent.');
    return;
  }

  console.log(parentEmail, studentName, courseName, frontendUrl, parentName, "inside email.js")

  try {
    console.log(parentEmail, studentName, courseName, frontendUrl, parentName, "inside try email.js start")
    console.log('Attempting to send email via SMTP...');

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || 'Enrollment System <noreply@example.com>',
      to: parentEmail, // Recipient address
      subject: `Parental Consent Required for Course Enrollment ${courseName}`,
      text: `Dear ${parentName},\n\nWe are pleased to inform you that your child, ${studentName},  wishes to enroll in the course "${courseName}" offered through SpeakHire.\n\nPlease click the link below to provide your consent: ${frontendUrl}\n\nSincerely,\nQueen High School Of Science`,
      html: `
        <p>Dear ${parentName},</p>
        <p>We are pleased to inform you that your child, ${studentName}, wishes to enroll in the course "${courseName}" offered through SpeakHire.</p>
        <p>Please click the link below to provide your consent: ${frontendUrl}</p>
        <p><a href="${frontendUrl}">${frontendUrl}</a></p>
        <p>Sincerely,<br>Queen High School Of Science</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: %s', info.messageId);
    console.log(`Enrollment email sent to ${parentEmail} for student ${studentName}, course ${courseName}, and parent ${parentName}.`);
  } catch (error) {
    console.error(`Error sending enrollment email to ${parentEmail}:`, error);
    // Log the full error object for more details
    console.error('SMTP error details:', error);
  }
};

module.exports = {
  sendEnrollmentEmail,
};