import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Clock, Award } from 'lucide-react';

interface ImpactMetric {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: number;
  category: 'efficiency' | 'cost' | 'satisfaction' | 'time';
  description: string;
}

const AIImpactTracker: React.FC = () => {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([
    {
      id: '1',
      title: 'Emergency Response Time',
      value: 4.2,
      unit: 'minutes',
      change: -23,
      category: 'time',
      description: 'Average time from call to dispatch'
    },
    {
      id: '2',
      title: 'Citizen Satisfaction',
      value: 87,
      unit: '%',
      change: 15,
      category: 'satisfaction',
      description: 'Overall satisfaction with city services'
    },
    {
      id: '3',
      title: 'Cost Savings',
      value: 2.4,
      unit: 'M USD',
      change: 32,
      category: 'cost',
      description: 'Annual savings from AI implementations'
    },
    {
      id: '4',
      title: 'Process Efficiency',
      value: 78,
      unit: '%',
      change: 45,
      category: 'efficiency',
      description: 'Improvement in automated processes'
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.1,
        change: metric.change + (Math.random() - 0.5) * 2
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'efficiency':
        return <BarChart3 className="w-6 h-6 text-blue-600" />;
      case 'cost':
        return <DollarSign className="w-6 h-6 text-green-600" />;
      case 'satisfaction':
        return <Users className="w-6 h-6 text-purple-600" />;
      case 'time':
        return <Clock className="w-6 h-6 text-orange-600" />;
      default:
        return <TrendingUp className="w-6 h-6 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'efficiency':
        return 'bg-blue-50 border-blue-200';
      case 'cost':
        return 'bg-green-50 border-green-200';
      case 'satisfaction':
        return 'bg-purple-50 border-purple-200';
      case 'time':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Award className="w-8 h-8 text-yellow-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Impact Dashboard</h2>
            <p className="text-gray-600">Real-time tracking of AI implementation success</p>
          </div>
        </div>
        
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map(metric => (
          <div key={metric.id} className={`border rounded-lg p-6 ${getCategoryColor(metric.category)}`}>
            <div className="flex items-center justify-between mb-4">
              {getCategoryIcon(metric.category)}
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 ${metric.change < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(metric.change).toFixed(1)}%</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {metric.value.toFixed(1)} <span className="text-lg text-gray-600">{metric.unit}</span>
            </p>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Success Stories</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Emergency Response AI Deployed</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Fire Department reports 23% faster response times since implementing AI dispatch optimization
                </p>
                <p className="text-xs text-gray-500 mt-2">2 days ago</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Citizen Service Bot Milestone</h4>
                <p className="text-sm text-gray-600 mt-1">
                  AI chatbot successfully handled 10,000+ citizen inquiries with 95% satisfaction rate
                </p>
                <p className="text-xs text-gray-500 mt-2">1 week ago</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Smart Traffic System Launch</h4>
                <p className="text-sm text-gray-600 mt-1">
                  New adaptive traffic lights reduced downtown congestion by 40% during peak hours
                </p>
                <p className="text-xs text-gray-500 mt-2">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImpactTracker;