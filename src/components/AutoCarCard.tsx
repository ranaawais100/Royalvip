import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Camera } from 'lucide-react';
import { Car } from '../utils/dynamicImageLoader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AutoCarCardProps {
  car: Car;
  className?: string;
}

const AutoCarCard: React.FC<AutoCarCardProps> = ({
  car,
  className = ''
}) => {
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleViewGallery = () => {
    navigate(`/car/${car.id}`);
  };



  return (
    <Card className={`group overflow-hidden bg-gradient-to-br from-gray-900 to-black border-gray-800 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/30 w-full ${className}`}>
      <div className="relative overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={car.frontImage}
          alt={car.name}
          className="w-full h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700"
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <Badge className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-yellow-500/90 text-black backdrop-blur-sm font-semibold text-xs sm:text-sm">
          {car.category}
        </Badge>
        
        <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
          <span className="text-white text-xs sm:text-sm font-medium">{car.rating.toFixed(1)}</span>
        </div>
      </div>

      <CardContent className="p-4 sm:p-5 md:p-6 bg-gradient-to-b from-gray-900 to-black">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
          {car.name}
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {car.description}
        </p>



        {/* Features */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-yellow-400 mb-2 sm:mb-3">Premium Features:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
            {car.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                <span className="text-xs text-gray-300 truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Button */}
        <div className="mt-3 sm:mt-4">
          <button
            onClick={handleViewGallery}
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#f5e79e] hover:from-[#f5e79e] hover:to-[#d4af37] text-black font-semibold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
            View Gallery
          </button>
        </div>


      </CardContent>
    </Card>
  );
};

export default AutoCarCard;