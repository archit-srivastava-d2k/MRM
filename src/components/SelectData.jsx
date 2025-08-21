import React from 'react';
import { FileText, Database, CloudUpload, Upload, Trash2 } from 'lucide-react';

const SelectData = ({ selectedDataSources, setSelectedDataSources }) => {
  const dataSources = [
    { id: 'csv', name: 'CSV File', description: 'Upload CSV files with your data', icon: <FileText className="w-8 h-8 text-green-600" /> },
    { id: 'database', name: 'Database Connection', description: 'Connect to your existing database', icon: <Database className="w-8 h-8 text-blue-600" /> },
    { id: 'cloud', name: 'Cloud Storage', description: 'Import from cloud storage services', icon: <CloudUpload className="w-8 h-8 text-purple-600" /> },
  ];

  const handleDataSourceSelect = (sourceId) => {
    if (!selectedDataSources.includes(sourceId)) {
      setSelectedDataSources([...selectedDataSources, sourceId]);
    }
  };

  const handleRemoveDataSource = (sourceId) => {
    setSelectedDataSources(selectedDataSources.filter(id => id !== sourceId));
  };

  return (
    <div className="max-w-4xl  p-8 bg-white rounded-lg shadow-lg ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Select Data
      </h1>
      <p className="text-gray-600 mb-6">
        Choose the source of data to train your model with. Einstein uses the data to train and test the model.
      </p>

      {/* Selected Data Sources */}
      {selectedDataSources.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Selected Data Sources</h3>
          <div className="space-y-3">
            {selectedDataSources.map(sourceId => {
              const source = dataSources.find(s => s.id === sourceId);
              return (
                <div key={sourceId} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {source.icon}
                    <div>
                      <h4 className="font-medium text-gray-800">{source.name}</h4>
                      <p className="text-sm text-gray-600">{source.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveDataSource(sourceId)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Remove ${source.name}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Data Sources */}
      <h3 className="text-lg font-medium text-gray-800 mb-4">Available Data Sources</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataSources.filter(source => !selectedDataSources.includes(source.id)).map((source) => (
          <div
            key={source.id}
            onClick={() => handleDataSourceSelect(source.id)}
            className="p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all duration-200"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleDataSourceSelect(source.id)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {source.icon}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {source.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {source.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Upload your data files</h3>
        <p className="text-gray-500 mb-4">Drag and drop files here, or click to browse</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Choose Files
        </button>
      </div>
    </div>
  );
};

export default SelectData;