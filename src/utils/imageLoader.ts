// Automated image detection system for luxury car showcase
// This utility dynamically loads images from organized folder structure

export interface CarImage {
  id: string;
  src: string;
  alt: string;
  isFront?: boolean;
}

export interface AutoDetectedCar {
  id: string;
  name: string;
  category: string;
  frontImage: string;
  images: CarImage[];
  price: string;
  rating: number;
  features: string[];
  capacity: string;
  transmission: string;
  fuelType: string;
  description: string;
}

// Import all images from organized folders
const importImages = {
  sprinters: import.meta.glob('/src/assets/sprinters/*.jpg', { eager: true }),
  vClass: import.meta.glob('/src/assets/v class/*.jpg', { eager: true }),
  luxuryChaffeur: import.meta.glob('/src/assets/luxary chaffaur/*.jpg', { eager: true }),
  busses: import.meta.glob('/src/assets/busses pics/*.jpg', { eager: true }),
  stretchLimos: import.meta.glob('/src/assets/streatch limos/*.jpg', { eager: true }),
  vans: import.meta.glob('/src/assets/vans/*.jpg', { eager: true })
};

// Category configurations with luxury details
const categoryConfigs = {
  sprinters: {
    title: 'Mercedes-Benz Sprinter Collection',
    description: 'Premium Sprinter fleet for luxury group transportation and cargo services',
    basePrice: 400,
    features: ['Premium Interior', 'Climate Control', 'Professional Driver', 'Luxury Seating'],
    capacity: '8-15',
    transmission: 'Automatic',
    fuelType: 'Diesel'
  },
  vClass: {
    title: 'Mercedes V-Class Elite',
    description: 'Sophisticated V-Class collection for executive and family luxury travel',
    basePrice: 450,
    features: ['Executive Seating', 'Ambient Lighting', 'Premium Audio', 'Privacy Glass'],
    capacity: '6-7',
    transmission: 'Automatic',
    fuelType: 'Diesel'
  },
  luxuryChaffeur: {
    title: 'Luxury Chauffeur Service',
    description: 'Elite chauffeur-driven vehicles for premium transportation experiences',
    basePrice: 600,
    features: ['Professional Chauffeur', 'VIP Treatment', 'Luxury Amenities', 'Concierge Service'],
    capacity: '2-4',
    transmission: 'Automatic',
    fuelType: 'Premium'
  },
  busses: {
    title: 'Luxury Coach Collection',
    description: 'Premium buses for large group transportation and events',
    basePrice: 800,
    features: ['Large Capacity', 'Entertainment System', 'Comfort Seating', 'Air Conditioning'],
    capacity: '25-50',
    transmission: 'Automatic',
    fuelType: 'Diesel'
  },
  stretchLimos: {
    title: 'Stretch Limousine Fleet',
    description: 'Iconic stretch limousines for special occasions and VIP events',
    basePrice: 1200,
    features: ['Stretch Design', 'Bar Service', 'Entertainment', 'Red Carpet Service'],
    capacity: '8-12',
    transmission: 'Automatic',
    fuelType: 'Premium'
  },
  vans: {
    title: 'Premium Van Collection',
    description: 'Versatile luxury vans for group travel and cargo transport',
    basePrice: 300,
    features: ['Flexible Seating', 'Cargo Space', 'Modern Interior', 'Safety Features'],
    capacity: '7-12',
    transmission: 'Automatic',
    fuelType: 'Diesel'
  }
};

// Helper function to determine if image is a front view
function isFrontImage(filename: string): boolean {
  const frontKeywords = ['front', 'exterior', 'cover'];
  const lowerFilename = filename.toLowerCase();
  return frontKeywords.some(keyword => lowerFilename.includes(keyword));
}

// Helper function to generate car name from image filename
function generateCarName(filename: string, category: string, index: number): string {
  const categoryNames = {
    sprinters: 'Mercedes Sprinter',
    vClass: 'Mercedes V-Class',
    luxuryChaffeur: 'Luxury Chauffeur',
    busses: 'Premium Coach',
    stretchLimos: 'Stretch Limousine',
    vans: 'Premium Van'
  };
  
  const baseName = categoryNames[category as keyof typeof categoryNames] || 'Luxury Vehicle';
  
  if (isFrontImage(filename)) {
    return `${baseName} Elite ${index + 1}`;
  }
  
  return `${baseName} Premium ${index + 1}`;
}

// Main function to automatically detect and organize car data
export function generateAutomatedCarData(): Record<string, { title: string; description: string; cars: AutoDetectedCar[] }> {
  const result: Record<string, { title: string; description: string; cars: AutoDetectedCar[] }> = {};
  
  Object.entries(importImages).forEach(([categoryKey, images]) => {
    const config = categoryConfigs[categoryKey as keyof typeof categoryConfigs];
    if (!config) return;
    
    const imageEntries = Object.entries(images);
    const frontImages = imageEntries.filter(([path]) => isFrontImage(path));
    const regularImages = imageEntries.filter(([path]) => !isFrontImage(path));
    
    const cars: AutoDetectedCar[] = [];
    
    // Group images by car (assuming front images represent individual cars)
    frontImages.forEach(([frontPath, frontModule], index) => {
      const filename = frontPath.split('/').pop() || '';
      const carId = `${categoryKey}-auto-${index + 1}`;
      const carName = generateCarName(filename, categoryKey, index);
      
      // Get associated regular images (distribute evenly)
      const startIdx = Math.floor((index * regularImages.length) / frontImages.length);
      const endIdx = Math.floor(((index + 1) * regularImages.length) / frontImages.length);
      const carRegularImages = regularImages.slice(startIdx, endIdx);
      
      // Create car image array
      const carImages: CarImage[] = [
        {
          id: `${carId}-front`,
          src: (frontModule as { default: string }).default,
          alt: `${carName} - Front View`,
          isFront: true
        },
        ...carRegularImages.map(([path, module], imgIndex) => ({
          id: `${carId}-img-${imgIndex}`,
          src: (module as { default: string }).default,
          alt: `${carName} - View ${imgIndex + 1}`
        }))
      ];
      
      // Generate price variation
      const priceVariation = Math.floor(Math.random() * 200) - 100;
      const finalPrice = config.basePrice + priceVariation;
      
      // Generate rating
      const rating = 4.3 + Math.random() * 0.7;
      
      const car: AutoDetectedCar = {
        id: carId,
        name: carName,
        category: categoryKey,
        frontImage: (frontModule as { default: string }).default,
        images: carImages,
        price: `AED ${finalPrice}`,
        rating: Math.round(rating * 10) / 10,
        features: config.features,
        capacity: config.capacity,
        transmission: config.transmission,
        fuelType: config.fuelType,
        description: `Premium ${carName.toLowerCase()} with luxury amenities and professional service for discerning travelers.`
      };
      
      cars.push(car);
    });
    
    // If no front images, create cars from regular images
    if (frontImages.length === 0 && regularImages.length > 0) {
      const carsToCreate = Math.min(3, regularImages.length);
      for (let i = 0; i < carsToCreate; i++) {
        const [imagePath, imageModule] = regularImages[i];
        const filename = imagePath.split('/').pop() || '';
        const carId = `${categoryKey}-auto-${i + 1}`;
        const carName = generateCarName(filename, categoryKey, i);
        
        const carImages: CarImage[] = regularImages.slice(i, i + 3).map(([path, module], imgIndex) => ({
          id: `${carId}-img-${imgIndex}`,
          src: (module as { default: string }).default,
          alt: `${carName} - View ${imgIndex + 1}`,
          isFront: imgIndex === 0
        }));
        
        const priceVariation = Math.floor(Math.random() * 200) - 100;
        const finalPrice = config.basePrice + priceVariation;
        const rating = 4.3 + Math.random() * 0.7;
        
        const car: AutoDetectedCar = {
          id: carId,
          name: carName,
          category: categoryKey,
          frontImage: (imageModule as { default: string }).default,
          images: carImages,
          price: `AED ${finalPrice}`,
          rating: Math.round(rating * 10) / 10,
          features: config.features,
          capacity: config.capacity,
          transmission: config.transmission,
          fuelType: config.fuelType,
          description: `Premium ${carName.toLowerCase()} with luxury amenities and professional service for discerning travelers.`
        };
        
        cars.push(car);
      }
    }
    
    if (cars.length > 0) {
      result[categoryKey] = {
        title: config.title,
        description: config.description,
        cars
      };
    }
  });
  
  return result;
}

// Export the automated car data
export const automatedVehicleData = generateAutomatedCarData();