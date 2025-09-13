import emailjs from '@emailjs/browser';

// EmailJS Debug and Test Utility
// This helps diagnose EmailJS configuration issues

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
const EMAILJS_TEMPLATE_ID = 'template_l0v1s65';
const EMAILJS_PUBLIC_KEY = 'tHsczBrrCw6ts-Nim';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Debug EmailJS Configuration
 * Logs current configuration and identifies potential issues
 */
export function debugEmailJSConfig(): void {
  console.group('🔍 EmailJS Configuration Debug');
  
  console.log('📋 Current Configuration:');
  console.log('Service ID:', EMAILJS_SERVICE_ID);
  console.log('Template ID:', EMAILJS_TEMPLATE_ID);
  console.log('Public Key:', EMAILJS_PUBLIC_KEY ? 'Set ✅' : 'Missing ❌');
  
  console.log('\n🚨 Potential Issues:');
  
  if (EMAILJS_SERVICE_ID === 'service_your_service_id') {
    console.error('❌ Service ID is still placeholder! Update VITE_EMAILJS_SERVICE_ID in .env');
  } else if (EMAILJS_SERVICE_ID === 'default_service') {
    console.warn('⚠️  Using default_service - this may cause 400 errors');
  } else {
    console.log('✅ Service ID appears to be configured');
  }
  
  if (!EMAILJS_PUBLIC_KEY) {
    console.error('❌ Public Key is missing!');
  } else {
    console.log('✅ Public Key is configured');
  }
  
  console.log('\n📖 Next Steps:');
  console.log('1. Go to https://dashboard.emailjs.com/admin/services');
  console.log('2. Create or find your service ID');
  console.log('3. Update VITE_EMAILJS_SERVICE_ID in .env file');
  console.log('4. Restart your development server');
  
  console.groupEnd();
}

/**
 * Test EmailJS with minimal parameters
 * Helps identify if the service is working
 */
export async function testEmailJSConnection(testEmail: string = 'test@example.com'): Promise<boolean> {
  console.group('🧪 Testing EmailJS Connection');
  
  try {
    const testParams = {
      to_name: 'Test User',
      to_email: testEmail,
      from_name: 'Royal VIP Limo Test',
      message: '<h1>Test Email</h1><p>This is a test email from EmailJS configuration.</p>',
      booking_id: 'TEST-001',
      customer_name: 'Test User',
      customer_email: testEmail,
      customer_phone: '+1-555-0123',
      vehicle_type: 'Test Vehicle',
      passengers: 1,
      pickup_date: new Date().toLocaleDateString(),
      pickup_time: '12:00 PM',
      pickup_location: 'Test Pickup',
      drop_location: 'Test Drop',
      special_requests: 'Test request',
      booking_status: 'confirmed',
      company_name: 'Royal VIP Limo',
      company_email: 'info@royalviplimo.com',
      company_phone: '+1-555-0123'
    };
    
    console.log('📤 Sending test email...');
    console.log('Parameters:', testParams);
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      testParams
    );
    
    console.log('✅ Test email sent successfully!');
    console.log('Response:', result);
    console.groupEnd();
    return true;
    
  } catch (error: any) {
    console.error('❌ Test email failed!');
    console.error('Error:', error);
    
    // Provide specific error guidance
    if (error.status === 400) {
      console.error('\n🔍 400 Error Analysis:');
      console.error('- Check if Service ID exists in EmailJS dashboard');
      console.error('- Verify Service ID is correct in .env file');
      console.error('- Ensure email service is connected and active');
    } else if (error.status === 401) {
      console.error('\n🔍 401 Error Analysis:');
      console.error('- Check if Public Key is correct');
      console.error('- Verify Template ID exists');
    } else if (error.status === 429) {
      console.error('\n🔍 429 Error Analysis:');
      console.error('- Rate limit exceeded (1 request per second)');
      console.error('- Wait a moment and try again');
    }
    
    console.groupEnd();
    return false;
  }
}

// Make functions available globally for browser console testing
if (typeof window !== 'undefined') {
  (window as any).debugEmailJS = debugEmailJSConfig;
  (window as any).testEmailJS = testEmailJSConnection;
}

export default {
  debugEmailJSConfig,
  testEmailJSConnection
};