// Dynamic Image Loader for Automated Car Showcase System
// Automatically scans assets folder structure and organizes images by category

export interface CarImage {
  id: string;
  name: string;
  url: string;
  type: 'front' | 'interior' | 'exterior';
  category: string;
  carName: string;
  priority?: number; // Optional field for image curation scoring
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

// Folder mapping to categories
const CATEGORY_MAPPING: Record<string, { name: string; description: string }> = {
  'sprinters': {
    name: 'Luxury Mercedes-Benz Sprinter',
    description: 'Premium Mercedes-Benz Sprinter vehicles for luxury group transportation'
  },
  'v class': {
    name: 'Mercedes V Class',
    description: 'Elegant Mercedes V-Class vehicles for executive travel'
  },
  'vans': {
    name: 'Van (7–14 seater)',
    description: 'Spacious vans perfect for medium-sized groups and family trips'
  },
  'luxary chaffaur': {
    name: 'Luxury Chauffeur',
    description: 'Premium chauffeur-driven luxury vehicles for VIP experiences'
  },
  'busses pics': {
    name: 'Buses (20–50 seaters)',
    description: 'Large capacity buses for group events and corporate transportation'
  },
  'streatch limos': {
    name: 'Stretched Limousines',
    description: 'Luxurious stretched limousines for special occasions and events'
  }
};

// Function to dynamically import all images from a folder
const importAllImages = (folderPath: string): Record<string, string> => {
  const images: Record<string, string> = {};
  
  try {
    // Use specific glob patterns for each folder to handle spaces in folder names
    let modules: Record<string, { default: string }> = {};
    
    switch (folderPath) {
      case 'sprinters':
        modules = import.meta.glob('/src/assets/sprinters/*.{jpg,jpeg,png,webp}', { eager: true });
        break;
      case 'v class':
        modules = import.meta.glob('/src/assets/v class/*.{jpg,jpeg,png,webp}', { eager: true });
        break;
      case 'vans':
        modules = import.meta.glob('/src/assets/vans/*.{jpg,jpeg,png,webp}', { eager: true });
        break;
      case 'luxary chaffaur':
        modules = import.meta.glob('/src/assets/luxary chaffaur/*.{jpg,jpeg,png,webp}', { eager: true });
        break;
      case 'busses pics':
        modules = import.meta.glob('/src/assets/busses pics/*.{jpg,jpeg,png,webp}', { eager: true });
        break;
      case 'streatch limos':
        modules = import.meta.glob('/src/assets/streatch limos/*.{jpg,jpeg,png,webp}', { eager: true });
        break;
      default:
        // Fallback to general pattern
        modules = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,webp}', { eager: true });
        break;
    }
    
    Object.entries(modules).forEach(([path, module]) => {
      const fileName = path.split('/').pop()?.split('.')[0] || '';
      images[fileName] = module.default;
    });
  } catch (error) {
    console.warn(`Failed to load images from ${folderPath}:`, error);
  }
  
  return images;
};

// Function to determine image type based on filename
const getImageType = (fileName: string): 'front' | 'interior' | 'exterior' => {
  const lowerName = fileName.toLowerCase();
  
  if (lowerName.includes('front') || lowerName.includes('cover')) {
    return 'front';
  }
  
  if (lowerName.includes('interior') || lowerName.includes('inside')) {
    return 'interior';
  }
  
  return 'exterior';
};

// Function to assign priority score for professional image curation
const getPriority = (fileName: string): number => {
  const lowerName = fileName.toLowerCase();
  let score = 0;
  
  // High priority keywords (professional shots)
  if (lowerName.includes('interior') || lowerName.includes('inside')) score += 100;
  if (lowerName.includes('side') || lowerName.includes('profile')) score += 90;
  if (lowerName.includes('rear') || lowerName.includes('back')) score += 85;
  if (lowerName.includes('angle') || lowerName.includes('3/4')) score += 80;
  if (lowerName.includes('detail') || lowerName.includes('close')) score += 75;
  
  // Medium priority
  if (lowerName.includes('exterior')) score += 70;
  if (lowerName.includes('full')) score += 65;
  if (lowerName.includes('view')) score += 60;
  
  // Bonus for numbered sequences (usually professional)
  if (/\d+/.test(lowerName)) score += 10;
  
  // Penalty for low-quality indicators
  if (lowerName.includes('thumb') || lowerName.includes('small')) score -= 50;
  if (lowerName.includes('temp') || lowerName.includes('test')) score -= 30;
  
  return score;
};

// Function to generate car name from images
const generateCarName = (categoryName: string, frontImages: string[]): string[] => {
  const baseNames = frontImages.map((img, index) => {
    const cleanCategory = categoryName.replace(/\s*\([^)]*\)/g, '').trim();
    return `${cleanCategory} ${index + 1}`;
  });
  
  return baseNames;
};

// Function to generate booking options based on category
const generateBookingOptions = (categoryName: string): BookingOption[] => {
  const basePrice = getCategoryBasePrice(categoryName);
  
  return [
    {
      type: 'hourly',
      label: 'Per Hour',
      price: `AED ${basePrice}`,
      duration: '1 Hour'
    },
    {
      type: 'half-day',
      label: 'Half Day',
      price: `AED ${Math.round(basePrice * 4.5)}`,
      duration: '4-6 Hours'
    },
    {
      type: 'full-day',
      label: 'Full Day',
      price: `AED ${Math.round(basePrice * 8)}`,
      duration: '8-12 Hours'
    }
  ];
};

// Function to get base price by category
const getCategoryBasePrice = (categoryName: string): number => {
  const priceMap: Record<string, number> = {
    'Luxury Mercedes-Benz Sprinter': 120,
    'Mercedes V Class': 150,
    'Van (7–14 seater)': 80,
    'Luxury Chauffeur': 200,
    'Buses (20–50 seaters)': 180,
    'Stretched Limousines': 250
  };
  
  return priceMap[categoryName] || 100;
};

// Function to generate features based on category
const generateFeatures = (categoryName: string): string[] => {
  const featureMap: Record<string, string[]> = {
    'Luxury Mercedes-Benz Sprinter': ['Premium Leather Seating', 'Climate Control', 'Entertainment System', 'WiFi Available'],
    'Mercedes V Class': ['Executive Seating', 'Ambient Lighting', 'Premium Audio', 'Privacy Glass'],
    'Van (7–14 seater)': ['Spacious Interior', 'Air Conditioning', 'Comfortable Seating', 'Luggage Space'],
    'Luxury Chauffeur': ['Professional Chauffeur', 'Premium Comfort', 'VIP Service', 'Complimentary Water'],
    'Buses (20–50 seaters)': ['Group Transportation', 'Air Conditioning', 'Comfortable Seating', 'Large Capacity'],
    'Stretched Limousines': ['Luxury Interior', 'Bar Service', 'Entertainment System', 'Special Occasion Ready']
  };
  
  return featureMap[categoryName] || ['Premium Service', 'Professional Driver', 'Clean Vehicle', 'On-Time Service'];
};

// Function to get capacity based on category
const getCapacity = (categoryName: string): string => {
  const capacityMap: Record<string, string> = {
    'Luxury Mercedes-Benz Sprinter': '12-15',
    'Mercedes V Class': '6-7',
    'Van (7–14 seater)': '7-14',
    'Luxury Chauffeur': '4-5',
    'Buses (20–50 seaters)': '20-50',
    'Stretched Limousines': '8-12'
  };
  
  return capacityMap[categoryName] || '4-6';
};

// Main function to load and organize all car data
export const loadCarData = async (): Promise<CarCategory[]> => {
  const categories: CarCategory[] = [];
  
  for (const [folderName, categoryInfo] of Object.entries(CATEGORY_MAPPING)) {
    try {
      const images = importAllImages(folderName);
      const imageEntries = Object.entries(images);
      
      if (imageEntries.length === 0) {
        continue;
      }
      
      // Separate front images from other images
      const frontImages = imageEntries.filter(([name]) => getImageType(name) === 'front');
      const otherImages = imageEntries.filter(([name]) => getImageType(name) !== 'front');
      
      // Generate cars based on front images
      const cars: Car[] = [];
      const carNames = generateCarName(categoryInfo.name, frontImages.map(([name]) => name));
      
      frontImages.forEach(([frontName, frontUrl], index) => {
        const carId = `${folderName}-${index + 1}`;
        const carName = carNames[index];
        
        // Create curated gallery images (4-5 professional selections)
        const allImages = otherImages.map(([name, url], imgIndex) => ({
          id: `${carId}-img-${imgIndex}`,
          name,
          url,
          type: getImageType(name),
          category: categoryInfo.name,
          carName,
          priority: getPriority(name)
        }));
        
        // Sort by priority and select best 4 images (excluding front)
        const sortedImages = allImages.sort((a, b) => b.priority - a.priority);
        const selectedImages = sortedImages.slice(0, 4);
        
        // Create final gallery with front image first, then curated selections
        const galleryImages: CarImage[] = [
          {
            id: `${carId}-front`,
            name: frontName,
            url: frontUrl,
            type: 'front',
            category: categoryInfo.name,
            carName
          },
          ...selectedImages.map(img => ({
            id: img.id,
            name: img.name,
            url: img.url,
            type: img.type,
            category: img.category,
            carName: img.carName
          }))
        ];
        
        cars.push({
          id: carId,
          name: carName,
          category: categoryInfo.name,
          frontImage: frontUrl,
          galleryImages,
          description: `Premium ${carName.toLowerCase()} available for luxury transportation services with professional chauffeur service.`,
          bookingOptions: generateBookingOptions(categoryInfo.name),
          features: generateFeatures(categoryInfo.name),
          capacity: getCapacity(categoryInfo.name),
          transmission: 'Automatic',
          fuelType: 'Diesel',
          rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
          whatsappNumber: '+971501234567' // Default WhatsApp number
        });
      });
      
      if (cars.length > 0) {
        categories.push({
          id: folderName,
          name: categoryInfo.name,
          folderName,
          description: categoryInfo.description,
          cars
        });
      }
    } catch (error) {
      console.warn(`Failed to process category ${folderName}:`, error);
    }
  }
  
  return categories;
};

// Function to get all cars across categories
export const getAllCars = async (): Promise<Car[]> => {
  const categories = await loadCarData();
  return categories.flatMap(category => category.cars);
};

// Function to get cars by category
export const getCarsByCategory = async (categoryName: string): Promise<Car[]> => {
  const categories = await loadCarData();
  const category = categories.find(cat => cat.name === categoryName);
  return category?.cars || [];
};

// Function to get a specific car by ID
export const getCarById = async (carId: string): Promise<Car | null> => {
  const allCars = await getAllCars();
  return allCars.find(car => car.id === carId) || null;
};

// Export category mapping for external use
export { CATEGORY_MAPPING };