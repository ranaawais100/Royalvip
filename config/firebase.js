import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Firebase configuration for client SDK (for reference)
const firebaseConfig = {
  apiKey: "AIzaSyBfZyBPM-3Rl5YRIrdH-l98mP78AC_7UNw",
  authDomain: "royalviplimo-522f7.firebaseapp.com",
  projectId: "royalviplimo-522f7",
  storageBucket: "royalviplimo-522f7.firebasestorage.app",
  messagingSenderId: "480787783504",
  appId: "1:480787783504:web:4fb4a47ed7eef4a28f9655",
  measurementId: "G-Q4NF3YF001"
};

// Initialize Firebase Admin SDK
let adminApp = null;
let db = null;
let auth = null;
let storage = null;

try {
  // For production, use service account key
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY && !process.env.FIREBASE_SERVICE_ACCOUNT_KEY.includes('demo_key_id')) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket
    });
    
    db = admin.firestore();
    auth = admin.auth();
    storage = admin.storage();
    
    console.log('✅ Firebase Admin SDK initialized successfully');
  } else {
    // For development without service account, use client SDK approach
    console.log('ℹ️  No service account key found, using development mode');
    console.log('ℹ️  For production, set FIREBASE_SERVICE_ACCOUNT_KEY environment variable');
    
    // Create a mock database interface for development
     const createMockQuery = () => ({
       where: (field, op, value) => {
         console.log(`📝 Mock DB: Where ${field} ${op} ${value}`);
         return createMockQuery();
       },
       orderBy: (field, direction) => {
         console.log(`📝 Mock DB: OrderBy ${field} ${direction}`);
         return createMockQuery();
       },
       offset: (num) => {
         console.log(`📝 Mock DB: Offset ${num}`);
         return createMockQuery();
       },
       limit: (num) => {
         console.log(`📝 Mock DB: Limit ${num}`);
         return createMockQuery();
       },
       count: () => ({
         get: async () => {
           console.log('📝 Mock DB: Executing count query');
           return {
             data: () => ({ count: 3 }) // Mock count of 3 bookings
           };
         }
       }),
       get: async () => {
         console.log('📝 Mock DB: Executing query');
         const mockBookings = [
           { id: 'mock1', data: () => ({ name: 'John Doe', email: 'john@example.com', status: 'pending', createdAt: '2025-01-09T10:00:00Z', date: '2025-01-15' }) },
           { id: 'mock2', data: () => ({ name: 'Jane Smith', email: 'jane@example.com', status: 'confirmed', createdAt: '2025-01-09T11:00:00Z', date: '2025-01-16' }) },
           { id: 'mock3', data: () => ({ name: 'Bob Johnson', email: 'bob@example.com', status: 'completed', createdAt: '2025-01-09T12:00:00Z', date: '2025-01-17' }) }
         ];
         return {
           size: mockBookings.length,
           forEach: (callback) => mockBookings.forEach(callback)
         };
       }
     });
     
     // Mock storage for admin users
     const mockStorage = {
       admins: new Map()
     };
     
     // Initialize with default admin user
     const bcrypt = await import('bcryptjs');
     const defaultAdminHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password: 'admin123'
     mockStorage.admins.set('admin@royalviplimos.com', {
       id: 'admin@royalviplimos.com',
       email: 'admin@royalviplimos.com',
       password: defaultAdminHash,
       role: 'admin',
       createdAt: new Date().toISOString(),
       lastLogin: null
     });
     console.log('📝 Mock DB: Initialized with default admin user: admin@royalviplimos.com');

     const mockDb = {
       collection: (name) => ({
         add: async (data) => {
           const id = 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
           console.log(`📝 Mock DB: Adding to ${name}:`, { id, ...data });
           
           // Store admin users in mock storage
           if (name === 'admins') {
             mockStorage.admins.set(data.email, { id, ...data });
           }
           
           return { id, update: async (updateData) => console.log(`📝 Mock DB: Updated ${id}:`, updateData) };
         },
         doc: (id) => ({
           get: async () => {
             // Handle admin user retrieval by email
             if (name === 'admins' && mockStorage.admins.has(id)) {
               const adminData = mockStorage.admins.get(id);
               console.log(`📝 Mock DB: Retrieved admin user:`, adminData.email);
               return {
                 exists: true,
                 id: adminData.id,
                 data: () => adminData
               };
             }
             
             // Default mock data for other collections
             return {
               exists: false,
               id,
               data: () => null
             };
           },
           set: async (data) => {
             console.log(`📝 Mock DB: Setting ${name}/${id}:`, data);
             // Store admin users in mock storage
             if (name === 'admins') {
               mockStorage.admins.set(id, { id, ...data });
             }
             return { id };
           },
           update: async (data) => {
             console.log(`📝 Mock DB: Updated ${id}:`, data);
             // Update admin user in mock storage
             if (name === 'admins' && mockStorage.admins.has(id)) {
               const existing = mockStorage.admins.get(id);
               mockStorage.admins.set(id, { ...existing, ...data });
             }
           },
           delete: async () => console.log(`📝 Mock DB: Deleted ${id}`)
         }),
         ...createMockQuery()
       })
     };
    
    db = mockDb;
    console.log('✅ Mock database initialized for development');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  console.log('ℹ️  Using mock database for development');
  
  // Fallback mock database
  const mockDb = {
    collection: (name) => ({
      add: async (data) => {
        const id = 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        console.log(`📝 Mock DB: Adding to ${name}:`, { id, ...data });
        return { id, update: async (updateData) => console.log(`📝 Mock DB: Updated ${id}:`, updateData) };
      }
    })
  };
  
  db = mockDb;
}

export {
  admin,
  db,
  auth,
  storage,
  firebaseConfig,
  adminApp
};

export default {
  admin,
  db,
  auth,
  storage,
  firebaseConfig,
  adminApp
};