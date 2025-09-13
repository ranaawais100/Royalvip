import emailjs from '@emailjs/browser';
import { BookingData } from './firebaseService';

// EmailJS configuration - using provided credentials
// IMPORTANT: You need to get your Service ID from EmailJS dashboard
// Go to https://dashboard.emailjs.com/admin/services and create/find your service ID
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
const EMAILJS_TEMPLATE_ID = 'template_l0v1s65'; // Provided template ID
const EMAILJS_PUBLIC_KEY = 'tHsczBrrCw6ts-Nim'; // Provided public key
const EMAILJS_PRIVATE_KEY = 'b8X3ZIzA1N0c3Bei6nV4j'; // Provided private key

// Company configuration from environment variables
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'inforoyalviplimo@gmail.com';
const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || 'Royal VIP Limo';
const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL || 'inforoyalviplimo@gmail.com';
const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || 'Contact us via email';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailTemplateParams {
  to_name: string;
  to_email: string;
  from_name: string;
  message: string; // HTML content for the email
  booking_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  vehicle_type: string;
  passengers: number;
  pickup_date: string;
  pickup_time: string;
  pickup_location: string;
  drop_location: string;
  special_requests: string;
  booking_status: string;
  old_status?: string;
  company_name: string;
  company_email: string;
  company_phone: string;
  [key: string]: unknown;
}

