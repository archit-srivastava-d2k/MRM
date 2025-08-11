import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Download, Edit, Trash2, Eye, ChevronDown, ChevronUp, X, Upload, Save, AlertTriangle } from 'lucide-react';

const ModelRegistry = () => {
  // Sample data
  const [models, setModels] = useState([
    {
      id: 'model_001',
      name: 'Customer Churn Predictor',
      version: '2.1.0',
      status: 'Deployed',
      owner: 'Data Science Team',
      lastUpdated: '2024-08-10T14:30:00Z',
      tags: ['classification', 'production'],
      description: 'ML model for predicting customer churn probability',
      framework: 'scikit-learn',
      artifacts: ['model.pkl', 'scaler.pkl'],
      createdAt: '2024-07-15T10:00:00Z'
    },
    {
      id: 'model_002',
      name: 'Fraud Detection Model',
      version: '1.5.2',
      status: 'Approved',
      owner: 'Security Team',
      lastUpdated: '2024-08-09T09:15:00Z',
      tags: ['anomaly-detection', 'finance'],
      description: 'Deep learning model for fraud detection',
      framework: 'TensorFlow',
      artifacts: ['model.h5', 'config.json'],
      createdAt: '2024-06-20T08:30:00Z'
    },
    {
      id: 'model_003',
      name: 'Recommendation Engine',
      version: '3.0.1',
      status: 'Registered',
      owner: 'ML Platform Team',
      lastUpdated: '2024-08-08T16:45:00Z',
      tags: ['recommendation', 'collaborative-filtering'],
      description: 'Collaborative filtering recommendation system',
      framework: 'PyTorch',
      artifacts: ['model.pt', 'embeddings.pkl'],
      createdAt: '2024-08-01T12:00:00Z'
    },
    {
      id: 'model_004',
      name: 'Sentiment Analyzer',
      version: '1.2.0',
      status: 'Archived',
      owner: 'NLP Team',
      lastUpdated: '2024-07-30T11:20:00Z',
      tags: ['nlp', 'sentiment'],
      description: 'BERT-based sentiment analysis model',
      framework: 'Transformers',
      artifacts: ['pytorch_model.bin', 'tokenizer.json'],
      createdAt: '2024-05-10T14:15:00Z'
    }
  ]);

  // State management
  const [selectedModels, setSelectedModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [sortColumn, setSortColumn] = useState('lastUpdated');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    version: '',
    owner: '',
    tags: '',
    framework: '',
    status: 'Registered'
  });

  const itemsPerPage = 10;

  // Utility functions
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
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

  const getStatusColor = (status) => {
    const colors = {
      'Deployed': 'bg-green-100 text-green-800',
      'Approved': 'bg-blue-100 text-blue-800',
      'Registered': 'bg-yellow-100 text-yellow-800',
      'Archived': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Filtering and sorting
  const filteredAndSortedModels = useMemo(() => {
    let filtered = models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || model.status === statusFilter;
      const matchesOwner = ownerFilter === 'All' || model.owner === ownerFilter;
      return matchesSearch && matchesStatus && matchesOwner;
    });

    return filtered.sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      
      if (sortColumn === 'lastUpdated' || sortColumn === 'createdAt') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [models, searchTerm, statusFilter, ownerFilter, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedModels.length / itemsPerPage);
  const paginatedModels = filteredAndSortedModels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const handleSelectModel = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleSelectAll = () => {
    setSelectedModels(
      selectedModels.length === paginatedModels.length 
        ? [] 
        : paginatedModels.map(model => model.id)
    );
  };

  const handleDeleteModel = (modelId) => {
    setModels(prev => prev.filter(model => model.id !== modelId));
    setSelectedModels(prev => prev.filter(id => id !== modelId));
    setShowDeleteConfirm(null);
    showNotification('Model deleted successfully');
  };

  const handleBulkDelete = () => {
    setModels(prev => prev.filter(model => !selectedModels.includes(model.id)));
    setSelectedModels([]);
    showNotification(`${selectedModels.length} models deleted successfully`);
  };

  const handleRegisterModel = (e) => {
    e.preventDefault();
    const model = {
      ...newModel,
      id: `model_${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      tags: newModel.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      artifacts: []
    };
    setModels(prev => [model, ...prev]);
    setNewModel({
      name: '',
      description: '',
      version: '',
      owner: '',
      tags: '',
      framework: '',
      status: 'Registered'
    });
    setShowRegisterForm(false);
    showNotification('Model registered successfully');
  };

  const uniqueOwners = [...new Set(models.map(model => model.owner))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Model Registry</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track your ML models
              </p>
            </div>
            <button
              onClick={() => setShowRegisterForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Register New Model
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Registered">Registered</option>
            <option value="Approved">Approved</option>
            <option value="Deployed">Deployed</option>
            <option value="Archived">Archived</option>
          </select>
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Owners</option>
            {uniqueOwners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedModels.length > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedModels.length} models selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
            >
              <Trash2 size={14} />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedModels.length === paginatedModels.length && paginatedModels.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  {[
                    { key: 'name', label: 'Model Name' },
                    { key: 'version', label: 'Version' },
                    { key: 'status', label: 'Status' },
                    { key: 'owner', label: 'Owner' },
                    { key: 'lastUpdated', label: 'Last Updated' }
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        {sortColumn === key && (
                          sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedModels.map((model) => (
                  <tr key={model.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedModels.includes(model.id)}
                        onChange={() => handleSelectModel(model.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-sm text-gray-500">{model.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                      {model.version}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {model.owner}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(model.lastUpdated)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedModel(model)}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-green-600 transition-colors"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-orange-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(model.id)}
                          className="text-gray-600 hover:text-red-600 transition-colors"
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedModels.length)} of {filteredAndSortedModels.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Model Details Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Model Details</h2>
              <button
                onClick={() => setSelectedModel(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedModel.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Version</label>
                  <p className="mt-1 text-sm font-mono text-gray-900">{selectedModel.version}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedModel.status)}`}>
                    {selectedModel.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedModel.owner}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Framework</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedModel.framework}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model ID</label>
                  <p className="mt-1 text-sm font-mono text-gray-900">{selectedModel.id}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{selectedModel.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedModel.tags.map((tag, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Artifacts</label>
                <div className="mt-1 space-y-2">
                  {selectedModel.artifacts.map((artifact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">{artifact}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block font-medium text-gray-700">Created</label>
                  <p className="text-gray-900">{formatDate(selectedModel.createdAt)}</p>
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Last Updated</label>
                  <p className="text-gray-900">{formatDate(selectedModel.lastUpdated)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Model Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-[#f0f0f0] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Register New Model</h2>
              <button
                onClick={() => setShowRegisterForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleRegisterModel} className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newModel.name}
                    onChange={(e) => setNewModel({...newModel, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Version *
                  </label>
                  <input
                    type="text"
                    required
                    value={newModel.version}
                    onChange={(e) => setNewModel({...newModel, version: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newModel.description}
                  onChange={(e) => setNewModel({...newModel, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner/Team *
                  </label>
                  <input
                    type="text"
                    required
                    value={newModel.owner}
                    onChange={(e) => setNewModel({...newModel, owner: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Framework
                  </label>
                  <select
                    value={newModel.framework}
                    onChange={(e) => setNewModel({...newModel, framework: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Framework</option>
                    <option value="scikit-learn">scikit-learn</option>
                    <option value="TensorFlow">TensorFlow</option>
                    <option value="PyTorch">PyTorch</option>
                    <option value="Transformers">Transformers</option>
                    <option value="XGBoost">XGBoost</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newModel.tags}
                  onChange={(e) => setNewModel({...newModel, tags: e.target.value})}
                  placeholder="e.g., classification, production, nlp"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newModel.status}
                  onChange={(e) => setNewModel({...newModel, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Registered">Registered</option>
                  <option value="Approved">Approved</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegisterForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  Register Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this model? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteModel(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelRegistry;