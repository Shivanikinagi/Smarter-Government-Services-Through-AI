import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Brain, Zap, Users, Target, TrendingUp } from 'lucide-react';

interface AIPersona {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  personality: string;
  avatar: string;
  specialization: string;
}

const AIPersona: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<string>('alex');
  const [isThinking, setIsThinking] = useState(false);

  const personas: AIPersona[] = [
    {
      id: 'alex',
      name: 'Alex Chen',
      role: 'AI Strategy Consultant',
      expertise: ['Strategic Planning', 'ROI Analysis', 'Change Management'],
      personality: 'Analytical, Strategic, Results-driven',
      avatar: '🧠',
      specialization: 'Helps government leaders develop comprehensive AI adoption strategies'
    },
    {
      id: 'maya',
      name: 'Maya Rodriguez',
      role: 'Technical Implementation Expert',
      expertise: ['System Integration', 'Data Architecture', 'Security'],
      personality: 'Technical, Precise, Solution-oriented',
      avatar: '⚡',
      specialization: 'Guides technical teams through complex AI implementations'
    },
    {
      id: 'david',
      name: 'David Kim',
      role: 'Public Sector Innovation Lead',
      expertise: ['Government Operations', 'Citizen Services', 'Policy'],
      personality: 'Collaborative, Innovative, Citizen-focused',
      avatar: '🏛️',
      specialization: 'Specializes in citizen-facing AI solutions and public engagement'
    },
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      role: 'AI Ethics & Compliance Officer',
      expertise: ['AI Ethics', 'Regulatory Compliance', 'Risk Management'],
      personality: 'Thoughtful, Ethical, Risk-aware',
      avatar: '⚖️',
      specialization: 'Ensures AI implementations are ethical, fair, and compliant'
    }
  ];

  const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0];

  const simulateThinking = () => {
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 2000);
  };

  useEffect(() => {
    simulateThinking();
  }, [selectedPersona]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold">AI Expert Personas</h3>
            <p className="text-indigo-100">Choose your AI adoption expert</p>
          </div>
        </div>
      </div>

      {/* Persona Selection */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {personas.map(persona => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersona(persona.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedPersona === persona.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-2">{persona.avatar}</div>
              <h4 className="font-semibold text-gray-900">{persona.name}</h4>
              <p className="text-sm text-gray-600">{persona.role}</p>
            </button>
          ))}
        </div>

        {/* Selected Persona Details */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{currentPersona.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">{currentPersona.name}</h3>
                {isThinking && (
                  <div className="flex items-center space-x-1 text-indigo-600">
                    <Brain className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                )}
              </div>
              <p className="text-indigo-700 font-medium mb-2">{currentPersona.role}</p>
              <p className="text-gray-700 mb-4">{currentPersona.specialization}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Expertise Areas</h4>
                  <div className="space-y-1">
                    {currentPersona.expertise.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Personality</h4>
                  <p className="text-sm text-gray-700">{currentPersona.personality}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Persona Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">Focus Area</h4>
            </div>
            <p className="text-sm text-blue-700">
              {selectedPersona === 'alex' && 'Strategic planning and organizational transformation'}
              {selectedPersona === 'maya' && 'Technical architecture and system integration'}
              {selectedPersona === 'david' && 'Citizen engagement and service delivery'}
              {selectedPersona === 'sarah' && 'Ethical AI and regulatory compliance'}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-800">Success Metric</h4>
            </div>
            <p className="text-sm text-green-700">
              {selectedPersona === 'alex' && 'ROI improvement and strategic alignment'}
              {selectedPersona === 'maya' && 'System reliability and performance'}
              {selectedPersona === 'david' && 'Citizen satisfaction and engagement'}
              {selectedPersona === 'sarah' && 'Compliance and ethical standards'}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-purple-800">Best For</h4>
            </div>
            <p className="text-sm text-purple-700">
              {selectedPersona === 'alex' && 'C-level executives and department heads'}
              {selectedPersona === 'maya' && 'IT directors and technical teams'}
              {selectedPersona === 'david' && 'Service delivery managers'}
              {selectedPersona === 'sarah' && 'Legal and compliance teams'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            <Zap className="w-4 h-4" />
            <span>Get Personalized Advice</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
            <Brain className="w-4 h-4" />
            <span>AI Strategy Session</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            <Target className="w-4 h-4" />
            <span>Custom Roadmap</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPersona;