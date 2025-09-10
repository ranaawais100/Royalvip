// Firestore Database Service
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface DatabaseResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface QueryOptions {
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitCount?: number;
  startAfterDoc?: QueryDocumentSnapshot<DocumentData>;
  whereConditions?: Array<{
    field: string;
    operator: any;
    value: any;
  }>;
}

// Generic CRUD Operations
export class DatabaseService {
  
  // Create a new document
  static async create(collectionName: string, data: any): Promise<DatabaseResponse> {
    try {
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, collectionName), docData);
      
      return {
        success: true,
        message: 'Document created successfully',
        data: { id: docRef.id, ...docData }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to create document',
        error: error.message
      };
    }
  }
  
  // Read a single document by ID
  static async getById(collectionName: string, docId: string): Promise<DatabaseResponse> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          success: true,
          message: 'Document retrieved successfully',
          data: { id: docSnap.id, ...docSnap.data() }
        };
      } else {
        return {
          success: false,
          message: 'Document not found'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to retrieve document',
        error: error.message
      };
    }
  }
  
  // Read multiple documents with query options
  static async getAll(collectionName: string, options?: QueryOptions): Promise<DatabaseResponse> {
    try {
      let q = collection(db, collectionName);
      
      // Apply where conditions
      if (options?.whereConditions) {
        options.whereConditions.forEach(condition => {
          q = query(q, where(condition.field, condition.operator, condition.value)) as any;
        });
      }
      
      // Apply ordering
      if (options?.orderByField) {
        q = query(q, orderBy(options.orderByField, options.orderDirection || 'asc')) as any;
      }
      
      // Apply limit
      if (options?.limitCount) {
        q = query(q, limit(options.limitCount)) as any;
      }
      
      // Apply pagination
      if (options?.startAfterDoc) {
        q = query(q, startAfter(options.startAfterDoc)) as any;
      }
      
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return {
        success: true,
        message: 'Documents retrieved successfully',
        data: documents
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to retrieve documents',
        error: error.message
      };
    }
  }
  
  // Update a document
  static async update(collectionName: string, docId: string, data: any): Promise<DatabaseResponse> {
    try {
      const docRef = doc(db, collectionName, docId);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(docRef, updateData);
      
      return {
        success: true,
        message: 'Document updated successfully',
        data: { id: docId, ...updateData }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to update document',
        error: error.message
      };
    }
  }
  
  // Delete a document
  static async delete(collectionName: string, docId: string): Promise<DatabaseResponse> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      
      return {
        success: true,
        message: 'Document deleted successfully'
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to delete document',
        error: error.message
      };
    }
  }
}

// Specific collection services
export class BookingService extends DatabaseService {
  private static collectionName = 'bookings';
  
  static async createBooking(bookingData: any) {
    return await this.create(this.collectionName, bookingData);
  }
  
  static async getBookingById(id: string) {
    return await this.getById(this.collectionName, id);
  }
  
  static async getUserBookings(userId: string) {
    return await this.getAll(this.collectionName, {
      whereConditions: [{ field: 'userId', operator: '==', value: userId }],
      orderByField: 'createdAt',
      orderDirection: 'desc'
    });
  }
  
  static async updateBooking(id: string, data: any) {
    return await this.update(this.collectionName, id, data);
  }
  
  static async deleteBooking(id: string) {
    return await this.delete(this.collectionName, id);
  }
}

export class VehicleService extends DatabaseService {
  private static collectionName = 'vehicles';
  
  static async createVehicle(vehicleData: any) {
    return await this.create(this.collectionName, vehicleData);
  }
  
  static async getVehicleById(id: string) {
    return await this.getById(this.collectionName, id);
  }
  
  static async getAllVehicles() {
    return await this.getAll(this.collectionName, {
      orderByField: 'name',
      orderDirection: 'asc'
    });
  }
  
  static async getVehiclesByType(type: string) {
    return await this.getAll(this.collectionName, {
      whereConditions: [{ field: 'type', operator: '==', value: type }]
    });
  }
  
  static async updateVehicle(id: string, data: any) {
    return await this.update(this.collectionName, id, data);
  }
  
  static async deleteVehicle(id: string) {
    return await this.delete(this.collectionName, id);
  }
}

export class UserService extends DatabaseService {
  private static collectionName = 'users';
  
  static async createUserProfile(userData: any) {
    return await this.create(this.collectionName, userData);
  }
  
  static async getUserProfile(userId: string) {
    return await this.getById(this.collectionName, userId);
  }
  
  static async updateUserProfile(userId: string, data: any) {
    return await this.update(this.collectionName, userId, data);
  }
  
  static async deleteUserProfile(userId: string) {
    return await this.delete(this.collectionName, userId);
  }
}