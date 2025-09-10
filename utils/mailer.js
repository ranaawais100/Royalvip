import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter for Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD // Gmail App Password (not regular password)
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email to admin about new booking
const sendAdminNotification = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'inforoyalviplimos@gmail.com',
      subject: `🚗 New Booking Received - ${bookingData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin-bottom: 10px;">🚗 Royal VIP Limos</h1>
            <h2 style="color: #e74c3c; margin: 0;">New Booking Received!</h2>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-top: 0;">📋 Booking Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">👤 Customer Name:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">📧 Email:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">📱 Phone:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">📅 Date:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.date}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">🕐 Time:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.time}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">📍 Pickup Location:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.pickupLocation}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">🎯 Drop Location:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.dropLocation}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">🚗 Vehicle Type:</td>
                <td style="padding: 10px 0; color: #212529;">${bookingData.vehicleType}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724;">💡 <strong>Action Required:</strong> Please contact the customer to confirm the booking details and arrange the service.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">This is an automated notification from Royal VIP Limos booking system.</p>
            <p style="color: #6c757d; font-size: 12px; margin: 5px 0 0 0;">Booking ID: ${bookingData.id || 'N/A'} | Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return { success: false, error: error.message };
  }
};

// Enhanced email template generator
const generateEmailTemplate = (content, headerColor = '#2c3e50', headerText = 'Royal VIP Limos') => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 0; background-color: #f8f9fa;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, ${headerColor} 0%, #34495e 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">🚗 ${headerText}</h1>
        <p style="color: #ecf0f1; margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Premium Luxury Transportation Services</p>
      </div>
      
      <!-- Content -->
      <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        ${content}
        
        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #e9ecef; text-align: center;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">📞 Contact Information</h4>
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px;">
              <div style="text-align: center; min-width: 150px;">
                <p style="margin: 5px 0; color: #495057; font-weight: bold;">📧 Email</p>
                <p style="margin: 0; color: #6c757d; font-size: 14px;">inforoyalviplimos@gmail.com</p>
              </div>
              <div style="text-align: center; min-width: 150px;">
                <p style="margin: 5px 0; color: #495057; font-weight: bold;">📱 Phone</p>
                <p style="margin: 0; color: #6c757d; font-size: 14px;">+1 (555) 123-4567</p>
              </div>
              <div style="text-align: center; min-width: 150px;">
                <p style="margin: 5px 0; color: #495057; font-weight: bold;">🌐 Website</p>
                <p style="margin: 0; color: #6c757d; font-size: 14px;">www.royalviplimos.com</p>
              </div>
            </div>
          </div>
          
          <p style="color: #6c757d; font-size: 14px; margin: 15px 0 5px 0; line-height: 1.6;">
            Thank you for choosing Royal VIP Limos for your luxury transportation needs.
          </p>
          <p style="color: #adb5bd; font-size: 12px; margin: 0; font-style: italic;">
            This email was sent from Royal VIP Limos automated system. Please do not reply directly to this email.
          </p>
        </div>
      </div>
    </div>
  `;
};

