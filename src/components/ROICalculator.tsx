import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [users, setUsers] = useState<number>(100);
  const [currentCost, setCurrentCost] = useState<number>(50000);
  const [expectedSavings, setExpectedSavings] = useState<number>(15000);
  const [implementationCost, setImplementationCost] = useState<number>(200000);

  const calculateROI = () => {
    const annualSavings = expectedSavings * users;
    const roi = ((annualSavings - (implementationCost * 0.15)) / implementationCost) * 100; // 15% annual maintenance
    const paybackMonths = (implementationCost / annualSavings) * 12;
    
    return {
      annualSavings,
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths),
      threeYearValue: (annualSavings * 3) - implementationCost - (implementationCost * 0.15 * 3)
    };
  };

  const results = calculateROI();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI ROI Calculator</h2>
          <p className="text-gray-600">Calculate the return on investment for your AI project</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Users/Beneficiaries
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Annual Cost per User ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Savings per User ($)
            </label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={expectedSavings}
                onChange={(e) => setExpectedSavings(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="15000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Implementation Cost ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={implementationCost}
                onChange={(e) => setImplementationCost(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="200000"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Analysis</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Annual Savings</span>
              </div>
              <p className="text-2xl font-bold text-green-700">
                ${results.annualSavings.toLocaleString()}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Annual ROI</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {results.roi}%
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">Payback Period</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">
                {results.paybackMonths} months
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">3-Year Net Value</span>
              </div>
              <p className="text-2xl font-bold text-orange-700">
                ${Math.round(results.threeYearValue).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Key Assumptions</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 15% annual maintenance cost</li>
              <li>• Savings realized from year 1</li>
              <li>• No inflation adjustments</li>
              <li>• Linear scaling with user count</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;