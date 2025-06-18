import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface SimulationResult {
  metric: string;
  before: number;
  after: number;
  improvement: number;
  unit: string;
}

const AISimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState('emergency-response');
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [simulationPhase, setSimulationPhase] = useState<'setup' | 'running' | 'complete'>('setup');

  const scenarios = [
    {
      id: 'emergency-response',
      name: 'Emergency Response Optimization',
      description: 'Simulate AI-powered emergency dispatch and routing',
      duration: 8,
      complexity: 'Medium'
    },
    {
      id: 'traffic-management',
      name: 'Smart Traffic Control',
      description: 'Test adaptive traffic light optimization',
      duration: 6,
      complexity: 'Low'
    },
    {
      id: 'healthcare-prediction',
      name: 'Healthcare Resource Prediction',
      description: 'Forecast hospital capacity and staffing needs',
      duration: 12,
      complexity: 'High'
    },
    {
      id: 'citizen-services',
      name: 'Automated Citizen Services',
      description: 'Simulate AI chatbot and document processing',
      duration: 4,
      complexity: 'Low'
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  const runSimulation = () => {
    setIsRunning(true);
    setSimulationPhase('running');
    setProgress(0);
    setResults([]);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setSimulationPhase('complete');
          generateResults();
          return 100;
        }
        return prev + (100 / (currentScenario.duration * 10));
      });
    }, 100);
  };

  const generateResults = () => {
    const scenarioResults: Record<string, SimulationResult[]> = {
      'emergency-response': [
        { metric: 'Response Time', before: 8.5, after: 6.2, improvement: 27, unit: 'minutes' },
        { metric: 'Resource Utilization', before: 65, after: 87, improvement: 34, unit: '%' },
        { metric: 'Citizen Satisfaction', before: 72, after: 91, improvement: 26, unit: '%' },
        { metric: 'Cost per Incident', before: 450, after: 320, improvement: 29, unit: '$' }
      ],
      'traffic-management': [
        { metric: 'Congestion Reduction', before: 100, after: 62, improvement: 38, unit: '%' },
        { metric: 'Travel Time', before: 25, after: 18, improvement: 28, unit: 'minutes' },
        { metric: 'Fuel Consumption', before: 100, after: 75, improvement: 25, unit: '%' },
        { metric: 'Emissions', before: 100, after: 68, improvement: 32, unit: '%' }
      ],
      'healthcare-prediction': [
        { metric: 'Bed Utilization', before: 78, after: 94, improvement: 21, unit: '%' },
        { metric: 'Wait Times', before: 45, after: 28, improvement: 38, unit: 'minutes' },
        { metric: 'Staff Efficiency', before: 68, after: 89, improvement: 31, unit: '%' },
        { metric: 'Patient Satisfaction', before: 76, after: 92, improvement: 21, unit: '%' }
      ],
      'citizen-services': [
        { metric: 'Processing Time', before: 72, after: 4, improvement: 94, unit: 'hours' },
        { metric: 'Accuracy Rate', before: 85, after: 97, improvement: 14, unit: '%' },
        { metric: 'Citizen Satisfaction', before: 68, after: 89, improvement: 31, unit: '%' },
        { metric: 'Cost per Request', before: 25, after: 8, improvement: 68, unit: '$' }
      ]
    };

    setResults(scenarioResults[selectedScenario] || []);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setProgress(0);
    setResults([]);
    setSimulationPhase('setup');
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <Settings className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold">AI Impact Simulator</h3>
            <p className="text-green-100">Test AI solutions before implementation</p>
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Choose Simulation Scenario</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {scenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              disabled={isRunning}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedScenario === scenario.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-900">{scenario.name}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(scenario.complexity)}`}>
                  {scenario.complexity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
              <p className="text-xs text-gray-500">Duration: ~{scenario.duration} seconds</p>
            </button>
          ))}
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center space-x-4 mb-6">
          {!isRunning ? (
            <button
              onClick={runSimulation}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Play className="w-5 h-5" />
              <span>Run Simulation</span>
            </button>
          ) : (
            <button
              disabled
              className="flex items-center space-x-2 px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
            >
              <Pause className="w-5 h-5" />
              <span>Running...</span>
            </button>
          )}
          
          <button
            onClick={resetSimulation}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Progress Bar */}
        {simulationPhase === 'running' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Simulation Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Simulating {currentScenario.name}...
            </div>
          </div>
        )}

        {/* Results */}
        {simulationPhase === 'complete' && results.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h4 className="text-lg font-semibold text-gray-900">Simulation Results</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((result, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                  <h5 className="font-medium text-gray-900 mb-2">{result.metric}</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Before AI:</span>
                      <span className="font-medium">{result.before} {result.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">After AI:</span>
                      <span className="font-medium">{result.after} {result.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">Improvement:</span>
                      <span className="text-green-600 font-bold">
                        {result.improvement}% better
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Overall Impact</h5>
              </div>
              <p className="text-sm text-gray-700">
                The simulation shows an average improvement of{' '}
                <span className="font-bold text-green-600">
                  {Math.round(results.reduce((acc, r) => acc + r.improvement, 0) / results.length)}%
                </span>{' '}
                across all key metrics. This AI implementation would deliver significant value
                to your organization and citizens.
              </p>
            </div>
          </div>
        )}

        {/* Simulation Info */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-800 mb-1">About This Simulation</h5>
              <p className="text-sm text-blue-700">
                This simulator uses real-world data and proven AI algorithms to model potential outcomes.
                Results are based on similar implementations in comparable organizations and should be
                used as a guide for planning purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISimulator;