"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
// Initialize Firebase Admin
admin.initializeApp();
// Email configuration
const ADMIN_EMAIL = 'inforoyalviplimo@gmail.com';
const COMPANY_NAME = 'Royal VIP Limo';
// Configure nodemailer with Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password
    }
});
// Function to send admin notification when new booking is created
exports.onBookingCreated = functions.firestore
    .document('bookings/{bookingId}')
    .onCreate(async (snap, context) => {
    const bookingData = snap.data();
    const bookingId = context.params.bookingId;
    try {
        // Send admin notification
        await sendAdminNotification(bookingData, bookingId);
        // Send customer confirmation
        await sendCustomerConfirmation(bookingData, bookingId);
        console.log(`Email notifications sent for booking ${bookingId}`);
    }
    catch (error) {
        console.error('Error sending email notifications:', error);
    }
});
// Function to send customer notification when booking status is updated
exports.onBookingStatusUpdated = functions.firestore
    .document('bookings/{bookingId}')
    .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const bookingId = context.params.bookingId;
    // Check if status has changed
    if (beforeData.status !== afterData.status) {
        try {
            await sendStatusUpdateNotification(afterData, bookingId, beforeData.status);
            console.log(`Status update notification sent for booking ${bookingId}`);
        }
        catch (error) {
            console.error('Error sending status update notification:', error);
        }
    }
});
// Send admin notification email
async function sendAdminNotification(bookingData, bookingId) {
    const mailOptions = {
        from: `${COMPANY_NAME} <${ADMIN_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `🚗 New Booking Received - ${bookingId}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          🚗 New Booking Notification
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Booking Details</h3>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Customer Name:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Phone:</strong> ${bookingData.phone}</p>
          <p><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</p>
          <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
          <p><strong>Pickup Date:</strong> ${bookingData.date || 'Not specified'}</p>
          <p><strong>Pickup Time:</strong> ${bookingData.time || 'Not specified'}</p>
          <p><strong>Pickup Location:</strong> ${bookingData.pickupLocation || 'Not specified'}</p>
          <p><strong>Drop Location:</strong> ${bookingData.dropLocation || 'Not specified'}</p>
          <p><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</p>
          <p><strong>Status:</strong> <span style="background-color: #fbbf24; color: #92400e; padding: 2px 8px; border-radius: 4px;">${bookingData.status}</span></p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <p style="margin: 0; color: #1e40af;">
            <strong>Action Required:</strong> Please review this booking and update the status in your admin dashboard.
          </p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          This is an automated notification from ${COMPANY_NAME} booking system.
        </p>
      </div>
    `
    };
    await transporter.sendMail(mailOptions);
}
// Send customer confirmation email
async function sendCustomerConfirmation(bookingData, bookingId) {
    var _a;
    const mailOptions = {
        from: `${COMPANY_NAME} <${ADMIN_EMAIL}>`,
        to: bookingData.email,
        subject: `✅ Booking Confirmation - ${COMPANY_NAME}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">✅ Booking Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for choosing ${COMPANY_NAME}</p>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 18px; color: #374151; margin-bottom: 25px;">
            Dear ${bookingData.name},
          </p>
          
          <p style="color: #6b7280; line-height: 1.6;">
            We have received your luxury vehicle booking request. Our team will review your booking and contact you shortly to confirm the details.
          </p>
          
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #374151; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              📋 Your Booking Details
            </h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
              <p style="margin: 5px 0;"><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</p>
              <p style="margin: 5px 0;"><strong>Passengers:</strong> ${bookingData.passengers}</p>
              <p style="margin: 5px 0;"><strong>Pickup Date:</strong> ${bookingData.date || 'To be confirmed'}</p>
              <p style="margin: 5px 0;"><strong>Pickup Time:</strong> ${bookingData.time || 'To be confirmed'}</p>
              <p style="margin: 5px 0;"><strong>Pickup Location:</strong> ${bookingData.pickupLocation || 'To be confirmed'}</p>
              <p style="margin: 5px 0;"><strong>Drop Location:</strong> ${bookingData.dropLocation || 'To be confirmed'}</p>
              ${bookingData.specialRequests ? `<p style="margin: 5px 0;"><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ''}
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="background-color: #fbbf24; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${bookingData.status}</span></p>
            </div>
          </div>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 25px 0;">
            <h4 style="color: #065f46; margin-top: 0;">🎯 What's Next?</h4>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li>Our team will contact you within 24 hours</li>
              <li>We'll confirm all booking details with you</li>
              <li>You'll receive updates via email and SMS</li>
              <li>Payment details will be shared upon confirmation</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; margin-bottom: 15px;">Need to make changes or have questions?</p>
            <p style="color: #374151;">
              📧 Email: <a href="mailto:${ADMIN_EMAIL}" style="color: #3b82f6;">${ADMIN_EMAIL}</a><br>
              📞 Phone: ${((_a = functions.config().company) === null || _a === void 0 ? void 0 : _a.phone) || 'Contact us via email'}
            </p>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Thank you for choosing ${COMPANY_NAME} for your luxury transportation needs.
          </p>
        </div>
      </div>
    `
    };
    await transporter.sendMail(mailOptions);
}
// Send status update notification to customer
async function sendStatusUpdateNotification(bookingData, bookingId, oldStatus) {
    var _a;
    const statusColors = {
        'pending': { bg: '#fbbf24', text: '#92400e' },
        'confirmed': { bg: '#10b981', text: '#065f46' },
        'cancelled': { bg: '#ef4444', text: '#991b1b' },
        'completed': { bg: '#8b5cf6', text: '#5b21b6' }
    };
    const statusColor = statusColors[bookingData.status.toLowerCase()] || { bg: '#6b7280', text: '#ffffff' };
    const mailOptions = {
        from: `${COMPANY_NAME} <${ADMIN_EMAIL}>`,
        to: bookingData.email,
        subject: `📋 Booking Status Update - ${COMPANY_NAME}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">📋 Booking Update</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${COMPANY_NAME}</p>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 18px; color: #374151; margin-bottom: 25px;">
            Dear ${bookingData.name},
          </p>
          
          <p style="color: #6b7280; line-height: 1.6;">
            Your booking status has been updated. Here are the latest details:
          </p>
          
          <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #374151; margin-top: 0;">📋 Booking Information</h3>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</p>
            <p><strong>Pickup Date:</strong> ${bookingData.date || 'To be confirmed'}</p>
            <p><strong>Pickup Time:</strong> ${bookingData.time || 'To be confirmed'}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 25px 0;">
            <h4 style="color: #0c4a6e; margin-top: 0;">Status Update</h4>
            <p style="color: #0369a1; margin: 10px 0;">
              <strong>Previous Status:</strong> <span style="background-color: #e5e7eb; color: #374151; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${oldStatus}</span>
            </p>
            <p style="color: #0369a1; margin: 10px 0;">
              <strong>Current Status:</strong> <span style="background-color: ${statusColor.bg}; color: ${statusColor.text}; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${bookingData.status}</span>
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; margin-bottom: 15px;">Questions about your booking?</p>
            <p style="color: #374151;">
              📧 Email: <a href="mailto:${ADMIN_EMAIL}" style="color: #3b82f6;">${ADMIN_EMAIL}</a><br>
              📞 Phone: ${((_a = functions.config().company) === null || _a === void 0 ? void 0 : _a.phone) || 'Contact us via email'}
            </p>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Thank you for choosing ${COMPANY_NAME}.
          </p>
        </div>
      </div>
    `
    };
    await transporter.sendMail(mailOptions);
}
//# sourceMappingURL=index.js.map