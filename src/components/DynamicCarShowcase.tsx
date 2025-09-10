import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Users, Fuel, Settings } from 'lucide-react';
import { loadCarData, Car, CarCategory } from '../utils/dynamicImageLoader';
import { openWhatsApp, generateCarInquiryMessage } from '../utils/whatsapp';
import SimpleCarCard from './SimpleCarCard';
import EnhancedCarousel from './EnhancedCarousel';
import { useNavigate } from 'react-router-dom';

interface DynamicCarShowcaseProps {
  showAllCategories?: boolean;
  maxCarsPerCategory?: number;
  className?: string;
}

export const DynamicCarShowcase: React.FC<DynamicCarShowcaseProps> = ({
  showAllCategories = true,
  maxCarsPerCategory = 6,
  className = ''
}) => {
  const [categories, setCategories] = useState<CarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const carData = await loadCarData();
        setCategories(carData);
        

      } catch (error) {
        console.error('Failed to load car data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Modal handlers removed - PremiumCarCard handles its own modals

  const getVisibleCars = (category: CarCategory): Car[] => {
    return showAllCategories ? category.cars : category.cars.slice(0, maxCarsPerCategory);
  };

  // CarCard component removed - now using PremiumCarCard

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading luxury vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-12 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Categories */}
        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            {/* Category Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
            </div>
            
            {/* Enhanced Carousel */}
            <EnhancedCarousel
               loop={true}
               rtl={false}
               showArrows={true}
               slidesToShow={{
                  desktop: 2,
                  tablet: 2,
                  mobile: 1
                }}
               gap="1.5rem"
               className="px-4"
             >
              {getVisibleCars(category).map((car) => (
                <div key={car.id} className="px-2">
                  <SimpleCarCard car={car} />
                </div>
              ))}
            </EnhancedCarousel>
            
            {/* Show more button for categories with many cars */}
            {category.cars.length > maxCarsPerCategory && (
              <div className="text-center mt-8">
                <button 
                  onClick={() => navigate('/fleet', { state: { selectedCategory: category.name } })}
                  className="px-6 py-3 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-lg transition-all duration-200 font-medium"
                >
                  View All {category.name} ({category.cars.length} vehicles)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Gallery Modal removed - PremiumCarCard handles its own modals */}
    </div>
  );
};

export default DynamicCarShowcase;