import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  User,
  Tag,
  FileText,
  Upload,
  X,
  Check,
  AlertTriangle,
  Clock,
  Shield,
  Activity
} from 'lucide-react';

// Mock data for demonstration
const mockModels = [
  {
    id: 'model-001',
    name: 'Customer Churn Predictor',
    version: '2.1.3',
    status: 'Deployed',
    owner: 'Data Science Team',
    lastUpdated: '2024-01-15T10:30:00Z',
    tags: ['classification', 'customer-analytics'],
    framework: 'scikit-learn',
    accuracy: 0.94,
    deployments: 2,
    artifacts: ['model.pkl', 'preprocessing.py'],
    description: 'Predicts customer churn probability using behavioral data'
  },
  {
    id: 'model-002',
    name: 'Fraud Detection Model',
    version: '1.8.2',
    status: 'Approved',
    owner: 'ML Engineering',
    lastUpdated: '2024-01-12T14:20:00Z',
    tags: ['anomaly-detection', 'security'],
    framework: 'TensorFlow',
    accuracy: 0.97,
    deployments: 1,
    artifacts: ['model.h5', 'config.json'],
    description: 'Real-time fraud detection for payment transactions'
  },
  {
    id: 'model-003',
    name: 'Product Recommendation Engine',
    version: '3.0.1',
    status: 'Registered',
    owner: 'Recommendation Team',
    lastUpdated: '2024-01-10T09:15:00Z',
    tags: ['recommendation', 'collaborative-filtering'],
    framework: 'PyTorch',
    accuracy: 0.89,
    deployments: 0,
    artifacts: ['model.pt', 'embeddings.npz'],
    description: 'Collaborative filtering model for product recommendations'
  },
  {
    id: 'model-004',
    name: 'Sentiment Analysis Model',
    version: '1.2.0',
    status: 'Archived',
    owner: 'NLP Team',
    lastUpdated: '2024-01-08T16:45:00Z',
    tags: ['nlp', 'sentiment'],
    framework: 'Transformers',
    accuracy: 0.91,
    deployments: 0,
    artifacts: ['model.bin', 'tokenizer.json'],
    description: 'BERT-based sentiment classification model'
  }
];

const ModelRegistry = () => {
  const [models, setModels] = useState(mockModels);
  const [selectedModels, setSelectedModels] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'lastUpdated', direction: 'desc' });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filter and sort models
  const filteredModels = useMemo(() => {
    let filtered = models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = !statusFilter || model.status === statusFilter;
      const matchesOwner = !ownerFilter || model.owner === ownerFilter;
      return matchesSearch && matchesStatus && matchesOwner;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'lastUpdated') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [models, searchTerm, statusFilter, ownerFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectModel = (modelId) => {
    const newSelected = new Set(selectedModels);
    if (newSelected.has(modelId)) {
      newSelected.delete(modelId);
    } else {
      newSelected.add(modelId);
    }
    setSelectedModels(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedModels.size === filteredModels.length) {
      setSelectedModels(new Set());
    } else {
      setSelectedModels(new Set(filteredModels.map(m => m.id)));
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteModel = (modelId) => {
    if (window.confirm('Are you sure you want to delete this model? This action cannot be undone.')) {
      setModels(prev => prev.filter(m => m.id !== modelId));
      showNotification('Model deleted successfully');
    }
  };

  const handleBulkDelete = () => {
    if (selectedModels.size === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedModels.size} model(s)? This action cannot be undone.`)) {
      setModels(prev => prev.filter(m => !selectedModels.has(m.id)));
      setSelectedModels(new Set());
      showNotification(`${selectedModels.size} model(s) deleted successfully`);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Deployed': 'bg-green-100 text-green-800 border-green-200',
      'Approved': 'bg-blue-100 text-blue-800 border-blue-200',
      'Registered': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Archived': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || statusStyles['Registered']}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const RegisterModelModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      version: '',
      owner: '',
      framework: '',
      tags: '',
      files: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newModel = {
        id: `model-${Date.now()}`,
        name: formData.name,
        version: formData.version || '1.0.0',
        status: 'Registered',
        owner: formData.owner,
        lastUpdated: new Date().toISOString(),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        framework: formData.framework,
        accuracy: null,
        deployments: 0,
        artifacts: formData.files.map(f => f.name),
        description: formData.description
      };
      setModels(prev => [newModel, ...prev]);
      setShowRegisterModal(false);
      showNotification('Model registered successfully');
      setFormData({ name: '', description: '', version: '', owner: '', framework: '', tags: '', files: [] });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Register New Model</h2>
              <button onClick={() => setShowRegisterModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter model name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1.0.0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe your model..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner/Team *</label>
                <select
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select owner</option>
                  <option value="Data Science Team">Data Science Team</option>
                  <option value="ML Engineering">ML Engineering</option>
                  <option value="Recommendation Team">Recommendation Team</option>
                  <option value="NLP Team">NLP Team</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Framework</label>
                <select
                  value={formData.framework}
                  onChange={(e) => setFormData(prev => ({ ...prev, framework: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select framework</option>
                  <option value="scikit-learn">scikit-learn</option>
                  <option value="TensorFlow">TensorFlow</option>
                  <option value="PyTorch">PyTorch</option>
                  <option value="Transformers">Transformers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="classification, nlp, recommendation (comma-separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model Artifacts</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PKL, PT, H5, ONNX files supported</p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFormData(prev => ({ ...prev, files: Array.from(e.target.files) }))}
                  className="hidden"
                  accept=".pkl,.pt,.h5,.onnx,.json,.py,.bin,.npz"
                />
              </div>
              {formData.files.length > 0 && (
                <div className="mt-2 space-y-1">
                  {formData.files.map((file, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center">
                      <FileText size={16} className="mr-2" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowRegisterModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Register Model
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ModelDetailModal = ({ model }) => {
    if (!model) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{model.name}</h2>
                <p className="text-sm text-gray-600 mt-1">Version {model.version}</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(model.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Owner</label>
                  <p className="mt-1 text-sm text-gray-900">{model.owner}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Framework</label>
                  <p className="mt-1 text-sm text-gray-900">{model.framework}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(model.lastUpdated)}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-700">{model.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {model.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            {model.accuracy && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Accuracy</span>
                      <Activity size={16} className="text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{(model.accuracy * 100).toFixed(1)}%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Deployments</span>
                      <Shield size={16} className="text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{model.deployments}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Artifacts</span>
                      <FileText size={16} className="text-purple-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{model.artifacts.length}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Artifacts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Artifacts</h3>
              <div className="space-y-2">
                {model.artifacts.map((artifact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText size={16} className="text-gray-400 mr-3" />
                      <span className="text-sm text-gray-900">{artifact}</span>
                    </div>
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      <Download size={16} className="mr-1" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <Edit size={16} className="mr-2" />
                Edit Metadata
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                <Download size={16} className="mr-2" />
                Download All
              </button>
              <button 
                onClick={() => {
                  setShowDetailModal(false);
                  handleDeleteModel(model.id);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
        } border`}>
          <div className="flex items-center">
            {notification.type === 'success' ? <Check size={16} className="mr-2" /> : <AlertTriangle size={16} className="mr-2" />}
            {notification.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Model Registry</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your machine learning models</p>
            </div>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center font-medium"
            >
              <Plus size={20} className="mr-2"  color='white'/>
              <span className='text-white'>Register New Model</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter size={16} className="mr-2" />
                Filters
                {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
              </button>
              
              {selectedModels.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Selected ({selectedModels.size})
                </button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Approved">Approved</option>
                    <option value="Registered">Registered</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                  <select
                    value={ownerFilter}
                    onChange={(e) => setOwnerFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Owners</option>
                    <option value="Data Science Team">Data Science Team</option>
                    <option value="ML Engineering">ML Engineering</option>
                    <option value="Recommendation Team">Recommendation Team</option>
                    <option value="NLP Team">NLP Team</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Framework</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Frameworks</option>
                    <option value="scikit-learn">scikit-learn</option>
                    <option value="TensorFlow">TensorFlow</option>
                    <option value="PyTorch">PyTorch</option>
                    <option value="Transformers">Transformers</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Models Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedModels.size === filteredModels.length && filteredModels.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Model Name
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('version')}
                  >
                    <div className="flex items-center">
                      Version
                      {sortConfig.key === 'version' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {sortConfig.key === 'status' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('owner')}
                  >
                    <div className="flex items-center">
                      Owner
                      {sortConfig.key === 'owner' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    <div className="flex items-center">
                      Last Updated
                      {sortConfig.key === 'lastUpdated' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tags</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredModels.map((model) => (
                  <tr key={model.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedModels.has(model.id)}
                        onChange={() => handleSelectModel(model.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{model.name}</div>
                        <div className="text-sm text-gray-500">{model.description.slice(0, 60)}...</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{model.version}</td>
                    <td className="px-4 py-4">{getStatusBadge(model.status)}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{model.owner}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{formatDate(model.lastUpdated)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {model.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {model.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{model.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedModel(model);
                            setShowDetailModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-full"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteModel(model.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileText size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No models found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter || ownerFilter
                  ? "Try adjusting your search or filters"
                  : "Register your first model to get started"
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredModels.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredModels.length}</span> of{' '}
              <span className="font-medium">{filteredModels.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showRegisterModal && <RegisterModelModal />}
      {showDetailModal && selectedModel && <ModelDetailModal model={selectedModel} />}
    </div>
  );
};

export default ModelRegistry;