import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  Download, 
  Upload, 
  FileText,
  Code,
  Table as TableIcon,
  FileSpreadsheet,
  ArrowUpDown,
  History
} from 'lucide-react';

const ModelRegistry = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [models, setModels] = useState([
    { 
      id: 1, 
      name: 'Credit Risk Assessment', 
      type: 'Python', 
      category: 'Risk', 
      owner: 'Risk Department',
      version: '1.2.0',
      status: 'Production',
      lastUpdated: '2025-02-15',
      criticality: 'High'
    },
    { 
      id: 2, 
      name: 'AML Detection', 
      type: 'R', 
      category: 'Compliance', 
      owner: 'Compliance Team',
      version: '2.0.1',
      status: 'Testing',
      lastUpdated: '2025-02-28',
      criticality: 'High'
    },
    { 
      id: 3, 
      name: 'Customer Churn Prediction', 
      type: 'Python', 
      category: 'Marketing', 
      owner: 'Analytics Team',
      version: '1.0.3',
      status: 'Development',
      lastUpdated: '2025-03-01',
      criticality: 'Medium'
    },
    { 
      id: 4, 
      name: 'IFRS9 Calculation', 
      type: 'Excel', 
      category: 'Finance', 
      owner: 'Finance Department',
      version: '3.1.0',
      status: 'Production',
      lastUpdated: '2025-01-20',
      criticality: 'High'
    },
    { 
      id: 5, 
      name: 'Loan Default Prediction', 
      type: 'SAS', 
      category: 'Risk', 
      owner: 'Credit Team',
      version: '2.4.1',
      status: 'Production',
      lastUpdated: '2025-02-10',
      criticality: 'High'
    }
  ]);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const getModelTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'python':
        return <Code size={18} />;
      case 'r':
        return <Code size={18} />;
      case 'excel':
        return <FileSpreadsheet size={18} />;
      case 'sas':
        return <TableIcon size={18} />;
      default:
        return <FileText size={18} />;
    }
  };
  
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'production':
        return 'status-production';
      case 'testing':
        return 'status-testing';
      case 'development':
        return 'status-development';
      default:
        return '';
    }
  };
  
  return (
    <div className="model-registry-container">
      <div className="page-header">
        <div>
          <h1>Model Registry</h1>
          <p>Register, version and manage models</p>
        </div>
        <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
          <Plus size={16} />
          Register New Model
        </button>
      </div>
      
      <div className="search-filter-container">
        <div className="search-box">
          <Search size={20} />
          <input type="text" placeholder="Search models..." />
        </div>
        
        <div className="filter-box">
          <button className="btn-filter">
            <Filter size={16} />
            Filters
          </button>
          <button className="btn-download">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
      
      <div className="model-tabs">
        <button 
          className={activeTab === 'all' ? 'active' : ''} 
          onClick={() => setActiveTab('all')}
        >
          All Models
        </button>
        <button 
          className={activeTab === 'production' ? 'active' : ''} 
          onClick={() => setActiveTab('production')}
        >
          Production
        </button>
        <button 
          className={activeTab === 'testing' ? 'active' : ''} 
          onClick={() => setActiveTab('testing')}
        >
          Testing
        </button>
        <button 
          className={activeTab === 'development' ? 'active' : ''} 
          onClick={() => setActiveTab('development')}
        >
          Development
        </button>
      </div>
      
      <div className="models-table">
        <table>
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  Name <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Type <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Category <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Owner <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Version <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Status <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Last Updated <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Criticality <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {models
              .filter(model => activeTab === 'all' || model.status.toLowerCase() === activeTab)
              .map(model => (
                <tr key={model.id}>
                  <td className="model-name">{model.name}</td>
                  <td>
                    <div className="model-type">
                      {getModelTypeIcon(model.type)}
                      <span>{model.type}</span>
                    </div>
                  </td>
                  <td>{model.category}</td>
                  <td>{model.owner}</td>
                  <td>
                    <div className="version-cell">
                      <span>{model.version}</span>
                      <History size={16} className="version-icon" />
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(model.status)}`}>
                      {model.status}
                    </span>
                  </td>
                  <td>{model.lastUpdated}</td>
                  <td>
                    <span className={`criticality-badge criticality-${model.criticality.toLowerCase()}`}>
                      {model.criticality}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Download Model">
                        <Download size={16} />
                      </button>
                      <button className="btn-icon" title="View Details">
                        <FileText size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register New Model</h2>
            
            <div className="form-group">
              <label>Model Name</label>
              <input type="text" placeholder="Enter model name" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select>
                  <option value="">Select type</option>
                  <option value="python">Python</option>
                  <option value="r">R</option>
                  <option value="excel">Excel</option>
                  <option value="sas">SAS</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select>
                  <option value="">Select category</option>
                  <option value="risk">Risk</option>
                  <option value="compliance">Compliance</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Owner</label>
                <input type="text" placeholder="Enter owner" />
              </div>
              
              <div className="form-group">
                <label>Version</label>
                <input type="text" placeholder="E.g. 1.0.0" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select>
                  <option value="">Select status</option>
                  <option value="development">Development</option>
                  <option value="testing">Testing</option>
                  <option value="production">Production</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Criticality</label>
                <select>
                  <option value="">Select criticality</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Enter model description"></textarea>
            </div>
            
            <div className="file-upload-container">
              <div className="file-upload">
                <Upload size={24} />
                <p>Drag & drop model files or <span>browse</span></p>
                <p className="file-hint">Supports .py, .r, .sas, .xlsx, .zip files</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
              <button className="btn-primary">
                Register Model
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelRegistry;