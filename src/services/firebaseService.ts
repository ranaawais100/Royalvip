import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { auth, db } from '../backend/config/firebase';
import { mockBookings } from '../data/mockBookings';

// Types
export interface BookingData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  passengers: number;
  date?: string;
  time?: string;
  pickupLocation?: string;
  dropLocation?: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  email: string;
  role: 'admin';
  lastLogin?: Date;
}

class FirebaseService {
  // Authentication Methods
  async signInAdmin(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error('Admin sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  async signOutAdmin(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error('Failed to sign out');
    }
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Booking Methods
  async createBooking(bookingData: Omit<BookingData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const booking: Omit<BookingData, 'id'> = {
        ...bookingData,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(db, 'bookings'), {
        ...booking,
        createdAt: Timestamp.fromDate(booking.createdAt),
        updatedAt: Timestamp.fromDate(booking.updatedAt)
      });

      console.log('Booking created with ID:', docRef.id);
      return docRef.id;
    } catch (error: any) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }

  async getBookings(statusFilter?: string): Promise<BookingData[]> {
    try {
      let q = query(
        collection(db, 'bookings'),
        orderBy('createdAt', 'desc')
      );

      if (statusFilter) {
        q = query(
          collection(db, 'bookings'),
          where('status', '==', statusFilter),
          orderBy('createdAt', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const bookings: BookingData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Handle different timestamp formats
        const createdAt = data.createdAt 
          ? (typeof data.createdAt.toDate === 'function' 
              ? data.createdAt.toDate() 
              : data.createdAt instanceof Date 
                ? data.createdAt 
                : new Date(data.createdAt))
          : new Date();
          
        const updatedAt = data.updatedAt 
          ? (typeof data.updatedAt.toDate === 'function' 
              ? data.updatedAt.toDate() 
              : data.updatedAt instanceof Date 
                ? data.updatedAt 
                : new Date(data.updatedAt))
          : new Date();
        
        bookings.push({
          id: doc.id,
          ...data,
          createdAt,
          updatedAt
        } as BookingData);
      });

      return bookings;
    } catch (error: any) {
      console.error('Error fetching bookings from Firebase, falling back to mock data:', error);
      
      // Return mock data when Firebase connection fails
      let filteredBookings = mockBookings;
      
      if (statusFilter) {
        filteredBookings = mockBookings.filter(booking => booking.status === statusFilter);
      }
      
      return filteredBookings;
    }
  }

  async getBookingById(id: string): Promise<BookingData | null> {
    try {
      const docRef = doc(db, 'bookings', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as BookingData;
      }

      return null;
    } catch (error: any) {
      console.error('Error fetching booking:', error);
      throw new Error('Failed to fetch booking');
    }
  }

  async updateBookingStatus(id: string, status: BookingData['status']): Promise<void> {
    try {
      const docRef = doc(db, 'bookings', id);
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.fromDate(new Date())
      });
      console.log('Booking status updated:', id, status);
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      throw new Error('Failed to update booking status');
    }
  }

  async deleteBooking(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'bookings', id);
      await deleteDoc(docRef);
      console.log('Booking deleted:', id);
    } catch (error: any) {
      console.error('Error deleting booking:', error);
      throw new Error('Failed to delete booking');
    }
  }

  // Admin Methods
  async isUserAdmin(email: string): Promise<boolean> {
    try {
      const adminRef = doc(db, 'admins', email);
      const adminDoc = await getDoc(adminRef);
      
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        return adminData.role === 'admin';
      }
      
      return false;
    } catch (error: any) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  async updateAdminLastLogin(email: string): Promise<void> {
    try {
      const adminRef = doc(db, 'admins', email);
      await updateDoc(adminRef, {
        lastLogin: Timestamp.fromDate(new Date())
      });
    } catch (error: any) {
      console.error('Error updating admin last login:', error);
      // Don't throw error as this is not critical
    }
  }

  async createAdminUser(email: string, role: string = 'admin'): Promise<void> {
    try {
      await setDoc(doc(db, 'admins', email), {
        email,
        role,
        createdAt: Timestamp.fromDate(new Date()),
        lastLogin: null
      });
      console.log('Admin user created:', email);
    } catch (error: any) {
      console.error('Error creating admin user:', error);
      throw new Error('Failed to create admin user');
    }
  }
}

// Export singleton instance
export const firebaseService = new FirebaseService();
export default firebaseService;