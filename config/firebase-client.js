import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

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
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// For development, you can connect to emulators if needed
// Uncomment these lines if you're using Firebase emulators
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectStorageEmulator(storage, 'localhost', 9199);
// }

console.log('✅ Firebase Client SDK initialized successfully');

export {
  app,
  db,
  auth,
  storage,
  firebaseConfig
};

export default {
  app,
  db,
  auth,
  storage,
  firebaseConfig
};