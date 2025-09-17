import { useEffect, useState } from 'react';
import { Car, getCarsByCategory } from '@/utils/dynamicImageLoader';
import CarCard from './CarCard';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StretchLimoSection = () => {
  const [limos, setLimos] = useState<Car[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLimos = async () => {
      const limoData = await getCarsByCategory('Stretch Limousines');
      setLimos(limoData);
    };
    fetchLimos();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Arrive in Style with Our Luxurious Stretch Limousines</h2>
            <button
            onClick={() => navigate('/our-fleet/stretch-limos')}
            className="flex items-center text-lg text-blue-600 hover:text-blue-800"
            >
            View All Limousines <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
        <p className="mb-8 text-lg text-gray-600">
          Make a grand entrance with our stunning stretch limousines, perfect for weddings, proms, and any special occasion.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {limos.slice(0, 3).map(limo => (
            <CarCard key={limo.id} car={limo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StretchLimoSection;