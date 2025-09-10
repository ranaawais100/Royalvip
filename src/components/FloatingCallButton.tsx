import React from 'react';
import { Phone } from 'lucide-react';

const FloatingCallButton: React.FC = () => {
  const phoneNumber = '+971585859944';

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 sm:bottom-6 sm:left-6">
      <button
        onClick={handleCall}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Call us"
        title="Call us now"
      >
        <Phone className="w-6 h-6 group-hover:animate-pulse" />
      </button>
    </div>
  );
};

export default FloatingCallButton;