import React, { useState } from 'react';
import { Switch, Card } from 'antd';
import { CheckOutlined, CloseOutlined, CloudOutlined } from '@ant-design/icons';

const SelectAlgorithm = ({ onAlgorithmSelect, selectedAlgorithm: propSelectedAlgorithm }) => {
  const [automaticSelection, setAutomaticSelection] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(propSelectedAlgorithm || 'glm');

  const algorithms = [
    {
      id: 'glm',
      title: 'General Linear Model (GLM)',
      description: 'GLM, or Generalized Linear Model, is a fast equation-based algorithm. It works best when the relationship between the variables and the outcome is relatively simple. Only GLM can produce explanations based on the interaction between variables, such as the combined impact of region and month together.',
      recommended: true
    },
    {
      id: 'gbm',
      title: 'Gradient Boosting Machines (GBM)',
      description: 'GBM, or Gradient Boosting Machine, is a tree-based algorithm where the decision trees are built sequentially to better fit the data. It handles data complexity such as different relationships between variables and verified data distributions better, compared to GLM.'
    },
    {
      id: 'xgboost',
      title: 'Extreme Gradient Boosting (XGBoost)',
      description: 'XGBoost, or Extreme Gradient Boosting, is an extension of GBM optimized for efficiency. It\'s a tree-based algorithm where groups of decision trees are built sequentially to better fit the data while avoiding overfitting.'
    }
  ];

  const handleAlgorithmClick = (algorithmId) => {
    if (!automaticSelection) {
      setSelectedAlgorithm(algorithmId);
      if (onAlgorithmSelect) {
        onAlgorithmSelect(algorithmId);
      }
    }
  };

  const handleAutomaticToggle = (checked) => {
    setAutomaticSelection(checked);
    if (checked) {
      // Auto-select GLM when automatic selection is enabled
      setSelectedAlgorithm('glm');
      if (onAlgorithmSelect) {
        onAlgorithmSelect('glm');
      }
    }
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 pr-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Select an algorithm <span className="font-normal text-gray-600">for your model</span>
          </h1>

          {/* Automatic Selection Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-8">
            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Automatic Selection</h3>
                <p className="text-sm text-gray-600">Let Einstein pick the best algorithm for your use case.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={automaticSelection} 
                onChange={handleAutomaticToggle}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
              <span className="text-sm text-gray-500">
                {automaticSelection ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          {/* Algorithm Options */}
          <div className="grid grid-cols-2 gap-6">
            {algorithms.map((algorithm) => (
              <Card
                key={algorithm.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedAlgorithm === algorithm.id
                    ? 'border-2 border-blue-500 shadow-lg'
                    : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
                } ${automaticSelection ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleAlgorithmClick(algorithm.id)}
                Style={{ padding: '24px' }}
              >
                <div className="relative">
                  {algorithm.recommended && (
                    <div className="absolute -top-6 -left-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {algorithm.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {algorithm.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-gradient-to-b from-blue-50 to-blue-100 p-6 relative overflow-hidden rounded-lg">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-8 w-12 h-12 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-12 w-8 h-8 bg-purple-200 rounded-full opacity-60"></div>
        
        {/* Hot air balloon illustration */}
        <div className="absolute bottom-8 right-8 w-16 h-20 opacity-40">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-1"></div>
          <div className="w-px h-6 bg-gray-400 mx-auto"></div>
          <div className="w-6 h-3 bg-amber-600 rounded-sm mx-auto"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Creating a model from scratch
          </h2>

          {/* Cloud icon */}
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm">
            <CloudOutlined className="text-2xl text-blue-500" />
          </div>

          <div className="space-y-6">
            <div className="bg-white bg-opacity-70 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-4 font-medium">
                We've auto-selected the best algorithm for you.
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  When should I use GLM?
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Tell Me More
                </button>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  When should I use XGBoost?
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Tell Me More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mountain landscape at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg viewBox="0 0 320 96" className="w-full h-full opacity-20">
            <path
              d="M0,96 L0,60 L80,20 L160,45 L240,15 L320,40 L320,96 Z"
              fill="url(#mountainGradient)"
            />
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.5}} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectAlgorithm;
