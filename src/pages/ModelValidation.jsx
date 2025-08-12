import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Eye, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity, 
  Target, 
  Zap, 
  Brain, 
  Scale, 
  Lock, 
  MessageSquare, 
  Plus, 
  X,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Settings,
  UserCheck,
  BookOpen,
  AlertCircle,
  Cpu,
  Database,
  GitBranch
} from 'lucide-react';

// Mock data for demonstration
const mockModels = [
  {
    id: 'mdl-001',
    name: 'Credit Risk Assessment v2.1',
    version: '2.1.0',
    owner: 'Risk Analytics Team',
    submissionDate: '2024-01-15T10:30:00Z',
    status: 'Under Review',
    validationScore: 0.92,
    metrics: {
      accuracy: 0.94,
      precision: 0.91,
      recall: 0.89,
      f1Score: 0.90,
      aucRoc: 0.96
    },
    biasChecks: {
      fairness: 0.88,
      demographic: 0.92,
      equalized: 0.86
    },
    explainability: 0.85,
    driftScore: 0.12,
    compliance: {
      gdpr: 'Compliant',
      modelCard: 'Complete',
      dataLineage: 'Verified'
    },
    riskLevel: 'Medium',
    approvalHistory: [
      { action: 'Submitted', user: 'John Doe', date: '2024-01-15T10:30:00Z', comment: 'Initial submission' },
      { action: 'Under Review', user: 'Sarah Wilson', date: '2024-01-16T09:15:00Z', comment: 'Started validation process' }
    ],
    testDataset: null
  },
  {
    id: 'mdl-002',
    name: 'Fraud Detection Engine v1.5',
    version: '1.5.2',
    owner: 'Security Analytics',
    submissionDate: '2024-01-12T14:20:00Z',
    status: 'Approved',
    validationScore: 0.96,
    metrics: {
      accuracy: 0.97,
      precision: 0.95,
      recall: 0.94,
      f1Score: 0.95,
      aucRoc: 0.98
    },
    biasChecks: {
      fairness: 0.94,
      demographic: 0.96,
      equalized: 0.93
    },
    explainability: 0.91,
    driftScore: 0.08,
    compliance: {
      gdpr: 'Compliant',
      modelCard: 'Complete',
      dataLineage: 'Verified'
    },
    riskLevel: 'Low',
    approvalHistory: [
      { action: 'Submitted', user: 'Mike Chen', date: '2024-01-12T14:20:00Z', comment: 'Production ready model' },
      { action: 'Approved', user: 'Emily Davis', date: '2024-01-13T11:45:00Z', comment: 'Excellent performance metrics' }
    ],
    testDataset: null
  },
  {
    id: 'mdl-003',
    name: 'Customer Segmentation Model',
    version: '3.0.1',
    owner: 'Marketing Analytics',
    submissionDate: '2024-01-10T09:15:00Z',
    status: 'Rejected',
    validationScore: 0.72,
    metrics: {
      accuracy: 0.78,
      precision: 0.74,
      recall: 0.76,
      f1Score: 0.75,
      aucRoc: 0.82
    },
    biasChecks: {
      fairness: 0.65,
      demographic: 0.68,
      equalized: 0.63
    },
    explainability: 0.71,
    driftScore: 0.28,
    compliance: {
      gdpr: 'Non-Compliant',
      modelCard: 'Incomplete',
      dataLineage: 'Missing'
    },
    riskLevel: 'High',
    approvalHistory: [
      { action: 'Submitted', user: 'Lisa Park', date: '2024-01-10T09:15:00Z', comment: 'New segmentation approach' },
      { action: 'Rejected', user: 'David Brown', date: '2024-01-11T16:30:00Z', comment: 'Bias concerns and compliance issues' }
    ],
    testDataset: null
  }
];

const ModelValidation = () => {
  const [models, setModels] = useState(mockModels);
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showValidationDetails, setShowValidationDetails] = useState(false);
  const [userRole, setUserRole] = useState('Model Validator');

  // Automatically select the first model when switching to Validation tab
  useEffect(() => {
    if (activeTab === 'validation' && !selectedModel && models.length > 0) {
      setSelectedModel(models[0]);
    }
  }, [activeTab, models, selectedModel]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Approved': 'bg-green-100 text-green-800 border-green-300',
      'Under Review': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Rejected': 'bg-red-100 text-red-800 border-red-300',
      'Pending': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    
    const statusIcons = {
      'Approved': <CheckCircle size={14} className="mr-1" />,
      'Under Review': <Clock size={14} className="mr-1" />,
      'Rejected': <XCircle size={14} className="mr-1" />,
      'Pending': <RefreshCw size={14} className="mr-1" />
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
        {statusIcons[status]}
        {status}
      </span>
    );
  };

  const getRiskBadge = (risk) => {
    const riskStyles = {
      'Low': 'bg-green-50 text-green-700 border-green-200',
      'Medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'High': 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${riskStyles[risk]}`}>
        <AlertTriangle size={12} className="mr-1" />
        {risk} Risk
      </span>
    );
  };

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
    const colorStyles = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      red: 'text-red-600 bg-red-50',
      yellow: 'text-yellow-600 bg-yellow-50'
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                {change > 0 ? (
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                ) : (
                  <TrendingDown size={16} className="text-red-500 mr-1" />
                )}
                <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(change)}% from last month
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    );
  };

  const ValidationMetrics = ({ model }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Performance Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Accuracy</span>
              <span className="font-semibold">{(model.metrics.accuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Precision</span>
              <span className="font-semibold">{(model.metrics.precision * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Recall</span>
              <span className="font-semibold">{(model.metrics.recall * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">F1-Score</span>
              <span className="font-semibold">{(model.metrics.f1Score * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">AUC-ROC</span>
              <span className="font-semibold">{(model.metrics.aucRoc * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Scale className="mr-2 text-purple-600" size={20} />
            Bias & Fairness
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fairness Score</span>
              <span className={`font-semibold ${model.biasChecks.fairness > 0.8 ? 'text-green-600' : 'text-red-600'}`}>
                {(model.biasChecks.fairness * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Demographic Parity</span>
              <span className={`font-semibold ${model.biasChecks.demographic > 0.8 ? 'text-green-600' : 'text-red-600'}`}>
                {(model.biasChecks.demographic * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Equalized Odds</span>
              <span className={`font-semibold ${model.biasChecks.equalized > 0.8 ? 'text-green-600' : 'text-red-600'}`}>
                {(model.biasChecks.equalized * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Bias Risk</span>
                {getRiskBadge(model.riskLevel)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="mr-2 text-orange-600" size={20} />
            Explainability & Drift
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Explainability Score</span>
              <span className={`font-semibold ${model.explainability > 0.8 ? 'text-green-600' : 'text-yellow-600'}`}>
                {(model.explainability * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Data Drift</span>
              <span className={`font-semibold ${model.driftScore < 0.2 ? 'text-green-600' : 'text-red-600'}`}>
                {(model.driftScore * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2">Drift Trend (30 days)</div>
              <div className="h-16 bg-gray-50 rounded flex items-end justify-between px-2 py-1">
                {[0.08, 0.09, 0.11, 0.10, 0.12, 0.14, 0.12].map((value, index) => (
                  <div
                    key={index}
                    className={`w-3 rounded-t ${value > 0.15 ? 'bg-red-400' : value > 0.1 ? 'bg-yellow-400' : 'bg-green-400'}`}
                    style={{ height: `${value * 300}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ComplianceChecklist = ({ model }) => {
    const complianceItems = [
      { label: 'GDPR Compliance', status: model.compliance.gdpr, icon: Lock },
      { label: 'Model Card Complete', status: model.compliance.modelCard, icon: FileText },
      { label: 'Data Lineage Verified', status: model.compliance.dataLineage, icon: GitBranch },
      { label: 'Bias Testing Complete', status: 'Complete', icon: Scale },
      { label: 'Security Scan Passed', status: 'Complete', icon: Shield },
      { label: 'Documentation Review', status: 'Complete', icon: BookOpen }
    ];

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="mr-2 text-blue-600" size={20} />
          Compliance Checklist
        </h3>
        <div className="space-y-3">
          {complianceItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <item.icon size={16} className="text-gray-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'Complete' || item.status === 'Compliant' || item.status === 'Verified'
                  ? 'bg-green-100 text-green-800'
                  : item.status === 'Incomplete' || item.status === 'Non-Compliant' || item.status === 'Missing'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ApprovalWorkflow = ({ model }) => {
    const [comment, setComment] = useState('');
    const [decision, setDecision] = useState('');

    const handleApproval = (action) => {
      if (!comment.trim()) {
        alert('Please add a comment for your decision');
        return;
      }

      const updatedModels = models.map(m => {
        if (m.id === model.id) {
          return {
            ...m,
            status: action,
            approvalHistory: [
              ...m.approvalHistory,
              {
                action,
                user: 'Current User',
                date: new Date().toISOString(),
                comment
              }
            ]
          };
        }
        return m;
      });

      setModels(updatedModels);
      setComment('');
      alert(`Model ${action.toLowerCase()} successfully!`);
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserCheck className="mr-2 text-green-600" size={20} />
          Approval Workflow
        </h3>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Current Status:</span>
            {getStatusBadge(model.status)}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Validation Score:</span>
            <span className={`text-lg font-bold ${
              model.validationScore > 0.9 ? 'text-green-600' : 
              model.validationScore > 0.8 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {(model.validationScore * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {userRole === 'Model Validator' && model.status === 'Under Review' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reviewer Comments *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Add your validation comments and feedback..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => handleApproval('Approved')}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center"
              >
                <CheckCircle size={16} className="mr-2" />
                Approve
              </button>
              <button
                onClick={() => handleApproval('Request Changes')}
                className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 flex items-center justify-center"
              >
                <MessageSquare size={16} className="mr-2" />
                Request Changes
              </button>
              <button
                onClick={() => handleApproval('Rejected')}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center justify-center"
              >
                <XCircle size={16} className="mr-2" />
                Reject
              </button>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Approval History</h4>
          <div className="space-y-3">
            {model.approvalHistory.map((entry, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                <div className={`p-1 rounded-full ${
                  entry.action === 'Approved' ? 'bg-green-100' :
                  entry.action === 'Rejected' ? 'bg-red-100' : 
                  entry.action === 'Test Dataset Uploaded' ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  {entry.action === 'Approved' ? <CheckCircle size={12} className="text-green-600" /> :
                   entry.action === 'Rejected' ? <XCircle size={12} className="text-red-600" /> :
                   entry.action === 'Test Dataset Uploaded' ? <Upload size={12} className="text-purple-600" /> :
                   <Clock size={12} className="text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                  <p className="text-sm text-gray-600">{entry.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {entry.user} • {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ModelSubmissionModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      version: '',
      description: '',
      useCase: '',
      trainingDataInfo: '',
      framework: '',
      files: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newModel = {
        id: `mdl-${Date.now()}`,
        name: formData.name,
        version: formData.version || '1.0.0',
        owner: 'Current User',
        submissionDate: new Date().toISOString(),
        status: 'Pending',
        validationScore: null,
        metrics: null,
        riskLevel: 'Unknown',
        testDataset: null,
        biasChecks: { fairness: 0, demographic: 0, equalized: 0 },
        explainability: 0,
        driftScore: 0,
        compliance: { gdpr: 'Pending', modelCard: 'Incomplete', dataLineage: 'Missing' },
        approvalHistory: [
          { action: 'Submitted', user: 'Current User', date: new Date().toISOString(), comment: 'Initial submission' }
        ]
      };
      
      setModels(prev => [newModel, ...prev]);
      setShowSubmissionModal(false);
      alert('Model submitted for validation successfully!');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Submit Model for Validation</h2>
              <button onClick={() => setShowSubmissionModal(false)} className="text-gray-400 hover:text-gray-600">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe your model and its purpose..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Intended Use Case *</label>
              <textarea
                required
                value={formData.useCase}
                onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Describe the intended business use case..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training Data Information *</label>
              <textarea
                required
                value={formData.trainingDataInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, trainingDataInfo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe training data sources, size, features, time period..."
              />
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
                <option value="XGBoost">XGBoost</option>
                <option value="H2O">H2O</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model Artifacts *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">Model files, validation reports, documentation</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowSubmissionModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit for Validation
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ValidationView = () => {
    return (
      <div className="space-y-8">
        {!selectedModel ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Model for Validation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{model.name}</h3>
                      <p className="text-xs text-gray-600">Version {model.version}</p>
                      <p className="text-xs text-gray-500">Submitted by {model.owner}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(model.status)}
                      {getRiskBadge(model.riskLevel)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedModel.name}</h2>
                  <p className="text-sm text-gray-600">Version {selectedModel.version} • Submitted by {selectedModel.owner}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(selectedModel.status)}
                  {getRiskBadge(selectedModel.riskLevel)}
                  <button
                    onClick={() => setSelectedModel(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Change Model
                  </button>
                </div>
              </div>
            </div>
            
            <ValidationMetrics model={selectedModel} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComplianceChecklist model={selectedModel} />
              <ApprovalWorkflow model={selectedModel} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const DashboardView = () => {
    const totalModels = models.length;
    const approvedModels = models.filter(m => m.status === 'Approved').length;
    const underReview = models.filter(m => m.status === 'Under Review').length;
    const rejectedModels = models.filter(m => m.status === 'Rejected').length;

    const handleTestDatasetUpload = (modelId, event) => {
      const file = event.target.files[0];
      if (!file) return;

      const validTypes = ['text/csv', 'application/json', 'application/x-parquet'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid dataset file (CSV, JSON, or Parquet).');
        return;
      }

      const updatedModels = models.map(m => {
        if (m.id === modelId) {
          return {
            ...m,
            testDataset: {
              name: file.name,
              size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
              uploadedAt: new Date().toISOString(),
              status: 'Uploaded'
            },
            approvalHistory: [
              ...m.approvalHistory,
              {
                action: 'Test Dataset Uploaded',
                user: 'Current User',
                date: new Date().toISOString(),
                comment: `Uploaded testing dataset: ${file.name}`
              }
            ]
          };
        }
        return m;
      });

      setModels(updatedModels);
      alert(`Test dataset "${file.name}" uploaded successfully for model ${modelId}!`);
    };

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Models"
            value={totalModels}
            change={12}
            icon={Database}
            color="blue"
          />
          <MetricCard
            title="Approved Models"
            value={approvedModels}
            change={8}
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="Under Review"
            value={underReview}
            change={-15}
            icon={Clock}
            color="yellow"
          />
          <MetricCard
            title="Rejected Models"
            value={rejectedModels}
            change={-25}
            icon={XCircle}
            color="red"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-lg font-semibold text-gray-900">Model Validation Queue</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
                {(userRole === 'Data Scientist' || userRole === 'Governance Admin') && (
                  <button
                    onClick={() => setShowSubmissionModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Submit Model
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Validation Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {models
                  .filter(model => 
                    (!searchTerm || model.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (!statusFilter || model.status === statusFilter)
                  )
                  .map((model) => (
                    <tr key={model.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{model.name}</div>
                          <div className="text-sm text-gray-500">v{model.version}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(model.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {model.validationScore ? (
                          <div className="flex items-center">
                            <div className={`text-sm font-medium ${
                              model.validationScore > 0.9 ? 'text-green-600' : 
                              model.validationScore > 0.8 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {(model.validationScore * 100).toFixed(0)}%
                            </div>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  model.validationScore > 0.9 ? 'bg-green-500' : 
                                  model.validationScore > 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${model.validationScore * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRiskBadge(model.riskLevel)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {model.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(model.submissionDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedModel(model);
                              setActiveTab('validation'); // Switch to validation tab
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye size={16} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download size={16} />
                          </button>
                          <label className="cursor-pointer text-gray-400 hover:text-gray-600">
                            <Upload size={16} />
                            <input
                              type="file"
                              accept=".csv,.json,.parquet"
                              className="hidden"
                              onChange={(e) => handleTestDatasetUpload(model.id, e)}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Model Governance & Validation</h1>
              <p className="text-sm text-gray-600 mt-1">Enterprise-grade model validation and compliance management</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Role: <span className="font-medium">{userRole}</span></span>
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('validation')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'validation' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Validation
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'audit' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Audit Trail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'dashboard' && <DashboardView />}
        
        {activeTab === 'validation' && <ValidationView />}
        
        {activeTab === 'audit' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Audit Trail</h2>
              <p className="text-sm text-gray-600 mt-1">Complete history of all model governance activities</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {models.flatMap(model => 
                  model.approvalHistory.map((entry, index) => (
                    <div key={`${model.id}-${index}`} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className={`p-2 rounded-full ${
                        entry.action === 'Approved' ? 'bg-green-100' :
                        entry.action === 'Rejected' ? 'bg-red-100' : 
                        entry.action === 'Test Dataset Uploaded' ? 'bg-purple-100' : 'bg-blue-100'
                      }`}>
                        {entry.action === 'Approved' ? <CheckCircle size={16} className="text-green-600" /> :
                         entry.action === 'Rejected' ? <XCircle size={16} className="text-red-600" /> :
                         entry.action === 'Test Dataset Uploaded' ? <Upload size={16} className="text-purple-600" /> :
                         <Clock size={16} className="text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{model.name} - {entry.action}</h4>
                          <span className="text-xs text-gray-500">{new Date(entry.date).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{entry.comment}</p>
                        <p className="text-xs text-gray-500 mt-1">By {entry.user}</p>
                      </div>
                    </div>
                  ))
                ).sort((a, b) => new Date(b.props.children[1].props.children[0].props.children[1].props.children) - 
                                 new Date(a.props.children[1].props.children[0].props.children[1].props.children))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showSubmissionModal && <ModelSubmissionModal />}
      
      {showValidationDetails && selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedModel.name}</h2>
                  <p className="text-sm text-gray-600">Detailed Validation Report</p>
                </div>
                <button 
                  onClick={() => setShowValidationDetails(false)} 
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              <ValidationMetrics model={selectedModel} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ComplianceChecklist model={selectedModel} />
                <ApprovalWorkflow model={selectedModel} />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="mr-2 text-blue-600" size={20} />
                  Detailed Performance Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Confusion Matrix</h4>
                    <div className="bg-gray-50 p-4 rounded text-center">
                      <div className="text-xs text-gray-500 mb-2">Predicted</div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="bg-green-200 p-2 rounded">TP: 850</div>
                        <div className="bg-red-200 p-2 rounded">FP: 45</div>
                        <div className="bg-red-200 p-2 rounded">FN: 38</div>
                        <div className="bg-green-200 p-2 rounded">TN: 267</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Feature Importance</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Credit Score', importance: 0.35 },
                        { name: 'Income', importance: 0.28 },
                        { name: 'Debt Ratio', importance: 0.22 },
                        { name: 'Employment Length', importance: 0.15 }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-xs text-gray-600 w-20 truncate">{feature.name}</span>
                          <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 bg-blue-500 rounded-full" 
                              style={{ width: `${feature.importance * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{(feature.importance * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelValidation;