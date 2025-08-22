import React, { useState } from 'react';
import { CheckCircle, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { Button, Modal, Input, Select, Switch } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const ReviewAndTrain = ({ 
  selectedModel, 
  selectedDataSources, 
  filterConditions, 
  filteredRecords, 
  totalRecords,
  goalSettings, 
  prepareDataSettings, 
  selectedAlgorithm,
  onTrain
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    filters: false,
    preparation: false
  });

  const handleEdit = (section) => {
    setEditingSection(section);
    setIsEditModalOpen(true);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTrain = async () => {
    if (!modelName.trim()) {
      alert('Please enter a model name');
      return;
    }
    
    setIsTraining(true);
    // Simulate training process
    setTimeout(() => {
      setIsTraining(false);
      if (onTrain) {
        onTrain({
          name: modelName,
          description: modelDescription,
          // ... other model data
        });
      }
    }, 3000);
  };

  const reviewSections = [
    {
      id: 'type',
      title: 'Type',
      subtitle: selectedModel || 'Created Model',
      completed: true
    },
    {
      id: 'data',
      title: 'Data',
      subtitle: (
        <div>
          <div>Data Space: default</div>
          <div>Data Model Object: {selectedDataSources?.[0] || 'Opportunity'}</div>
        </div>
      ),
      completed: true
    },
    {
      id: 'filters',
      title: 'Filters',
      subtitle: `${filteredRecords || 541} of ${totalRecords || 598} records will be used to train the model, based on:`,
      completed: true,
      expandable: true,
      details: (
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <ChevronDown className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 text-sm">1 Filters</span>
          </div>
          <div className="flex items-center space-x-2">
            <ChevronDown className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 text-sm">57 records excluded</span>
          </div>
        </div>
      )
    },
    {
      id: 'goal',
      title: 'Goal',
      subtitle: goalSettings?.goal || 'Maximize Opportunity Type is New Business',
      completed: true
    },
    {
      id: 'preparation',
      title: 'Preparation',
      subtitle: `${prepareDataSettings?.selectedVariables?.length || 16} of 16 variables selected.`,
      completed: true,
      expandable: true,
      details: (
        <div className="mt-2">
          <div className="text-sm text-gray-600">
            Selected variables: {prepareDataSettings?.selectedVariables?.join(', ') || 'Escalated, Duration, Number of Comments'}
          </div>
        </div>
      )
    },
    {
      id: 'algorithm',
      title: 'Algorithm',
      subtitle: selectedAlgorithm?.toUpperCase() || 'GLM',
      completed: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Review and save your model
      </h1>

      {/* Review Sections */}
      <div className="space-y-1">
        {reviewSections.map((section, index) => (
          <div key={section.id} className="bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                {section.completed ? (
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300" />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {section.title}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {section.subtitle}
                  </div>
                  {section.expandable && expandedSections[section.id] && section.details}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {section.expandable && (
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedSections[section.id] ? 
                      <ChevronUp className="w-4 h-4 text-gray-500" /> : 
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    }
                  </button>
                )}
                <button 
                  onClick={() => handleEdit(section.id)}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Configuration */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Model Configuration
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Name *
            </label>
            <Input
              placeholder="Enter model name"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <TextArea
              placeholder="Enter model description"
              value={modelDescription}
              onChange={(e) => setModelDescription(e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Training Options */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Training Options
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Auto-refresh model</div>
              <div className="text-sm text-gray-600">
                Automatically retrain the model when new data becomes available
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Send email notification</div>
              <div className="text-sm text-gray-600">
                Get notified when training is complete
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <Button size="large" className="px-8">
          Save Draft
        </Button>
        <Button 
          type="primary" 
          size="large" 
          className="px-8"
          loading={isTraining}
          onClick={handleTrain}
          disabled={!modelName.trim()}
        >
          {isTraining ? 'Training...' : 'Save & Train'}
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal
        title={`Edit ${editingSection}`}
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={() => setIsEditModalOpen(false)}>
            Save Changes
          </Button>
        ]}
      >
        <p className="text-gray-600">
          Edit options for the {editingSection} section would be implemented here.
        </p>
      </Modal>
    </div>
  );
};

export default ReviewAndTrain;
