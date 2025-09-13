import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Camera } from 'lucide-react';
import { Car } from '../utils/dynamicImageLoader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SimpleCarCardProps {
  car: Car;
  className?: string;
}

const SimpleCarCard: React.FC<SimpleCarCardProps> = ({
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
    <Card className={`group overflow-hidden bg-card border-border hover:shadow-luxury transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex-shrink-0 ${className}`}>
      <div className="relative overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 dark:border-[#d4af37]/30 border-t-gray-600 dark:border-t-[#d4af37] rounded-full animate-spin" />
          </div>
        )}
        <img
          src={car.frontImage}
          alt={car.name}
          className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover group-hover:scale-110 transition-transform duration-700"
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm">
          {car.category}
        </Badge>
        
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">4.9</span>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {car.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          Experience luxury and comfort with our premium {car.category.toLowerCase()} service.
        </p>
        


        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-2">Features:</h4>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">4 Seats</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">Auto Transmission</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">Premium Interior</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">Professional Service</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleViewGallery}
            variant="outline"
            className="flex-1 border-primary/30 hover:bg-primary/10 transition-all duration-300"
          >
            <Camera className="h-4 w-4 mr-2" />
            Gallery
          </Button>
          <Button 
            onClick={() => navigate(`/car/${car.id}`)}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleCarCard;