import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, Play, Pause, MessageCircle, Search, Sparkles, Brain, Zap } from 'lucide-react';

interface VoiceAIProps {
  onTranscription?: (text: string) => void;
  onVoiceSearch?: (query: string) => void;
}

const VoiceAI: React.FC<VoiceAIProps> = ({ onTranscription, onVoiceSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'ai', message: string, timestamp: Date, persona?: string}>>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState('alex');
  const [isThinking, setIsThinking] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const aiPersonas = {
    alex: {
      name: 'Alex Chen',
      role: 'AI Strategy Expert',
      avatar: '🧠',
      voice: 'strategic and analytical',
      color: 'blue'
    },
    maya: {
      name: 'Maya Rodriguez', 
      role: 'Technical Implementation Lead',
      avatar: '⚡',
      voice: 'technical and precise',
      color: 'purple'
    },
    david: {
      name: 'David Kim',
      role: 'Public Sector Innovation',
      avatar: '🏛️',
      voice: 'collaborative and citizen-focused',
      color: 'green'
    },
    sarah: {
      name: 'Sarah Johnson',
      role: 'AI Ethics & Compliance',
      avatar: '⚖️',
      voice: 'thoughtful and ethical',
      color: 'orange'
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const finalTranscript = event.results[0][0].transcript;
        setTranscript(finalTranscript);
        handleUserInput(finalTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Add initial AI greeting with persona
    setConversation([{
      type: 'ai',
      message: `Hello! I'm ${aiPersonas[selectedPersona as keyof typeof aiPersonas].name}, your ${aiPersonas[selectedPersona as keyof typeof aiPersonas].role}. I'm here to help you navigate the world of AI adoption for government agencies. I can provide strategic insights, technical guidance, and help you build compelling proposals. What would you like to explore today?`,
      timestamp: new Date(),
      persona: selectedPersona
    }]);
  }, [selectedPersona]);

  // Handle user input (voice or text)
  const handleUserInput = (input: string) => {
    if (!input.trim()) return;

    // Add user message to conversation
    const userMessage = {
      type: 'user' as const,
      message: input,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setIsThinking(true);
    
    // Process the input and generate AI response
    setTimeout(() => {
      const aiResponse = generatePersonalizedAIResponse(input, selectedPersona);
      
      // Add AI response to conversation
      const aiMessage = {
        type: 'ai' as const,
        message: aiResponse,
        timestamp: new Date(),
        persona: selectedPersona
      };
      
      setConversation(prev => [...prev, aiMessage]);
      setIsThinking(false);
      speakResponse(aiResponse);
    }, 1000 + Math.random() * 1000); // Realistic thinking time

    // If it's a search query, trigger search
    if (isSearchQuery(input)) {
      onVoiceSearch?.(input);
    }

    onTranscription?.(input);
    setTranscript('');
  };

  // Generate personalized AI response based on selected persona
  const generatePersonalizedAIResponse = (input: string, persona: string): string => {
    const lowerInput = input.toLowerCase();
    const currentPersona = aiPersonas[persona as keyof typeof aiPersonas];
    
    // Persona-specific response patterns
    const responses = {
      alex: {
        greeting: `As your AI Strategy Expert, I'm excited to help you develop a comprehensive approach to AI adoption.`,
        cost: `From a strategic perspective, AI investments typically range from $100K to $1.5M. The key is aligning your investment with organizational goals. I recommend starting with a pilot project to demonstrate ROI before scaling. Would you like me to help you calculate potential returns for your specific use case?`,
        roi: `Excellent question! Strategic AI implementations typically deliver 15-40% annual ROI. The key factors are: 1) Clear success metrics, 2) Proper change management, 3) Stakeholder buy-in. I can help you build a compelling business case that executives will approve.`,
        implementation: `Strategic implementation requires a phased approach: 1) Assessment & Planning (2-4 weeks), 2) Pilot Project (3-6 months), 3) Scale & Optimize (6-12 months). This minimizes risk while maximizing learning. What's your organization's current AI maturity level?`
      },
      maya: {
        greeting: `As your Technical Implementation Lead, I'll guide you through the technical aspects of AI deployment.`,
        cost: `From a technical standpoint, costs vary by complexity: Simple automation ($50K-200K), Advanced ML systems ($200K-600K), Enterprise AI platforms ($600K+). Infrastructure, integration, and ongoing maintenance are key cost drivers. What's your technical environment like?`,
        roi: `Technical ROI comes from automation efficiency, reduced errors, and scalability. I've seen 60-80% reduction in manual processing time, 95%+ accuracy improvements, and 24/7 availability. The key is robust architecture and proper data pipelines.`,
        implementation: `Technical implementation follows these phases: 1) Architecture design, 2) Data preparation, 3) Model development, 4) Integration testing, 5) Production deployment. Security and scalability must be built in from day one. What's your current tech stack?`
      },
      david: {
        greeting: `As your Public Sector Innovation Lead, I focus on citizen-centered AI solutions that improve public services.`,
        cost: `For public sector AI, consider total citizen impact value. A $300K investment that serves 100K citizens costs just $3 per citizen annually. Focus on solutions that improve service delivery, reduce wait times, and enhance citizen satisfaction. What citizen services are you looking to improve?`,
        roi: `Public sector ROI includes citizen satisfaction, operational efficiency, and cost savings. I've seen 40% reduction in service delivery time, 25% increase in citizen satisfaction, and significant staff productivity gains. The real value is better serving your community.`,
        implementation: `Citizen-focused implementation requires: 1) Stakeholder engagement, 2) Accessibility compliance, 3) Privacy protection, 4) Transparent communication. Citizens must understand and trust the AI systems serving them. How do you currently engage with your community?`
      },
      sarah: {
        greeting: `As your AI Ethics & Compliance Officer, I ensure your AI implementations are responsible, fair, and compliant.`,
        cost: `Ethical AI implementation includes compliance costs: bias testing, privacy protection, audit trails, and ongoing monitoring. Budget 15-20% of total project cost for ethics and compliance. This investment protects your organization and builds public trust.`,
        roi: `Ethical AI delivers risk mitigation ROI: reduced legal exposure, maintained public trust, regulatory compliance, and sustainable operations. The cost of getting it wrong far exceeds the investment in getting it right. What compliance requirements do you face?`,
        implementation: `Ethical implementation requires: 1) Bias assessment, 2) Privacy impact analysis, 3) Transparency measures, 4) Ongoing monitoring, 5) Stakeholder feedback loops. Every AI system must be auditable and explainable. What are your main ethical concerns?`
      }
    };

    const personaResponses = responses[persona as keyof typeof responses];

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return personaResponses.greeting + ` What specific challenge can I help you address today?`;
    }
    
    if (lowerInput.includes('cost') || lowerInput.includes('budget') || lowerInput.includes('price')) {
      return personaResponses.cost;
    }
    
    if (lowerInput.includes('roi') || lowerInput.includes('return') || lowerInput.includes('investment')) {
      return personaResponses.roi;
    }
    
    if (lowerInput.includes('implement') || lowerInput.includes('deploy') || lowerInput.includes('start')) {
      return personaResponses.implementation;
    }

    // Persona-specific domain responses
    if (lowerInput.includes('strategy') && persona === 'alex') {
      return `Strategic AI adoption requires executive alignment, clear success metrics, and phased implementation. I recommend starting with a comprehensive AI readiness assessment. This identifies quick wins while building toward transformational initiatives. Would you like me to outline a strategic roadmap for your organization?`;
    }

    if (lowerInput.includes('technical') && persona === 'maya') {
      return `Technical success depends on robust data architecture, scalable infrastructure, and proper integration patterns. Key considerations include API design, data quality, security protocols, and monitoring systems. What's your current technical architecture? I can help identify integration points and potential challenges.`;
    }

    if (lowerInput.includes('citizen') && persona === 'david') {
      return `Citizen-centered AI design puts user experience first. This means intuitive interfaces, accessible design, multilingual support, and transparent processes. Citizens should feel empowered, not replaced, by AI systems. How do you currently measure citizen satisfaction with your services?`;
    }

    if (lowerInput.includes('ethics') || lowerInput.includes('bias') && persona === 'sarah') {
      return `AI ethics requires proactive bias testing, algorithmic auditing, and transparent decision-making processes. Every AI system should be explainable to affected citizens. I recommend establishing an AI ethics board and regular bias assessments. What populations does your AI system serve?`;
    }

    // General intelligent responses with persona flavor
    const generalResponses = [
      `Based on my experience as ${currentPersona.name}, I'd recommend focusing on ${persona === 'alex' ? 'strategic alignment and stakeholder buy-in' : persona === 'maya' ? 'technical architecture and data quality' : persona === 'david' ? 'citizen impact and service improvement' : 'ethical considerations and compliance'}. Could you tell me more about your specific situation?`,
      `That's an excellent question! As ${currentPersona.name}, I've seen similar challenges across government agencies. The key is ${persona === 'alex' ? 'building a compelling business case' : persona === 'maya' ? 'ensuring robust technical implementation' : persona === 'david' ? 'maintaining citizen focus throughout the process' : 'establishing ethical guidelines from the start'}. What's your primary concern?`,
      `From my ${currentPersona.voice} perspective, "${input}" touches on critical aspects of AI adoption. I'd suggest ${persona === 'alex' ? 'developing a strategic framework' : persona === 'maya' ? 'conducting a technical feasibility study' : persona === 'david' ? 'engaging with citizen stakeholders' : 'performing an ethical impact assessment'}. How can I help you move forward?`
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  // Check if input is a search query
  const isSearchQuery = (input: string): boolean => {
    const searchKeywords = ['search', 'find', 'look for', 'show me', 'healthcare', 'safety', 'traffic', 'education', 'finance'];
    return searchKeywords.some(keyword => input.toLowerCase().includes(keyword));
  };

  // Speak AI response with persona-appropriate voice
  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = selectedPersona === 'sarah' ? 1.1 : selectedPersona === 'maya' ? 0.9 : 1;
      utterance.volume = 0.8;
      
      // Find appropriate voice for persona
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => {
        if (selectedPersona === 'sarah') return voice.name.includes('Female') && voice.lang.startsWith('en');
        if (selectedPersona === 'maya') return voice.name.includes('Google') && voice.lang.startsWith('en');
        return voice.lang.startsWith('en') && (voice.name.includes('Google') || voice.name.includes('Microsoft'));
      });
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  // Start/Stop Speech Recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setError(null);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Stop current speech
  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Handle text input
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    if (input.value.trim()) {
      handleUserInput(input.value);
      input.value = '';
    }
  };

  const getPersonaColor = (persona: string) => {
    const colors = {
      alex: 'blue',
      maya: 'purple', 
      david: 'green',
      sarah: 'orange'
    };
    return colors[persona as keyof typeof colors] || 'blue';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold">Advanced AI Assistant</h3>
            <p className="text-purple-100">Enterprise conversational AI with expert personas</p>
          </div>
        </div>
      </div>

      {/* Persona Selector */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Choose Your AI Expert:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(aiPersonas).map(([key, persona]) => (
            <button
              key={key}
              onClick={() => setSelectedPersona(key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPersona === key
                  ? `bg-${persona.color}-600 text-white`
                  : `bg-white text-gray-700 hover:bg-${persona.color}-50 border border-gray-200`
              }`}
            >
              <span>{persona.avatar}</span>
              <span>{persona.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Area */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : `bg-white text-gray-800 border border-gray-200 shadow-sm`
              }`}
            >
              {message.type === 'ai' && message.persona && (
                <div className="flex items-center space-x-2 mb-2 text-xs">
                  <span>{aiPersonas[message.persona as keyof typeof aiPersonas].avatar}</span>
                  <span className={`text-${getPersonaColor(message.persona)}-600 font-medium`}>
                    {aiPersonas[message.persona as keyof typeof aiPersonas].name}
                  </span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.message}</p>
              <p className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-yellow-100 border border-yellow-200 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-yellow-600 animate-pulse" />
                <span className="text-sm text-yellow-800">
                  {aiPersonas[selectedPersona as keyof typeof aiPersonas].name} is thinking...
                </span>
              </div>
            </div>
          </div>
        )}
        
        {isListening && (
          <div className="flex justify-start">
            <div className="bg-red-100 border border-red-200 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-red-800">Listening for your voice...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-200">
        <form onSubmit={handleTextSubmit} className="flex items-center space-x-3 mb-4">
          <input
            type="text"
            placeholder={`Ask ${aiPersonas[selectedPersona as keyof typeof aiPersonas].name} anything about AI adoption...`}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
          >
            Send
          </button>
        </form>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleListening}
              disabled={isPlaying}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isListening
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? 'Stop Listening' : 'Voice Input'}</span>
            </button>

            {isPlaying && (
              <button
                onClick={stopSpeech}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                <Pause className="w-4 h-4" />
                <span>Stop AI Voice</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {isPlaying && (
              <>
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span className="text-purple-600 font-medium">
                  {aiPersonas[selectedPersona as keyof typeof aiPersonas].name} speaking...
                </span>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => handleUserInput("What's the ROI for AI in government?")}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors duration-200"
          >
            💰 Calculate ROI
          </button>
          <button
            onClick={() => handleUserInput("How do I get started with AI implementation?")}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors duration-200"
          >
            🚀 Getting Started
          </button>
          <button
            onClick={() => handleUserInput("What are the main risks of AI in government?")}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors duration-200"
          >
            ⚠️ Risk Assessment
          </button>
          <button
            onClick={() => handleUserInput("Show me citizen service AI solutions")}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors duration-200"
          >
            👥 Citizen Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAI;