// API Routes with Firebase Integration
import {
  signUpUser,
  signInUser,
  signOutUser,
  resetPassword,
  getCurrentUser
} from '../services/authService';
import {
  BookingService,
  VehicleService,
  UserService,
  DatabaseService
} from '../services/databaseService';
import {
  StorageService,
  ImageStorageService,
  DocumentStorageService
} from '../services/storageService';
import {
  requireAuth,
  optionalAuth,
  requireAdmin,
  rateLimit,
  corsHeaders,
  validateRequest,
  validateEmail,
  validatePassword,
  sanitizeInput
} from '../middleware/authMiddleware';

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  timestamp: string;
}

// Helper function to create standardized API responses
const createResponse = (success: boolean, message: string, data?: any, error?: string): ApiResponse => {
  return {
    success,
    message,
    data,
    error,
    timestamp: new Date().toISOString()
  };
};

// Authentication Routes
export class AuthRoutes {
  
  // POST /api/auth/signup
  static async signup(requestData: any): Promise<ApiResponse> {
    try {
      // Rate limiting
      const rateLimitResult = rateLimit(requestData.ip || 'unknown');
      if (!rateLimitResult.success) {
        return createResponse(false, rateLimitResult.message);
      }
      
      // Validate required fields
      const validation = validateRequest(
        ['email', 'password', 'firstName', 'lastName'],
        requestData
      );
      if (!validation.success) {
        return createResponse(false, validation.message);
      }
      
      // Sanitize input
      const sanitizedData = sanitizeInput(requestData);
      
      // Validate email format
      if (!validateEmail(sanitizedData.email)) {
        return createResponse(false, 'Invalid email format');
      }
      
      // Validate password strength
      const passwordValidation = validatePassword(sanitizedData.password);
      if (!passwordValidation.valid) {
        return createResponse(false, passwordValidation.message);
      }
      
      // Create user account
      const authResult = await signUpUser(sanitizedData);
      
      if (authResult.success && authResult.user) {
        // Create user profile in Firestore
        const userProfile = {
          uid: authResult.user.uid,
          email: sanitizedData.email,
          firstName: sanitizedData.firstName,
          lastName: sanitizedData.lastName,
          displayName: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
          emailVerified: false,
          role: 'user'
        };
        
        await UserService.createUserProfile(userProfile);
        
        return createResponse(true, authResult.message, {
          user: {
            uid: authResult.user.uid,
            email: authResult.user.email,
            displayName: authResult.user.displayName,
            emailVerified: authResult.user.emailVerified
          }
        });
      }
      
      return createResponse(false, authResult.message, null, authResult.error);
    } catch (error: any) {
      return createResponse(false, 'Signup failed', null, error.message);
    }
  }
  
  // POST /api/auth/signin
  static async signin(requestData: any): Promise<ApiResponse> {
    try {
      // Rate limiting
      const rateLimitResult = rateLimit(requestData.ip || 'unknown');
      if (!rateLimitResult.success) {
        return createResponse(false, rateLimitResult.message);
      }
      
      // Validate required fields
      const validation = validateRequest(['email', 'password'], requestData);
      if (!validation.success) {
        return createResponse(false, validation.message);
      }
      
      // Sanitize input
      const sanitizedData = sanitizeInput(requestData);
      
      // Sign in user
      const authResult = await signInUser(sanitizedData);
      
      if (authResult.success && authResult.user) {
        return createResponse(true, authResult.message, {
          user: {
            uid: authResult.user.uid,
            email: authResult.user.email,
            displayName: authResult.user.displayName,
            emailVerified: authResult.user.emailVerified
          }
        });
      }
      
      return createResponse(false, authResult.message, null, authResult.error);
    } catch (error: any) {
      return createResponse(false, 'Signin failed', null, error.message);
    }
  }
  
  // POST /api/auth/signout
  static async signout(): Promise<ApiResponse> {
    try {
      const authResult = await signOutUser();
      return createResponse(authResult.success, authResult.message, null, authResult.error);
    } catch (error: any) {
      return createResponse(false, 'Signout failed', null, error.message);
    }
  }
  
  // POST /api/auth/reset-password
  static async resetPassword(requestData: any): Promise<ApiResponse> {
    try {
      // Rate limiting
      const rateLimitResult = rateLimit(requestData.ip || 'unknown');
      if (!rateLimitResult.success) {
        return createResponse(false, rateLimitResult.message);
      }
      
      // Validate required fields
      const validation = validateRequest(['email'], requestData);
      if (!validation.success) {
        return createResponse(false, validation.message);
      }
      
      // Validate email format
      if (!validateEmail(requestData.email)) {
        return createResponse(false, 'Invalid email format');
      }
      
      const authResult = await resetPassword(requestData.email);
      return createResponse(authResult.success, authResult.message, null, authResult.error);
    } catch (error: any) {
      return createResponse(false, 'Password reset failed', null, error.message);
    }
  }
  
  // GET /api/auth/me
  static async getCurrentUserProfile(): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success || !authResult.user) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Get user profile from Firestore
      const userProfile = await UserService.getUserProfile(authResult.user.uid);
      
      return createResponse(true, 'User profile retrieved successfully', {
        user: {
          uid: authResult.user.uid,
          email: authResult.user.email,
          displayName: authResult.user.displayName,
          emailVerified: authResult.user.emailVerified,
          profile: userProfile.success ? userProfile.data : null
        }
      });
    } catch (error: any) {
      return createResponse(false, 'Failed to get user profile', null, error.message);
    }
  }
}

// Booking Routes
export class BookingRoutes {
  
  // POST /api/bookings
  static async createBooking(requestData: any): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success || !authResult.user) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Validate required fields
      const validation = validateRequest(
        ['vehicleId', 'startDate', 'endDate', 'customerInfo'],
        requestData
      );
      if (!validation.success) {
        return createResponse(false, validation.message);
      }
      
      // Sanitize input
      const sanitizedData = sanitizeInput(requestData);
      
      // Add user ID to booking data
      const bookingData = {
        ...sanitizedData,
        userId: authResult.user.uid,
        status: 'pending',
        bookingDate: new Date().toISOString()
      };
      
      const result = await BookingService.createBooking(bookingData);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to create booking', null, error.message);
    }
  }
  
  // GET /api/bookings
  static async getUserBookings(): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success || !authResult.user) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      const result = await BookingService.getUserBookings(authResult.user.uid);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to get user bookings', null, error.message);
    }
  }
  
  // GET /api/bookings/:id
  static async getBookingById(bookingId: string): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success || !authResult.user) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      const result = await BookingService.getBookingById(bookingId);
      
      // Check if user owns this booking or is admin
      if (result.success && result.data && result.data.userId !== authResult.user.uid) {
        const adminCheck = await requireAdmin();
        if (!adminCheck.success) {
          return createResponse(false, 'Access denied. You can only view your own bookings.');
        }
      }
      
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to get booking', null, error.message);
    }
  }
  
  // PUT /api/bookings/:id
  static async updateBooking(bookingId: string, requestData: any): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success || !authResult.user) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Get existing booking to check ownership
      const existingBooking = await BookingService.getBookingById(bookingId);
      if (!existingBooking.success) {
        return createResponse(false, 'Booking not found');
      }
      
      // Check if user owns this booking or is admin
      if (existingBooking.data.userId !== authResult.user.uid) {
        const adminCheck = await requireAdmin();
        if (!adminCheck.success) {
          return createResponse(false, 'Access denied. You can only update your own bookings.');
        }
      }
      
      // Sanitize input
      const sanitizedData = sanitizeInput(requestData);
      
      const result = await BookingService.updateBooking(bookingId, sanitizedData);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to update booking', null, error.message);
    }
  }
  
  // DELETE /api/bookings/:id
  static async deleteBooking(bookingId: string): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success || !authResult.user) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Get existing booking to check ownership
      const existingBooking = await BookingService.getBookingById(bookingId);
      if (!existingBooking.success) {
        return createResponse(false, 'Booking not found');
      }
      
      // Check if user owns this booking or is admin
      if (existingBooking.data.userId !== authResult.user.uid) {
        const adminCheck = await requireAdmin();
        if (!adminCheck.success) {
          return createResponse(false, 'Access denied. You can only delete your own bookings.');
        }
      }
      
      const result = await BookingService.deleteBooking(bookingId);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to delete booking', null, error.message);
    }
  }
}

// Vehicle Routes
export class VehicleRoutes {
  
  // GET /api/vehicles
  static async getAllVehicles(): Promise<ApiResponse> {
    try {
      const result = await VehicleService.getAllVehicles();
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to get vehicles', null, error.message);
    }
  }
  
  // GET /api/vehicles/:id
  static async getVehicleById(vehicleId: string): Promise<ApiResponse> {
    try {
      const result = await VehicleService.getVehicleById(vehicleId);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to get vehicle', null, error.message);
    }
  }
  
  // GET /api/vehicles/type/:type
  static async getVehiclesByType(vehicleType: string): Promise<ApiResponse> {
    try {
      const result = await VehicleService.getVehiclesByType(vehicleType);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to get vehicles by type', null, error.message);
    }
  }
  
  // POST /api/vehicles (Admin only)
  static async createVehicle(requestData: any): Promise<ApiResponse> {
    try {
      const authResult = await requireAdmin();
      if (!authResult.success) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Validate required fields
      const validation = validateRequest(
        ['name', 'type', 'pricePerDay', 'capacity'],
        requestData
      );
      if (!validation.success) {
        return createResponse(false, validation.message);
      }
      
      // Sanitize input
      const sanitizedData = sanitizeInput(requestData);
      
      const result = await VehicleService.createVehicle(sanitizedData);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to create vehicle', null, error.message);
    }
  }
  
  // PUT /api/vehicles/:id (Admin only)
  static async updateVehicle(vehicleId: string, requestData: any): Promise<ApiResponse> {
    try {
      const authResult = await requireAdmin();
      if (!authResult.success) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Sanitize input
      const sanitizedData = sanitizeInput(requestData);
      
      const result = await VehicleService.updateVehicle(vehicleId, sanitizedData);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to update vehicle', null, error.message);
    }
  }
  
  // DELETE /api/vehicles/:id (Admin only)
  static async deleteVehicle(vehicleId: string): Promise<ApiResponse> {
    try {
      const authResult = await requireAdmin();
      if (!authResult.success) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      const result = await VehicleService.deleteVehicle(vehicleId);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to delete vehicle', null, error.message);
    }
  }
}

// File Upload Routes
export class UploadRoutes {
  
  // POST /api/upload/image
  static async uploadImage(file: File, category: string = 'general'): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return createResponse(false, 'Only image files are allowed');
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        return createResponse(false, 'File size must be less than 5MB');
      }
      
      const result = await ImageStorageService.uploadImage(file, category);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to upload image', null, error.message);
    }
  }
  
  // POST /api/upload/document
  static async uploadDocument(file: File, category: string = 'general'): Promise<ApiResponse> {
    try {
      const authResult = await requireAuth();
      if (!authResult.success) {
        return createResponse(false, authResult.message, null, authResult.error);
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        return createResponse(false, 'File size must be less than 10MB');
      }
      
      const result = await DocumentStorageService.uploadDocument(file, category);
      return createResponse(result.success, result.message, result.data, result.error);
    } catch (error: any) {
      return createResponse(false, 'Failed to upload document', null, error.message);
    }
  }
}

// Export all route classes
export { corsHeaders };