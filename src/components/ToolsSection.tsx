import React from 'react';
import { Calculator, Book, Zap, Sparkles, TrendingUp } from 'lucide-react';

interface ToolsSectionProps {
  onShowROICalculator: () => void;
  onShowGlossary: () => void;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ onShowROICalculator, onShowGlossary }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-10 text-white mb-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Zap className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Universal AI Tools</h2>
            <p className="text-blue-100 text-lg">Essential tools for AI planning and adoption</p>
          </div>
          <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={onShowROICalculator}
            className="group bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-2xl p-8 text-left transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
                <Calculator className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ROI Calculator</h3>
                <div className="flex items-center space-x-2 text-green-200">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Calculate Returns</span>
                </div>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Calculate return on investment for your AI projects with customizable parameters and instant results. 
              Get detailed financial projections and payback analysis.
            </p>
          </button>

          <button
            onClick={onShowGlossary}
            className="group bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-2xl p-8 text-left transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors duration-300">
                <Book className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Glossary</h3>
                <div className="flex items-center space-x-2 text-purple-200">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Learn AI Terms</span>
                </div>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Simple explanations of AI terms and concepts for beginners and non-technical stakeholders. 
              Build your AI vocabulary with clear examples.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;