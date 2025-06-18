import { UseCase } from '../types';

export const useCases: UseCase[] = [
  {
    id: '1',
    title: 'AI-Powered Emergency Response Optimization',
    description: 'Intelligent system that optimizes emergency vehicle dispatch and routing based on real-time traffic, weather, and incident data.',
    sector: 'Public Safety',
    implementation: 'Deploy machine learning algorithms to analyze historical emergency response data, current traffic patterns, and weather conditions to recommend optimal routes and resource allocation.',
    benefits: [
      'Reduce emergency response times by 15-25%',
      'Optimize resource allocation across districts',
      'Improve coordination between multiple emergency services',
      'Enable predictive deployment of resources'
    ],
    difficulty: 'Medium',
    timeframe: '6-12 months',
    budget: '$250K - $500K',
    budgetRange: { min: 250000, max: 500000 },
    tags: ['Emergency Services', 'Optimization', 'Real-time Analytics'],
    impactLevel: 'Safety',
    risks: [
      'System reliability during critical emergencies',
      'Integration with existing emergency systems',
      'Data privacy and security concerns'
    ],
    stakeholders: ['Emergency Services Director', 'IT Department', 'City Manager', 'Public Safety Committee']
  },
  {
    id: '2',
    title: 'Predictive Healthcare Resource Management',
    description: 'AI system that forecasts hospital bed availability, staff scheduling, and medical supply needs based on seasonal patterns and real-time data.',
    sector: 'Healthcare',
    implementation: 'Implement predictive analytics using historical patient data, seasonal trends, and real-time hospital metrics to forecast resource needs and optimize allocation.',
    benefits: [
      'Reduce patient wait times by 20-30%',
      'Optimize staff scheduling and reduce overtime costs',
      'Prevent medical supply shortages',
      'Improve patient satisfaction scores'
    ],
    difficulty: 'High',
    timeframe: '12-18 months',
    budget: '$500K - $1M',
    budgetRange: { min: 500000, max: 1000000 },
    tags: ['Healthcare', 'Predictive Analytics', 'Resource Management'],
    impactLevel: 'Efficiency',
    risks: [
      'Patient data privacy and HIPAA compliance',
      'Algorithm bias in resource allocation',
      'Staff resistance to AI-driven scheduling'
    ],
    stakeholders: ['Hospital Administrator', 'Chief Medical Officer', 'IT Director', 'Department Heads']
  },
  {
    id: '3',
    title: 'Smart Traffic Light Optimization',
    description: 'Adaptive traffic control system that uses AI to optimize signal timing based on real-time traffic flow, pedestrian activity, and special events.',
    sector: 'Transportation',
    implementation: 'Install smart sensors and cameras at intersections, deploy edge computing devices, and implement AI algorithms to dynamically adjust traffic light timing.',
    benefits: [
      'Reduce traffic congestion by 25-40%',
      'Lower vehicle emissions through reduced idle time',
      'Improve pedestrian safety with adaptive crossing signals',
      'Reduce fuel consumption and travel time'
    ],
    difficulty: 'Medium',
    timeframe: '8-15 months',
    budget: '$300K - $800K',
    budgetRange: { min: 300000, max: 800000 },
    tags: ['Traffic Management', 'Smart Cities', 'Environmental Impact'],
    impactLevel: 'Efficiency',
    risks: [
      'System failures causing traffic disruptions',
      'Privacy concerns with traffic monitoring',
      'High upfront infrastructure costs'
    ],
    stakeholders: ['Transportation Director', 'City Engineer', 'Public Works', 'Environmental Committee']
  },
  {
    id: '4',
    title: 'Automated Permit and License Processing',
    description: 'AI-powered document processing system that automates the review, verification, and approval of permits and licenses.',
    sector: 'Administration',
    implementation: 'Deploy natural language processing and computer vision to automatically extract and verify information from submitted documents, cross-reference with databases, and flag issues.',
    benefits: [
      'Reduce processing time from weeks to hours',
      'Improve accuracy of document verification',
      'Free up staff for complex cases requiring human judgment',
      'Provide 24/7 application status updates'
    ],
    difficulty: 'Medium',
    timeframe: '4-8 months',
    budget: '$150K - $400K',
    budgetRange: { min: 150000, max: 400000 },
    tags: ['Document Processing', 'Automation', 'Citizen Services'],
    impactLevel: 'Efficiency',
    risks: [
      'Errors in automated document processing',
      'Legal compliance with approval processes',
      'Job displacement concerns among staff'
    ],
    stakeholders: ['City Clerk', 'Department Heads', 'IT Manager', 'Legal Counsel']
  },
  {
    id: '5',
    title: 'Personalized Learning Analytics Platform',
    description: 'AI system that analyzes student performance data to provide personalized learning recommendations and identify at-risk students early.',
    sector: 'Education',
    implementation: 'Integrate with existing student information systems, deploy machine learning models to analyze performance patterns, and create dashboards for teachers and administrators.',
    benefits: [
      'Improve student outcomes by 15-20%',
      'Identify at-risk students 6-8 weeks earlier',
      'Personalize learning paths for individual students',
      'Reduce dropout rates through early intervention'
    ],
    difficulty: 'High',
    timeframe: '10-16 months',
    budget: '$400K - $750K',
    budgetRange: { min: 400000, max: 750000 },
    tags: ['Education', 'Student Analytics', 'Early Intervention'],
    impactLevel: 'Innovation',
    risks: [
      'Student data privacy and FERPA compliance',
      'Algorithm bias affecting student assessments',
      'Teacher training and adoption challenges'
    ],
    stakeholders: ['Superintendent', 'Principal', 'Teachers', 'School Board', 'Parents']
  },
  {
    id: '6',
    title: 'Intelligent Waste Collection Optimization',
    description: 'Smart waste management system using IoT sensors and AI to optimize collection routes and schedules based on bin fill levels.',
    sector: 'Environment',
    implementation: 'Install IoT sensors in waste bins, implement route optimization algorithms, and create a central monitoring dashboard for waste management teams.',
    benefits: [
      'Reduce fuel consumption by 20-30%',
      'Minimize overflow incidents and citizen complaints',
      'Optimize workforce scheduling and vehicle maintenance',
      'Improve recycling rates through better monitoring'
    ],
    difficulty: 'Low',
    timeframe: '3-6 months',
    budget: '$100K - $300K',
    budgetRange: { min: 100000, max: 300000 },
    tags: ['Waste Management', 'IoT', 'Route Optimization'],
    impactLevel: 'Efficiency',
    risks: [
      'Sensor maintenance and replacement costs',
      'Weather impact on sensor reliability',
      'Initial resistance from collection crews'
    ],
    stakeholders: ['Public Works Director', 'Waste Management Supervisor', 'Environmental Committee', 'Budget Office']
  },
  {
    id: '7',
    title: 'AI-Enhanced Fraud Detection for Social Services',
    description: 'Machine learning system that detects fraudulent applications and improper payments in social welfare programs.',
    sector: 'Social Services',
    implementation: 'Analyze application patterns, cross-reference multiple databases, and use anomaly detection algorithms to identify potentially fraudulent claims.',
    benefits: [
      'Reduce fraudulent payments by 40-60%',
      'Protect legitimate beneficiaries from delays',
      'Improve program integrity and public trust',
      'Streamline investigation processes'
    ],
    difficulty: 'High',
    timeframe: '8-14 months',
    budget: '$350K - $600K',
    budgetRange: { min: 350000, max: 600000 },
    tags: ['Fraud Detection', 'Social Services', 'Anomaly Detection'],
    impactLevel: 'Revenue',
    risks: [
      'False positives affecting legitimate beneficiaries',
      'Data privacy and civil rights concerns',
      'Algorithm bias against certain populations'
    ],
    stakeholders: ['Social Services Director', 'Fraud Investigation Unit', 'Legal Department', 'Advocacy Groups']
  },
  {
    id: '8',
    title: 'Predictive Infrastructure Maintenance',
    description: 'AI system that predicts when roads, bridges, and public facilities need maintenance based on usage patterns, weather data, and structural sensors.',
    sector: 'Infrastructure',
    implementation: 'Deploy IoT sensors on critical infrastructure, analyze historical maintenance data, and implement predictive models to forecast maintenance needs.',
    benefits: [
      'Reduce infrastructure failure incidents by 30-50%',
      'Optimize maintenance budgets and scheduling',
      'Extend asset lifespan through proactive care',
      'Improve public safety through early intervention'
    ],
    difficulty: 'Medium',
    timeframe: '6-12 months',
    budget: '$200K - $500K',
    budgetRange: { min: 200000, max: 500000 },
    tags: ['Infrastructure', 'Predictive Maintenance', 'Asset Management'],
    impactLevel: 'Safety',
    risks: [
      'Sensor installation and maintenance costs',
      'False alarms leading to unnecessary maintenance',
      'Integration with existing asset management systems'
    ],
    stakeholders: ['Public Works Director', 'City Engineer', 'Maintenance Crews', 'Budget Committee']
  },
  {
    id: '9',
    title: 'Smart Energy Grid Management',
    description: 'AI-powered system that optimizes energy distribution and consumption across municipal facilities and public services.',
    sector: 'Energy',
    implementation: 'Integrate with existing energy management systems, deploy smart meters, and implement AI algorithms to predict and balance energy demand.',
    benefits: [
      'Reduce energy costs by 15-25%',
      'Minimize power outages and grid instability',
      'Optimize renewable energy integration',
      'Improve overall grid efficiency and reliability'
    ],
    difficulty: 'High',
    timeframe: '12-20 months',
    budget: '$600K - $1.2M',
    budgetRange: { min: 600000, max: 1200000 },
    tags: ['Energy Management', 'Smart Grid', 'Sustainability'],
    impactLevel: 'Efficiency',
    risks: [
      'Cybersecurity threats to critical infrastructure',
      'High complexity of grid integration',
      'Regulatory compliance challenges'
    ],
    stakeholders: ['Utilities Director', 'IT Security Team', 'Environmental Committee', 'City Council']
  },
  {
    id: '10',
    title: 'Automated Tax Assessment and Audit',
    description: 'AI system that automates property tax assessments and identifies potential tax audit candidates through pattern analysis.',
    sector: 'Finance',
    implementation: 'Analyze property data, market trends, and historical assessments using machine learning to ensure fair and accurate tax valuations.',
    benefits: [
      'Improve assessment accuracy and consistency',
      'Reduce manual review time by 60-70%',
      'Identify undervalued properties and tax gaps',
      'Ensure equitable taxation across all properties'
    ],
    difficulty: 'Medium',
    timeframe: '6-10 months',
    budget: '$250K - $450K',
    budgetRange: { min: 250000, max: 450000 },
    tags: ['Tax Assessment', 'Property Valuation', 'Revenue Optimization'],
    impactLevel: 'Revenue',
    risks: [
      'Legal challenges to AI-based assessments',
      'Property owner disputes and appeals',
      'Market volatility affecting accuracy'
    ],
    stakeholders: ['Tax Assessor', 'Finance Director', 'Legal Department', 'Property Owners']
  },
  {
    id: '11',
    title: 'AI-Powered Crime Prediction and Prevention',
    description: 'Predictive policing system that analyzes crime patterns, demographics, and environmental factors to forecast crime hotspots.',
    sector: 'Public Safety',
    implementation: 'Aggregate crime data, demographic information, and environmental factors to train machine learning models that predict high-risk areas and times.',
    benefits: [
      'Reduce crime rates by 10-20% in targeted areas',
      'Optimize police patrol routes and scheduling',
      'Enable proactive community policing strategies',
      'Improve resource allocation for crime prevention'
    ],
    difficulty: 'High',
    timeframe: '10-16 months',
    budget: '$400K - $800K',
    budgetRange: { min: 400000, max: 800000 },
    tags: ['Crime Prevention', 'Predictive Analytics', 'Community Safety'],
    impactLevel: 'Safety',
    risks: [
      'Algorithm bias leading to discriminatory policing',
      'Privacy concerns with predictive surveillance',
      'Community trust and transparency issues'
    ],
    stakeholders: ['Police Chief', 'Community Leaders', 'Civil Rights Groups', 'City Council']
  },
  {
    id: '12',
    title: 'Intelligent Citizen Service Chatbot',
    description: 'AI-powered conversational interface that helps citizens find information, complete forms, and access government services 24/7.',
    sector: 'Citizen Services',
    implementation: 'Deploy natural language processing and knowledge base integration to create a conversational AI that can handle common citizen inquiries and service requests.',
    benefits: [
      'Provide 24/7 citizen support and information access',
      'Reduce call center volume by 40-50%',
      'Improve citizen satisfaction with faster response times',
      'Free up staff for complex service requests'
    ],
    difficulty: 'Medium',
    timeframe: '4-8 months',
    budget: '$150K - $350K',
    budgetRange: { min: 150000, max: 350000 },
    tags: ['Citizen Services', 'Chatbot', 'Natural Language Processing'],
    impactLevel: 'Efficiency',
    risks: [
      'Misunderstanding complex citizen requests',
      'Accessibility challenges for diverse populations',
      'Maintaining accurate and up-to-date information'
    ],
    stakeholders: ['Customer Service Manager', 'IT Department', 'Department Heads', 'Citizens']
  },
  {
    id: '13',
    title: 'Environmental Air Quality Monitoring and Prediction',
    description: 'AI system that monitors air quality in real-time and predicts pollution levels to inform public health advisories.',
    sector: 'Environment',
    implementation: 'Deploy air quality sensors throughout the city, integrate weather data, and use machine learning to predict pollution levels and health impacts.',
    benefits: [
      'Provide accurate real-time air quality data',
      'Issue early warnings for high pollution events',
      'Inform policy decisions on traffic and industrial regulations',
      'Protect public health through timely advisories'
    ],
    difficulty: 'Medium',
    timeframe: '5-9 months',
    budget: '$200K - $400K',
    budgetRange: { min: 200000, max: 400000 },
    tags: ['Air Quality', 'Environmental Monitoring', 'Public Health'],
    impactLevel: 'Safety',
    risks: [
      'Sensor calibration and maintenance requirements',
      'Weather interference with measurements',
      'Public panic from pollution alerts'
    ],
    stakeholders: ['Environmental Health Director', 'Public Health Department', 'Emergency Management', 'Citizens']
  },
  {
    id: '14',
    title: 'Automated Building Code Compliance Checking',
    description: 'AI system that reviews building plans and automatically checks for code compliance, identifying violations and suggesting corrections.',
    sector: 'Urban Planning',
    implementation: 'Use computer vision and rule-based AI to analyze building plans, cross-reference with building codes, and generate compliance reports.',
    benefits: [
      'Reduce plan review time from weeks to days',
      'Improve consistency in code enforcement',
      'Reduce human error in compliance checking',
      'Accelerate construction project approvals'
    ],
    difficulty: 'High',
    timeframe: '8-14 months',
    budget: '$300K - $650K',
    budgetRange: { min: 300000, max: 650000 },
    tags: ['Building Codes', 'Compliance', 'Urban Planning'],
    impactLevel: 'Efficiency',
    risks: [
      'Complex building codes requiring human interpretation',
      'Liability issues with automated approvals',
      'Integration with existing permitting systems'
    ],
    stakeholders: ['Building Inspector', 'Planning Director', 'Architects', 'Contractors']
  },
  {
    id: '15',
    title: 'Smart Water Quality Monitoring System',
    description: 'AI-powered water quality monitoring system that detects contamination events and optimizes water treatment processes.',
    sector: 'Public Health',
    implementation: 'Install IoT sensors throughout the water distribution system, implement real-time data analysis, and use AI to detect anomalies and optimize treatment.',
    benefits: [
      'Detect contamination events within minutes',
      'Optimize water treatment chemical usage',
      'Reduce waterborne illness incidents',
      'Ensure compliance with water quality standards'
    ],
    difficulty: 'Medium',
    timeframe: '6-12 months',
    budget: '$250K - $500K',
    budgetRange: { min: 250000, max: 500000 },
    tags: ['Water Quality', 'Public Health', 'IoT Monitoring'],
    impactLevel: 'Safety',
    risks: [
      'False alarms causing unnecessary public concern',
      'Sensor fouling and maintenance challenges',
      'Cybersecurity threats to water infrastructure'
    ],
    stakeholders: ['Water Utilities Manager', 'Public Health Director', 'Environmental Engineer', 'Citizens']
  },
  {
    id: '16',
    title: 'AI-Enhanced Public Transit Optimization',
    description: 'Intelligent transit system that optimizes routes, schedules, and capacity based on ridership patterns and real-time demand.',
    sector: 'Transportation',
    implementation: 'Analyze ridership data, integrate with mobile apps and payment systems, and use AI to dynamically adjust routes and schedules.',
    benefits: [
      'Improve on-time performance by 20-30%',
      'Increase ridership through better service reliability',
      'Reduce operational costs through optimized routing',
      'Enhance accessibility for underserved communities'
    ],
    difficulty: 'High',
    timeframe: '10-18 months',
    budget: '$500K - $900K',
    budgetRange: { min: 500000, max: 900000 },
    tags: ['Public Transit', 'Route Optimization', 'Smart Cities'],
    impactLevel: 'Efficiency',
    risks: [
      'Disruption to existing transit operations',
      'Passenger resistance to schedule changes',
      'Integration complexity with legacy systems'
    ],
    stakeholders: ['Transit Authority Director', 'Operations Manager', 'Riders', 'City Council']
  },
  {
    id: '17',
    title: 'Digital Twin for City Planning',
    description: 'AI-powered digital twin of the city that simulates the impact of proposed developments, policy changes, and infrastructure projects.',
    sector: 'Urban Planning',
    implementation: 'Create a comprehensive digital model of the city using GIS data, IoT sensors, and simulation algorithms to model various scenarios and their impacts.',
    benefits: [
      'Visualize long-term impact of planning decisions',
      'Optimize resource allocation for maximum benefit',
      'Engage citizens with interactive planning tools',
      'Reduce costly mistakes in urban development'
    ],
    difficulty: 'High',
    timeframe: '15-24 months',
    budget: '$800K - $1.5M',
    budgetRange: { min: 800000, max: 1500000 },
    tags: ['Digital Twin', 'Urban Planning', 'Simulation'],
    impactLevel: 'Innovation',
    risks: [
      'High complexity and technical requirements',
      'Significant upfront investment costs',
      'Data integration challenges across departments'
    ],
    stakeholders: ['City Planner', 'GIS Manager', 'Department Heads', 'Citizens', 'Developers']
  },
  {
    id: '18',
    title: 'Automated Financial Anomaly Detection',
    description: 'AI system that monitors government financial transactions and budgets to detect unusual spending patterns and potential fraud.',
    sector: 'Finance',
    implementation: 'Implement machine learning algorithms to analyze spending patterns, vendor relationships, and budget allocations to identify anomalies and potential risks.',
    benefits: [
      'Detect financial irregularities in real-time',
      'Prevent fraud and improper spending',
      'Improve budget accuracy and compliance',
      'Enhance transparency and accountability'
    ],
    difficulty: 'Medium',
    timeframe: '6-10 months',
    budget: '$200K - $450K',
    budgetRange: { min: 200000, max: 450000 },
    tags: ['Financial Monitoring', 'Fraud Detection', 'Budget Management'],
    impactLevel: 'Revenue',
    risks: [
      'False positives disrupting normal operations',
      'Privacy concerns with financial monitoring',
      'Complexity of government accounting systems'
    ],
    stakeholders: ['Finance Director', 'Auditor', 'Department Heads', 'City Council']
  }
];

export const sectors = [
  'All Sectors',
  'Public Safety',
  'Healthcare',
  'Transportation',
  'Administration',
  'Education',
  'Environment',
  'Social Services',
  'Infrastructure',
  'Energy',
  'Finance',
  'Citizen Services',
  'Public Health',
  'Urban Planning'
];

export const impactLevels = [
  'All Impact Types',
  'Efficiency',
  'Safety',
  'Revenue',
  'Innovation'
];

export const budgetLevels = [
  'All Budget Levels',
  'Low ($50K - $200K)',
  'Medium ($200K - $600K)',
  'High ($600K+)'
];