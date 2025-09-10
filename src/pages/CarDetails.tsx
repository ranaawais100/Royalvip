import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Phone, MessageCircle, Star, Shield, MapPin, CheckCircle, ArrowLeft, Users, Fuel, Settings } from 'lucide-react';
import { Car, loadCarData, getAllCars } from '../utils/dynamicImageLoader';
import { vehicleCategories } from '../data/vehicleData';
import { openWhatsApp } from '../utils/whatsapp';
import AutoCarCard from '../components/AutoCarCard';





const CarDetails: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<{ type: string; label: string; price: string; duration: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carData = await loadCarData();
        let allCars = carData.flatMap(category => category.cars);
        
        // If no cars found from dynamic loader, use static data as fallback
        if (allCars.length === 0) {
          allCars = Object.values(vehicleCategories).flatMap(category => 
            category.cars.map(car => ({
              ...car,
              frontImage: car.image || '',
              galleryImages: [],
              description: '',
              bookingOptions: [],
              whatsappNumber: ''
            }))
          );
        }
        
        // Find the specific car
        const foundCar = allCars.find(c => c.id === carId);
        if (foundCar) {
          setCar(foundCar);
          setSelectedBooking(foundCar.bookingOptions[0]);
          
          // Get related cars from the same category (excluding current car)
          const related = allCars
            .filter(c => c.category === foundCar.category && c.id !== foundCar.id)
            .slice(0, 4);
          setRelatedCars(related);
        }
      } catch (error) {
        console.error('Error loading car data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCarData();
    }
  }, [carId]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleNextImage = () => {
    if (car) {
      const nextIndex = (currentImageIndex + 1) % car.galleryImages.length;
      setCurrentImageIndex(nextIndex);
      setIsImageLoading(true);
    }
  };

  const handlePrevImage = () => {
    if (car) {
      const prevIndex = currentImageIndex === 0 ? car.galleryImages.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setIsImageLoading(true);
    }
  };

  const handleEnquireNow = () => {
    if (!car || !selectedBooking) return;
    const message = `Hi! I'm interested in the ${car.name} for ${selectedBooking.label} (${selectedBooking.price}). Could you please provide more details and availability?`;
    openWhatsApp(car.whatsappNumber, message);
  };

  const handleBookOnCall = () => {
    if (!car || !selectedBooking) return;
    const message = `Hi! I'd like to book the ${car.name} for ${selectedBooking.label} (${selectedBooking.price}). Please call me to discuss the details.`;
    openWhatsApp(car.whatsappNumber, message);
  };





  // Car specs from dynamic data
  const carSpecs = car ? [
    { icon: Users, label: 'Capacity', value: `${car.capacity} Passengers` },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Star, label: 'Rating', value: `${car.rating}/5 Stars` },
  ] : [];

  // Car features from dynamic data
  const carFeatures = car ? {
    features: car.features
  } : { features: [] };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Vehicle Not Found</h2>
          <p className="text-gray-400 mb-6">The requested vehicle could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5e79e] text-black rounded-xl font-semibold hover:shadow-lg hover:shadow-[#d4af37]/40 transition-all duration-300"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-400 hover:text-[#d4af37] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-[#d4af37]">{car.name}</h1>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden group">
              {isImageLoading && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
                </div>
              )}
              <img
                src={car.galleryImages[currentImageIndex]?.url || car.frontImage}
                alt={`${car.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
              />
              
              {/* Navigation Arrows */}
              {car.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Gallery Button */}
              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="absolute bottom-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all duration-300"
              >
                View All {car.galleryImages.length} Photos
              </button>
            </div>


          </div>

          {/* Car Details */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <h1 className="text-4xl font-bold text-[#d4af37] mb-2">{car.name}</h1>
              <p className="text-gray-400 text-lg uppercase tracking-wider">
                {car.category} • Premium Collection
              </p>
            </div>

            {/* Extended Description */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-white text-lg font-semibold mb-3">About This Vehicle</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {car.description || `Experience the pinnacle of luxury with our ${car.name}. This exceptional vehicle combines cutting-edge technology with unparalleled comfort, making it the perfect choice for discerning clients who demand nothing but the best.`}
              </p>
              <p className="text-gray-300 leading-relaxed">
                Ideal for weddings, corporate events, VIP transfers, and special occasions. Our professional chauffeur service ensures a seamless and memorable experience from start to finish.
              </p>
            </div>



            {/* Features */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-white text-lg font-semibold mb-4">Premium Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {carFeatures.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-white text-lg font-semibold mb-4">Book This Vehicle</h3>
              
              {/* Booking Options */}
              {car?.bookingOptions && car.bookingOptions.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Select Booking Option</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {car.bookingOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedBooking(option)}
                        className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                          selectedBooking?.label === option.label
                            ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                            : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-75">{option.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEnquireNow}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#d4af37] to-[#f5e79e] hover:from-[#f5e79e] hover:to-[#d4af37] text-black rounded-xl transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-[#d4af37]/40 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enquire Now via WhatsApp</span>
                </button>
                <button
                  onClick={handleBookOnCall}
                  className="w-full py-4 px-6 bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 rounded-xl transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Book on Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Cars Section */}
      {relatedCars.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Similar Vehicles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {relatedCars.map((relatedCar) => (
              <AutoCarCard key={relatedCar.id} car={relatedCar} className="w-full" />
            ))}
          </div>
        </div>
      )}

      {/* Full Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all duration-300 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative max-w-6xl max-h-[90vh] mx-4">
              <img
                src={car.galleryImages[currentImageIndex]?.url || car.frontImage}
                alt={`${car.name} - Gallery Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              {car.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#d4af37]/20 hover:text-[#d4af37] transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {car.galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;