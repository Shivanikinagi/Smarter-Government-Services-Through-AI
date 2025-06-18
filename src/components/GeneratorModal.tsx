import React, { useState } from 'react';
import { X, Copy, Download, CheckCircle, Calculator, FileText, AlertTriangle, Mail } from 'lucide-react';
import { UseCase, CostBenefitAnalysis, ProjectProposal, RiskAssessment, StakeholderEmail } from '../types';

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  useCase: UseCase | null;
  generatorType: 'cost-benefit' | 'proposal' | 'risk' | 'email' | null;
}

const GeneratorModal: React.FC<GeneratorModalProps> = ({ isOpen, onClose, useCase, generatorType }) => {
  const [copied, setCopied] = useState(false);
  const [emailType, setEmailType] = useState<'proposal' | 'approval' | 'budget'>('proposal');

  if (!isOpen || !useCase || !generatorType) return null;

  const generateCostBenefit = (useCase: UseCase): CostBenefitAnalysis => {
    const avgCost = (useCase.budgetRange.min + useCase.budgetRange.max) / 2;
    const annualSavings = Math.round(avgCost * 0.3); // Assume 30% annual savings
    const roi = Math.round((annualSavings / avgCost) * 100);
    const paybackMonths = Math.round((avgCost / annualSavings) * 12);

    return {
      initialCost: `$${(avgCost / 1000).toFixed(0)}K implementation cost`,
      ongoingCosts: `$${Math.round(avgCost * 0.15 / 1000)}K annual maintenance and support`,
      expectedBenefits: [
        `Annual cost savings: $${(annualSavings / 1000).toFixed(0)}K`,
        `Efficiency improvements: 20-40% reduction in manual processes`,
        `Risk reduction: Minimize human error and compliance issues`,
        `Scalability: Handle increased workload without proportional cost increase`
      ],
      roi: `${roi}% annual ROI`,
      paybackPeriod: `${paybackMonths} months payback period`
    };
  };

  const generateProposal = (useCase: UseCase): ProjectProposal => {
    return {
      title: `AI Implementation Proposal: ${useCase.title}`,
      objective: `Implement ${useCase.title.toLowerCase()} to ${useCase.benefits[0].toLowerCase()} and improve operational efficiency in the ${useCase.sector.toLowerCase()} sector.`,
      benefits: useCase.benefits,
      estimatedBudget: useCase.budget,
      timeline: useCase.timeframe,
      risks: useCase.risks,
      nextSteps: [
        'Conduct detailed feasibility study and stakeholder analysis',
        'Develop comprehensive project plan and timeline',
        'Secure budget approval and resource allocation',
        'Begin vendor selection and procurement process',
        'Establish project team and governance structure'
      ]
    };
  };

  const generateRiskAssessment = (useCase: UseCase): RiskAssessment => {
    return {
      technicalRisks: [
        'System integration challenges with legacy infrastructure',
        'Data quality and availability issues',
        'Scalability limitations during peak usage',
        'Cybersecurity vulnerabilities and data breaches'
      ],
      operationalRisks: [
        'Staff resistance to new technology adoption',
        'Insufficient training and change management',
        'Disruption to current business processes',
        'Vendor dependency and support reliability'
      ],
      ethicalRisks: [
        'Algorithm bias leading to unfair outcomes',
        'Privacy concerns with data collection and usage',
        'Transparency and explainability of AI decisions',
        'Accountability for automated decision-making'
      ],
      mitigationStrategies: [
        'Implement comprehensive testing and validation protocols',
        'Develop robust change management and training programs',
        'Establish clear governance and oversight mechanisms',
        'Ensure compliance with relevant regulations and standards',
        'Create fallback procedures for system failures',
        'Regular audits and bias testing of AI algorithms'
      ]
    };
  };

  const generateEmail = (useCase: UseCase, type: 'proposal' | 'approval' | 'budget'): StakeholderEmail => {
    const emails = {
      proposal: {
        subject: `AI Innovation Opportunity: ${useCase.title}`,
        greeting: 'Dear [Stakeholder Name],',
        body: `I hope this email finds you well. I wanted to bring to your attention an exciting AI implementation opportunity that could significantly benefit our ${useCase.sector.toLowerCase()} operations.

**Project Overview:**
${useCase.description}

**Key Benefits:**
${useCase.benefits.map(benefit => `• ${benefit}`).join('\n')}

**Investment Required:** ${useCase.budget}
**Timeline:** ${useCase.timeframe}
**Complexity Level:** ${useCase.difficulty}

This initiative aligns perfectly with our digital transformation goals and could deliver substantial improvements in efficiency and service quality. I believe this presents a valuable opportunity to modernize our operations while delivering measurable benefits to our stakeholders.`,
        callToAction: 'I would welcome the opportunity to discuss this proposal in more detail and answer any questions you may have. Would you be available for a brief meeting next week to explore this further?',
        closing: 'Thank you for your time and consideration.\n\nBest regards,\n[Your Name]\n[Your Title]\n[Contact Information]'
      },
      approval: {
        subject: `Request for Approval: ${useCase.title} Implementation`,
        greeting: 'Dear [Approver Name],',
        body: `I am writing to request your approval for the implementation of ${useCase.title} in our ${useCase.sector.toLowerCase()} department.

**Project Summary:**
${useCase.description}

**Business Justification:**
${useCase.benefits.slice(0, 3).map(benefit => `• ${benefit}`).join('\n')}

**Resource Requirements:**
• Budget: ${useCase.budget}
• Timeline: ${useCase.timeframe}
• Stakeholders: ${useCase.stakeholders.join(', ')}

**Risk Mitigation:**
We have conducted a thorough risk assessment and developed comprehensive mitigation strategies to ensure successful implementation with minimal disruption to current operations.`,
        callToAction: 'I respectfully request your approval to proceed with this initiative. I am available to provide additional details or address any concerns you may have.',
        closing: 'Thank you for your consideration.\n\nRespectfully,\n[Your Name]\n[Your Title]\n[Department]'
      },
      budget: {
        subject: `Budget Request: ${useCase.title} - ${useCase.budget}`,
        greeting: 'Dear Budget Committee,',
        body: `I am submitting a formal budget request for the implementation of ${useCase.title} to enhance our ${useCase.sector.toLowerCase()} capabilities.

**Financial Overview:**
• Total Investment: ${useCase.budget}
• Implementation Period: ${useCase.timeframe}
• Expected ROI: 25-40% annually

**Cost Breakdown:**
• Software/Technology: 60% of budget
• Implementation Services: 25% of budget
• Training and Change Management: 10% of budget
• Contingency: 5% of budget

**Expected Returns:**
${useCase.benefits.map(benefit => `• ${benefit}`).join('\n')}

**Budget Justification:**
This investment will modernize our operations, improve service delivery, and generate significant cost savings that will offset the initial investment within ${useCase.difficulty === 'Low' ? '12-18' : useCase.difficulty === 'Medium' ? '18-24' : '24-36'} months.`,
        callToAction: 'I request approval for this budget allocation and would be happy to provide additional financial analysis or answer any questions during the budget review process.',
        closing: 'Thank you for your consideration.\n\nSincerely,\n[Your Name]\n[Your Title]\n[Department/Organization]'
      }
    };

    return emails[type];
  };

  const getContent = () => {
    switch (generatorType) {
      case 'cost-benefit':
        return generateCostBenefit(useCase);
      case 'proposal':
        return generateProposal(useCase);
      case 'risk':
        return generateRiskAssessment(useCase);
      case 'email':
        return generateEmail(useCase, emailType);
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (generatorType) {
      case 'cost-benefit':
        return 'Cost-Benefit Analysis';
      case 'proposal':
        return 'Project Proposal';
      case 'risk':
        return 'Risk Assessment';
      case 'email':
        return 'Stakeholder Email Draft';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (generatorType) {
      case 'cost-benefit':
        return <Calculator className="w-6 h-6 text-green-600" />;
      case 'proposal':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'risk':
        return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'email':
        return <Mail className="w-6 h-6 text-purple-600" />;
      default:
        return null;
    }
  };

  const content = getContent();

  const copyToClipboard = () => {
    let textToCopy = '';
    
    if (generatorType === 'cost-benefit') {
      const cb = content as CostBenefitAnalysis;
      textToCopy = `Cost-Benefit Analysis: ${useCase.title}\n\n` +
        `Initial Cost: ${cb.initialCost}\n` +
        `Ongoing Costs: ${cb.ongoingCosts}\n\n` +
        `Expected Benefits:\n${cb.expectedBenefits.map(b => `• ${b}`).join('\n')}\n\n` +
        `ROI: ${cb.roi}\n` +
        `Payback Period: ${cb.paybackPeriod}`;
    } else if (generatorType === 'proposal') {
      const prop = content as ProjectProposal;
      textToCopy = `${prop.title}\n\n` +
        `Objective: ${prop.objective}\n\n` +
        `Benefits:\n${prop.benefits.map(b => `• ${b}`).join('\n')}\n\n` +
        `Budget: ${prop.estimatedBudget}\n` +
        `Timeline: ${prop.timeline}\n\n` +
        `Risks:\n${prop.risks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Next Steps:\n${prop.nextSteps.map(s => `• ${s}`).join('\n')}`;
    } else if (generatorType === 'risk') {
      const risk = content as RiskAssessment;
      textToCopy = `Risk Assessment: ${useCase.title}\n\n` +
        `Technical Risks:\n${risk.technicalRisks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Operational Risks:\n${risk.operationalRisks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Ethical Risks:\n${risk.ethicalRisks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Mitigation Strategies:\n${risk.mitigationStrategies.map(s => `• ${s}`).join('\n')}`;
    } else if (generatorType === 'email') {
      const email = content as StakeholderEmail;
      textToCopy = `Subject: ${email.subject}\n\n` +
        `${email.greeting}\n\n${email.body}\n\n${email.callToAction}\n\n${email.closing}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    let textToDownload = '';
    let filename = '';
    
    if (generatorType === 'cost-benefit') {
      const cb = content as CostBenefitAnalysis;
      textToDownload = `Cost-Benefit Analysis: ${useCase.title}\n\n` +
        `Initial Cost: ${cb.initialCost}\n` +
        `Ongoing Costs: ${cb.ongoingCosts}\n\n` +
        `Expected Benefits:\n${cb.expectedBenefits.map(b => `• ${b}`).join('\n')}\n\n` +
        `ROI: ${cb.roi}\n` +
        `Payback Period: ${cb.paybackPeriod}`;
      filename = `cost-benefit-${useCase.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    } else if (generatorType === 'proposal') {
      const prop = content as ProjectProposal;
      textToDownload = `${prop.title}\n\n` +
        `Objective: ${prop.objective}\n\n` +
        `Benefits:\n${prop.benefits.map(b => `• ${b}`).join('\n')}\n\n` +
        `Budget: ${prop.estimatedBudget}\n` +
        `Timeline: ${prop.timeline}\n\n` +
        `Risks:\n${prop.risks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Next Steps:\n${prop.nextSteps.map(s => `• ${s}`).join('\n')}`;
      filename = `proposal-${useCase.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    } else if (generatorType === 'risk') {
      const risk = content as RiskAssessment;
      textToDownload = `Risk Assessment: ${useCase.title}\n\n` +
        `Technical Risks:\n${risk.technicalRisks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Operational Risks:\n${risk.operationalRisks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Ethical Risks:\n${risk.ethicalRisks.map(r => `• ${r}`).join('\n')}\n\n` +
        `Mitigation Strategies:\n${risk.mitigationStrategies.map(s => `• ${s}`).join('\n')}`;
      filename = `risk-assessment-${useCase.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    } else if (generatorType === 'email') {
      const email = content as StakeholderEmail;
      textToDownload = `Subject: ${email.subject}\n\n` +
        `${email.greeting}\n\n${email.body}\n\n${email.callToAction}\n\n${email.closing}`;
      filename = `email-draft-${useCase.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    }

    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              {getIcon()}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{getTitle()}</h2>
                <p className="text-sm text-gray-600">{useCase.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Email Type Selector */}
          {generatorType === 'email' && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Type:
              </label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value as 'proposal' | 'approval' | 'budget')}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="proposal">Project Proposal</option>
                <option value="approval">Approval Request</option>
                <option value="budget">Budget Request</option>
              </select>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {generatorType === 'cost-benefit' && (
              <div className="space-y-6">
                {(() => {
                  const cb = content as CostBenefitAnalysis;
                  return (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Analysis</h3>
                        <div className="bg-red-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-red-800 mb-2">Initial Cost</h4>
                          <p className="text-red-700">{cb.initialCost}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4">
                          <h4 className="font-medium text-orange-800 mb-2">Ongoing Costs</h4>
                          <p className="text-orange-700">{cb.ongoingCosts}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected Benefits</h3>
                        <div className="bg-green-50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {cb.expectedBenefits.map((benefit, index) => (
                              <li key={index} className="flex items-start space-x-2 text-green-700">
                                <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-800 mb-2">Return on Investment</h4>
                          <p className="text-2xl font-bold text-blue-700">{cb.roi}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-medium text-purple-800 mb-2">Payback Period</h4>
                          <p className="text-2xl font-bold text-purple-700">{cb.paybackPeriod}</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {generatorType === 'proposal' && (
              <div className="space-y-6">
                {(() => {
                  const prop = content as ProjectProposal;
                  return (
                    <>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{prop.title}</h3>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Objective</h4>
                        <p className="text-gray-700 leading-relaxed">{prop.objective}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Expected Benefits</h4>
                        <ul className="space-y-2">
                          {prop.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Budget</h4>
                          <p className="text-gray-700">{prop.estimatedBudget}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h4>
                          <p className="text-gray-700">{prop.timeline}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Risks</h4>
                        <ul className="space-y-2">
                          {prop.risks.map((risk, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h4>
                        <ol className="space-y-2">
                          {prop.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {generatorType === 'risk' && (
              <div className="space-y-6">
                {(() => {
                  const risk = content as RiskAssessment;
                  return (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Risks</h3>
                        <div className="bg-red-50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {risk.technicalRisks.map((r, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                                <span className="text-red-700">{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Operational Risks</h3>
                        <div className="bg-orange-50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {risk.operationalRisks.map((r, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                                <span className="text-orange-700">{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ethical Risks</h3>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {risk.ethicalRisks.map((r, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <AlertTriangle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                                <span className="text-purple-700">{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Mitigation Strategies</h3>
                        <div className="bg-green-50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {risk.mitigationStrategies.map((s, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-green-700">{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {generatorType === 'email' && (
              <div className="space-y-4">
                {(() => {
                  const email = content as StakeholderEmail;
                  return (
                    <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
                      <div className="mb-4">
                        <strong>Subject:</strong> {email.subject}
                      </div>
                      <div className="whitespace-pre-line leading-relaxed">
                        {email.greeting}
                        
                        {email.body}
                        
                        {email.callToAction}
                        
                        {email.closing}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Generated content is a starting point. Please review and customize as needed.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadAsText}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorModal;