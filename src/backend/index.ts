// Main Backend Entry Point
// Firebase Backend Integration for Royal VIP Limo

// Firebase Configuration
export { default as firebaseApp, auth, db, storage, analytics } from './config/firebase';

// Authentication Services
export {
  signUpUser,
  signInUser,
  signOutUser,
  resetPassword,
  getCurrentUser,
  isAuthenticated,
  type SignUpData,
  type SignInData,
  type AuthResponse
} from './services/authService';

// Database Services
export {
  DatabaseService,
  BookingService,
  VehicleService,
  UserService,
  type DatabaseResponse,
  type QueryOptions
} from './services/databaseService';

// Storage Services
export {
  StorageService,
  ImageStorageService,
  DocumentStorageService,
  type StorageResponse,
  type UploadProgress,
  type FileMetadata
} from './services/storageService';

// Middleware
export {
  requireAuth,
  optionalAuth,
  requireAdmin,
  rateLimit,
  corsHeaders,
  validateRequest,
  validateEmail,
  validatePassword,
  sanitizeInput,
  type AuthRequest,
  type MiddlewareResponse
} from './middleware/authMiddleware';

// API Routes
export {
  AuthRoutes,
  BookingRoutes,
  VehicleRoutes,
  UploadRoutes,
  type ApiResponse
} from './api/routes';

// Backend Initialization and Setup
export class BackendService {
  private static initialized = false;
  
  /**
   * Initialize the backend services
   * Call this once when your application starts
   */
  static async initialize(): Promise<{ success: boolean; message: string }> {
    try {
      if (this.initialized) {
        return {
          success: true,
          message: 'Backend already initialized'
        };
      }
      
      // Firebase is automatically initialized when imported
      // Additional setup can be added here if needed
      
      this.initialized = true;
      
      return {
        success: true,
        message: 'Backend initialized successfully'
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Backend initialization failed: ${error.message}`
      };
    }
  }
  
  /**
   * Check if backend is properly initialized
   */
  static isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * Get backend status and health check
   */
  static async getStatus(): Promise<{
    success: boolean;
    message: string;
    services: {
      firebase: boolean;
      auth: boolean;
      firestore: boolean;
      storage: boolean;
    };
  }> {
    try {
      const services = {
        firebase: true, // Firebase app is initialized
        auth: !!auth,
        firestore: !!db,
        storage: !!storage
      };
      
      const allServicesReady = Object.values(services).every(service => service);
      
      return {
        success: allServicesReady,
        message: allServicesReady ? 'All services are ready' : 'Some services are not available',
        services
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Status check failed: ${error.message}`,
        services: {
          firebase: false,
          auth: false,
          firestore: false,
          storage: false
        }
      };
    }
  }
}

// Quick Setup Guide (for developers)
/*

## Firebase Backend Setup Guide

### 1. Installation
The Firebase SDK is already installed. If you need to reinstall:
```bash
npm install firebase
```

### 2. Basic Usage

```typescript
import { BackendService, AuthRoutes, BookingRoutes } from './src/backend';

// Initialize backend
const initResult = await BackendService.initialize();
if (initResult.success) {
  console.log('Backend ready!');
}

// Example: User signup
const signupResult = await AuthRoutes.signup({
  email: 'user@example.com',
  password: 'SecurePass123',
  firstName: 'John',
  lastName: 'Doe'
});

// Example: Create booking
const bookingResult = await BookingRoutes.createBooking({
  vehicleId: 'vehicle123',
  startDate: '2024-01-15',
  endDate: '2024-01-20',
  customerInfo: {
    name: 'John Doe',
    phone: '+1234567890'
  }
});
```

### 3. Available Services

#### Authentication
- User signup, signin, signout
- Password reset
- Email verification
- Role-based access control

#### Database (Firestore)
- CRUD operations for bookings, vehicles, users
- Real-time data synchronization
- Advanced querying and filtering
- Automatic timestamps

#### Storage
- File upload (images, documents)
- Progress tracking
- Metadata management
- Organized folder structure

#### Security
- Authentication middleware
- Rate limiting
- Input validation and sanitization
- CORS handling

### 4. API Endpoints Structure

#### Authentication
- POST /api/auth/signup
- POST /api/auth/signin
- POST /api/auth/signout
- POST /api/auth/reset-password
- GET /api/auth/me

#### Bookings
- POST /api/bookings (create)
- GET /api/bookings (user's bookings)
- GET /api/bookings/:id (specific booking)
- PUT /api/bookings/:id (update)
- DELETE /api/bookings/:id (delete)

#### Vehicles
- GET /api/vehicles (all vehicles)
- GET /api/vehicles/:id (specific vehicle)
- GET /api/vehicles/type/:type (by type)
- POST /api/vehicles (admin only)
- PUT /api/vehicles/:id (admin only)
- DELETE /api/vehicles/:id (admin only)

#### File Upload
- POST /api/upload/image
- POST /api/upload/document

### 5. Error Handling
All API responses follow this structure:
```typescript
{
  success: boolean,
  message: string,
  data?: any,
  error?: string,
  timestamp: string
}
```

### 6. Security Features
- Firebase Authentication integration
- JWT token validation
- Role-based permissions
- Rate limiting (100 requests per 15 minutes)
- Input sanitization
- Email and password validation
- CORS protection

*/

// Default export
export default BackendService;