// Send confirmation email to client
const sendClientConfirmation = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const content = `
      <div style="background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #28a745;">
        <h2 style="color: #155724; margin: 0 0 15px 0; font-size: 24px; display: flex; align-items: center;">
          <span style="font-size: 30px; margin-right: 10px;">✅</span>
          Booking Confirmed Successfully!
        </h2>
        <p style="color: #155724; font-size: 16px; line-height: 1.6; margin: 0;">
          Dear <strong>${bookingData.name}</strong>, your luxury transportation booking has been confirmed. 
          We're excited to provide you with our premium service!
        </p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #e9ecef;">
        <h3 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          📋 Your Booking Details
        </h3>
        
        <div style="display: grid; gap: 15px;">
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 6px; border-left: 4px solid #3498db;">
            <span style="font-weight: bold; color: #495057;">📅 Service Date:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.date}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 6px; border-left: 4px solid #17a2b8;">
            <span style="font-weight: bold; color: #495057;">🕐 Pickup Time:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.time}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 6px; border-left: 4px solid #28a745;">
            <span style="font-weight: bold; color: #495057;">📍 Pickup Location:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.pickupLocation}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 6px; border-left: 4px solid #ffc107;">
            <span style="font-weight: bold; color: #495057;">🎯 Destination:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.dropLocation}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 6px; border-left: 4px solid #6f42c1;">
            <span style="font-weight: bold; color: #495057;">🚗 Vehicle Type:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.vehicleType}</span>
          </div>
          ${bookingData.passengers ? `
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: white; border-radius: 6px; border-left: 4px solid #e83e8c;">
            <span style="font-weight: bold; color: #495057;">👥 Passengers:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.passengers}</span>
          </div>` : ''}
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #ffc107;">
        <h4 style="color: #856404; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
          <span style="font-size: 24px; margin-right: 10px;">⏰</span>
          What Happens Next?
        </h4>
        <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>Our team will contact you within 2 hours to confirm final details</li>
          <li>You'll receive driver information 30 minutes before pickup</li>
          <li>Your chauffeur will arrive 5-10 minutes early</li>
          <li>Enjoy your premium luxury transportation experience!</li>
        </ul>
      </div>
      
      <div style="background: linear-gradient(135deg, #d1ecf1 0%, #a8dadc 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #17a2b8;">
        <h4 style="color: #0c5460; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
          <span style="font-size: 24px; margin-right: 10px;">🔄</span>
          Need to Make Changes?
        </h4>
        <p style="color: #0c5460; margin: 0; line-height: 1.6;">
          Changes or cancellations can be made up to 4 hours before your scheduled pickup time. 
          Please contact us immediately if you need to modify your booking.
        </p>
      </div>
      
      <div style="text-align: center; background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
        <p style="color: #6c757d; font-size: 12px; margin: 0; font-family: monospace;">
          Booking Reference: ${bookingData.id || 'RVL-' + Date.now()}<br>
          Confirmation Time: ${new Date().toLocaleString()}<br>
          Status: Confirmed ✅
        </p>
      </div>
    `;
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: bookingData.email,
      subject: '✅ Booking Confirmed - Royal VIP Limos | Premium Transportation',
      html: generateEmailTemplate(content, '#28a745', 'Royal VIP Limos')
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Enhanced client confirmation sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Failed to send client confirmation:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    return { success: false, error: error.message };
  }
};

