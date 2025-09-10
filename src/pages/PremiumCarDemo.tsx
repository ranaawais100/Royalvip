import React, { useState, useEffect } from 'react';
import SimpleCarCard from '../components/SimpleCarCard';
import { loadCarData, Car, CarCategory } from '../utils/dynamicImageLoader';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PremiumCarDemo: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const carData = await loadCarData();
        // Flatten all cars from all categories
        const allCars = carData.reduce((acc: Car[], category: CarCategory) => {
          return [...acc, ...category.cars];
        }, []);
        setCars(allCars);
        if (allCars.length > 0) {
          setSelectedCar(allCars[0]);
        }
      } catch (error) {
        console.error('Failed to load car data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    // Scroll to top to show the new card
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading premium vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-[#d4af37]/20 text-gray-400 hover:text-[#d4af37] transition-all duration-300 border border-gray-600/50 hover:border-[#d4af37]/50"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#d4af37]">Premium Car Showcase</h1>
                <p className="text-gray-400 text-sm">Experience luxury with our premium car rental cards</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Total Vehicles</p>
              <p className="text-[#d4af37] font-bold text-lg">{cars.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Premium Card */}
          <div className="lg:col-span-2">
            {selectedCar && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Featured Vehicle</h2>
                  <div className="px-3 py-1 bg-gradient-to-r from-[#d4af37]/20 to-[#f5e79e]/20 border border-[#d4af37]/30 rounded-full">
                    <span className="text-[#d4af37] text-sm font-medium">Premium Selection</span>
                  </div>
                </div>
                <SimpleCarCard
                  car={selectedCar}
                  className="max-w-2xl mx-auto"
                />
              </div>
            )}
          </div>

          {/* Car Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Select Vehicle</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-[#d4af37]/30 scrollbar-track-gray-800/30">
                {cars.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleCarSelect(car)}
                    className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                      selectedCar?.id === car.id
                        ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#f5e79e]/20 border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                        : 'bg-gray-800/30 border-gray-600/50 hover:border-[#d4af37]/50 hover:bg-gray-700/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={car.frontImage}
                          alt={car.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${
                          selectedCar?.id === car.id ? 'text-[#d4af37]' : 'text-white'
                        }`}>
                          {car.name}
                        </p>
                        <p className="text-gray-400 text-xs truncate">{car.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#d4af37] mb-2">Premium Card Features</h2>
            <p className="text-gray-400">Designed for luxury car rental businesses</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-[#d4af37]/20 to-[#f5e79e]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#d4af37] text-2xl">🖼️</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Image Gallery</h3>
              <p className="text-gray-400 text-sm">High-quality images with thumbnail slider and full-screen modal gallery</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-[#d4af37]/20 to-[#f5e79e]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#d4af37] text-2xl">⏰</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Booking Options</h3>
              <p className="text-gray-400 text-sm">Flexible rental periods: hourly, half-day, and full-day options</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-[#d4af37]/20 to-[#f5e79e]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#d4af37] text-2xl">💬</span>
              </div>
              <h3 className="text-white font-semibold mb-2">WhatsApp Integration</h3>
              <p className="text-gray-400 text-sm">Direct booking through WhatsApp with pre-filled messages</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-[#d4af37]/20 to-[#f5e79e]/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#d4af37] text-2xl">🚗</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Related Suggestions</h3>
              <p className="text-gray-400 text-sm">Smart car recommendations to increase booking conversions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCarDemo;