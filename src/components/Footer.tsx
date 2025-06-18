import React from 'react';
import { ExternalLink, Heart, Building, Star, Zap, Award } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Enterprise Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Building className="w-8 h-8 text-blue-100" />
            <h3 className="text-2xl font-bold text-white">Enterprise AI Platform</h3>
            <Building className="w-8 h-8 text-blue-100" />
          </div>
          <p className="text-blue-100 font-medium">
            🏛️ Trusted by Government Agencies • Enterprise-Grade Security • Comprehensive AI Solutions
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-1 bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
              <Star className="w-3 h-3" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center space-x-1 bg-purple-700 text-white px-3 py-1 rounded-full text-sm">
              <Zap className="w-3 h-3" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-1 bg-green-700 text-white px-3 py-1 rounded-full text-sm">
              <Award className="w-3 h-3" />
              <span>Industry Leading</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">🚀 AI Adoption Platform</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              The most comprehensive AI adoption platform for government agencies. Built with advanced 
              conversational AI, expert personas, real-time simulation, and workflow automation. This platform 
              represents the future of government AI adoption - comprehensive, intelligent, and citizen-focused.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for public service innovation and digital transformation</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">React + TypeScript</span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs">Advanced AI</span>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">Voice Recognition</span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs">Real-time Simulation</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-md font-semibold mb-4">🎯 Platform Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>AI Expert Personas</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>Voice AI Assistant</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>Impact Simulator</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>Workflow Builder</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>AI Marketplace</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>Collaboration Hub</span>
              </li>
            </ul>
          </div>

          {/* Enterprise Info */}
          <div>
            <h4 className="text-md font-semibold mb-4">🏛️ Enterprise Solutions</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Building className="w-3 h-3 text-blue-500" />
                <span>Government Ready</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>Enterprise Security</span>
              </li>
              <li className="flex items-center space-x-2">
                <Award className="w-3 h-3 text-purple-500" />
                <span>Compliance Ready</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-green-500" />
                <span>Scalable Architecture</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart className="w-3 h-3 text-red-500" />
                <span>24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p>&copy; 2024 AI Adoption Platform. Enterprise-grade AI solutions for government.</p>
            <p className="text-xs mt-1">🎯 Comprehensive platform for digital transformation and public service innovation</p>
          </div>
          
          {/* Platform Badge */}
          <div className="flex items-center space-x-4">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-full text-sm font-medium transition-all duration-200 shadow-lg"
            >
              <Zap className="w-4 h-4" />
              <span>Powered by Advanced AI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mt-8 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-300">10+</div>
              <div className="text-xs text-blue-200">Advanced Features</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-300">4</div>
              <div className="text-xs text-purple-200">AI Expert Personas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-300">18</div>
              <div className="text-xs text-green-200">AI Use Cases</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">100%</div>
              <div className="text-xs text-yellow-200">Enterprise Ready</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;