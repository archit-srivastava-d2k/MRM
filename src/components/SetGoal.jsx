import React, { useState } from 'react';
import { X } from 'lucide-react';

const SetGoal = ({ onBack, onNext }) => {
  const [goalSettings, setGoalSettings] = useState({
    predictField: 'Opportunity Type',
    outputType: 'Binary Classification',
    objective: 'Maximize',
    targetValue: 'New Business'
  });
  const [error, setError] = useState('');

  const fieldOptions = [
    'Opportunity Type',
    'Lead Status',
    'Deal Size',
    'Conversion Rate',
    'Revenue',
    'Customer Lifetime Value'
  ];

  const handleFieldChange = (field) => {
    setGoalSettings((prev) => ({ ...prev, predictField: field }));
    setError('');
  };

  const handleClearField = () => {
    setGoalSettings((prev) => ({ ...prev, predictField: '' }));
    setError('Please select a field to predict.');
  };

  const handleObjectiveChange = (objective) => {
    setGoalSettings((prev) => ({ ...prev, objective }));
    setError('');
  };

  const handleTargetValueChange = (value) => {
    setGoalSettings((prev) => ({ ...prev, targetValue: value }));
    setError('');
  };

  const handleNext = () => {
    if (!goalSettings.predictField) {
      setError('Please select a field to predict.');
      return;
    }
    if (!goalSettings.targetValue) {
      setError('Please select a target value.');
      return;
    }
    setError('');
    onNext(goalSettings); // Pass settings to parent
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Set the goal of your model
      </h1>

      {/* Prediction Field Selection */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-800 mb-4">
          Which field would you like the model to predict values for?
        </h3>
        
        <div className="relative">
          <select 
            className="w-full px-4 py-3 pr-10 text-base border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={goalSettings.predictField}
            onChange={(e) => handleFieldChange(e.target.value)}
          >
            {fieldOptions.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button 
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={handleClearField}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Output Type */}
        <div>
          <h4 className="text-base font-medium text-gray-800 mb-3">Output Type</h4>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-3">Binary Classification</h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              Einstein determines the machine learning task based on what you want to predict. 
              The model will use binary classification to estimate the probability of belonging to 
              the positive class in order to predict Opportunity Type as either Existing Business 
              or New Business.
            </p>
          </div>

          {/* Objective Selection */}
          <div className="mt-8">
            <h4 className="text-base font-medium text-gray-800 mb-4">
              Would you like to maximize or minimize Opportunity Type?
            </h4>
            
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="objective"
                  value="Maximize"
                  checked={goalSettings.objective === 'Maximize'}
                  onChange={(e) => handleObjectiveChange(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-base text-gray-800">Maximize</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="objective"
                  value="Minimize"
                  checked={goalSettings.objective === 'Minimize'}
                  onChange={(e) => handleObjectiveChange(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-base text-gray-800">Minimize</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Value Distribution */}
        <div>
          <h4 className="text-base font-medium text-gray-800 mb-3">Value Distribution</h4>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Distribution Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800">Existing Business</span>
                  <span className="text-sm text-gray-600">284</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-3"
                    style={{ width: '52.5%' }}
                  >
                    <span className="text-xs font-medium text-white">52%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800">New Business</span>
                  <span className="text-sm text-gray-600">314</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-3"
                    style={{ width: '58%' }}
                  >
                    <span className="text-xs font-medium text-white">58%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Value Selection */}
      <div className="mt-8">
        <div className="relative">
          <select 
            className="w-full px-4 py-3 pr-10 text-base border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={goalSettings.targetValue}
            onChange={(e) => handleTargetValueChange(e.target.value)}
          >
            <option value="New Business">New Business</option>
            <option value="Existing Business">Existing Business</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default SetGoal;