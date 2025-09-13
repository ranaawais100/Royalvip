// Firebase Admin Setup Script
// Run this script to create admin users in Firebase Authentication

// Note: This script should be run in a Node.js environment with Firebase Admin SDK
// For now, we'll create a simpler approach using the web SDK

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

// Firebase configuration (same as in firebase-client.js)
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
const auth = getAuth(app);
const db = getFirestore(app);

const adminUsers = [
  {
    email: 'admin@gmail.com',
    password: 'admin123', // Change this to a secure password
    role: 'admin'
  },
  {
    email: 'admin@royalviplimos.com',
    password: 'admin123', // Change this to a secure password
    role: 'admin'
  }
];

async function setupAdminUsers() {
  console.log('Setting up Firebase admin users...');
  
  for (const adminUser of adminUsers) {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        adminUser.email, 
        adminUser.password
      );
      
      console.log(`✅ Created admin user: ${adminUser.email}`);
      
      // Store admin role in Firestore
      await setDoc(doc(db, 'admins', adminUser.email), {
        email: adminUser.email,
        role: adminUser.role,
        createdAt: Timestamp.fromDate(new Date()),
        lastLogin: null
      });
      
      console.log(`✅ Added admin role for: ${adminUser.email}`);
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  User already exists: ${adminUser.email}`);
        
        // Still create/update the admin role document
        try {
          await setDoc(doc(db, 'admins', adminUser.email), {
            email: adminUser.email,
            role: adminUser.role,
            createdAt: Timestamp.fromDate(new Date()),
            lastLogin: null
          });
          console.log(`✅ Updated admin role for: ${adminUser.email}`);
        } catch (roleError) {
          console.error(`❌ Failed to set admin role for ${adminUser.email}:`, roleError.message);
        }
      } else {
        console.error(`❌ Failed to create admin user ${adminUser.email}:`, error.message);
      }
    }
  }
  
  console.log('\n🎉 Firebase admin setup completed!');
  console.log('\nAdmin users can now log in with:');
  adminUsers.forEach(user => {
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔑 Password: ${user.password}`);
    console.log('---');
  });
  
  process.exit(0);
}

// Run the setup
setupAdminUsers().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});