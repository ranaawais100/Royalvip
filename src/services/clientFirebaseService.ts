import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from '../backend/config/firebase';

interface QueryOptions {
  orderByField?: string;
  orderByDirection?: 'asc' | 'desc';
  limitCount?: number;
  whereConditions?: Array<{
    field: string;
    operator: any;
    value: any;
  }>;
}

class ClientFirebaseService {
  private db = db;

  // Add a document to a collection
  async addDocument(collectionName: string, data: any): Promise<{ id: string; [key: string]: any }> {
    try {
      console.log(`🔥 ClientFirebaseService: Adding document to ${collectionName}`);
      const docRef = await addDoc(collection(this.db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log(`✅ ClientFirebaseService: Document added with ID: ${docRef.id}`);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error(`❌ Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }

  // Get documents from a collection
  async getDocuments(collectionName: string, options: QueryOptions = {}): Promise<any[]> {
    try {
      console.log(`🔥 ClientFirebaseService: Getting documents from ${collectionName}`);
      
      const collectionRef = collection(this.db, collectionName);
      let queryRef: any = collectionRef;

      // Apply where conditions
      if (options.whereConditions) {
        for (const condition of options.whereConditions) {
          queryRef = query(queryRef, where(condition.field, condition.operator, condition.value));
        }
      }

      // Apply ordering
      if (options.orderByField) {
        queryRef = query(queryRef, orderBy(options.orderByField, options.orderByDirection || 'asc'));
      }

      // Apply limit
      if (options.limitCount) {
        queryRef = query(queryRef, limit(options.limitCount));
      }

      const querySnapshot = await getDocs(queryRef);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamps to ISO strings
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
        publishDate: doc.data().publishDate?.toDate?.()?.toISOString()?.split('T')[0] || doc.data().publishDate
      }));
      
      console.log(`✅ ClientFirebaseService: Retrieved ${documents.length} documents from ${collectionName}`);
      return documents;
    } catch (error) {
      console.error(`❌ Error getting documents from ${collectionName}:`, error);
      throw error;
    }
  }

  // Get a single document by ID
  async getDocument(collectionName: string, docId: string): Promise<any | null> {
    try {
      console.log(`🔥 ClientFirebaseService: Getting document ${docId} from ${collectionName}`);
      const docRef = doc(this.db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = {
          id: docSnap.id,
          ...docSnap.data(),
          // Convert Firestore timestamps to ISO strings
          createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || docSnap.data().createdAt,
          updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString() || docSnap.data().updatedAt,
          publishDate: docSnap.data().publishDate?.toDate?.()?.toISOString()?.split('T')[0] || docSnap.data().publishDate
        };
        console.log(`✅ ClientFirebaseService: Document found`);
        return data;
      } else {
        console.log(`ℹ️ ClientFirebaseService: Document not found`);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error getting document ${docId} from ${collectionName}:`, error);
      throw error;
    }
  }

  // Update a document
  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    try {
      console.log(`🔥 ClientFirebaseService: Updating document ${docId} in ${collectionName}`);
      const docRef = doc(this.db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
      console.log(`✅ ClientFirebaseService: Document updated successfully`);
    } catch (error) {
      console.error(`❌ Error updating document ${docId} in ${collectionName}:`, error);
      throw error;
    }
  }

  // Delete a document
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      console.log(`🔥 ClientFirebaseService: Deleting document ${docId} from ${collectionName}`);
      const docRef = doc(this.db, collectionName, docId);
      await deleteDoc(docRef);
      console.log(`✅ ClientFirebaseService: Document deleted successfully`);
    } catch (error) {
      console.error(`❌ Error deleting document ${docId} from ${collectionName}:`, error);
      throw error;
    }
  }
}

const clientFirebaseService = new ClientFirebaseService();
export default clientFirebaseService;