// Send status-specific email to client
const sendStatusUpdateEmail = async (bookingData, newStatus, adminNotes = '') => {
  try {
    const transporter = createTransporter();
    
    const statusConfig = {
      'confirmed': {
        color: '#28a745',
        icon: '✅',
        title: 'Booking Confirmed',
        message: 'Great news! Your booking has been confirmed and we\'re all set for your luxury transportation.'
      },
      'in-progress': {
        color: '#6f42c1',
        icon: '🚗',
        title: 'Service In Progress',
        message: 'Your chauffeur is on the way! Please be ready at your pickup location.'
      },
      'completed': {
        color: '#17a2b8',
        icon: '🎉',
        title: 'Service Completed',
        message: 'Thank you for choosing Royal VIP Limos! We hope you enjoyed your premium transportation experience.'
      },
      'cancelled': {
        color: '#dc3545',
        icon: '❌',
        title: 'Booking Cancelled',
        message: 'Your booking has been cancelled. If this was unexpected, please contact us immediately.'
      }
    };
    
    const config = statusConfig[newStatus] || statusConfig['confirmed'];
    
    const content = `
      <div style="background: linear-gradient(135deg, ${config.color}20 0%, ${config.color}10 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid ${config.color};">
        <h2 style="color: ${config.color}; margin: 0 0 15px 0; font-size: 24px; display: flex; align-items: center;">
          <span style="font-size: 30px; margin-right: 10px;">${config.icon}</span>
          ${config.title}
        </h2>
        <p style="color: ${config.color}; font-size: 16px; line-height: 1.6; margin: 0;">
          Dear <strong>${bookingData.name}</strong>, ${config.message}
        </p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #e9ecef;">
        <h3 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          📋 Booking Reference
        </h3>
        
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid #3498db;">
            <span style="font-weight: bold; color: #495057;">🆔 Booking ID:</span>
            <span style="color: #212529; font-weight: 500; font-family: monospace;">${bookingData.id}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid ${config.color};">
            <span style="font-weight: bold; color: #495057;">📊 Current Status:</span>
            <span style="color: ${config.color}; font-weight: bold; text-transform: uppercase;">${newStatus}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid #17a2b8;">
            <span style="font-weight: bold; color: #495057;">📅 Service Date:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.date}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid #28a745;">
            <span style="font-weight: bold; color: #495057;">🕐 Pickup Time:</span>
            <span style="color: #212529; font-weight: 500;">${bookingData.time}</span>
          </div>
        </div>
      </div>
      
      ${adminNotes ? `
      <div style="background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #17a2b8;">
        <h4 style="color: #0c5460; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
          <span style="font-size: 24px; margin-right: 10px;">💬</span>
          Additional Information
        </h4>
        <div style="color: #0c5460; font-size: 16px; line-height: 1.6; white-space: pre-line; background-color: white; padding: 15px; border-radius: 6px;">
          ${adminNotes}
        </div>
      </div>` : ''}
      
      <div style="text-align: center; background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
        <p style="color: #6c757d; font-size: 12px; margin: 0; font-family: monospace;">
          Status Updated: ${new Date().toLocaleString()}<br>
          Update Type: ${config.title}
        </p>
      </div>
    `;
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: bookingData.email,
      subject: `${config.icon} ${config.title} - Royal VIP Limos | Booking ${bookingData.id}`,
      html: generateEmailTemplate(content, config.color, 'Royal VIP Limos')
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Status update email sent successfully (${newStatus}):`, result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Failed to send status update email:', error);
    return { success: false, error: error.message };
  }
};

// Send admin response to client
const sendAdminResponse = async (responseData) => {
  try {
    const transporter = createTransporter();
    const { booking, responseMessage, subject } = responseData;
    
    const content = `
      <div style="background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #3498db;">
        <h2 style="color: #2980b9; margin: 0 0 15px 0; font-size: 24px; display: flex; align-items: center;">
          <span style="font-size: 30px; margin-right: 10px;">💬</span>
          Personal Response from Our Team
        </h2>
        <p style="color: #2980b9; font-size: 16px; line-height: 1.6; margin: 0;">
          Dear <strong>${booking.name}</strong>, we have a personalized message regarding your booking with Royal VIP Limos.
        </p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #e9ecef;">
        <h3 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          📋 Booking Reference
        </h3>
        
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid #3498db;">
            <span style="font-weight: bold; color: #495057;">🆔 Booking ID:</span>
            <span style="color: #212529; font-weight: 500; font-family: monospace;">${booking.id}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid #17a2b8;">
            <span style="font-weight: bold; color: #495057;">📅 Service Date:</span>
            <span style="color: #212529; font-weight: 500;">${booking.date}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid #28a745;">
            <span style="font-weight: bold; color: #495057;">🕐 Pickup Time:</span>
            <span style="color: #212529; font-weight: 500;">${booking.time}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 10px; background-color: white; border-radius: 6px; border-left: 4px solid #ffc107;">
            <span style="font-weight: bold; color: #495057;">📍 Pickup Location:</span>
            <span style="color: #212529; font-weight: 500;">${booking.pickupLocation}</span>
          </div>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #ffc107;">
        <h3 style="color: #856404; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
          <span style="font-size: 28px; margin-right: 10px;">📝</span>
          Our Personal Message
        </h3>
        <div style="background-color: white; padding: 20px; border-radius: 8px; color: #856404; font-size: 16px; line-height: 1.8; white-space: pre-line; border: 1px solid #ffc107;">
          ${responseMessage}
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #28a745;">
        <h4 style="color: #155724; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
          <span style="font-size: 24px; margin-right: 10px;">🤝</span>
          We're Here to Help
        </h4>
        <p style="color: #155724; margin: 0; line-height: 1.6;">
          If you have any questions or need further assistance, our customer service team is available 24/7. 
          We're committed to making your experience exceptional.
        </p>
      </div>
      
      <div style="text-align: center; background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
        <p style="color: #6c757d; font-size: 12px; margin: 0; font-family: monospace;">
          Response Sent: ${new Date().toLocaleString()}<br>
          Message Type: Personal Communication
        </p>
      </div>
    `;
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: booking.email,
      subject: subject || `💬 Personal Response - Royal VIP Limos | Booking ${booking.id}`,
      html: generateEmailTemplate(content, '#3498db', 'Royal VIP Limos')
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Enhanced admin response sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      message: 'Admin response sent successfully'
    };
    
  } catch (error) {
    console.error('📧 Error sending admin response:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send admin response'
    };
  }
};

export {
  sendAdminNotification,
  sendClientConfirmation,
  testEmailConfig,
  sendStatusUpdateEmail,
  sendAdminResponse
};