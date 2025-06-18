import React from 'react';
import { Clock, DollarSign, Users, ChevronRight, ExternalLink, FileText, AlertTriangle, Calculator, Mail, Sparkles, Zap } from 'lucide-react';
import { UseCase } from '../types';

interface UseCaseCardProps {
  useCase: UseCase;
  onLearnMore: (useCase: UseCase) => void;
  onGenerateCostBenefit: (useCase: UseCase) => void;
  onGenerateProposal: (useCase: UseCase) => void;
  onGenerateRiskAssessment: (useCase: UseCase) => void;
  onGenerateEmail: (useCase: UseCase) => void;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ 
  useCase, 
  onLearnMore, 
  onGenerateCostBenefit,
  onGenerateProposal,
  onGenerateRiskAssessment,
  onGenerateEmail
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Medium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'High':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Efficiency':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'Safety':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'Revenue':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Innovation':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const text = `Check out this AI use case: ${useCase.title} - ${useCase.description}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden transform hover:scale-105 hover:-translate-y-2">
      {/* Header with Gradient */}
      <div className="relative p-8 pb-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute top-4 right-4">
          <Sparkles className="w-6 h-6 text-purple-500 opacity-60" />
        </div>
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3 flex-wrap gap-2">
              <span className="inline-block px-4 py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg">
                {useCase.sector}
              </span>
              <span className={`inline-block px-4 py-2 text-xs font-bold rounded-full shadow-lg ${getDifficultyColor(useCase.difficulty)}`}>
                {useCase.difficulty}
              </span>
              <span className={`inline-block px-4 py-2 text-xs font-bold rounded-full shadow-lg ${getImpactColor(useCase.impactLevel)}`}>
                {useCase.impactLevel}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {useCase.title}
            </h3>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
          {useCase.description}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="px-8 pb-6">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-3 bg-blue-50 rounded-2xl p-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">{useCase.timeframe}</span>
          </div>
          <div className="flex items-center space-x-3 bg-green-50 rounded-2xl p-4">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-gray-700 font-medium">{useCase.budget}</span>
          </div>
          <div className="flex items-center space-x-3 bg-purple-50 rounded-2xl p-4">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700 font-medium">Multi-dept</span>
          </div>
        </div>
      </div>

      {/* Benefits Preview */}
      <div className="px-8 pb-6">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Key Benefits</span>
          </h4>
          <ul className="text-gray-700 space-y-3">
            {useCase.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-green-500 mt-1 text-lg">✨</span>
                <span className="font-medium">{benefit}</span>
              </li>
            ))}
            {useCase.benefits.length > 2 && (
              <li className="text-blue-600 font-bold text-lg">
                +{useCase.benefits.length - 2} more amazing benefits
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* One-Click Generators */}
      <div className="px-8 pb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-purple-600" />
          <span>AI Generators</span>
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onGenerateCostBenefit(useCase)}
            className="flex items-center space-x-2 px-4 py-3 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Calculator className="w-4 h-4" />
            <span className="font-medium">Cost-Benefit</span>
          </button>
          <button
            onClick={() => onGenerateProposal(useCase)}
            className="flex items-center space-x-2 px-4 py-3 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span className="font-medium">Proposal</span>
          </button>
          <button
            onClick={() => onGenerateRiskAssessment(useCase)}
            className="flex items-center space-x-2 px-4 py-3 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">Risk Assessment</span>
          </button>
          <button
            onClick={() => onGenerateEmail(useCase)}
            className="flex items-center space-x-2 px-4 py-3 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            <span className="font-medium">Email Draft</span>
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="px-8 pb-6">
        <div className="flex flex-wrap gap-2">
          {useCase.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-2 text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full font-medium border border-gray-200"
            >
              {tag}
            </span>
          ))}
          {useCase.tags.length > 3 && (
            <span className="inline-block px-3 py-2 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full font-bold border border-blue-200">
              +{useCase.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onLearnMore(useCase)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-bold transition-all duration-300 text-lg group"
          >
            <span>Learn More</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg"
            title="Share on LinkedIn"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseCaseCard;