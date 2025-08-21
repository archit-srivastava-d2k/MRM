import React from 'react';
import { Link, CloudUpload, Database, Brain } from 'lucide-react';

const ChooseType = ({ selectedModel, setSelectedModel }) => {
  const modelTypes = [
    {
      id: 'scratch',
      title: 'Create a model from scratch',
      description: 'Build and customize your own model with clicks, not code.',
      icon: <Link className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 'sagemaker',
      title: 'Connect an Amazon SageMaker model',
      description: 'Bring your SageMaker model output into Data Cloud to quickly operationalize its predictions and recommendations.',
      icon: <CloudUpload className="w-8 h-8 text-green-600" />,
    },
    {
      id: 'vertex',
      title: 'Connect a Google Cloud Vertex AI model',
      description: 'Bring your Google Cloud Vertex AI model output into Data Cloud to quickly operationalize its predictions and recommendations.',
      icon: <Brain className="w-8 h-8 text-blue-500" />,
    },
    {
      id: 'databricks',
      title: 'Connect a Databricks model',
      description: 'Bring your Databricks model output into Data Cloud to quickly operationalize its predictions and recommendations.',
      icon: <Database className="w-8 h-8 text-red-600" />,
    }
  ];

  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Choose the type of model
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {modelTypes.map((model) => (
          <div
            key={model.id}
            onClick={() => handleModelSelect(model.id)}
            className={`
              relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${selectedModel === model.id 
                ? 'border-orange-500 bg-orange-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }
            `}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleModelSelect(model.id)}
          >
            {selectedModel === model.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {model.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {model.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseType;