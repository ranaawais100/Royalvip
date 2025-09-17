import front1 from '../assets/sprinters/front.jpg';
import front1_gall1 from '../assets/sprinters/front (1).jpg';
import front1_gall2 from '../assets/sprinters/front(2).jpg';
import front1_gall3 from '../assets/sprinters/front(3).jpg';

import front2 from '../assets/sprinters/front2.jpg';
import front2_gall1 from '../assets/sprinters/front2(1).jpg';
import front2_gall2 from '../assets/sprinters/front2(2).jpg';
import front2_gall3 from '../assets/sprinters/front2(3).jpg';

import front3 from '../assets/sprinters/front3.jpg';
import front3_gall1 from '../assets/sprinters/front3(1).jpg';
import front3_gall2 from '../assets/sprinters/front3(2).jpg';
import front3_gall3 from '../assets/sprinters/front3(3).jpg';
import front3_gall4 from '../assets/sprinters/front3(4).jpg';

import front7 from '../assets/sprinters/front7.jpg';
import front7_gall1 from '../assets/sprinters/front7(1).jpg';
import front7_gall2 from '../assets/sprinters/front7(2).jpg';
import front7_gall3 from '../assets/sprinters/front7(3).jpg';
import front7_gall4 from '../assets/sprinters/front7(4).jpg';
import front7_gall5 from '../assets/sprinters/front7(5).jpg';

import front8 from '../assets/sprinters/front8.jpg';
import front8_gall1 from '../assets/sprinters/front8(1).jpg';
import front8_gall2 from '../assets/sprinters/front8(2).jpg';
import front8_gall3 from '../assets/sprinters/front8(3).jpg';
import front8_gall4 from '../assets/sprinters/front8(4).jpg';
import front8_gall5 from '../assets/sprinters/front8(5).jpg';

import front6 from '../assets/sprinters/front6.jpg';
import front6_gall1 from '../assets/sprinters/front6(1).jpg';
import front6_gall2 from '../assets/sprinters/front6(2).jpg';
import front6_gall3 from '../assets/sprinters/front6(3).jpg';



export interface CarImage {
  id: string;
  name: string;
  url: string;
  type: 'front' | 'interior' | 'exterior';
  category: string;
  carName: string;
  priority?: number;
}

export interface CarCategory {
  id: string;
  name: string;
  folderName: string;
  description: string;
  cars: Car[];
}

export interface BookingOption {
  type: 'hourly' | 'half-day' | 'full-day';
  label: string;
  price: string;
  duration: string;
}

export interface Car {
  id: string;
  name: string;
  category: string;
  frontImage: string;
  galleryImages: CarImage[];
  description: string;
  bookingOptions: BookingOption[];
  features: string[];
  capacity: string;
  transmission: string;
  fuelType: string;
  rating: number;
  whatsappNumber: string;
}

const vehicleCategories: Record<string, Omit<CarCategory, 'id' | 'folderName'>> = {
  sprinters: {
    name: 'Luxury Mercedes-Benz Sprinter',
    description: 'Premium Mercedes-Benz Sprinter vehicles for luxury group transportation',
    cars: [
      {
        id: 'sprinter-1',
        name: 'Luxury Mercedes-Benz Sprinter',
        category: 'Luxury Mercedes-Benz Sprinter',
        frontImage: front1,
        galleryImages: [
          { id: '1-1', name: 'Gallery Image 1', url: front1_gall1, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '1-2', name: 'Gallery Image 2', url: front1_gall2, type: 'interior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '1-3', name: 'Gallery Image 3', url: front1_gall3, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
        ],
        description: 'Experience unparalleled comfort and style with our Luxury Mercedes-Benz Sprinter. Perfect for corporate travel, special events, or group outings, this vehicle offers a first-class experience with its spacious interior and premium amenities.',
        bookingOptions: [],
        features: ['Plush leather seating', 'Advanced climate control', 'State-of-the-art sound system', 'Ambient interior lighting', 'Privacy-tinted windows', 'Generous luggage space'],
        capacity: '12',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        rating: 4.8,
        whatsappNumber: '+971501234567',
      },
      {
        id: 'sprinter-2',
        name: 'Luxury Mercedes-Benz Sprinter',
        category: 'Luxury Mercedes-Benz Sprinter',
        frontImage: front2,
        galleryImages: [
          { id: '2-1', name: 'Gallery Image 1', url: front2_gall1, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '2-2', name: 'Gallery Image 2', url: front2_gall2, type: 'interior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '2-3', name: 'Gallery Image 3', url: front2_gall3, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
        ],
        description: 'Experience unparalleled comfort and style with our Luxury Mercedes-Benz Sprinter. Perfect for corporate travel, special events, or group outings, this vehicle offers a first-class experience with its spacious interior and premium amenities.',
        bookingOptions: [],
        features: ['Plush leather seating', 'Advanced climate control', 'State-of-the-art sound system', 'Ambient interior lighting', 'Privacy-tinted windows', 'Generous luggage space'],
        capacity: '12',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        rating: 4.9,
        whatsappNumber: '+971585859944',
      },
      {
        id: 'sprinter-3',
        name: 'Luxury Mercedes-Benz Sprinter',
        category: 'Luxury Mercedes-Benz Sprinter',
        frontImage: front3,
        galleryImages: [
          { id: '3-1', name: 'Gallery Image 1', url: front3_gall1, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '3-2', name: 'Gallery Image 2', url: front3_gall2, type: 'interior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '3-3', name: 'Gallery Image 3', url: front3_gall3, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '3-4', name: 'Gallery Image 4', url: front3_gall4, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
        ],
        description: 'Experience unparalleled comfort and style with our Luxury Mercedes-Benz Sprinter. Perfect for corporate travel, special events, or group outings, this vehicle offers a first-class experience with its spacious interior and premium amenities.',
        bookingOptions: [],
        features: ['Plush leather seating', 'Advanced climate control', 'State-of-the-art sound system', 'Ambient interior lighting', 'Privacy-tinted windows', 'Generous luggage space'],
        capacity: '12',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        rating: 4.7,
        whatsappNumber: '+971501234567',
      },
      {
        id: 'sprinter-7',
        name: 'Luxury Mercedes-Benz Sprinter',
        category: 'Luxury Mercedes-Benz Sprinter',
        frontImage: front7,
        galleryImages: [
          { id: '7-1', name: 'Gallery Image 1', url: front7_gall1, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '7-2', name: 'Gallery Image 2', url: front7_gall2, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '7-3', name: 'Gallery Image 3', url: front7_gall3, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '7-4', name: 'Gallery Image 4', url: front7_gall4, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '7-5', name: 'Gallery Image 5', url: front7_gall5, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
        ],
        description: 'Experience unparalleled comfort and style with our Luxury Mercedes-Benz Sprinter. Perfect for corporate travel, special events, or group outings, this vehicle offers a first-class experience with its spacious interior and premium amenities.',
        bookingOptions: [],
        features: ['Plush leather seating', 'Advanced climate control', 'State-of-the-art sound system', 'Ambient interior lighting', 'Privacy-tinted windows', 'Generous luggage space'],
        capacity: '12',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        rating: 4.7,
        whatsappNumber: '+971501234567',
      },
      {
        id: 'sprinter-8',
        name: 'Luxury Mercedes-Benz Sprinter',
        category: 'Luxury Mercedes-Benz Sprinter',
        frontImage: front8,
        galleryImages: [
          { id: '8-1', name: 'Gallery Image 1', url: front8_gall1, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '8-2', name: 'Gallery Image 2', url: front8_gall2, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '8-3', name: 'Gallery Image 3', url: front8_gall3, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '8-4', name: 'Gallery Image 4', url: front8_gall4, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '8-5', name: 'Gallery Image 5', url: front8_gall5, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
        ],
        description: 'Experience unparalleled comfort and style with our Luxury Mercedes-Benz Sprinter. Perfect for corporate travel, special events, or group outings, this vehicle offers a first-class experience with its spacious interior and premium amenities.',
        bookingOptions: [],
        features: ['Plush leather seating', 'Advanced climate control', 'State-of-the-art sound system', 'Ambient interior lighting', 'Privacy-tinted windows', 'Generous luggage space'],
        capacity: '12',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        rating: 4.7,
        whatsappNumber: '+971501234567',
      },
      {
        id: 'sprinter-6',
        name: 'Luxury Mercedes-Benz Sprinter',
        category: 'Luxury Mercedes-Benz Sprinter',
        frontImage: front6,
        galleryImages: [
          { id: '6-1', name: 'Gallery Image 1', url: front6_gall1, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '6-2', name: 'Gallery Image 2', url: front6_gall2, type: 'interior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
          { id: '6-3', name: 'Gallery Image 3', url: front6_gall3, type: 'exterior', category: 'sprinters', carName: 'Luxury Mercedes-Benz Sprinter' },
        ],
        description: 'Experience unparalleled comfort and style with our Luxury Mercedes-Benz Sprinter. Perfect for corporate travel, special events, or group outings, this vehicle offers a first-class experience with its spacious interior and premium amenities.',
        bookingOptions: [],
        features: ['Plush leather seating', 'Advanced climate control', 'State-of-the-art sound system', 'Ambient interior lighting', 'Privacy-tinted windows', 'Generous luggage space'],
        capacity: '12',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        rating: 4.7,
        whatsappNumber: '+971501234567',
      },
    ],
  },
};

export const loadCarData = async (): Promise<CarCategory[]> => {
    return Object.entries(vehicleCategories).map(([key, category]) => ({
      id: key,
      ...category,
      folderName: key,
    }));
  };
  
  export const getAllCars = async (): Promise<Car[]> => {
    const categories = await loadCarData();
    return categories.flatMap(category => category.cars);
  };
  
  export const getCarsByCategory = async (categoryName: string): Promise<Car[]> => {
    const categories = await loadCarData();
    const category = categories.find(cat => cat.name === categoryName);
    return category?.cars || [];
  };
  
  export const getCarById = async (carId: string): Promise<Car | null> => {
    const allCars = await getAllCars();
    return allCars.find(car => car.id === carId) || null;
  };
