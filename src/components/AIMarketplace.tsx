import React, { useState } from 'react';
import { ShoppingCart, Star, DollarSign, Users, TrendingUp, Award, Zap } from 'lucide-react';

interface AIService {
  id: string;
  name: string;
  provider: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  features: string[];
  roi: string;
  implementationTime: string;
}

const AIMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<AIService[]>([]);

  const aiServices: AIService[] = [
    {
      id: '1',
      name: 'Emergency Response AI',
      provider: 'CityTech Solutions',
      description: 'AI-powered emergency dispatch optimization with real-time routing',
      price: 15000,
      rating: 4.8,
      reviews: 127,
      category: 'Public Safety',
      features: ['Real-time optimization', '24/7 monitoring', 'Multi-agency integration'],
      roi: '25% faster response times',
      implementationTime: '2-4 weeks'
    },
    {
      id: '2',
      name: 'Smart Traffic Controller',
      provider: 'UrbanFlow AI',
      description: 'Adaptive traffic light system that reduces congestion by 40%',
      price: 25000,
      rating: 4.9,
      reviews: 89,
      category: 'Transportation',
      features: ['Adaptive timing', 'Pedestrian detection', 'Emergency vehicle priority'],
      roi: '40% congestion reduction',
      implementationTime: '1-2 months'
    },
    {
      id: '3',
      name: 'Citizen Service Bot',
      provider: 'GovTech Innovations',
      description: '24/7 AI assistant for citizen inquiries and service requests',
      price: 8000,
      rating: 4.7,
      reviews: 203,
      category: 'Citizen Services',
      features: ['Natural language processing', 'Multi-language support', 'Form automation'],
      roi: '60% reduction in call volume',
      implementationTime: '1-3 weeks'
    },
    {
      id: '4',
      name: 'Predictive Maintenance AI',
      provider: 'InfraTech Systems',
      description: 'Predict infrastructure failures before they happen',
      price: 35000,
      rating: 4.6,
      reviews: 156,
      category: 'Infrastructure',
      features: ['IoT integration', 'Failure prediction', 'Cost optimization'],
      roi: '50% reduction in failures',
      implementationTime: '2-6 months'
    }
  ];

  const categories = ['All', 'Public Safety', 'Transportation', 'Citizen Services', 'Infrastructure'];

  const filteredServices = selectedCategory === 'All' 
    ? aiServices 
    : aiServices.filter(service => service.category === selectedCategory);

  const addToCart = (service: AIService) => {
    setCart(prev => [...prev, service]);
  };

  const getTotalCost = () => {
    return cart.reduce((total, service) => total + service.price, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <ShoppingCart className="w-8 h-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Services Marketplace</h2>
          <p className="text-gray-600">Ready-to-deploy AI solutions for government agencies</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Shopping Cart Summary */}
      {cart.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">Cart Summary</h3>
              <p className="text-green-700">{cart.length} services selected</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-800">${getTotalCost().toLocaleString()}</p>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map(service => (
          <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.provider}</p>
              </div>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                {service.category}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{service.description}</p>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{service.rating}</span>
                <span className="text-sm text-gray-500">({service.reviews})</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">{service.roi}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">${service.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Implementation: {service.implementationTime}</p>
              </div>
              <button
                onClick={() => addToCart(service)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIMarketplace;