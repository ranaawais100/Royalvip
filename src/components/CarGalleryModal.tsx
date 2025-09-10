import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Phone, Calendar } from 'lucide-react';
import { Car, CarImage } from '../utils/dynamicImageLoader';
import { openWhatsApp, generateCarInquiryMessage } from '../utils/whatsapp';

interface CarGalleryModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow?: (carName: string) => void;
  onContactUs?: (carName: string) => void;
}

export const CarGalleryModal: React.FC<CarGalleryModalProps> = ({
  car,
  isOpen,
  onClose,
  onBookNow,
  onContactUs
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reset image index when car changes
  useEffect(() => {
    if (car) {
      setCurrentImageIndex(0);
      setIsLoading(true);
      // Simulate loading time for smooth transition
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [car]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen || !car) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, car, goToNext, goToPrevious, onClose]);

  const goToNext = useCallback(() => {
    if (!car) return;
    setCurrentImageIndex((prev) => 
      prev === car.galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [car]);

  const goToPrevious = useCallback(() => {
    if (!car) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.galleryImages.length - 1 : prev - 1
    );
  }, [car]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const handleBookNow = () => {
    if (car && onBookNow) {
      onBookNow(car.name);
    }
  };

  const handleContactUs = () => {
    if (car) {
      const message = generateCarInquiryMessage(car.name, car.category);
      openWhatsApp(message);
      
      if (onContactUs) {
        onContactUs(car.name);
      }
    }
  };

  if (!isOpen || !car) return null;

  const currentImage = car.galleryImages[currentImageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-[#d4af37]">
              {car.name}
            </h2>
            <p className="text-white/80 text-sm md:text-base">{car.category}</p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f5e79e]/20 hover:from-[#d4af37]/30 hover:to-[#f5e79e]/30 transition-colors duration-200 backdrop-blur-sm border border-[#d4af37]/50"
          >
            <X className="w-6 h-6 text-[#d4af37]" />
          </button>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Main Image */}
              <div 
                className="relative max-w-4xl max-h-[70vh] w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={currentImage.url}
                  alt={`${car.name} - ${currentImage.type}`}
                  className="w-full h-full object-contain rounded-lg shadow-2xl"
                  draggable={false}
                />
                
                {/* Image Type Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-white/90 text-sm capitalize font-medium">
                    {currentImage.type === 'front' ? 'Exterior' : currentImage.type}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              {car.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-gradient-to-r hover:from-[#d4af37]/20 hover:to-[#f5e79e]/20 transition-all duration-300 backdrop-blur-sm border-2 border-[#d4af37] hover:border-[#f5e79e] group hover:shadow-lg hover:shadow-[#d4af37]/30"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#d4af37] group-hover:text-[#f5e79e] transition-colors" />
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-gradient-to-r hover:from-[#d4af37]/20 hover:to-[#f5e79e]/20 transition-all duration-300 backdrop-blur-sm border-2 border-[#d4af37] hover:border-[#f5e79e] group hover:shadow-lg hover:shadow-[#d4af37]/30"
                  >
                    <ChevronRight className="w-6 h-6 text-[#d4af37] group-hover:text-[#f5e79e] transition-colors" />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-4 space-y-4">
          {/* Image Counter & Thumbnails */}
          {car.galleryImages.length > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <span className="text-white/70 text-sm">
                {currentImageIndex + 1} / {car.galleryImages.length}
              </span>
              
              {/* Thumbnail Navigation */}
              <div className="flex space-x-2 max-w-md overflow-x-auto pb-2">
                {car.galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/50'
                        : 'border-white/20 hover:border-[#d4af37]/60'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description & CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-center md:text-left">
              <p className="text-white/90 text-sm md:text-base mb-2">
                {car.description}
              </p>
              <p className="text-white/70 text-xs md:text-sm">
                Professional chauffeur service • Fully licensed & insured • 24/7 support
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleContactUs}
                className="flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-[#d4af37] text-white hover:bg-[#d4af37]/10 hover:border-[#f5e79e] rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#d4af37]/30 transform hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Contact Us</span>
              </button>
              
              <button
                onClick={handleBookNow}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5e79e] hover:from-[#f5e79e] hover:to-[#d4af37] text-black rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#d4af37]/50 transform hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                <span className="font-medium">View Details & Book</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarGalleryModal;