export interface UseCase {
  id: string;
  title: string;
  description: string;
  sector: string;
  implementation: string;
  benefits: string[];
  difficulty: 'Low' | 'Medium' | 'High';
  timeframe: string;
  budget: string;
  budgetRange: { min: number; max: number };
  tags: string[];
  impactLevel: 'Efficiency' | 'Safety' | 'Revenue' | 'Innovation';
  risks: string[];
  stakeholders: string[];
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
}

export interface CostBenefitAnalysis {
  initialCost: string;
  ongoingCosts: string;
  expectedBenefits: string[];
  roi: string;
  paybackPeriod: string;
}

export interface ProjectProposal {
  title: string;
  objective: string;
  benefits: string[];
  estimatedBudget: string;
  timeline: string;
  risks: string[];
  nextSteps: string[];
}

export interface RiskAssessment {
  technicalRisks: string[];
  operationalRisks: string[];
  ethicalRisks: string[];
  mitigationStrategies: string[];
}

export interface StakeholderEmail {
  subject: string;
  greeting: string;
  body: string;
  callToAction: string;
  closing: string;
}

export interface ROICalculation {
  users: number;
  currentCost: number;
  expectedSavings: number;
  implementationCost: number;
  roi: number;
  paybackMonths: number;
}

export interface AITerm {
  term: string;
  definition: string;
  example: string;
  category: 'Core Concepts' | 'Technologies' | 'Applications' | 'Business Terms';
}

// Voice AI types
export interface VoiceSettings {
  voice: string;
  speed: number;
  pitch: number;
  volume: number;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

// Global speech recognition interface
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}