import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  ArrowUpDown,
  BarChart2,
  FileSpreadsheet
} from 'lucide-react';

const ModelValidation = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [validations, setValidations] = useState([
    {
      id: 1,
      modelName: 'Credit Risk Assessment',
      modelId: 'CRA-2023-001',
      status: 'Validated',
      validatedBy: 'John Smith',
      validationDate: '2025-02-10',
      score: 87,
      findings: 3,
      reviewer: 'Sarah Johnson',
      dueDate: '2025-02-15'
    },
    {
      id: 2,
      modelName: 'AML Detection',
      modelId: 'AML-2023-012',
      status: 'Issues Found',
      validatedBy: 'Emma Wilson',
      validationDate: '2025-01-28',
      score: 64,
      findings: 8,
      reviewer: 'Michael Brown',
      dueDate: '2025-02-20'
    },
    {
      id: 3,
      modelName: 'Loan Default Prediction',
      modelId: 'LDP-2023-008',
      status: 'Pending',
      validatedBy: 'Assigned',
      validationDate: '-',
      score: '-',
      findings: '-',
      reviewer: 'Robert Davis',
      dueDate: '2025-03-15'
    },
    {
      id: 4,
      modelName: 'IFRS9 Calculation',
      modelId: 'IFRS-2023-005',
      status: 'Validated',
      validatedBy: 'Jennifer Lee',
      validationDate: '2025-01-15',
      score: 92,
      findings: 1,
      reviewer: 'David Wilson',
      dueDate: '2025-01-30'
    },
    {
      id: 5,
      modelName: 'Customer Churn Prediction',
      modelId: 'CCP-2023-015',
      status: 'Pending',
      validatedBy: 'Unassigned',
      validationDate: '-',
      score: '-',
      findings: '-',
      reviewer: 'Pending Assignment',
      dueDate: '2025-04-10'
    }
  ]);
  
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'validated':
        return <CheckCircle size={18} className="status-icon validated" />;
      case 'issues found':
        return <AlertTriangle size={18} className="status-icon issues" />;
      case 'rejected':
        return <XCircle size={18} className="status-icon rejected" />;
      case 'pending':
        return <Clock size={18} className="status-icon pending" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'validated':
        return 'status-validated';
      case 'issues found':
        return 'status-issues';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };
  
  const getScoreClass = (score) => {
    if (score === '-') return '';
    
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };
  
  return (
    <div className="model-validation-container">
      <div className="page-header">
        <div>
          <h1>Model Validation</h1>
          <p>Validate and review model performance</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setShowTemplateModal(true)}>
            <Download size={16} />
            Download Template
          </button>
          <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
            <Upload size={16} />
            Upload Validation
          </button>
        </div>
      </div>
      
      <div className="search-filter-container">
        <div className="search-box">
          <Search size={20} />
          <input type="text" placeholder="Search validations..." />
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
      
      <div className="validation-tabs">
        <button 
          className={activeTab === 'all' ? 'active' : ''} 
          onClick={() => setActiveTab('all')}
        >
          All Validations
        </button>
        <button 
          className={activeTab === 'validated' ? 'active' : ''} 
          onClick={() => setActiveTab('validated')}
        >
          Validated
        </button>
        <button 
          className={activeTab === 'issues' ? 'active' : ''} 
          onClick={() => setActiveTab('issues')}
        >
          Issues Found
        </button>
        <button 
          className={activeTab === 'pending' ? 'active' : ''} 
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
      </div>
      
      <div className="validations-table">
        <table>
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  Model Name <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Model ID <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Status <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Validated By <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Validation Date <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Score <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Findings <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Reviewer <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Due Date <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {validations
              .filter(validation => 
                activeTab === 'all' || 
                (activeTab === 'validated' && validation.status === 'Validated') ||
                (activeTab === 'issues' && validation.status === 'Issues Found') ||
                (activeTab === 'pending' && validation.status === 'Pending')
              )
              .map(validation => (
                <tr key={validation.id}>
                  <td className="model-name">{validation.modelName}</td>
                  <td>{validation.modelId}</td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(validation.status)}
                      <span className={`status-badge ${getStatusClass(validation.status)}`}>
                        {validation.status}
                      </span>
                    </div>
                  </td>
                  <td>{validation.validatedBy}</td>
                  <td>{validation.validationDate}</td>
                  <td>
                    <span className={`score ${getScoreClass(validation.score)}`}>
                      {validation.score}
                    </span>
                  </td>
                  <td>{validation.findings}</td>
                  <td>{validation.reviewer}</td>
                  <td>{validation.dueDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Report">
                        <FileText size={16} />
                      </button>
                      <button className="btn-icon" title="View Results">
                        <BarChart2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      
      {showTemplateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Download Validation Template</h2>
            
            <p>Select the template format you would like to download:</p>
            
            <div className="template-options">
              <div className="template-option">
                <FileSpreadsheet size={40} />
                <h3>Excel Template</h3>
                <p>Standardized Excel template for model validation results</p>
                <button className="btn-primary">
                  <Download size={16} />
                  Download Excel
                </button>
              </div>
              
              <div className="template-option">
                <FileText size={40} />
                <h3>PDF Template</h3>
                <p>Printable PDF format for offline completion</p>
                <button className="btn-primary">
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowTemplateModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Upload Validation Results</h2>
            
            <div className="form-group">
              <label>Select Model</label>
              <select>
                <option value="">-- Select a model --</option>
                <option value="1">Credit Risk Assessment (CRA-2023-001)</option>
                <option value="2">AML Detection (AML-2023-012)</option>
                <option value="3">Loan Default Prediction (LDP-2023-008)</option>
                <option value="4">IFRS9 Calculation (IFRS-2023-005)</option>
                <option value="5">Customer Churn Prediction (CCP-2023-015)</option>
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Validation Type</label>
                <select>
                  <option value="">Select type</option>
                  <option value="initial">Initial Validation</option>
                  <option value="periodic">Periodic Review</option>
                  <option value="change">Major Change Validation</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Validator</label>
                <select>
                  <option value="">Select validator</option>
                  <option value="john">John Smith</option>
                  <option value="emma">Emma Wilson</option>
                  <option value="jennifer">Jennifer Lee</option>
                </select>
              </div>
            </div>
            
            <div className="file-upload-container">
              <div className="file-upload">
                <Upload size={24} />
                <p>Drag & drop validation results or <span>browse</span></p>
                <p className="file-hint">Please use the standardized template format</p>
              </div>
            </div>
            
            <div className="form-group">
              <label>Notes (optional)</label>
              <textarea placeholder="Enter any additional notes about this validation"></textarea>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
              <button className="btn-primary">
                Upload Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelValidation;