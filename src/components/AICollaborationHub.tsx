import React, { useState } from 'react';
import { Users, MessageSquare, Share2, Lightbulb, Star, Calendar } from 'lucide-react';

interface CollaborationPost {
  id: string;
  author: string;
  role: string;
  organization: string;
  content: string;
  type: 'question' | 'success' | 'idea' | 'resource';
  likes: number;
  replies: number;
  timestamp: Date;
  tags: string[];
}

const AICollaborationHub: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newPost, setNewPost] = useState('');

  const posts: CollaborationPost[] = [
    {
      id: '1',
      author: 'Sarah Chen',
      role: 'CTO',
      organization: 'City of Austin',
      content: 'Just implemented our AI-powered traffic optimization system! Seeing 35% reduction in congestion during peak hours. Happy to share our implementation strategy with other cities.',
      type: 'success',
      likes: 24,
      replies: 8,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['traffic', 'implementation', 'success']
    },
    {
      id: '2',
      author: 'Michael Rodriguez',
      role: 'Innovation Director',
      organization: 'Miami-Dade County',
      content: 'Looking for recommendations on AI vendors for emergency response optimization. What has worked well for similar-sized municipalities?',
      type: 'question',
      likes: 12,
      replies: 15,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tags: ['emergency', 'vendors', 'recommendations']
    },
    {
      id: '3',
      author: 'Dr. Emily Watson',
      role: 'Data Scientist',
      organization: 'Seattle Public Health',
      content: 'Idea: What if we created a shared dataset of anonymized public health metrics that all cities could use to train better AI models? Could accelerate innovation across the board.',
      type: 'idea',
      likes: 31,
      replies: 12,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tags: ['data-sharing', 'collaboration', 'health']
    },
    {
      id: '4',
      author: 'James Park',
      role: 'IT Manager',
      organization: 'Portland City Services',
      content: 'Free resource: Created a comprehensive AI procurement checklist based on our recent implementations. Includes vendor evaluation criteria, security requirements, and budget templates.',
      type: 'resource',
      likes: 45,
      replies: 6,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      tags: ['procurement', 'templates', 'resources']
    }
  ];

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Star className="w-5 h-5 text-green-600" />;
      case 'question':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'idea':
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      case 'resource':
        return <Share2 className="w-5 h-5 text-purple-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPostColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'question':
        return 'border-l-blue-500 bg-blue-50';
      case 'idea':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'resource':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const filteredPosts = selectedFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === selectedFilter);

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Collaboration Hub</h2>
          <p className="text-gray-600">Connect with other government AI innovators</p>
        </div>
      </div>

      {/* Post Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All Posts', icon: MessageSquare },
          { key: 'success', label: 'Success Stories', icon: Star },
          { key: 'question', label: 'Questions', icon: MessageSquare },
          { key: 'idea', label: 'Ideas', icon: Lightbulb },
          { key: 'resource', label: 'Resources', icon: Share2 }
        ].map(filter => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedFilter === filter.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <filter.icon className="w-4 h-4" />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* New Post */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your AI implementation experience, ask questions, or propose ideas..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          rows={3}
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Success</button>
            <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Question</button>
            <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Idea</button>
            <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Resource</button>
          </div>
          <button
            disabled={!newPost.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Share
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div key={post.id} className={`border-l-4 rounded-lg p-4 ${getPostColor(post.type)}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getPostIcon(post.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{post.author}</h4>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{post.role}</span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{post.organization}</span>
                  <span className="text-sm text-gray-500 ml-auto">{formatTimeAgo(post.timestamp)}</span>
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white bg-opacity-60 text-gray-700 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200">
                      <Star className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.replies}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <h4 className="font-medium text-gray-900">AI in Government Webinar</h4>
            <p className="text-sm text-gray-600">Best practices for AI procurement and implementation</p>
            <p className="text-xs text-blue-600 mt-1">Tomorrow, 2:00 PM EST</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-purple-200">
            <h4 className="font-medium text-gray-900">Smart Cities Summit 2024</h4>
            <p className="text-sm text-gray-600">Annual conference on urban technology innovation</p>
            <p className="text-xs text-purple-600 mt-1">March 15-17, San Francisco</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICollaborationHub;