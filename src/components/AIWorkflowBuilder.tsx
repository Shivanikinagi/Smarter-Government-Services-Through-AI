import React, { useState, useCallback } from 'react';
import { Plus, Trash2, ArrowRight, Settings, Play, Save, Download } from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'ai-process';
  title: string;
  description: string;
  config: Record<string, any>;
}

const AIWorkflowBuilder: React.FC = () => {
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([
    {
      id: '1',
      type: 'trigger',
      title: 'Citizen Request Received',
      description: 'When a new service request is submitted',
      config: { source: 'web-form' }
    }
  ]);
  
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const stepTypes = [
    {
      type: 'trigger',
      title: 'Trigger',
      description: 'Start the workflow',
      icon: '🚀',
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
      type: 'ai-process',
      title: 'AI Processing',
      description: 'Apply AI analysis',
      icon: '🤖',
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    },
    {
      type: 'condition',
      title: 'Condition',
      description: 'Decision point',
      icon: '❓',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
      type: 'action',
      title: 'Action',
      description: 'Perform an action',
      icon: '⚡',
      color: 'bg-green-100 border-green-300 text-green-800'
    }
  ];

  const addStep = (type: WorkflowStep['type']) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type,
      title: getDefaultTitle(type),
      description: getDefaultDescription(type),
      config: {}
    };
    
    setWorkflow(prev => [...prev, newStep]);
  };

  const removeStep = (id: string) => {
    setWorkflow(prev => prev.filter(step => step.id !== id));
  };

  const getDefaultTitle = (type: WorkflowStep['type']): string => {
    switch (type) {
      case 'trigger': return 'New Trigger';
      case 'ai-process': return 'AI Analysis';
      case 'condition': return 'Check Condition';
      case 'action': return 'Take Action';
      default: return 'New Step';
    }
  };

  const getDefaultDescription = (type: WorkflowStep['type']): string => {
    switch (type) {
      case 'trigger': return 'Define when this workflow starts';
      case 'ai-process': return 'Apply AI processing to the data';
      case 'condition': return 'Check if conditions are met';
      case 'action': return 'Perform an automated action';
      default: return 'Configure this step';
    }
  };

  const getStepIcon = (type: WorkflowStep['type']): string => {
    const stepType = stepTypes.find(st => st.type === type);
    return stepType?.icon || '⚙️';
  };

  const getStepColor = (type: WorkflowStep['type']): string => {
    const stepType = stepTypes.find(st => st.type === type);
    return stepType?.color || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const runWorkflow = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  const saveWorkflow = () => {
    const workflowData = {
      name: 'Custom AI Workflow',
      steps: workflow,
      created: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(workflowData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-workflow.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">AI Workflow Builder</h3>
              <p className="text-purple-100">Design custom AI automation workflows</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={runWorkflow}
              disabled={isRunning || workflow.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? 'Running...' : 'Test Run'}</span>
            </button>
            
            <button
              onClick={saveWorkflow}
              className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Step Types */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Add Workflow Steps</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stepTypes.map(stepType => (
              <button
                key={stepType.type}
                onClick={() => addStep(stepType.type as WorkflowStep['type'])}
                className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 text-center"
              >
                <div className="text-2xl mb-1">{stepType.icon}</div>
                <div className="text-sm font-medium text-gray-900">{stepType.title}</div>
                <div className="text-xs text-gray-600">{stepType.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Workflow Design</h4>
          <div className="bg-gray-50 rounded-lg p-6 min-h-64">
            {workflow.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <Settings className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Start building your workflow by adding steps above</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workflow.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-4">
                    {/* Step Card */}
                    <div
                      className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedStep === step.id
                          ? 'border-purple-500 bg-purple-50'
                          : `${getStepColor(step.type)} hover:shadow-md`
                      }`}
                      onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getStepIcon(step.type)}</div>
                        <div className="flex-1">
                          <h5 className="font-medium">{step.title}</h5>
                          <p className="text-sm opacity-75">{step.description}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeStep(step.id);
                          }}
                          className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Running Animation */}
                      {isRunning && (
                        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full transition-all duration-300"
                            style={{ 
                              width: '100%',
                              animation: `slideIn 0.5s ease-in-out ${index * 0.5}s both`
                            }}
                          ></div>
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    {index < workflow.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Step Configuration */}
        {selectedStep && (
          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Configure Step</h4>
            {(() => {
              const step = workflow.find(s => s.id === selectedStep);
              if (!step) return null;

              return (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        setWorkflow(prev => prev.map(s => 
                          s.id === selectedStep ? { ...s, title: e.target.value } : s
                        ));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        setWorkflow(prev => prev.map(s => 
                          s.id === selectedStep ? { ...s, description: e.target.value } : s
                        ));
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Step-specific configuration */}
                  {step.type === 'ai-process' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AI Model
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                        <option>Document Classification</option>
                        <option>Sentiment Analysis</option>
                        <option>Entity Extraction</option>
                        <option>Priority Scoring</option>
                      </select>
                    </div>
                  )}

                  {step.type === 'condition' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condition Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                        <option>If confidence score {'>'} 80%</option>
                        <option>If priority = High</option>
                        <option>If department = Emergency</option>
                        <option>If business hours</option>
                      </select>
                    </div>
                  )}

                  {step.type === 'action' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Action Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                        <option>Send Email Notification</option>
                        <option>Create Ticket</option>
                        <option>Route to Department</option>
                        <option>Update Database</option>
                      </select>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Workflow Templates */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Start Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-lg border border-indigo-200 hover:border-indigo-400 transition-all duration-200 text-left">
              <h5 className="font-medium text-gray-900 mb-1">Citizen Request Processing</h5>
              <p className="text-sm text-gray-600">Automated intake, classification, and routing</p>
            </button>
            
            <button className="p-4 bg-white rounded-lg border border-purple-200 hover:border-purple-400 transition-all duration-200 text-left">
              <h5 className="font-medium text-gray-900 mb-1">Emergency Response</h5>
              <p className="text-sm text-gray-600">Priority assessment and resource dispatch</p>
            </button>
            
            <button className="p-4 bg-white rounded-lg border border-pink-200 hover:border-pink-400 transition-all duration-200 text-left">
              <h5 className="font-medium text-gray-900 mb-1">Document Approval</h5>
              <p className="text-sm text-gray-600">Automated review and approval workflow</p>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AIWorkflowBuilder;