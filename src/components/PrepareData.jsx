import React, { useState } from 'react';
import { 
  CheckCircle, 
  Search, 
  AlertTriangle, 
  Settings, 
  Hash, 
  Calendar, 
  Type, 
  Database,
  User,
  FileText,
  Tag,
  Info,
  BarChart3
} from 'lucide-react';

// Mock Ant Design components since we can't import actual Ant Design
const Table = ({ columns, dataSource, rowSelection, pagination }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState(rowSelection?.selectedRowKeys || []);
  
  const handleRowSelect = (record) => {
    const newSelection = selectedRowKeys.includes(record.key) 
      ? selectedRowKeys.filter(key => key !== record.key)
      : [...selectedRowKeys, record.key];
    
    setSelectedRowKeys(newSelection);
    if (rowSelection?.onChange) {
      rowSelection.onChange(newSelection);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataSource.map((record) => (
              <tr 
                key={record.key} 
                className={`hover:bg-gray-50 ${selectedRowKeys.includes(record.key) ? 'bg-blue-50' : ''}`}
              >
                {columns.map((col, index) => (
                  <td key={index} className="px-4 py-3 whitespace-nowrap text-sm">
                    {col.render ? col.render(record[col.dataIndex], record, handleRowSelect) : record[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Switch = ({ checked, onChange, size = 'default' }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    } ${size === 'small' ? 'h-5 w-9' : 'h-6 w-11'}`}
  >
    <span
      className={`inline-block transform rounded-full bg-white transition-transform ${
        size === 'small' ? 'h-3 w-3' : 'h-4 w-4'
      } ${
        checked ? (size === 'small' ? 'translate-x-5' : 'translate-x-6') : 'translate-x-1'
      }`}
    />
  </button>
);

const Select = ({ value, onChange, options, placeholder, className }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const Slider = ({ min, max, value, onChange }) => (
  <div className="space-y-2">
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <div className="flex justify-between text-xs text-gray-500">
      <span>{min}-{max}</span>
      <span className="font-medium">{value}</span>
    </div>
  </div>
);

const PrepareData = ({ onNext, onBack }) => {
  const [selectedVariables, setSelectedVariables] = useState(['Escalated', 'Duration', 'Number of Comments']);
  const [searchTerm, setSearchTerm] = useState('');
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);
  const [replaceWith, setReplaceWith] = useState('Average');
  const [groupBy, setGroupBy] = useState('Product');
  const [buckets, setBuckets] = useState(30);

  const variables = [
    { key: '1', name: 'Escalated', type: 'Boolean', icon: 'boolean', hasAlert: false },
    { key: '2', name: 'Duration', type: 'Number', icon: 'number', hasAlert: false },
    { key: '3', name: 'Number of Comments', type: 'Number', icon: 'number', hasAlert: false },
    { key: '4', name: 'Last Modified Date', type: 'Date', icon: 'date', hasAlert: false },
    { key: '5', name: 'Created Date', type: 'Date', icon: 'date', hasAlert: false },
    { key: '6', name: 'Case Type', type: 'Text', icon: 'text', hasAlert: false },
    { key: '7', name: 'Product', type: 'Text', icon: 'text', hasAlert: false },
    { key: '8', name: 'Name', type: 'Text', icon: 'text', hasAlert: false },
    { key: '9', name: 'Closed When Created', type: 'Boolean', icon: 'boolean', hasAlert: false },
    { key: '10', name: 'Data Source Object', type: 'Text', icon: 'text', hasAlert: false },
    { key: '11', name: 'Case Id', type: 'Text', icon: 'text', hasAlert: false },
    { key: '12', name: 'Case Number', type: 'Text', icon: 'text', hasAlert: false },
    { key: '13', name: 'Closed', type: 'Boolean', icon: 'boolean', hasAlert: false },
    { key: '14', name: 'Description', type: 'Text', icon: 'text', hasAlert: true },
    { key: '15', name: 'Subject', type: 'Text', icon: 'text', hasAlert: false },
    { key: '16', name: 'Data Source', type: 'Text', icon: 'text', hasAlert: false }
  ];

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'boolean': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'number': return <Hash className="w-4 h-4 text-blue-500" />;
      case 'date': return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'text': return <Type className="w-4 h-4 text-gray-500" />;
      default: return <Type className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredVariables = variables.filter(variable =>
    variable.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Variable',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, handleRowSelect) => (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selectedVariables.includes(text)}
            onChange={() => {
              const newSelection = selectedVariables.includes(text)
                ? selectedVariables.filter(name => name !== text)
                : [...selectedVariables, text];
              setSelectedVariables(newSelection);
            }}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          {getIcon(record.icon)}
          <span className="text-sm font-medium text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          {text}
        </span>
      ),
    },
    {
      title: 'Alerts',
      key: 'alerts',
      render: (text, record) => (
        <div className="flex justify-center">
          <button
            className={`p-2 rounded-md transition-colors ${
              record.hasAlert
                ? 'text-orange-600 bg-orange-100 hover:bg-orange-200'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    {
      title: 'Settings',
      key: 'settings',
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          {record.name === 'Number of Comments' && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              Replace Missing Values
            </span>
          )}
          {(record.name === 'Last Modified Date' || record.name === 'Created Date') && (
            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
              Group by Month
            </span>
          )}
          {record.name === 'Description' && (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
              Text Clustering
            </span>
          )}
          <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[96vh]">
      <div className="flex ">
        {/* Main Content */}
        <div className="flex-1 pr-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Prepare variables for predictive modeling
            </h1>
          </div>

          {/* Autopilot Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Autopilot</h3>
                  <p className="text-sm text-blue-700">
                    Let Autopilot search through your data and select the most relevant variables for your prediction outcome.
                  </p>
                </div>
              </div>
              <Switch
                checked={autopilotEnabled}
                onChange={setAutopilotEnabled}
              />
            </div>
          </div>

          {/* Search and Variables Section */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Variables Selected by Autopilot</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search variables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <Table
                columns={columns}
                dataSource={filteredVariables}
                pagination={false}
                rowSelection={{
                  selectedRowKeys: selectedVariables,
                  onChange: setSelectedVariables,
                }}
              />
            </div>
          </div>
        </div>

        {/* Fixed Right Panel */}
        <div className="w-70 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium text-gray-900">Number of Comments</h3>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Transformation
                  <Info className="w-4 h-4 text-gray-400 ml-1" />
                </label>
                <Select
                  value="Replace Missing Values"
                  options={[
                    { value: 'Replace Missing Values', label: 'Replace Missing Values' },
                    { value: 'Remove Missing Values', label: 'Remove Missing Values' },
                    { value: 'Leave As Is', label: 'Leave As Is' }
                  ]}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Replace With
                  <Info className="w-4 h-4 text-gray-400 ml-1" />
                </label>
                <Select
                  value={replaceWith}
                  onChange={setReplaceWith}
                  options={[
                    { value: 'Average', label: 'Average' },
                    { value: 'Median', label: 'Median' },
                    { value: 'Mode', label: 'Mode' },
                    { value: 'Zero', label: 'Zero' }
                  ]}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Group By
                  <Info className="w-4 h-4 text-gray-400 ml-1" />
                </label>
                <Select
                  value={groupBy}
                  onChange={setGroupBy}
                  options={[
                    { value: 'Product', label: 'Product' },
                    { value: 'Case Type', label: 'Case Type' },
                    { value: 'Data Source', label: 'Data Source' },
                    { value: 'None', label: 'None' }
                  ]}
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  Number of Buckets
                  <Info className="w-4 h-4 text-gray-400 ml-1" />
                </label>
                <Slider
                  min={10}
                  max={100}
                  value={buckets}
                  onChange={setBuckets}
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Distribution</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Minimum Value:</span>
                    <span className="font-mono font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum Value:</span>
                    <span className="font-mono font-medium">2365</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepareData;