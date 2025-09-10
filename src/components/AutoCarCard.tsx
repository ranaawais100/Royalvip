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
    <Card className={`group overflow-hidden bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/30 ${className}`}>
      <div className="relative overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={car.frontImage}
          alt={car.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <Badge className="absolute top-4 left-4 bg-yellow-500/90 text-black backdrop-blur-sm font-semibold">
          {car.category}
        </Badge>
        
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{car.rating.toFixed(1)}</span>
        </div>
      </div>

      <CardContent className="p-6 bg-gradient-to-b from-gray-900 to-black">
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
          {car.name}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {car.description}
        </p>



        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-yellow-400 mb-3">Premium Features:</h4>
          <div className="grid grid-cols-2 gap-2">
            {car.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                <span className="text-xs text-gray-300 truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Button */}
        <div className="mt-4">
          <button
            onClick={handleViewGallery}
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#f5e79e] hover:from-[#f5e79e] hover:to-[#d4af37] text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 flex items-center justify-center gap-2"
          >
            <Camera className="h-4 w-4" />
            View Gallery
          </button>
        </div>


      </CardContent>
    </Card>
  );
};

export default AutoCarCard;