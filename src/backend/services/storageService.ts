// Firebase Storage Service
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata,
  UploadResult,
  UploadTask,
  StorageReference
} from 'firebase/storage';
import { storage } from '../config/firebase';

export interface StorageResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number;
}

export interface FileMetadata {
  name: string;
  size: number;
  contentType: string;
  timeCreated: string;
  updated: string;
  downloadURL?: string;
}

export class StorageService {
  
  // Upload file to Firebase Storage
  static async uploadFile(
    file: File,
    path: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<StorageResponse> {
    try {
      const storageRef = ref(storage, path);
      
      if (onProgress) {
        // Upload with progress tracking
        const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);
        
        return new Promise((resolve) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = {
                bytesTransferred: snapshot.bytesTransferred,
                totalBytes: snapshot.totalBytes,
                progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              };
              onProgress(progress);
            },
            (error) => {
              resolve({
                success: false,
                message: 'Failed to upload file',
                error: error.message
              });
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({
                  success: true,
                  message: 'File uploaded successfully',
                  data: {
                    downloadURL,
                    path,
                    name: file.name,
                    size: file.size,
                    type: file.type
                  }
                });
              } catch (error: any) {
                resolve({
                  success: false,
                  message: 'Failed to get download URL',
                  error: error.message
                });
              }
            }
          );
        });
      } else {
        // Simple upload without progress tracking
        const uploadResult: UploadResult = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadResult.ref);
        
        return {
          success: true,
          message: 'File uploaded successfully',
          data: {
            downloadURL,
            path,
            name: file.name,
            size: file.size,
            type: file.type
          }
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to upload file',
        error: error.message
      };
    }
  }
  
  // Upload multiple files
  static async uploadMultipleFiles(
    files: File[],
    basePath: string,
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<StorageResponse> {
    try {
      const uploadPromises = files.map((file, index) => {
        const filePath = `${basePath}/${Date.now()}_${file.name}`;
        return this.uploadFile(
          file,
          filePath,
          onProgress ? (progress) => onProgress(index, progress) : undefined
        );
      });
      
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(result => result.success);
      const failedUploads = results.filter(result => !result.success);
      
      return {
        success: failedUploads.length === 0,
        message: `${successfulUploads.length} files uploaded successfully${failedUploads.length > 0 ? `, ${failedUploads.length} failed` : ''}`,
        data: {
          successful: successfulUploads.map(result => result.data),
          failed: failedUploads
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to upload multiple files',
        error: error.message
      };
    }
  }
  
  // Get download URL for a file
  static async getDownloadURL(path: string): Promise<StorageResponse> {
    try {
      const storageRef = ref(storage, path);
      const downloadURL = await getDownloadURL(storageRef);
      
      return {
        success: true,
        message: 'Download URL retrieved successfully',
        data: { downloadURL, path }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to get download URL',
        error: error.message
      };
    }
  }
  
  // Delete a file
  static async deleteFile(path: string): Promise<StorageResponse> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      
      return {
        success: true,
        message: 'File deleted successfully'
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to delete file',
        error: error.message
      };
    }
  }
  
  // List all files in a directory
  static async listFiles(path: string): Promise<StorageResponse> {
    try {
      const storageRef = ref(storage, path);
      const listResult = await listAll(storageRef);
      
      const filePromises = listResult.items.map(async (itemRef) => {
        const metadata = await getMetadata(itemRef);
        const downloadURL = await getDownloadURL(itemRef);
        
        return {
          name: metadata.name,
          size: metadata.size,
          contentType: metadata.contentType,
          timeCreated: metadata.timeCreated,
          updated: metadata.updated,
          downloadURL,
          path: itemRef.fullPath
        };
      });
      
      const files = await Promise.all(filePromises);
      
      return {
        success: true,
        message: 'Files listed successfully',
        data: {
          files,
          folders: listResult.prefixes.map(prefix => prefix.name)
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to list files',
        error: error.message
      };
    }
  }
  
  // Get file metadata
  static async getFileMetadata(path: string): Promise<StorageResponse> {
    try {
      const storageRef = ref(storage, path);
      const metadata = await getMetadata(storageRef);
      
      return {
        success: true,
        message: 'File metadata retrieved successfully',
        data: {
          name: metadata.name,
          size: metadata.size,
          contentType: metadata.contentType,
          timeCreated: metadata.timeCreated,
          updated: metadata.updated,
          path
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to get file metadata',
        error: error.message
      };
    }
  }
  
  // Update file metadata
  static async updateFileMetadata(
    path: string,
    newMetadata: { [key: string]: string }
  ): Promise<StorageResponse> {
    try {
      const storageRef = ref(storage, path);
      await updateMetadata(storageRef, { customMetadata: newMetadata });
      
      return {
        success: true,
        message: 'File metadata updated successfully'
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to update file metadata',
        error: error.message
      };
    }
  }
}

// Specific storage services for different file types
export class ImageStorageService extends StorageService {
  private static basePath = 'images';
  
  static async uploadImage(file: File, category: string = 'general') {
    const path = `${this.basePath}/${category}/${Date.now()}_${file.name}`;
    return await this.uploadFile(file, path);
  }
  
  static async uploadVehicleImage(file: File, vehicleId: string) {
    const path = `${this.basePath}/vehicles/${vehicleId}/${Date.now()}_${file.name}`;
    return await this.uploadFile(file, path);
  }
  
  static async uploadUserAvatar(file: File, userId: string) {
    const path = `${this.basePath}/avatars/${userId}/${Date.now()}_${file.name}`;
    return await this.uploadFile(file, path);
  }
}

export class DocumentStorageService extends StorageService {
  private static basePath = 'documents';
  
  static async uploadDocument(file: File, category: string = 'general') {
    const path = `${this.basePath}/${category}/${Date.now()}_${file.name}`;
    return await this.uploadFile(file, path);
  }
  
  static async uploadBookingDocument(file: File, bookingId: string) {
    const path = `${this.basePath}/bookings/${bookingId}/${Date.now()}_${file.name}`;
    return await this.uploadFile(file, path);
  }
}