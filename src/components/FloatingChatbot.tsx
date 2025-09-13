import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, Car, Calendar } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickAction {
  id: string;
  text: string;
  icon: React.ReactNode;
  action: () => void;
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Royal VIP Limos Dubai! I\'m your luxury concierge assistant. How may I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const faqResponses: { [key: string]: string } = {
    'booking': 'To book our luxury limousine service, you can click "Book Now" below or call us at +971585859944. We offer 24/7 booking with instant confirmation.',
    'fleet': 'Our premium fleet includes Rolls-Royce Phantom, Mercedes S-Class, BMW 7 Series, and luxury SUVs. All vehicles feature leather interiors, climate control, and premium amenities.',
    'pricing': 'Our rates start from AED 500 per hour for premium sedans and AED 800 for luxury limousines. Airport transfers start from AED 300. Contact us for customized packages.',
    'services': 'We provide airport transfers, corporate transportation, wedding cars, city tours, and special event limousines. All services include professional chauffeurs.',
    'contact': 'You can reach us at +971585859944, email info@royalviplimos.ae, or use WhatsApp for instant responses. We\'re available 24/7.',
    'areas': 'We serve all areas in Dubai including Downtown, Marina, JBR, Palm Jumeirah, Dubai Mall, Burj Khalifa, and Dubai International Airport.',
    'chauffeur': 'All our chauffeurs are professionally trained, licensed, and speak multiple languages. They undergo background checks and maintain the highest standards of service.'
  };

  const quickActions: QuickAction[] = [
    {
      id: 'book',
      text: 'Book Now',
      icon: <Calendar className="w-4 h-4" />,
      action: () => window.location.href = '/booking'
    },
    {
      id: 'whatsapp',
      text: 'WhatsApp',
      icon: <Phone className="w-4 h-4" />,
      action: () => window.open('https://wa.me/971501234567', '_blank')
    },
    {
      id: 'fleet',
      text: 'View Fleet',
      icon: <Car className="w-4 h-4" />,
      action: () => window.location.href = '/fleet'
    }
  ];

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('book') || message.includes('reservation')) {
      return faqResponses.booking;
    } else if (message.includes('fleet') || message.includes('car') || message.includes('vehicle')) {
      return faqResponses.fleet;
    } else if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return faqResponses.pricing;
    } else if (message.includes('service') || message.includes('what do you')) {
      return faqResponses.services;
    } else if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return faqResponses.contact;
    } else if (message.includes('area') || message.includes('location') || message.includes('where')) {
      return faqResponses.areas;
    } else if (message.includes('driver') || message.includes('chauffeur')) {
      return faqResponses.chauffeur;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to Royal VIP Limos Dubai. I\'m here to assist you with our luxury transportation services. How may I help you today?';
    } else {
      return 'Thank you for your inquiry. For specific questions, please contact us directly at +971585859944 or use the quick actions below. Our team is available 24/7 to assist you.';
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-20 right-6 z-50 sm:bottom-24 sm:right-6 md:bottom-6 md:right-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          data-chatbot-trigger
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black border-2 border-yellow-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-110 active:scale-95 group touch-manipulation"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2)'
          }}
        >
          {isOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          ) : (
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 right-4 w-[calc(100vw-2rem)] max-w-sm h-[60vh] max-h-[400px] sm:bottom-36 sm:right-6 sm:w-80 sm:max-w-sm sm:h-[500px] md:bottom-24 md:right-20 md:w-96 md:max-w-md bg-black border border-yellow-400/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-black text-xs sm:text-sm">Royal VIP Assistant</h3>
                <p className="text-black/70 text-xs hidden sm:block">Online • Luxury Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:text-black/70 transition-colors p-1"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-2 sm:p-4 overflow-y-auto space-y-2 sm:space-y-4 bg-gradient-to-b from-gray-900 to-black">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                      : 'bg-gray-800 text-yellow-400 border border-yellow-400/20'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-2 sm:p-3 border-t border-yellow-400/20">
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="flex-1 min-w-[70px] sm:min-w-[80px] bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 flex items-center justify-center space-x-0.5 sm:space-x-1 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="w-3 h-3 sm:w-4 sm:h-4">{action.icon}</span>
                  <span className="text-yellow-400 text-xs font-medium hidden md:inline">{action.text}</span>
                  <span className="text-yellow-400 text-xs font-medium md:hidden">{action.text.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-2 sm:p-4 border-t border-yellow-400/20">
            <div className="flex space-x-1 sm:space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services..."
                className="flex-1 bg-gray-800 border border-yellow-400/30 rounded-full px-3 sm:px-4 py-2 text-white placeholder-yellow-400/50 focus:outline-none focus:border-yellow-400 text-xs sm:text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;