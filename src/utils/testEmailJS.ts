import emailjs from '@emailjs/browser';

// EmailJS configuration with provided credentials
const EMAILJS_SERVICE_ID = 'default_service'; // You may need to update this with your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_l0v1s65';
const EMAILJS_PUBLIC_KEY = 'tHsczBrrCw6ts-Nim';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Test function to send a simple email using EmailJS
 * This function demonstrates how to use the provided credentials
 */
export const testEmailJS = async (toEmail: string, toName: string) => {
  try {
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">🚀 EmailJS Test</h1>
          <p style="color: #34495e; font-size: 16px;">Hello ${toName},</p>
          <p style="color: #34495e; font-size: 16px;">This is a test email sent using EmailJS with the provided credentials:</p>
          
          <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Configuration Details:</h3>
            <p><strong>Public Key:</strong> ${EMAILJS_PUBLIC_KEY}</p>
            <p><strong>Template ID:</strong> ${EMAILJS_TEMPLATE_ID}</p>
            <p><strong>Service ID:</strong> ${EMAILJS_SERVICE_ID}</p>
          </div>
          
          <p style="color: #34495e; font-size: 16px;">If you received this email, the EmailJS integration is working correctly!</p>
          <p style="color: #34495e; font-size: 16px;">Best regards,<br>Royal VIP Limo Team</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
            <p style="color: #7f8c8d; font-size: 14px;">This is an automated test email</p>
          </div>
        </div>
      </div>
    `;

    const templateParams = {
      to_name: toName,
      to_email: toEmail,
      from_name: 'Royal VIP Limo',
      message: htmlMessage,
      subject: 'EmailJS Integration Test'
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Test email sent successfully:', result.text);
    return { success: true, result: result.text };
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
    return { success: false, error: error };
  }
};

/**
 * Quick test function that can be called from browser console
 * Usage: testQuickEmail('your-email@example.com', 'Your Name')
 */
(window as any).testQuickEmail = testEmailJS;

export default testEmailJS;