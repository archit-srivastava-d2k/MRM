import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Share, 
  Filter, 
  Search, 
  Calendar, 
  RefreshCw,
  Eye,
  Settings,
  FileText,
  Database,
  Cpu,
  Zap,
  GitCompare,
  Users,
  Bell,
  Info,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
  Maximize2,
  Grid3X3,
  List,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MoreHorizontal
} from 'lucide-react';

// Mock data for comprehensive reporting
const mockModels = [
  {
    id: 'mdl-001',
    name: 'Credit Risk Scoring Model',
    version: 'auto',
    status: 'Active',
    lastTrained: '2024-01-15T10:30:00Z',
    lastDeployed: '2024-01-16T14:20:00Z',
    environment: 'Production',
    owner: 'Risk Analytics Team',
    description: 'Advanced credit risk assessment using ensemble methods',
    framework: 'XGBoost',
    trainingData: '2.5M samples',
    features: 127,
    currentMetrics: {
      accuracy: 0.947,
      precision: 0.923,
      recall: 0.891,
      f1Score: 0.907,
      aucRoc: 0.968,
      giniCoefficient: 0.836,
      ks: 0.742
    },
    performanceHistory: [
      { date: '2024-01-01', accuracy: 0.945, precision: 0.921, recall: 0.889, f1Score: 0.905, predictions: 12500 },
      { date: '2024-01-02', accuracy: 0.946, precision: 0.922, recall: 0.890, f1Score: 0.906, predictions: 13200 },
      { date: '2024-01-03', accuracy: 0.947, precision: 0.923, recall: 0.891, f1Score: 0.907, predictions: 11800 },
      { date: '2024-01-04', accuracy: 0.946, precision: 0.921, recall: 0.892, f1Score: 0.906, predictions: 14100 },
      { date: '2024-01-05', accuracy: 0.948, precision: 0.924, recall: 0.893, f1Score: 0.908, predictions: 13500 }
    ],
    confusionMatrix: {
      truePositive: 8456,
      falsePositive: 678,
      trueNegative: 15234,
      falseNegative: 1032
    },
    featureImportance: [
      { feature: 'Credit Score', importance: 0.342 },
      { feature: 'Debt-to-Income Ratio', importance: 0.218 },
      { feature: 'Employment Length', importance: 0.156 },
      { feature: 'Annual Income', importance: 0.134 },
      { feature: 'Payment History', importance: 0.089 },
      { feature: 'Credit Utilization', importance: 0.061 }
    ],
    driftAnalysis: {
      dataDrift: 0.087,
      conceptDrift: 0.032,
      predictionDrift: 0.045,
      status: 'Low Risk'
    },
    businessMetrics: {
      totalPredictions: 1250000,
      avgResponseTime: 45,
      errorRate: 0.002,
      throughput: 850
    },
    alerts: [
      { type: 'warning', message: 'Feature drift detected in Credit Utilization', timestamp: '2024-01-15T09:30:00Z' },
      { type: 'info', message: 'Model retrained successfully', timestamp: '2024-01-15T10:30:00Z' }
    ]
  },
  {
    id: 'mdl-002',
    name: 'Fraud Detection Engine',
    version: 'manual',
    status: 'Active',
    lastTrained: '2024-01-12T08:15:00Z',
    lastDeployed: '2024-01-12T16:45:00Z',
    environment: 'Production',
    owner: 'Security Analytics',
    description: 'Real-time fraud detection using deep learning',
    framework: 'TensorFlow',
    trainingData: '5.2M transactions',
    features: 89,
    currentMetrics: {
      accuracy: 0.982,
      precision: 0.956,
      recall: 0.943,
      f1Score: 0.949,
      aucRoc: 0.991,
      falsePositiveRate: 0.018,
      falseNegativeRate: 0.057
    },
    performanceHistory: [
      { date: '2024-01-01', accuracy: 0.980, precision: 0.954, recall: 0.941, f1Score: 0.947, predictions: 45600 },
      { date: '2024-01-02', accuracy: 0.981, precision: 0.955, recall: 0.942, f1Score: 0.948, predictions: 47200 },
      { date: '2024-01-03', accuracy: 0.982, precision: 0.956, recall: 0.943, f1Score: 0.949, predictions: 46800 },
      { date: '2024-01-04', accuracy: 0.981, precision: 0.954, recall: 0.944, f1Score: 0.949, predictions: 48900 },
      { date: '2024-01-05', accuracy: 0.983, precision: 0.957, recall: 0.945, f1Score: 0.951, predictions: 49100 }
    ],
    confusionMatrix: {
      truePositive: 2341,
      falsePositive: 108,
      trueNegative: 46789,
      falseNegative: 142
    },
    featureImportance: [
      { feature: 'Transaction Amount', importance: 0.285 },
      { feature: 'Merchant Category', importance: 0.234 },
      { feature: 'Time of Day', importance: 0.187 },
      { feature: 'Geographic Location', importance: 0.145 },
      { feature: 'User Behavior Pattern', importance: 0.098 },
      { feature: 'Device Fingerprint', importance: 0.051 }
    ],
    driftAnalysis: {
      dataDrift: 0.023,
      conceptDrift: 0.015,
      predictionDrift: 0.019,
      status: 'Very Low Risk'
    },
    businessMetrics: {
      totalPredictions: 2340000,
      avgResponseTime: 23,
      errorRate: 0.001,
      throughput: 1540
    },
    alerts: [
      { type: 'success', message: 'Model performance improved by 0.2%', timestamp: '2024-01-12T16:45:00Z' }
    ]
  },
  {
  id: 'mdl-003',
  name: 'Customer Churn Prediction',
  version: 'auto',
  status: 'Active',
  lastTrained: '2024-02-05T09:00:00Z',
  lastDeployed: '2024-02-06T13:15:00Z',
  environment: 'Production',
  owner: 'Customer Insights Team',
  description: 'Predicts customer churn probability using gradient boosting models',
  framework: 'LightGBM',
  trainingData: '1.8M customer records',
  features: 64,
  currentMetrics: {
    accuracy: 0.912,
    precision: 0.894,
    recall: 0.875,
    f1Score: 0.884,
    aucRoc: 0.945,
    giniCoefficient: 0.795,
    ks: 0.702
  },
  performanceHistory: [
    { date: '2024-02-01', accuracy: 0.911, precision: 0.893, recall: 0.874, f1Score: 0.883, predictions: 9800 },
    { date: '2024-02-02', accuracy: 0.912, precision: 0.894, recall: 0.875, f1Score: 0.884, predictions: 10200 },
    { date: '2024-02-03', accuracy: 0.913, precision: 0.895, recall: 0.876, f1Score: 0.885, predictions: 9600 }
  ],
  confusionMatrix: {
    truePositive: 6784,
    falsePositive: 542,
    trueNegative: 13456,
    falseNegative: 982
  },
  featureImportance: [
    { feature: 'Monthly Charges', importance: 0.254 },
    { feature: 'Contract Type', importance: 0.223 },
    { feature: 'Tenure', importance: 0.192 },
    { feature: 'Support Calls', importance: 0.167 },
    { feature: 'Payment Method', importance: 0.097 },
    { feature: 'Internet Service Type', importance: 0.067 }
  ],
  driftAnalysis: {
    dataDrift: 0.042,
    conceptDrift: 0.019,
    predictionDrift: 0.031,
    status: 'Low Risk'
  },
  businessMetrics: {
    totalPredictions: 760000,
    avgResponseTime: 38,
    errorRate: 0.003,
    throughput: 670
  },
  alerts: [
    { type: 'info', message: 'Model retrained with updated customer records', timestamp: '2024-02-05T09:00:00Z' }
  ]
},
{
  id: 'mdl-004',
  name: 'Loan Approval Predictor',
  version: 'manual',
  status: 'Inactive',
  lastTrained: '2023-12-20T07:45:00Z',
  lastDeployed: '2023-12-21T11:10:00Z',
  environment: 'Staging',
  owner: 'Lending Operations',
  description: 'Predicts loan approval likelihood using logistic regression',
  framework: 'Scikit-learn',
  trainingData: '900K loan applications',
  features: 38,
  currentMetrics: {
    accuracy: 0.875,
    precision: 0.851,
    recall: 0.826,
    f1Score: 0.838,
    aucRoc: 0.901,
    giniCoefficient: 0.758,
    ks: 0.684
  },
  performanceHistory: [
    { date: '2023-12-15', accuracy: 0.874, precision: 0.850, recall: 0.825, f1Score: 0.837, predictions: 5200 },
    { date: '2023-12-16', accuracy: 0.875, precision: 0.851, recall: 0.826, f1Score: 0.838, predictions: 5400 },
    { date: '2023-12-17', accuracy: 0.876, precision: 0.852, recall: 0.827, f1Score: 0.839, predictions: 5100 }
  ],
  confusionMatrix: {
    truePositive: 3245,
    falsePositive: 412,
    trueNegative: 5123,
    falseNegative: 678
  },
  featureImportance: [
    { feature: 'Annual Income', importance: 0.288 },
    { feature: 'Credit History', importance: 0.255 },
    { feature: 'Loan Amount', importance: 0.192 },
    { feature: 'Employment Length', importance: 0.142 },
    { feature: 'Debt-to-Income Ratio', importance: 0.075 },
    { feature: 'Collateral Value', importance: 0.048 }
  ],
  driftAnalysis: {
    dataDrift: 0.051,
    conceptDrift: 0.029,
    predictionDrift: 0.037,
    status: 'Moderate Risk'
  },
  businessMetrics: {
    totalPredictions: 300000,
    avgResponseTime: 50,
    errorRate: 0.004,
    throughput: 480
  },
  alerts: [
    { type: 'warning', message: 'Slight increase in false positives detected', timestamp: '2023-12-20T08:10:00Z' }
  ]
},
{
  id: 'mdl-005',
  name: 'Sentiment Analysis Engine',
  version: 'auto',
  status: 'Active',
  lastTrained: '2024-03-10T06:50:00Z',
  lastDeployed: '2024-03-10T12:20:00Z',
  environment: 'Production',
  owner: 'Marketing Analytics',
  description: 'Classifies customer reviews as positive, neutral, or negative using BERT',
  framework: 'PyTorch',
  trainingData: '12M text reviews',
  features: 512,
  currentMetrics: {
    accuracy: 0.958,
    precision: 0.949,
    recall: 0.946,
    f1Score: 0.948,
    aucRoc: 0.984,
    giniCoefficient: 0.821,
    ks: 0.736
  },
  performanceHistory: [
    { date: '2024-03-08', accuracy: 0.957, precision: 0.948, recall: 0.945, f1Score: 0.947, predictions: 215000 },
    { date: '2024-03-09', accuracy: 0.958, precision: 0.949, recall: 0.946, f1Score: 0.948, predictions: 218500 },
    { date: '2024-03-10', accuracy: 0.959, precision: 0.950, recall: 0.947, f1Score: 0.949, predictions: 220100 }
  ],
  confusionMatrix: {
    truePositive: 184567,
    falsePositive: 5243,
    trueNegative: 292876,
    falseNegative: 7894
  },
  featureImportance: [
    { feature: 'Word Embeddings', importance: 0.412 },
    { feature: 'Sentiment Lexicon', importance: 0.231 },
    { feature: 'Punctuation Usage', importance: 0.154 },
    { feature: 'Negation Handling', importance: 0.108 },
    { feature: 'Stopword Removal', importance: 0.061 },
    { feature: 'POS Tags', importance: 0.034 }
  ],
  driftAnalysis: {
    dataDrift: 0.018,
    conceptDrift: 0.012,
    predictionDrift: 0.014,
    status: 'Very Low Risk'
  },
  businessMetrics: {
    totalPredictions: 15400000,
    avgResponseTime: 19,
    errorRate: 0.001,
    throughput: 1800
  },
  alerts: [
    { type: 'success', message: 'Model retrained with multilingual dataset', timestamp: '2024-03-10T06:50:00Z' }
  ]
}

];

