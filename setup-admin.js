import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration (using the same config as your app)
const firebaseConfig = {
  apiKey: "AIzaSyBfZyBPM-3Rl5YRIrdH-l98mP78AC_7UNw",
  authDomain: "royalviplimo-522f7.firebaseapp.com",
  projectId: "royalviplimo-522f7",
  storageBucket: "royalviplimo-522f7.firebasestorage.app",
  messagingSenderId: "480787783504",
  appId: "1:480787783504:web:4fb4a47ed7eef4a28f9655"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Admin user details
const ADMIN_EMAIL = 'inforoyalviplimo@gmail.com';
const ADMIN_PASSWORD = 'AdminPassword123!'; // Change this to a secure password

async function setupAdmin() {
  try {
    console.log('🔧 Setting up admin user...');
    
    // Create admin user in Firebase Authentication
    console.log('Creating admin user in Firebase Auth...');
    const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Admin user created in Firebase Auth:', userCredential.user.uid);
    
    // Create admin document in Firestore
    console.log('Creating/updating admin document in Firestore...');
    const adminDocRef = doc(db, 'admins', userCredential.user.uid);
    
    // Check if document exists first
    const adminDocSnap = await getDoc(adminDocRef);
    
    if (adminDocSnap.exists()) {
      console.log('ℹ️  Admin document already exists, updating...');
      await updateDoc(adminDocRef, {
        lastUpdated: Timestamp.fromDate(new Date())
      });
    } else {
      console.log('📝 Creating new admin document...');
      await setDoc(adminDocRef, {
        email: ADMIN_EMAIL,
        role: 'admin',
        createdAt: Timestamp.fromDate(new Date()),
        lastLogin: null,
        lastUpdated: Timestamp.fromDate(new Date()),
        uid: userCredential.user.uid
      });
    }
    
    // Verify the document was created
    const verifyDoc = await getDoc(adminDocRef);
    if (verifyDoc.exists()) {
      console.log('✅ Admin document verified in Firestore');
      console.log('📄 Document data:', verifyDoc.data());
    } else {
      console.log('❌ Failed to create admin document');
      return;
    }
    console.log('\n🎉 Admin setup complete!');
    console.log('\n📧 Admin Email:', ADMIN_EMAIL);
    console.log('🔑 Admin Password:', ADMIN_PASSWORD);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('\n🚀 You can now login to the admin dashboard at: http://localhost:8081/admin/login');
    
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('⚠️  Admin user already exists in Firebase Auth');
      console.log('Creating/updating admin document in Firestore...');
      
      try {
        // Try to get existing user UID or use email as fallback
        const adminDocRef = doc(db, 'admins', ADMIN_EMAIL);
        await setDoc(adminDocRef, {
          email: ADMIN_EMAIL,
          role: 'admin',
          createdAt: Timestamp.fromDate(new Date()),
          lastLogin: null,
          lastUpdated: Timestamp.fromDate(new Date())
        });
        
        // Verify the document was created
        const verifyDoc = await getDoc(adminDocRef);
        if (verifyDoc.exists()) {
          console.log('📄 Document data:', verifyDoc.data());
        }
        console.log('✅ Admin document updated in Firestore');
        console.log('\n🎉 Admin setup complete!');
        console.log('\n📧 Admin Email:', ADMIN_EMAIL);
        console.log('🔑 Use your existing password to login');
      } catch (firestoreError) {
        console.error('❌ Error creating admin document:', firestoreError);
      }
    } else {
      console.error('❌ Error setting up admin:', error);
      console.log('\n🔍 Troubleshooting:');
      console.log('1. Make sure Firebase configuration is correct');
      console.log('2. Check if Firebase Authentication is enabled');
      console.log('3. Verify Firestore rules allow admin creation');
    }
  }
}

// Run the setup
setupAdmin().then(() => {
  console.log('\n✨ Setup script completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});