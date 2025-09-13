// Test utility to verify EmailJS configuration
import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_TEMPLATE_ID_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;

export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    console.log('Testing EmailJS configuration...');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Public Key:', EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing');
    console.log('Customer Template ID:', EMAILJS_TEMPLATE_ID_CUSTOMER);
    
    if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_TEMPLATE_ID_CUSTOMER) {
      console.error('Missing EmailJS configuration variables');
      return false;
    }
    
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Test email parameters
    const testParams = {
      to_email: 'test@example.com',
      to_name: 'Test User',
      customer_name: 'John Doe',
      customer_email: 'john.doe@example.com',
      customer_phone: '+971501234567',
      vehicle_type: 'Luxury Sedan',
      passengers: '2',
      booking_id: 'TEST-123',
      booking_date: new Date().toLocaleDateString(),
      company_name: 'Royal VIP Limousines',
      company_email: 'info@royalviplimo.com',
      company_phone: '+971 50 123 4567'
    };
    
    console.log('Sending test email with parameters:', testParams);
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CUSTOMER,
      testParams
    );
    
    console.log('Test email sent successfully:', result);
    return true;
    
  } catch (error) {
    console.error('EmailJS test failed:', error);
    return false;
  }
};

// Function to test from browser console
(window as any).testEmail = testEmailConfiguration;