const Dashboard = () => {
  const [models, setModels] = useState(mockModels);
  const [selectedModel, setSelectedModel] = useState(mockModels[0]);
  const [selectedModelsForComparison, setSelectedModelsForComparison] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [userRole, setUserRole] = useState('Analyst');

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue', subtitle = null, trend = null }) => {
    const colorStyles = {
      blue: 'text-blue-600 bg-blue-50 border-blue-100',
      green: 'text-green-600 bg-green-50 border-green-100',
      red: 'text-red-600 bg-red-50 border-red-100',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-100',
      purple: 'text-purple-600 bg-purple-50 border-purple-100'
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${colorStyles[color]} mr-3`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change !== undefined && (
                <div className="flex items-center mt-1">
                  {change > 0 ? (
                    <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  ) : change < 0 ? (
                    <ArrowDownRight size={16} className="text-red-500 mr-1" />
                  ) : (
                    <Minus size={16} className="text-gray-400 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {change > 0 ? '+' : ''}{change}% vs last period
                  </span>
                </div>
              )}
              {trend && (
                <div className="mt-2 flex items-center space-x-1">
                  {trend.map((point, index) => (
                    <div
                      key={index}
                      className="w-1 bg-blue-200 rounded"
                      style={{ height: `${point * 20 + 4}px` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PerformanceChart = ({ model, metric = 'accuracy' }) => {
    const data = model.performanceHistory;
    const maxValue = Math.max(...data.map(d => d[metric]));
    const minValue = Math.min(...data.map(d => d[metric]));
    const range = maxValue - minValue;

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">{metric} Trend</h3>
          <select className="text-sm border border-gray-300 rounded px-3 py-1">
            <option value="accuracy">Accuracy</option>
            <option value="precision">Precision</option>
            <option value="recall">Recall</option>
            <option value="f1Score">F1 Score</option>
          </select>
        </div>
        <div className="h-48 relative">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((fraction, index) => (
              <line
                key={index}
                x1="0"
                y1={`${fraction * 100}%`}
                x2="100%"
                y2={`${fraction * 100}%`}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            ))}
            
            {/* Chart line */}
            <polyline
              fill="url(#gradient)"
              stroke="#3B82F6"
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = (1 - (d[metric] - minValue) / range) * 100;
                return `${x},${y}`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = (1 - (d[metric] - minValue) / range) * 100;
              return (
                <circle
                  key={i}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {data.map((d, i) => (
              <span key={i}>{new Date(d.date).toLocaleDateString()}</span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Current: <span className="font-semibold text-gray-900">{(model.currentMetrics[metric] * 100).toFixed(2)}%</span>
          </span>
          <span className="text-gray-600">
            Range: {(minValue * 100).toFixed(2)}% - {(maxValue * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    );
  };

  const ConfusionMatrix = ({ matrix }) => {
    const total = matrix.truePositive + matrix.falsePositive + matrix.trueNegative + matrix.falseNegative;
    
    const cells = [
      { label: 'TP', value: matrix.truePositive, color: 'bg-green-100 text-green-800', position: 'top-left' },
      { label: 'FP', value: matrix.falsePositive, color: 'bg-red-100 text-red-800', position: 'top-right' },
      { label: 'FN', value: matrix.falseNegative, color: 'bg-red-100 text-red-800', position: 'bottom-left' },
      { label: 'TN', value: matrix.trueNegative, color: 'bg-green-100 text-green-800', position: 'bottom-right' }
    ];

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confusion Matrix</h3>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-2 w-64 h-64">
            {cells.map((cell, index) => (
              <div
                key={index}
                className={`${cell.color} rounded-lg p-4 flex flex-col items-center justify-center border-2`}
              >
                <span className="text-xs font-medium opacity-75">{cell.label}</span>
                <span className="text-2xl font-bold mt-1">{cell.value.toLocaleString()}</span>
                <span className="text-xs mt-1 opacity-75">
                  {((cell.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          
          {/* Axis labels */}
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600 mb-2">Predicted</div>
            <div className="flex justify-center space-x-8">
              <span className="text-sm font-medium">Positive</span>
              <span className="text-sm font-medium">Negative</span>
            </div>
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90">
            <div className="text-sm text-gray-600">Actual</div>
          </div>
        </div>
        
        {/* Derived metrics */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-600">Sensitivity (TPR)</div>
            <div className="text-lg font-semibold">
              {((matrix.truePositive / (matrix.truePositive + matrix.falseNegative)) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-600">Specificity (TNR)</div>
            <div className="text-lg font-semibold">
              {((matrix.trueNegative / (matrix.trueNegative + matrix.falsePositive)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FeatureImportance = ({ features }) => {
    const maxImportance = Math.max(...features.map(f => f.importance));
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Importance</h3>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-700 truncate">
                {feature.feature}
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-3 relative">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(feature.importance / maxImportance) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-sm font-semibold text-gray-900 text-right">
                {(feature.importance * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <div className="flex items-center">
            <Info size={16} className="text-blue-600 mr-2" />
            <span className="text-sm text-blue-800">
              Top 3 features contribute {(features.slice(0, 3).reduce((sum, f) => sum + f.importance, 0) * 100).toFixed(1)}% of model predictions
            </span>
          </div>
        </div>
      </div>
    );
  };

  const DriftAnalysis = ({ drift }) => {
    const getDriftStatus = (value) => {
      if (value < 0.05) return { status: 'Very Low', color: 'text-green-600 bg-green-50 border-green-200' };
      if (value < 0.1) return { status: 'Low', color: 'text-blue-600 bg-blue-50 border-blue-200' };
      if (value < 0.2) return { status: 'Medium', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
      return { status: 'High', color: 'text-red-600 bg-red-50 border-red-200' };
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Drift Analysis</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDriftStatus(Math.max(drift.dataDrift, drift.conceptDrift, drift.predictionDrift)).color}`}>
            {getDriftStatus(Math.max(drift.dataDrift, drift.conceptDrift, drift.predictionDrift)).status} Risk
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Data Drift</div>
              <div className="text-sm text-gray-600">Input feature distribution changes</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">{(drift.dataDrift * 100).toFixed(1)}%</div>
              <div className={`text-xs font-medium ${getDriftStatus(drift.dataDrift).color.split(' ')[0]}`}>
                {getDriftStatus(drift.dataDrift).status}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Concept Drift</div>
              <div className="text-sm text-gray-600">Target variable relationship changes</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">{(drift.conceptDrift * 100).toFixed(1)}%</div>
              <div className={`text-xs font-medium ${getDriftStatus(drift.conceptDrift).color.split(' ')[0]}`}>
                {getDriftStatus(drift.conceptDrift).status}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Prediction Drift</div>
              <div className="text-sm text-gray-600">Model output distribution changes</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">{(drift.predictionDrift * 100).toFixed(1)}%</div>
              <div className={`text-xs font-medium ${getDriftStatus(drift.predictionDrift).color.split(' ')[0]}`}>
                {getDriftStatus(drift.predictionDrift).status}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
          <div className="flex items-center">
            <AlertTriangle size={16} className="text-amber-600 mr-2" />
            <span className="text-sm text-amber-800">
              {drift.dataDrift > 0.1 ? 'Consider model retraining due to high data drift' : 'Model drift levels within acceptable range'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const ModelComparison = ({ models }) => {
    if (models.length < 2) return null;

    const metrics = ['accuracy', 'precision', 'recall', 'f1Score', 'aucRoc'];
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Model Comparison</h3>
          <button 
            onClick={() => setShowComparison(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Metric</th>
                {models.map((model, index) => (
                  <th key={index} className="text-center py-3 px-4 font-medium text-gray-900">
                    <div>{model.name}</div>
                    <div className="text-sm font-normal text-gray-500">v{model.version}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-700 capitalize">
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </td>
                  {models.map((model, index) => {
                    const value = model.currentMetrics[metric];
                    const bestValue = Math.max(...models.map(m => m.currentMetrics[metric]));
                    const isBest = value === bestValue;
                    
                    return (
                      <td key={index} className={`py-3 px-4 text-center ${isBest ? 'bg-green-50' : ''}`}>
                        <span className={`font-semibold ${isBest ? 'text-green-700' : 'text-gray-900'}`}>
                          {(value * 100).toFixed(2)}%
                        </span>
                        {isBest && <CheckCircle size={16} className="inline-block ml-2 text-green-600" />}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const BusinessMetrics = ({ metrics }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business & Operational Metrics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{metrics.totalPredictions.toLocaleString()}</div>
            <div className="text-sm text-blue-600 mt-1">Total Predictions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">{metrics.avgResponseTime}ms</div>
            <div className="text-sm text-green-600 mt-1">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-700">{(metrics.errorRate * 100).toFixed(3)}%</div>
            <div className="text-sm text-purple-600 mt-1">Error Rate</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-700">{metrics.throughput}</div>
            <div className="text-sm text-orange-600 mt-1">Req/sec</div>
          </div>
        </div>
      </div>
    );
  };

  const AlertsPanel = ({ alerts }) => {
    const getAlertIcon = (type) => {
      switch (type) {
        case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
        case 'error': return <XCircle size={16} className="text-red-500" />;
        case 'success': return <CheckCircle size={16} className="text-green-500" />;
        default: return <Info size={16} className="text-blue-500" />;
      }
    };

    const getAlertColor = (type) => {
      switch (type) {
        case 'warning': return 'bg-yellow-50 border-yellow-200';
        case 'error': return 'bg-red-50 border-red-200';
        case 'success': return 'bg-green-50 border-green-200';
        default: return 'bg-blue-50 border-blue-200';
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell size={20} className="mr-2" />
          Recent Alerts
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bell size={24} className="mx-auto mb-2 opacity-50" />
              <p>No recent alerts</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ExportOptions = () => {
    return (
      <div className="relative">
        <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
          <Download size={16} className="mr-2" />
          Export Report
          <ChevronDown size={16} className="ml-2" />
        </button>
      </div>
    );
  };

  const ShareOptions = () => {
    return (
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
        <Share size={16} className="mr-2" />
        Share
      </button>
    );
  };

  const OverviewTab = () => {
    return (
      <div className="space-y-8">
        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Accuracy"
            value={`${(selectedModel.currentMetrics.accuracy * 100).toFixed(2)}%`}
            change={0.15}
            icon={Target}
            color="green"
            trend={[0.8, 0.85, 0.9, 0.92, 0.94]}
          />
          <MetricCard
            title="Precision"
            value={`${(selectedModel.currentMetrics.precision * 100).toFixed(2)}%`}
            change={-0.08}
            icon={Activity}
            color="blue"
            trend={[0.85, 0.87, 0.89, 0.91, 0.92]}
          />
          <MetricCard
            title="Recall"
            value={`${(selectedModel.currentMetrics.recall * 100).toFixed(2)}%`}
            change={0.23}
            icon={TrendingUp}
            color="purple"
            trend={[0.82, 0.84, 0.86, 0.88, 0.89]}
          />
          <MetricCard
            title="AUC-ROC"
            value={`${(selectedModel.currentMetrics.aucRoc * 100).toFixed(2)}%`}
            change={0.05}
            icon={BarChart3}
            color="yellow"
            trend={[0.91, 0.93, 0.95, 0.96, 0.97]}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PerformanceChart model={selectedModel} metric="accuracy" />
          <ConfusionMatrix matrix={selectedModel.confusionMatrix} />
        </div>

        {/* Feature Analysis & Business Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureImportance features={selectedModel.featureImportance} />
          <BusinessMetrics metrics={selectedModel.businessMetrics} />
        </div>

        {/* Drift Analysis & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DriftAnalysis drift={selectedModel.driftAnalysis} />
          <AlertsPanel alerts={selectedModel.alerts} />
        </div>
      </div>
    );
  };

  const PerformanceTab = () => {
    return (
      <div className="space-y-8">
        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PerformanceChart model={selectedModel} metric="accuracy" />
          <PerformanceChart model={selectedModel} metric="f1Score" />
        </div>

        {/* Detailed Metrics Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Performance Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Accuracy</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Precision</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Recall</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">F1 Score</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Predictions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedModel.performanceHistory.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">
                      {(entry.accuracy * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">
                      {(entry.precision * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">
                      {(entry.recall * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">
                      {(entry.f1Score * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">
                      {entry.predictions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Benchmarking */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Benchmarking</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl font-bold text-green-700 mb-2">Industry Average</div>
              <div className="text-sm text-green-600 mb-3">Credit Risk Models</div>
              <div className="text-lg font-semibold text-gray-900">89.2%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-2">Current Model</div>
              <div className="text-sm text-blue-600 mb-3">{selectedModel.name}</div>
              <div className="text-lg font-semibold text-gray-900">{(selectedModel.currentMetrics.accuracy * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-3xl font-bold text-purple-700 mb-2">Performance Gap</div>
              <div className="text-sm text-purple-600 mb-3">vs Industry</div>
              <div className="text-lg font-semibold text-gray-900">+{((selectedModel.currentMetrics.accuracy - 0.892) * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Above Average</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ComparisonTab = () => {
    return (
      <div className="space-y-8">
        {/* Model Selection for Comparison */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Models to Compare</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <div key={model.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{model.name}</div>
                    <div className="text-sm text-gray-500">v{model.version}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedModelsForComparison.includes(model.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedModelsForComparison(prev => [...prev, model.id]);
                      } else {
                        setSelectedModelsForComparison(prev => prev.filter(id => id !== model.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Results */}
        {selectedModelsForComparison.length >= 2 && (
          <ModelComparison 
            models={models.filter(m => selectedModelsForComparison.includes(m.id))} 
          />
        )}

        {/* Side-by-side Feature Comparison */}
        {selectedModelsForComparison.length === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {models.filter(m => selectedModelsForComparison.includes(m.id)).map((model, index) => (
              <div key={index} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{model.name} v{model.version}</h4>
                  <FeatureImportance features={model.featureImportance} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ModelCard = ({ model, onSelect, isSelected }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return 'text-green-700 bg-green-100';
        case 'Deprecated': return 'text-red-700 bg-red-100';
        case 'Testing': return 'text-yellow-700 bg-yellow-100';
        default: return 'text-gray-700 bg-gray-100';
      }
    };

    return (
      <div 
        className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onSelect(model)}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{model.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{model.description}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                {model.status}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">v{model.version}</div>
              <div className="text-xs text-gray-400 mt-1">{model.environment}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500">Owner</div>
              <div className="text-sm font-medium text-gray-900">{model.owner}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Framework</div>
              <div className="text-sm font-medium text-gray-900">{model.framework}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Last Trained</div>
              <div className="text-sm font-medium text-gray-900">
                {new Date(model.lastTrained).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Features</div>
              <div className="text-sm font-medium text-gray-900">{model.features}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{(model.currentMetrics.accuracy * 100).toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{(model.currentMetrics.precision * 100).toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Precision</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{(model.currentMetrics.recall * 100).toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Recall</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ModelListView = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Accuracy</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Precision</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Recall</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Last Trained</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {models
                .filter(model => 
                  (!searchTerm || model.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (!statusFilter || model.status === statusFilter)
                )
                .map((model) => (
                  <tr 
                    key={model.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedModel?.id === model.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-sm text-gray-500">v{model.version} • {model.owner}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        model.status === 'Active' ? 'text-green-700 bg-green-100' :
                        model.status === 'Deprecated' ? 'text-red-700 bg-red-100' :
                        'text-yellow-700 bg-yellow-100'
                      }`}>
                        {model.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">
                      {(model.currentMetrics.accuracy * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">
                      {(model.currentMetrics.precision * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">
                      {(model.currentMetrics.recall * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {new Date(model.lastTrained).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Download size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Model Reporting & Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Comprehensive model performance monitoring and analysis</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Role: <span className="font-medium">{userRole}</span></span>
              <ExportOptions />
              <ShareOptions />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Model List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Models</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Deprecated">Deprecated</option>
                  <option value="Testing">Testing</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 border border-gray-300 rounded-md hover:bg-gray-50 ${showFilters ? 'bg-blue-50 border-blue-300' : ''}`}
                >
                  <Filter size={16} />
                </button>
              </div>

              {showFilters && (
                <div className="p-3 bg-gray-50 rounded-md space-y-2">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>All Owners</option>
                    <option>Risk Analytics Team</option>
                    <option>Security Analytics</option>
                  </select>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>All Frameworks</option>
                    <option>XGBoost</option>
                    <option>TensorFlow</option>
                    <option>scikit-learn</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          
          {/* Model List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {models
                .filter(model => 
                  (!searchTerm || model.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (!statusFilter || model.status === statusFilter)
                )
                .map((model) => (
                  <div
                    key={model.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      selectedModel?.id === model.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{model.name}</h3>
                        <p className="text-xs text-gray-500">v{model.version}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        model.status === 'Active' ? 'text-green-700 bg-green-100' :
                        model.status === 'Deprecated' ? 'text-red-700 bg-red-100' :
                        'text-yellow-700 bg-yellow-100'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Accuracy:</span>
                        <span className="font-medium text-gray-900 ml-1">
                          {(model.currentMetrics.accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Precision:</span>
                        <span className="font-medium text-gray-900 ml-1">
                          {(model.currentMetrics.precision * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      Updated: {new Date(model.lastTrained).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedModel && (
            <>
              {/* Model Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedModel.name}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>Version {selectedModel.version}</span>
                      <span>•</span>
                      <span>{selectedModel.owner}</span>
                      <span>•</span>
                      <span>Last trained: {new Date(selectedModel.lastTrained).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className={`font-medium ${
                        selectedModel.status === 'Active' ? 'text-green-600' :
                        selectedModel.status === 'Deprecated' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {selectedModel.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-gray-600">
                      <RefreshCw size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex items-center space-x-8 mt-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('performance')}
                    className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'performance'
                                           ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                >
                  Comparison
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'performance' && <PerformanceTab />}
              {activeTab === 'comparison' && <ComparisonTab />}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
};

export default Dashboard;