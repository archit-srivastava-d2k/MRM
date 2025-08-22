import React, { useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import StepsSidebar from '../components/StepSidebar';
import ChooseType from '../components/ChooseType';
import SelectData from '../components/SelectData';
import SelectTrainingData from '../components/SelectTrainingData';
import SetGoal from '../components/SetGoal';
import PrepareData from '../components/PrepareData';
import SelectAlgorithm from '../components/SelectAlgorithm';
import ReviewAndTrain from '../components/ReviewAndTrain';

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
  const [goalSettings, setGoalSettings] = useState(null);
  const [prepareDataSettings, setPrepareDataSettings] = useState({
    selectedVariables: ['Escalated', 'Duration', 'Number of Comments'],
    autopilotEnabled: true,
    replaceWith: 'Average',
    groupBy: 'Product',
    buckets: 30,
    alerts: {},
    settings: {}
  });
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('glm'); // Default to GLM

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
    if (currentStep === 4 && !goalSettings) {
      setError('Please set a goal to continue.');
      return;
    }
    if (currentStep === 5 && prepareDataSettings.selectedVariables.length === 0) {
      setError('Please select at least one variable to continue.');
      return;
    }
    if (currentStep === 6 && !selectedAlgorithm) {
      setError('Please select an algorithm or enable automatic selection to continue.');
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
    setGoalSettings(null);
    setPrepareDataSettings({
      selectedVariables: ['Escalated', 'Duration', 'Number of Comments'],
      autopilotEnabled: true,
      replaceWith: 'Average',
      groupBy: 'Product',
      buckets: 30,
      alerts: {},
      settings: {}
    });
    setSelectedAlgorithm('glm');
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
      case 4:
        return (
          <SetGoal
            onBack={handleBack}
            onNext={(settings) => {
              setGoalSettings(settings);
              handleNext();
            }}
          />
        );
      case 5:
        return (
          <PrepareData
            onBack={handleBack}
            onNext={(settings) => {
              setPrepareDataSettings((prev) => ({ ...prev, ...settings }));
              handleNext();
            }}
            selectedVariables={prepareDataSettings.selectedVariables}
            setSelectedVariables={(vars) =>
              setPrepareDataSettings((prev) => ({ ...prev, selectedVariables: vars }))
            }
            searchTerm={prepareDataSettings.searchTerm || ''}
            setSearchTerm={(term) =>
              setPrepareDataSettings((prev) => ({ ...prev, searchTerm: term }))
            }
            autopilotEnabled={prepareDataSettings.autopilotEnabled}
            setAutopilotEnabled={(enabled) =>
              setPrepareDataSettings((prev) => ({ ...prev, autopilotEnabled: enabled }))
            }
            replaceWith={prepareDataSettings.replaceWith}
            setReplaceWith={(value) =>
              setPrepareDataSettings((prev) => ({ ...prev, replaceWith: value }))
            }
            groupBy={prepareDataSettings.groupBy}
            setGroupBy={(value) =>
              setPrepareDataSettings((prev) => ({ ...prev, groupBy: value }))
            }
            buckets={prepareDataSettings.buckets}
            setBuckets={(value) =>
              setPrepareDataSettings((prev) => ({ ...prev, buckets: value }))
            }
            alerts={prepareDataSettings.alerts}
            setAlerts={(alerts) =>
              setPrepareDataSettings((prev) => ({ ...prev, alerts }))
            }
            settings={prepareDataSettings.settings}
            setSettings={(settings) =>
              setPrepareDataSettings((prev) => ({ ...prev, settings }))
            }
          />
        );
      case 6:
        return (
          <SelectAlgorithm
            onBack={handleBack}
            onNext={(algorithm) => {
              setSelectedAlgorithm(algorithm);
              handleNext();
            }}
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmSelect={setSelectedAlgorithm}
          />
        );
      case 7:
  return (
    <ReviewAndTrain
      selectedModel={selectedModel}
      selectedDataSources={selectedDataSources}
      filterConditions={filterConditions}
      filteredRecords={filteredRecords}
      totalRecords={totalRecords}
      goalSettings={goalSettings}
      prepareDataSettings={prepareDataSettings}
      selectedAlgorithm={selectedAlgorithm}
      onTrain={(modelData) => {
        console.log('Training model with data:', modelData);
        // Handle the training logic here
        alert('Model training started successfully!');
      }}
    />
  );
        return (
          <div className="max-w-4xl">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 7 - Under Development
            </h1>
            <p className="text-gray-600">
              This step is not yet implemented. Please check back later.
            </p>
          </div>
        );
      default:
        return <ChooseType selectedModel={selectedModel} setSelectedModel={setSelectedModel} />;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4">
        <div className="flex items-center space-x-4">
          <ArrowLeft className="w-6 h-6 cursor-pointer" />
          <Home className="w-6 h-6" />
          <span className="text-lg font-medium">ModelBuilder</span>
          <span className="text-gray-300">New Model</span>
        </div>
      </div>

      <div className="bg-gray-50 flex h-[80vh]">
        {/* Sidebar stays fixed */}
        <div className="w-64 flex-shrink-0 h-full border-r border-gray-200 bg-white">
          <StepsSidebar steps={getSteps()} currentStep={currentStep} />
        </div>

        {/* Main Content scrolls */}
        <div className="flex-1 h-full overflow-y-auto">
          <div className="p-2 pb-20">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}
            {renderStepContent()}

            {/* Navigation - Fixed at bottom */}
            <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4 flex justify-between space-x-4 shadow-lg">
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
                  (currentStep === 2 && selectedDataSources.length === 0) ||
                  (currentStep === 4 && !goalSettings) ||
                  (currentStep === 5 && prepareDataSettings.selectedVariables.length === 0) ||
                  (currentStep === 6 && !selectedAlgorithm)
                }
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  (currentStep === 1 && selectedModel) ||
                  (currentStep === 2 && selectedDataSources.length > 0) ||
                  (currentStep === 4 && goalSettings) ||
                  (currentStep === 5 && prepareDataSettings.selectedVariables.length > 0) ||
                  (currentStep === 6 && selectedAlgorithm) ||
                  currentStep >= 7
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelBuilder;