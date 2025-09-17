import React, { useEffect, useState } from 'react';
import AutoCarCard from './AutoCarCard';
import { loadCarData, CarCategory, Car } from '../utils/dynamicImageLoader';

interface HorizontalCarShowcaseProps {
  title?: string;
  subtitle?: string;
  maxCars?: number;
  className?: string;
  showAll?: boolean;
}

const HorizontalCarShowcase: React.FC<HorizontalCarShowcaseProps> = ({
  title = "Our Premium Fleet",
  subtitle = "Discover our collection of luxury vehicles, each meticulously maintained and ready for your journey.",
  maxCars = 20,
  className = '',
  showAll = false
}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CarCategory[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allCategories = await loadCarData();

        if (showAll) {
          setCategories(allCategories);
        } else {
          const selectedCategories = allCategories.filter(
            (category) => category.folderName === 'sprinters' || category.folderName === 'v class' || category.folderName === 'stretch-limos'
          );
          setCategories(selectedCategories);
        }
      } catch (error) {
        console.error('Failed to load car data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [maxCars, showAll]);



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
    <section className={`py-20 bg-gradient-to-br from-secondary/20 to-background ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase text-sm">
            LUXURY FLEET
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {title.split(' ').slice(0, -1).join(' ')}
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {title.split(' ').slice(-1)[0]}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6" />
        </div>



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
            
            {/* Car Cards Carousel for this category */}
            <div className="relative">

              
              <div 
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
                style={{ 
                  scrollBehavior: 'smooth',
                  width: '100%',
                  minWidth: '100%'
                }}
              >
                {category.cars.map((car: Car) => (
                  <div 
                    key={car.id}
                    className="flex-shrink-0 w-72 sm:w-80 md:w-84 lg:w-88 xl:w-96"
                  >
                    <AutoCarCard car={car} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalCarShowcase;