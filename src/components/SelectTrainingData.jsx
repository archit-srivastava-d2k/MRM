import React from 'react';
import { Trash2, Plus } from 'lucide-react';

const SelectTrainingData = ({ filterConditions, setFilterConditions, totalRecords, filteredRecords, setFilteredRecords }) => {
  const addFilterCondition = () => {
    setFilterConditions([...filterConditions, { field: '', operator: 'Contains', value: [] }]);
  };

  const removeFilterCondition = (index) => {
    setFilterConditions(filterConditions.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Filter the data used to train the model
      </h1>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-6">
          Select which records to use to train the model
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* All Records */}
          <div className="p-6 border-2 border-gray-200 bg-white rounded-lg cursor-pointer hover:border-gray-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7M4 7c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4M4 7h16m-4 4v6m-4-6v6m-4-6v6" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">All Records</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Use all records available in the selected data to train the model.
                </p>
              </div>
            </div>
          </div>

          {/* Filtered Set - Selected */}
          <div className="p-6 border-2 border-blue-500 bg-blue-50 rounded-lg relative cursor-pointer">
            <div className="absolute top-4 right-4">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 pr-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Filtered Set of Records</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Set criteria for which records to use to train the model.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Condition Requirements Section */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium text-gray-800">Condition Requirements</h4>
              <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Conditions Are Met</option>
                <option>Any Condition Is Met</option>
              </select>
            </div>
          </div>

          {/* Filter Table Header */}
          <div className="px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700">
              <div className="col-span-4">Field</div>
              <div className="col-span-3">Operator</div>
              <div className="col-span-4">Value</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* Filter Rows */}
          <div className="px-6 py-4">
            <div className="space-y-4">
              {filterConditions.map((condition, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-4">
                    <div className="relative">
                      <select 
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={condition.field}
                        onChange={(e) => {
                          const newConditions = [...filterConditions];
                          newConditions[index].field = e.target.value;
                          setFilterConditions(newConditions);
                        }}
                      >
                        <option value="">Select Field</option>
                        <option value="Lead Source">Lead Source</option>
                        <option value="Company">Company</option>
                        <option value="Status">Status</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-3">
                    <select 
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={condition.operator}
                      onChange={(e) => {
                        const newConditions = [...filterConditions];
                        newConditions[index].operator = e.target.value;
                        setFilterConditions(newConditions);
                      }}
                    >
                      <option value="Contains">Contains</option>
                      <option value="Equals">Equals</option>
                      <option value="Not Equal">Not Equal</option>
                      <option value="Starts With">Starts With</option>
                      <option value="Ends With">Ends With</option>
                    </select>
                  </div>
                  
                  <div className="col-span-4">
                    <div className="border border-gray-300 rounded-md p-2 min-h-10 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      <div className="flex flex-wrap gap-2">
                        {condition.value.map((val, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-100 text-sm rounded-md">
                            {val}
                            <button 
                              className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={() => {
                                const newConditions = [...filterConditions];
                                newConditions[index].value = newConditions[index].value.filter((_, vi) => vi !== i);
                                setFilterConditions(newConditions);
                              }}
                              aria-label={`Remove ${val}`}
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        ))}
                        <input 
                          type="text" 
                          placeholder="Enter a value..." 
                          className="flex-1 min-w-24 px-2 py-1 text-sm border-0 outline-none bg-transparent"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              const newConditions = [...filterConditions];
                              if (!newConditions[index].value.includes(e.target.value.trim())) {
                                newConditions[index].value = [...newConditions[index].value, e.target.value.trim()];
                                setFilterConditions(newConditions);
                              }
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex justify-center pt-2">
                    {index > 0 && (
                      <button 
                        onClick={() => removeFilterCondition(index)}
                        className="text-gray-400 hover:text-red-600 focus:outline-none p-1"
                        title="Remove condition"
                        aria-label="Remove condition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Condition Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button 
                onClick={addFilterCondition}
                className="inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Condition
              </button>
            </div>
          </div>
        </div>

        {/* Records Count Footer */}
        <div className="flex items-center justify-between mt-6 px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center text-gray-700">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium">{filteredRecords} records of {totalRecords} included</span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline focus:outline-none focus:underline">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTrainingData;