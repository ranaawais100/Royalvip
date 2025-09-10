// Authentication Middleware
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getCurrentUser, isAuthenticated } from '../services/authService';

export interface AuthRequest extends Request {
  user?: User;
  userId?: string;
}

export interface MiddlewareResponse {
  success: boolean;
  message: string;
  user?: User;
  error?: string;
}

// Authentication middleware for protecting routes
export const requireAuth = async (): Promise<MiddlewareResponse> => {
  try {
    if (!isAuthenticated()) {
      return {
        success: false,
        message: 'Authentication required. Please log in to access this resource.'
      };
    }
    
    const user = getCurrentUser();
    
    if (!user) {
      return {
        success: false,
        message: 'Invalid authentication token. Please log in again.'
      };
    }
    
    // Check if email is verified (optional, can be enabled/disabled)
    if (!user.emailVerified) {
      return {
        success: false,
        message: 'Email verification required. Please verify your email to access this resource.'
      };
    }
    
    return {
      success: true,
      message: 'Authentication successful',
      user
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Authentication failed',
      error: error.message
    };
  }
};

// Optional authentication middleware (doesn't require auth but adds user if available)
export const optionalAuth = async (): Promise<MiddlewareResponse> => {
  try {
    const user = getCurrentUser();
    
    return {
      success: true,
      message: user ? 'User authenticated' : 'No authentication provided',
      user: user || undefined
    };
  } catch (error: any) {
    return {
      success: true,
      message: 'No authentication provided'
    };
  }
};

// Admin role middleware (requires additional role checking)
export const requireAdmin = async (): Promise<MiddlewareResponse> => {
  try {
    const authResult = await requireAuth();
    
    if (!authResult.success || !authResult.user) {
      return authResult;
    }
    
    // Get user's custom claims to check for admin role
    const idTokenResult = await authResult.user.getIdTokenResult();
    const isAdmin = idTokenResult.claims.admin === true;
    
    if (!isAdmin) {
      return {
        success: false,
        message: 'Admin privileges required. Access denied.'
      };
    }
    
    return {
      success: true,
      message: 'Admin authentication successful',
      user: authResult.user
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Admin authentication failed',
      error: error.message
    };
  }
};

// Rate limiting middleware (basic implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Max requests per window

export const rateLimit = (identifier: string): MiddlewareResponse => {
  try {
    const now = Date.now();
    const userRequests = requestCounts.get(identifier);
    
    if (!userRequests || now > userRequests.resetTime) {
      // First request or window expired, reset counter
      requestCounts.set(identifier, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      });
      
      return {
        success: true,
        message: 'Request allowed'
      };
    }
    
    if (userRequests.count >= MAX_REQUESTS) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later.'
      };
    }
    
    // Increment counter
    userRequests.count++;
    requestCounts.set(identifier, userRequests);
    
    return {
      success: true,
      message: 'Request allowed'
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Rate limiting error',
      error: error.message
    };
  }
};

// CORS middleware for handling cross-origin requests
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400'
};

// Validation middleware for request data
export const validateRequest = (requiredFields: string[], data: any): MiddlewareResponse => {
  try {
    const missingFields = requiredFields.filter(field => {
      return !data || data[field] === undefined || data[field] === null || data[field] === '';
    });
    
    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      };
    }
    
    return {
      success: true,
      message: 'Validation successful'
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Validation error',
      error: error.message
    };
  }
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  return { valid: true, message: 'Password is valid' };
};

// Sanitize input data
export const sanitizeInput = (data: any): any => {
  if (typeof data === 'string') {
    return data.trim().replace(/<script[^>]*>.*?<\/script>/gi, '');
  }
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeInput(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        sanitized[key] = sanitizeInput(data[key]);
      }
    }
    return sanitized;
  }
  
  return data;
};