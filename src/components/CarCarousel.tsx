import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, ChevronLeft, ChevronRight, Camera, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnhancedCarousel from './EnhancedCarousel';

interface Car {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  features: string[];
  capacity: string;
  transmission: string;
  fuelType: string;
  category: string;
}

interface CarCarouselProps {
  cars: Car[];
  title?: string;
}

const CarCarousel: React.FC<CarCarouselProps> = ({ 
  cars, 
  title = "Our Premium Fleet"
}) => {
  const navigate = useNavigate();

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No vehicles available in this category.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {title}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>
        )}

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
            {cars.map((car) => (
              <div key={car.id} className="px-2">
                <div className="group relative bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 transform hover:scale-[1.02] cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm w-full max-w-[320px] mx-auto">
                   {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    

                    
                    {/* Photos Badge */}
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-transparent">
                      <span className="text-gray-800 dark:text-white text-xs font-medium">5 Photos</span>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center space-x-1 px-2 py-1 bg-white/90 dark:bg-gradient-to-r dark:from-[#d4af37]/90 dark:to-[#f5e79e]/90 backdrop-blur-sm rounded-full border border-gray-200 dark:border-transparent">
                      <Star className="w-3 h-3 text-yellow-400 dark:text-black fill-current" />
                      <span className="text-gray-800 dark:text-black text-xs font-bold">{car.rating}</span>
                    </div>
                  </div>
                
                {/* Card Content */}
                <div className="p-5">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <span>{car.capacity} Seats</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{car.transmission}</span>
                    </div>
                  </div>

                  {/* Car Name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-[#d4af37] transition-colors duration-300">
                    {car.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                    Experience luxury and comfort with our premium {car.category.toLowerCase()} service.
                  </p>

                  {/* Price and Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary dark:text-[#d4af37]">
                      ${car.price}
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/day</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/car/${car.id}`)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </EnhancedCarousel>
        </div>
    </section>
  );
};

export default CarCarousel;
export type { Car };