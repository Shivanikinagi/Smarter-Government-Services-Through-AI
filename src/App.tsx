import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import UseCaseCard from './components/UseCaseCard';
import UseCaseModal from './components/UseCaseModal';
import GeneratorModal from './components/GeneratorModal';
import ToolsSection from './components/ToolsSection';
import ROICalculator from './components/ROICalculator';
import AIGlossary from './components/AIGlossary';
import VoiceAI from './components/VoiceAI';
import AIMarketplace from './components/AIMarketplace';
import AIImpactTracker from './components/AIImpactTracker';
import AICollaborationHub from './components/AICollaborationHub';
import AIPersona from './components/AIPersona';
import AISimulator from './components/AISimulator';
import AIWorkflowBuilder from './components/AIWorkflowBuilder';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { useCases, sectors, impactLevels, budgetLevels } from './data/useCases';
import { UseCase } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedImpact, setSelectedImpact] = useState('All Impact Types');
  const [selectedBudget, setSelectedBudget] = useState('All Budget Levels');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [generatorType, setGeneratorType] = useState<'cost-benefit' | 'proposal' | 'risk' | 'email' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'use-cases' | 'roi-calculator' | 'glossary' | 'voice-ai' | 'marketplace' | 'impact-tracker' | 'collaboration' | 'personas' | 'simulator' | 'workflow-builder'>('use-cases');

  // Filter use cases based on all criteria
  const filteredUseCases = useMemo(() => {
    return useCases.filter((useCase) => {
      const matchesSearch = searchTerm === '' || 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSector = selectedSector === 'All Sectors' || useCase.sector === selectedSector;
      const matchesDifficulty = selectedDifficulty === 'All Levels' || useCase.difficulty === selectedDifficulty;
      const matchesImpact = selectedImpact === 'All Impact Types' || useCase.impactLevel === selectedImpact;
      
      const matchesBudget = selectedBudget === 'All Budget Levels' || 
        (selectedBudget === 'Low ($50K - $200K)' && useCase.budgetRange.max <= 200000) ||
        (selectedBudget === 'Medium ($200K - $600K)' && useCase.budgetRange.min >= 200000 && useCase.budgetRange.max <= 600000) ||
        (selectedBudget === 'High ($600K+)' && useCase.budgetRange.min >= 600000);

      return matchesSearch && matchesSector && matchesDifficulty && matchesImpact && matchesBudget;
    });
  }, [searchTerm, selectedSector, selectedDifficulty, selectedImpact, selectedBudget]);

  const handleLearnMore = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUseCase(null);
  };

  const handleGenerateContent = (useCase: UseCase, type: 'cost-benefit' | 'proposal' | 'risk' | 'email') => {
    setSelectedUseCase(useCase);
    setGeneratorType(type);
    setIsGeneratorModalOpen(true);
  };

  const handleCloseGeneratorModal = () => {
    setIsGeneratorModalOpen(false);
    setSelectedUseCase(null);
    setGeneratorType(null);
  };

  const handleClearFilters = () => {
    setSelectedSector('All Sectors');
    setSelectedDifficulty('All Levels');
    setSelectedImpact('All Impact Types');
    setSelectedBudget('All Budget Levels');
    setSearchTerm('');
  };

  const handleVoiceTranscription = (transcript: string) => {
    setSearchTerm(transcript);
  };

  const handleVoiceSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Extract search terms and apply filters based on voice input
    if (lowerQuery.includes('healthcare') || lowerQuery.includes('hospital') || lowerQuery.includes('medical')) {
      setSelectedSector('Healthcare');
    } else if (lowerQuery.includes('safety') || lowerQuery.includes('emergency') || lowerQuery.includes('police')) {
      setSelectedSector('Public Safety');
    } else if (lowerQuery.includes('traffic') || lowerQuery.includes('transportation') || lowerQuery.includes('transit')) {
      setSelectedSector('Transportation');
    } else if (lowerQuery.includes('education') || lowerQuery.includes('school') || lowerQuery.includes('student')) {
      setSelectedSector('Education');
    } else if (lowerQuery.includes('environment') || lowerQuery.includes('waste') || lowerQuery.includes('air quality')) {
      setSelectedSector('Environment');
    } else if (lowerQuery.includes('finance') || lowerQuery.includes('budget') || lowerQuery.includes('tax')) {
      setSelectedSector('Finance');
    }

    // Set budget filters based on voice input
    if (lowerQuery.includes('low cost') || lowerQuery.includes('cheap') || lowerQuery.includes('small budget')) {
      setSelectedBudget('Low ($50K - $200K)');
    } else if (lowerQuery.includes('high budget') || lowerQuery.includes('expensive') || lowerQuery.includes('large investment')) {
      setSelectedBudget('High ($600K+)');
    }

    // Set complexity filters
    if (lowerQuery.includes('simple') || lowerQuery.includes('easy') || lowerQuery.includes('low complexity')) {
      setSelectedDifficulty('Low');
    } else if (lowerQuery.includes('complex') || lowerQuery.includes('difficult') || lowerQuery.includes('advanced')) {
      setSelectedDifficulty('High');
    }

    // Switch to use cases view to show results
    setActiveView('use-cases');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section - Cleaner and More Focused */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <span>🚀</span>
            <span>World's Most Advanced AI Platform</span>
            <span>✨</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Government with
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> AI Intelligence</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            The ultimate AI adoption platform featuring conversational AI, expert personas, 
            real-time simulation, and comprehensive workflow automation.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-600">18+</div>
              <div className="text-sm text-gray-600">AI Use Cases</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-purple-600">4</div>
              <div className="text-sm text-gray-600">AI Experts</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-green-600">10+</div>
              <div className="text-sm text-gray-600">AI Tools</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Ready</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Cleaner Design */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-2 flex flex-wrap gap-2 max-w-full overflow-x-auto border border-white/20">
            <button
              onClick={() => setActiveView('voice-ai')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'voice-ai' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              🎤 Voice AI
            </button>
            <button
              onClick={() => setActiveView('personas')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'personas' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              🧠 AI Experts
            </button>
            <button
              onClick={() => setActiveView('simulator')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'simulator' 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              🔬 AI Simulator
            </button>
            <button
              onClick={() => setActiveView('workflow-builder')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'workflow-builder' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              ⚙️ Workflow Builder
            </button>
            <button
              onClick={() => setActiveView('use-cases')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'use-cases' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              🎯 Use Cases
            </button>
            <button
              onClick={() => setActiveView('marketplace')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'marketplace' 
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              🛒 Marketplace
            </button>
            <button
              onClick={() => setActiveView('impact-tracker')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'impact-tracker' 
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
            >
              📊 Impact Tracker
            </button>
            <button
              onClick={() => setActiveView('collaboration')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'collaboration' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              👥 Collaboration
            </button>
            <button
              onClick={() => setActiveView('roi-calculator')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'roi-calculator' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              💰 ROI Calculator
            </button>
            <button
              onClick={() => setActiveView('glossary')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeView === 'glossary' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              📚 AI Glossary
            </button>
          </div>
        </div>

        {/* Content based on active view */}
        {activeView === 'use-cases' && (
          <>
            {/* Universal Tools Section */}
            <ToolsSection 
              onShowROICalculator={() => setActiveView('roi-calculator')}
              onShowGlossary={() => setActiveView('glossary')}
            />

            {/* Search and Filters */}
            <SearchFilters
              selectedSector={selectedSector}
              onSectorChange={setSelectedSector}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedImpact={selectedImpact}
              onImpactChange={setSelectedImpact}
              selectedBudget={selectedBudget}
              onBudgetChange={setSelectedBudget}
              sectors={sectors}
              impactLevels={impactLevels}
              budgetLevels={budgetLevels}
              resultCount={filteredUseCases.length}
              onClearFilters={handleClearFilters}
            />

            {/* Use Cases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredUseCases.map((useCase) => (
                <UseCaseCard
                  key={useCase.id}
                  useCase={useCase}
                  onLearnMore={handleLearnMore}
                  onGenerateCostBenefit={(uc) => handleGenerateContent(uc, 'cost-benefit')}
                  onGenerateProposal={(uc) => handleGenerateContent(uc, 'proposal')}
                  onGenerateRiskAssessment={(uc) => handleGenerateContent(uc, 'risk')}
                  onGenerateEmail={(uc) => handleGenerateContent(uc, 'email')}
                />
              ))}
            </div>

            {/* No Results Message */}
            {filteredUseCases.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-6">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.566M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  No use cases found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find relevant AI solutions.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}

        {activeView === 'voice-ai' && (
          <div className="mb-16">
            <VoiceAI 
              onTranscription={handleVoiceTranscription}
              onVoiceSearch={handleVoiceSearch}
            />
          </div>
        )}

        {activeView === 'personas' && (
          <div className="mb-16">
            <AIPersona />
          </div>
        )}

        {activeView === 'simulator' && (
          <div className="mb-16">
            <AISimulator />
          </div>
        )}

        {activeView === 'workflow-builder' && (
          <div className="mb-16">
            <AIWorkflowBuilder />
          </div>
        )}

        {activeView === 'marketplace' && (
          <div className="mb-16">
            <AIMarketplace />
          </div>
        )}

        {activeView === 'impact-tracker' && (
          <div className="mb-16">
            <AIImpactTracker />
          </div>
        )}

        {activeView === 'collaboration' && (
          <div className="mb-16">
            <AICollaborationHub />
          </div>
        )}

        {activeView === 'roi-calculator' && (
          <div className="mb-16">
            <ROICalculator />
          </div>
        )}

        {activeView === 'glossary' && (
          <div className="mb-16">
            <AIGlossary />
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mb-16">
          <Newsletter />
        </div>
      </main>

      {/* Modals */}
      <UseCaseModal
        useCase={selectedUseCase}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <GeneratorModal
        isOpen={isGeneratorModalOpen}
        onClose={handleCloseGeneratorModal}
        useCase={selectedUseCase}
        generatorType={generatorType}
      />

      <Footer />
    </div>
  );
}

export default App;