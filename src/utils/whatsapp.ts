/**
 * WhatsApp Business Integration Utility
 * Handles WhatsApp contact functionality for the car rental service
 */

// Business WhatsApp number for Royal VIP Limos
const BUSINESS_WHATSAPP_NUMBER = '+971585859944'; // UAE business number for luxury car rental

/**
 * Opens WhatsApp with a pre-filled message
 * @param message - The message to pre-fill
 * @param phoneNumber - Optional phone number (defaults to business number)
 */
export const openWhatsApp = (message: string, phoneNumber?: string) => {
  const phone = phoneNumber || BUSINESS_WHATSAPP_NUMBER;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank');
};

/**
 * Generate a WhatsApp message for car inquiry
 * @param carName - Name of the car
 * @param category - Category of the car
 * @returns Formatted message string
 */
export const generateCarInquiryMessage = (carName: string, category: string): string => {
  return `Hi! I'm interested in the ${carName} from your ${category} collection. Could you please provide more details about availability, pricing, and booking options? Thank you!`;
};

/**
 * Generate a WhatsApp message for general inquiry
 * @returns Formatted message string
 */
export const generateGeneralInquiryMessage = (): string => {
  return `Hi! I'm interested in your luxury car rental services. Could you please provide more information about your fleet, pricing, and availability? Thank you!`;
};

/**
 * Generate a WhatsApp message for booking confirmation
 * @param bookingDetails - Booking details object
 * @returns Formatted message string
 */
export const generateBookingMessage = (bookingDetails: {
  carName?: string;
  pickupDate?: string;
  pickupLocation?: string;
  passengers?: string;
}): string => {
  const { carName, pickupDate, pickupLocation, passengers } = bookingDetails;
  
  let message = `Hi! I would like to make a booking for your luxury car rental service.\n\n`;
  
  if (carName) message += `Vehicle: ${carName}\n`;
  if (pickupDate) message += `Pickup Date: ${pickupDate}\n`;
  if (pickupLocation) message += `Pickup Location: ${pickupLocation}\n`;
  if (passengers) message += `Number of Passengers: ${passengers}\n`;
  
  message += `\nPlease let me know about availability and next steps. Thank you!`;
  
  return message;
};

/**
 * Check if WhatsApp is available (basic check)
 * @returns boolean indicating if WhatsApp can be opened
 */
export const isWhatsAppAvailable = (): boolean => {
  // Basic check - in a real app, you might want more sophisticated detection
  return typeof window !== 'undefined' && window.open !== undefined;
};