class EmailService {
  /**
   * Send booking confirmation email to customer
   */
  async sendCustomerConfirmation(bookingData: BookingData): Promise<void> {
    try {
      const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; width: 100%; box-sizing: border-box;">
          <style>
            @media only screen and (max-width: 600px) {
              .email-container { width: 100% !important; padding: 10px !important; }
              .email-content { padding: 20px !important; }
              .booking-details { padding: 15px !important; }
              .email-title { font-size: 24px !important; }
              .email-text { font-size: 14px !important; }
              .contact-info { font-size: 12px !important; }
              .status-badge { display: inline-block !important; margin-top: 5px !important; }
            }
            @media only screen and (max-width: 480px) {
              .email-container { padding: 5px !important; }
              .email-content { padding: 15px !important; }
              .booking-details { padding: 10px !important; }
              .email-title { font-size: 22px !important; }
              .detail-row { margin-bottom: 8px !important; }
            }
          </style>
          <div class="email-container" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box;">
            <h1 class="email-title" style="color: #2c3e50; text-align: center; margin-bottom: 30px; font-size: 28px; line-height: 1.2;">Booking Confirmation</h1>
            <p class="email-text" style="color: #34495e; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">Dear ${bookingData.name},</p>
            <p class="email-text" style="color: #34495e; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Thank you for choosing ${COMPANY_NAME}! Your booking has been confirmed.</p>
            
            <div class="booking-details" style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0; width: 100%; box-sizing: border-box;">
              <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Booking Details:</h3>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Booking ID:</strong> ${bookingData.id || 'N/A'}</div>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</div>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Passengers:</strong> ${bookingData.passengers}</div>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Date:</strong> ${bookingData.date || 'N/A'}</div>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Time:</strong> ${bookingData.time || 'N/A'}</div>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Pickup Location:</strong> ${bookingData.pickupLocation || 'N/A'}</div>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Drop Location:</strong> ${bookingData.dropLocation || 'N/A'}</div>
              <div class="detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</div>
              <div class="detail-row" style="margin-bottom: 0; word-wrap: break-word;"><strong>Status:</strong> <span class="status-badge" style="color: #27ae60; font-weight: bold; background-color: #d5f4e6; padding: 4px 8px; border-radius: 4px; display: inline-block;">${bookingData.status}</span></div>
            </div>
            
            <p class="email-text" style="color: #34495e; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">We will contact you shortly to confirm the details.</p>
            <p class="email-text" style="color: #34495e; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">Best regards,<br>${COMPANY_NAME} Team</p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1; width: 100%; box-sizing: border-box;">
              <p class="contact-info" style="color: #7f8c8d; font-size: 14px; line-height: 1.4; margin: 0; word-wrap: break-word;">Contact us: ${COMPANY_EMAIL} | ${COMPANY_PHONE}</p>
            </div>
          </div>
        </div>
      `;

      const templateParams: EmailTemplateParams = {
        to_name: bookingData.name,
        to_email: bookingData.email,
        from_name: COMPANY_NAME,
        message: htmlMessage,
        booking_id: bookingData.id || 'N/A',
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        vehicle_type: bookingData.vehicleType,
        passengers: bookingData.passengers,
        pickup_date: bookingData.date || 'N/A',
        pickup_time: bookingData.time || 'N/A',
        pickup_location: bookingData.pickupLocation || 'N/A',
        drop_location: bookingData.dropLocation || 'N/A',
        special_requests: bookingData.specialRequests || 'None',
        booking_status: bookingData.status,
        company_name: COMPANY_NAME,
        company_email: COMPANY_EMAIL,
        company_phone: COMPANY_PHONE
      };

      // Debug logging
      console.log('EmailJS Configuration:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
      });

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Customer confirmation email sent successfully:', result.text);
    } catch (error) {
      console.error('Failed to send customer confirmation email:', error);
      throw new Error('Failed to send customer confirmation email');
    }
  }

  /**
   * Send booking notification email to admin
   */
  async sendAdminNotification(bookingData: BookingData): Promise<void> {
    try {
      const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; width: 100%; box-sizing: border-box;">
          <style>
            @media only screen and (max-width: 600px) {
              .admin-email-container { width: 100% !important; padding: 10px !important; }
              .admin-email-content { padding: 20px !important; }
              .admin-booking-details { padding: 15px !important; }
              .admin-email-title { font-size: 24px !important; }
              .admin-email-text { font-size: 14px !important; }
              .admin-contact-info { font-size: 12px !important; }
              .admin-status-badge { display: inline-block !important; margin-top: 5px !important; }
              .admin-action-box { padding: 12px !important; }
            }
            @media only screen and (max-width: 480px) {
              .admin-email-container { padding: 5px !important; }
              .admin-email-content { padding: 15px !important; }
              .admin-booking-details { padding: 10px !important; }
              .admin-email-title { font-size: 22px !important; }
              .admin-detail-row { margin-bottom: 8px !important; }
              .admin-action-box { padding: 10px !important; }
            }
          </style>
          <div class="admin-email-container" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid #dc3545; width: 100%; box-sizing: border-box;">
            <h1 class="admin-email-title" style="color: #dc3545; text-align: center; margin-bottom: 30px; font-size: 28px; line-height: 1.2;">🚨 New Booking Alert</h1>
            <p class="admin-email-text" style="color: #495057; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">Dear Admin,</p>
            <p class="admin-email-text" style="color: #495057; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">A new booking has been received and requires your attention.</p>
            
            <div class="admin-booking-details" style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #dee2e6; width: 100%; box-sizing: border-box;">
              <h3 style="color: #495057; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Booking Details:</h3>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Booking ID:</strong> ${bookingData.id || 'N/A'}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Customer:</strong> ${bookingData.name}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Email:</strong> <a href="mailto:${bookingData.email}" style="color: #007bff; word-break: break-all;">${bookingData.email}</a></div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Phone:</strong> <a href="tel:${bookingData.phone}" style="color: #007bff;">${bookingData.phone}</a></div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Passengers:</strong> ${bookingData.passengers}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Date:</strong> ${bookingData.date || 'N/A'}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Time:</strong> ${bookingData.time || 'N/A'}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Pickup:</strong> ${bookingData.pickupLocation || 'N/A'}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Drop-off:</strong> ${bookingData.dropLocation || 'N/A'}</div>
              <div class="admin-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Special Requests:</strong> ${bookingData.specialRequests || 'None'}</div>
              <div class="admin-detail-row" style="margin-bottom: 0; word-wrap: break-word;"><strong>Status:</strong> <span class="admin-status-badge" style="background-color: #ffc107; color: #212529; padding: 4px 8px; border-radius: 4px; font-weight: bold; display: inline-block;">${bookingData.status}</span></div>
            </div>
            
            <div class="admin-action-box" style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff; width: 100%; box-sizing: border-box;">
              <p style="color: #004085; margin: 0; font-weight: bold; line-height: 1.4;">⚡ Action Required:</p>
              <p style="color: #004085; margin: 5px 0 0 0; line-height: 1.4;">Please review and confirm this booking as soon as possible.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; width: 100%; box-sizing: border-box;">
              <p class="admin-contact-info" style="color: #6c757d; font-size: 14px; line-height: 1.4; margin: 0; word-wrap: break-word;">This is an automated notification from ${COMPANY_NAME} Booking System</p>
            </div>
          </div>
        </div>
      `;

      const templateParams: EmailTemplateParams = {
        to_name: 'Admin',
        to_email: ADMIN_EMAIL,
        from_name: `${COMPANY_NAME} Booking System`,
        message: htmlMessage,
        booking_id: bookingData.id || 'N/A',
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        vehicle_type: bookingData.vehicleType,
        passengers: bookingData.passengers,
        pickup_date: bookingData.date || 'N/A',
        pickup_time: bookingData.time || 'N/A',
        pickup_location: bookingData.pickupLocation || 'N/A',
        drop_location: bookingData.dropLocation || 'N/A',
        special_requests: bookingData.specialRequests || 'None',
        booking_status: bookingData.status,
        company_name: COMPANY_NAME,
        company_email: COMPANY_EMAIL,
        company_phone: COMPANY_PHONE
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Admin notification email sent successfully:', result.text);
    } catch (error) {
      console.error('Failed to send admin notification email:', error);
      throw new Error('Failed to send admin notification email');
    }
  }

  /**
   * Send both customer confirmation and admin notification emails
   */
  async sendBookingEmails(bookingData: BookingData): Promise<void> {
    try {
      // Send emails in parallel for better performance
      await Promise.all([
        this.sendCustomerConfirmation(bookingData),
        this.sendAdminNotification(bookingData)
      ]);
      
      console.log('All booking emails sent successfully');
    } catch (error) {
      console.error('Failed to send booking emails:', error);
      // Don't throw error to prevent booking failure if email fails
      // Just log the error for admin to handle
    }
  }

  /**
   * Send booking status update email to customer
   */
  async sendStatusUpdateEmail(bookingData: BookingData, oldStatus: string): Promise<void> {
    try {
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case 'confirmed': return '#28a745';
          case 'in progress': return '#007bff';
          case 'completed': return '#6f42c1';
          case 'cancelled': return '#dc3545';
          default: return '#ffc107';
        }
      };

      const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; width: 100%; box-sizing: border-box;">
          <style>
            @media only screen and (max-width: 600px) {
              .status-email-container { width: 100% !important; padding: 10px !important; }
              .status-email-content { padding: 20px !important; }
              .status-booking-details { padding: 15px !important; }
              .status-email-title { font-size: 24px !important; }
              .status-email-text { font-size: 14px !important; }
              .status-contact-info { font-size: 12px !important; }
              .status-change-box { padding: 15px !important; }
              .status-badges { flex-direction: column !important; gap: 10px !important; }
              .status-badge { margin: 5px 0 !important; }
              .status-arrow { display: none !important; }
            }
            @media only screen and (max-width: 480px) {
              .status-email-container { padding: 5px !important; }
              .status-email-content { padding: 15px !important; }
              .status-booking-details { padding: 10px !important; }
              .status-email-title { font-size: 22px !important; }
              .status-detail-row { margin-bottom: 8px !important; }
              .status-change-box { padding: 12px !important; }
            }
          </style>
          <div class="status-email-container" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid ${getStatusColor(bookingData.status)}; width: 100%; box-sizing: border-box;">
            <h1 class="status-email-title" style="color: #495057; text-align: center; margin-bottom: 30px; font-size: 28px; line-height: 1.2;">📋 Booking Status Update</h1>
            <p class="status-email-text" style="color: #495057; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">Dear ${bookingData.name},</p>
            <p class="status-email-text" style="color: #495057; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">We wanted to update you on the status of your booking with ${COMPANY_NAME}.</p>
            
            <div class="status-change-box" style="background-color: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; width: 100%; box-sizing: border-box;">
              <h3 style="color: #495057; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Status Change</h3>
              <div class="status-badges" style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
                <span class="status-badge" style="background-color: #6c757d; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block;">${oldStatus}</span>
                <span class="status-arrow" style="color: #495057; font-size: 20px; line-height: 1;">→</span>
                <span class="status-badge" style="background-color: ${getStatusColor(bookingData.status)}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block;">${bookingData.status}</span>
              </div>
            </div>
            
            <div class="status-booking-details" style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #dee2e6; width: 100%; box-sizing: border-box;">
              <h3 style="color: #495057; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Booking Details:</h3>
              <div class="status-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Booking ID:</strong> ${bookingData.id || 'N/A'}</div>
              <div class="status-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</div>
              <div class="status-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Date & Time:</strong> ${bookingData.date || 'N/A'} at ${bookingData.time || 'N/A'}</div>
              <div class="status-detail-row" style="margin-bottom: 10px; word-wrap: break-word;"><strong>Pickup:</strong> ${bookingData.pickupLocation || 'N/A'}</div>
              <div class="status-detail-row" style="margin-bottom: 0; word-wrap: break-word;"><strong>Drop-off:</strong> ${bookingData.dropLocation || 'N/A'}</div>
            </div>
            
            <p class="status-email-text" style="color: #495057; font-size: 16px; line-height: 1.5; margin-bottom: 15px;">If you have any questions about this update, please don't hesitate to contact us.</p>
            <p class="status-email-text" style="color: #495057; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">Thank you for choosing ${COMPANY_NAME}!</p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; width: 100%; box-sizing: border-box;">
              <p class="status-contact-info" style="color: #6c757d; font-size: 14px; line-height: 1.4; margin: 0; word-wrap: break-word;">Contact us: ${COMPANY_EMAIL} | ${COMPANY_PHONE}</p>
            </div>
          </div>
        </div>
      `;

      const templateParams: EmailTemplateParams = {
        to_name: bookingData.name,
        to_email: bookingData.email,
        from_name: COMPANY_NAME,
        message: htmlMessage,
        booking_id: bookingData.id || 'N/A',
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        vehicle_type: bookingData.vehicleType,
        passengers: bookingData.passengers,
        pickup_date: bookingData.date || 'N/A',
        pickup_time: bookingData.time || 'N/A',
        pickup_location: bookingData.pickupLocation || 'N/A',
        drop_location: bookingData.dropLocation || 'N/A',
        special_requests: bookingData.specialRequests || 'None',
        booking_status: bookingData.status,
        old_status: oldStatus,
        company_name: COMPANY_NAME,
        company_email: COMPANY_EMAIL,
        company_phone: COMPANY_PHONE
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Status update email sent successfully:', result.text);
    } catch (error) {
      console.error('Failed to send status update email:', error);
      // Don't throw error to prevent status update failure
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;