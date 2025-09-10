// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfZyBPM-3Rl5YRIrdH-l98mP78AC_7UNw",
  authDomain: "royalviplimo-522f7.firebaseapp.com",
  projectId: "royalviplimo-522f7",
  storageBucket: "royalviplimo-522f7.firebasestorage.app",
  messagingSenderId: "480787783504",
  appId: "1:480787783504:web:4fb4a47ed7eef4a28f9655",
  measurementId: "G-Q4NF3YF001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
export const analytics = typeof window !== 'undefined' && isSupported() ? getAnalytics(app) : null;

export default app;