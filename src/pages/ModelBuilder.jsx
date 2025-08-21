import React, { useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import StepsSidebar from '../components/StepSidebar';
import ChooseType from '../components/ChooseType';
import SelectData from '../components/SelectData';
import SelectTrainingData from '../components/SelectTrainingData';

const ModelBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [filterConditions, setFilterConditions] = useState([
    { field: 'Lead Source', operator: 'Contains', value: ['Advertisement', 'Web', 'Employee'] }
  ]);
  const [totalRecords] = useState(598);
  const [filteredRecords, setFilteredRecords] = useState(541);
  const [error, setError] = useState('');

  const getSteps = () => [
    { id: 1, title: 'Choose Type', completed: currentStep > 1, active: currentStep === 1 },
    { id: 2, title: 'Select Data', completed: currentStep > 2, active: currentStep === 2 },
    { id: 3, title: 'Select Training Data', completed: currentStep > 3, active: currentStep === 3 },
    { id: 4, title: 'Set Goal', completed: currentStep > 4, active: currentStep === 4 },
    { id: 5, title: 'Prepare Data', completed: currentStep > 5, active: currentStep === 5 },
    { id: 6, title: 'Select Algorithm', completed: currentStep > 6, active: currentStep === 6 },
    { id: 7, title: 'Save & Train', completed: currentStep > 7, active: currentStep === 7 },
  ];

  const handleNext = () => {
    if (currentStep === 1 && !selectedModel) {
      setError('Please select a model type to continue.');
      return;
    }
    if (currentStep === 2 && selectedDataSources.length === 0) {
      setError('Please select at least one data source to continue.');
      return;
    }
    setError('');
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setError('');
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setSelectedModel(null);
    setSelectedDataSources([]);
    setFilterConditions([{ field: 'Lead Source', operator: 'Contains', value: [] }]);
    setCurrentStep(1);
    setError('');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ChooseType selectedModel={selectedModel} setSelectedModel={setSelectedModel} />;
      case 2:
        return (
          <SelectData
            selectedDataSources={selectedDataSources}
            setSelectedDataSources={setSelectedDataSources}
          />
        );
      case 3:
        return (
          <SelectTrainingData
            filterConditions={filterConditions}
            setFilterConditions={setFilterConditions}
            totalRecords={totalRecords}
            filteredRecords={filteredRecords}
            setFilteredRecords={setFilteredRecords}
          />
        );
      default:
        return <ChooseType selectedModel={selectedModel} setSelectedModel={setSelectedModel} />;
    }
  };

  return (
    <div className="  bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4">
        <div className="flex items-center space-x-4">
          <ArrowLeft className="w-6 h-6 cursor-pointer" />
          <Home className="w-6 h-6" />
          <span className="text-lg font-medium">Model Builder</span>
          <span className="text-gray-300">New Model</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <StepsSidebar steps={getSteps()} currentStep={currentStep} />

        {/* Main Content */}
        <div className=" p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 overflow-hidden">
              {error}
            </div>
          )}
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 space-x-4">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedModel) ||
                (currentStep === 2 && selectedDataSources.length === 0)
              }
              className={`
                px-6 py-2 rounded-md font-medium transition-colors
                ${(currentStep === 1 && selectedModel) || 
                  (currentStep === 2 && selectedDataSources.length > 0) || 
                  (currentStep >= 3)
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelBuilder;