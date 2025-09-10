// Firebase Authentication Service
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  error?: string;
}

// Sign up new user
export const signUpUser = async (userData: SignUpData): Promise<AuthResponse> => {
  try {
    const { email, password, firstName, lastName } = userData;
    
    // Create user with email and password
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    // Update user profile with display name
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Send email verification
    await sendEmailVerification(userCredential.user);
    
    return {
      success: true,
      message: 'User created successfully. Please verify your email.',
      user: userCredential.user
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to create user',
      error: error.message
    };
  }
};

// Sign in existing user
export const signInUser = async (userData: SignInData): Promise<AuthResponse> => {
  try {
    const { email, password } = userData;
    
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    return {
      success: true,
      message: 'User signed in successfully',
      user: userCredential.user
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to sign in',
      error: error.message
    };
  }
};

// Sign out user
export const signOutUser = async (): Promise<AuthResponse> => {
  try {
    await signOut(auth);
    
    return {
      success: true,
      message: 'User signed out successfully'
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to sign out',
      error: error.message
    };
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    await sendPasswordResetEmail(auth, email);
    
    return {
      success: true,
      message: 'Password reset email sent successfully'
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to send password reset email',
      error: error.message
    };
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};