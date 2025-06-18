import React from 'react';
import { X, Clock, DollarSign, Users, CheckCircle, ExternalLink } from 'lucide-react';
import { UseCase } from '../types';

interface UseCaseModalProps {
  useCase: UseCase | null;
  isOpen: boolean;
  onClose: () => void;
}

const UseCaseModal: React.FC<UseCaseModalProps> = ({ useCase, isOpen, onClose }) => {
  if (!isOpen || !useCase) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const text = `Check out this AI use case for the public sector: ${useCase.title}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {useCase.sector}
              </span>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(useCase.difficulty)}`}>
                {useCase.difficulty} Complexity
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {useCase.title}
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {useCase.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Timeline</span>
                </div>
                <p className="text-gray-700">{useCase.timeframe}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Budget Range</span>
                </div>
                <p className="text-gray-700">{useCase.budget}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Involvement</span>
                </div>
                <p className="text-gray-700">Multi-department</p>
              </div>
            </div>

            {/* Implementation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Implementation Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                {useCase.implementation}
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected Benefits</h3>
              <div className="space-y-2">
                {useCase.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Want to implement this use case? Contact your innovation team for detailed planning.
              </p>
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Share on LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseModal;