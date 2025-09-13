// Mock booking data for testing when Firebase is not available
import { BookingData } from '../services/firebaseService';

export const mockBookings: BookingData[] = [
  {
    id: 'booking-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971501234567',
    vehicleType: 'luxury-sedan',
    passengers: 2,
    date: '2024-01-15',
    time: '14:00',
    pickupLocation: 'Dubai Mall',
    dropoffLocation: 'Dubai Airport',
    status: 'pending',
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-10T10:00:00Z')
  },
  {
    id: 'booking-2',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '+971509876543',
    vehicleType: 'limousine',
    passengers: 4,
    date: '2024-01-16',
    time: '18:00',
    pickupLocation: 'Burj Khalifa',
    dropoffLocation: 'Marina Mall',
    status: 'confirmed',
    createdAt: new Date('2024-01-11T15:30:00Z'),
    updatedAt: new Date('2024-01-11T16:00:00Z')
  },
  {
    id: 'booking-3',
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.rashid@example.com',
    phone: '+971502345678',
    vehicleType: 'suv',
    passengers: 6,
    date: '2024-01-17',
    time: '09:00',
    pickupLocation: 'Dubai International Airport',
    dropoffLocation: 'Atlantis The Palm',
    status: 'completed',
    createdAt: new Date('2024-01-12T08:00:00Z'),
    updatedAt: new Date('2024-01-12T09:00:00Z')
  }
];