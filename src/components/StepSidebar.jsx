import React from 'react';

const StepsSidebar = ({ steps, currentStep }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Steps</h3>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step.active 
                  ? 'bg-blue-600 text-white' 
                  : step.completed 
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }
              `}>
                {step.completed ? '✓' : step.id}
              </div>
              <span className={`
                text-sm font-medium
                ${step.active ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-500'}
              `}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        {currentStep === 1 && (
          <div className="mt-8 text-sm text-gray-500">
            Choose a model to continue...
          </div>
        )}
        {currentStep === 2 && (
          <div className="mt-8 text-sm text-gray-500">
            Select your data sources...
          </div>
        )}
        {currentStep === 3 && (
          <div className="mt-8 text-sm text-gray-500">
            Filter data for training...
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsSidebar;