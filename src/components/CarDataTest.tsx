import React, { useEffect, useState } from 'react';
import { loadCarData, CarCategory, Car } from '../utils/dynamicImageLoader';

const CarDataTest: React.FC = () => {
  const [data, setData] = useState<CarCategory[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testLoad = async () => {
      try {
        console.log('CarDataTest: Starting to load data...');
        const carData = await loadCarData();
        console.log('CarDataTest: Loaded data:', carData);
        setData(carData);
      } catch (error) {
        console.error('CarDataTest: Error:', error);
      } finally {
        setLoading(false);
      }
    };

    testLoad();
  }, []);

  if (loading) {
    return <div>Loading test data...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 m-4 rounded">
      <h3 className="font-bold mb-2">Car Data Test</h3>
      <p>Categories found: {data?.length || 0}</p>
      {data?.map((category: CarCategory, index: number) => (
        <div key={index} className="mb-2">
          <strong>{category.name}</strong>: {category.cars?.length || 0} cars
          {category.cars?.map((car: Car) => (
            <div key={car.id} className="ml-4 text-sm">
              - {car.id}: {car.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CarDataTest;