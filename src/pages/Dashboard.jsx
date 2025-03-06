import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  Filter, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  XCircle,
  PieChart,
  BarChart,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('cro');
  
  // Mock data for charts
  const modelStatusData = [
    { name: 'Production', value: 32, color: '#4CAF50' },
    { name: 'Testing', value: 18, color: '#2196F3' },
    { name: 'Development', value: 14, color: '#FF9800' }
  ];
  
  const validationStatusData = [
    { name: 'Validated', value: 28, color: '#4CAF50' },
    { name: 'Issues Found', value: 12, color: '#FF9800' },
    { name: 'Pending', value: 18, color: '#2196F3' },
    { name: 'Rejected', value: 6, color: '#F44336' }
  ];
  
  const modelTypeData = [
    { name: 'Python', value: 24 },
    { name: 'Excel', value: 20 },
    { name: 'R', value: 12 },
    { name: 'SAS', value: 8 }
  ];
  
  const modelRiskData = [
    { name: 'Credit', models: 18 },
    { name: 'Market', models: 12 },
    { name: 'Operational', models: 9 },
    { name: 'Compliance', models: 15 },
    { name: 'Liquidity', models: 10 }
  ];
  
  const monthlyValidationData = [
    { name: 'Jan', validations: 5, issues: 2 },
    { name: 'Feb', validations: 8, issues: 3 },
    { name: 'Mar', validations: 12, issues: 4 },
    { name: 'Apr', validations: 7, issues: 1 },
    { name: 'May', validations: 10, issues: 3 },
    { name: 'Jun', validations: 9, issues: 2 }
  ];
  
  const modelPerformanceData = [
    { name: 'Jan', performance: 85 },
    { name: 'Feb', performance: 83 },
    { name: 'Mar', performance: 86 },
    { name: 'Apr', performance: 89 },
    { name: 'May', performance: 87 },
    { name: 'Jun', performance: 91 }
  ];
  
  const modelCriticalityData = [
    { name: 'High', value: 24, color: '#F44336' },
    { name: 'Medium', value: 18, color: '#FF9800' },
    { name: 'Low', value: 22, color: '#4CAF50' }
  ];
  
  // RBI specific metrics
  const rbiComplianceData = [
    { name: 'Fully Compliant', value: 38, color: '#4CAF50' },
    { name: 'Partially Compliant', value: 18, color: '#FF9800' },
    { name: 'Non-Compliant', value: 8, color: '#F44336' }
  ];
  
  const validationTimelineData = [
    { name: 'Q1 2024', completed: 15, planned: 18 },
    { name: 'Q2 2024', completed: 14, planned: 16 },
    { name: 'Q3 2024', completed: 17, planned: 20 },
    { name: 'Q4 2024', completed: 21, planned: 22 },
    { name: 'Q1 2025', completed: 19, planned: 24 }
  ];
  
  const riskExposureData = [
    { name: 'Credit', current: 78, threshold: 80 },
    { name: 'Market', current: 65, threshold: 75 },
    { name: 'Liquidity', current: 72, threshold: 70 },
    { name: 'Operational', current: 58, threshold: 65 }
  ];
  
  return (
    <div className="dashboard-container">
      <div className="page-header">
        <div>
          <h1>Dashboard & Reports</h1>
          <p>Visualize model risk management metrics</p>
        </div>
        <div className="header-actions">
          <div className="date-filter">
            <Calendar size={16} />
            <span>Last 6 months</span>
          </div>
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
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'cro' ? 'active' : ''} 
          onClick={() => setActiveTab('cro')}
        >
          CRO Dashboard
        </button>
        <button 
          className={activeTab === 'rbi' ? 'active' : ''} 
          onClick={() => setActiveTab('rbi')}
        >
          RBI Regulatory View
        </button>
       
      </div>
      
      {activeTab === 'cro' && (
        <div className="dashboard-content">
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon"><BarChart2 size={24} /></div>
              <div className="card-content">
                <h3>Total Models</h3>
                <div className="card-value">64</div>
                <div className="card-trend positive">
                  <TrendingUp size={16} /> 
                  <span>+12% from last quarter</span>
                </div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon"><CheckCircle size={24} /></div>
              <div className="card-content">
                <h3>Validated Models</h3>
                <div className="card-value">28</div>
                <div className="card-trend positive">
                  <TrendingUp size={16} /> 
                  <span>+8% from last quarter</span>
                </div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon"><AlertTriangle size={24} /></div>
              <div className="card-content">
                <h3>Issues Found</h3>
                <div className="card-value">12</div>
                <div className="card-trend negative">
                  <TrendingDown size={16} /> 
                  <span>-5% from last quarter</span>
                </div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon"><Clock size={24} /></div>
              <div className="card-content">
                <h3>Average Validation Time</h3>
                <div className="card-value">18 days</div>
                <div className="card-trend positive">
                  <TrendingDown size={16} /> 
                  <span>-3 days from last quarter</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="charts-container">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Model Status Distribution</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={modelStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {modelStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {modelStatusData.map((item, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                      <div className="legend-text">{item.name}: {item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h3>Validation Status</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={validationStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {validationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {validationStatusData.map((item, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                      <div className="legend-text">{item.name}: {item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="charts-container">
            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Monthly Validation Activity</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={monthlyValidationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="validations" name="Completed Validations" fill="#2196F3" />
                    <Bar dataKey="issues" name="Issues Identified" fill="#FF9800" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="charts-container">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Model Performance Trend</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={modelPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="performance" 
                      name="Average Performance Score" 
                      stroke="#4CAF50" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h3>Models by Risk Category</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsBarChart
                    data={modelRiskData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="models" name="Number of Models" fill="#673AB7" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'rbi' && (
        <div className="dashboard-content">
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon"><BarChart2 size={24} /></div>
              <div className="card-content">
                <h3>Total Regulated Models</h3>
                <div className="card-value">42</div>
                <div className="card-trend positive">
                  <TrendingUp size={16} /> 
                  <span>+8% from last quarter</span>
                </div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon"><CheckCircle size={24} /></div>
              <div className="card-content">
                <h3>RBI Compliance Rate</h3>
                <div className="card-value">86%</div>
                <div className="card-trend positive">
                  <TrendingUp size={16} /> 
                  <span>+6% from last quarter</span>
                </div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon"><AlertTriangle size={24} /></div>
              <div className="card-content">
                <h3>Outstanding Findings</h3>
                <div className="card-value">8</div>
                <div className="card-trend negative">
                  <TrendingDown size={16} /> 
                  <span>-4 from last quarter</span>
                </div>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon"><Activity size={24} /></div>
              <div className="card-content">
                <h3>Avg. Time to Remediation</h3>
                <div className="card-value">24 days</div>
                <div className="card-trend positive">
                  <TrendingDown size={16} /> 
                  <span>-5 days from last quarter</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="charts-container">
            <div className="chart-card">
              <div className="chart-header">
                <h3>RBI Compliance Status</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={rbiComplianceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {rbiComplianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {rbiComplianceData.map((item, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                      <div className="legend-text">{item.name}: {item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h3>Model Criticality</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={modelCriticalityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {modelCriticalityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {modelCriticalityData.map((item, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                      <div className="legend-text">{item.name}: {item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="charts-container">
            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Validation Timeline vs. Plan</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={validationTimelineData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completed Validations" fill="#4CAF50" />
                    <Bar dataKey="planned" name="Planned Validations" fill="#2196F3" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="charts-container">
            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Risk Exposure vs. Threshold</h3>
                <Info size={16} className="info-icon" />
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={riskExposureData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Current Exposure (%)" fill="#2196F3" />
                    <Bar dataKey="threshold" name="RBI Threshold (%)" fill="#F44336" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="regulatory-section">
            <h3>Key Regulatory Requirements Status</h3>
            
            <table className="regulatory-table">
              <thead>
                <tr>
                  <th>Requirement Area</th>
                  <th>Compliance Status</th>
                  <th>Last Review</th>
                  <th>Next Review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Model Documentation Standards</td>
                  <td><span className="status-badge status-validated">Compliant</span></td>
                  <td>Jan 15, 2025</td>
                  <td>Jul 15, 2025</td>
                  <td><button className="btn-small">View Details</button></td>
                </tr>
                <tr>
                  <td>Independent Validation Framework</td>
                  <td><span className="status-badge status-validated">Compliant</span></td>
                  <td>Feb 21, 2025</td>
                  <td>Aug 21, 2025</td>
                  <td><button className="btn-small">View Details</button></td>
                </tr>
                <tr>
                  <td>Model Risk Quantification</td>
                  <td><span className="status-badge status-issues">Partially Compliant</span></td>
                  <td>Dec 12, 2024</td>
                  <td>Apr 12, 2025</td>
                  <td><button className="btn-small">View Details</button></td>
                </tr>
                <tr>
                  <td>Governance Framework</td>
                  <td><span className="status-badge status-validated">Compliant</span></td>
                  <td>Jan 30, 2025</td>
                  <td>Jul 30, 2025</td>
                  <td><button className="btn-small">View Details</button></td>
                </tr>
                <tr>
                  <td>Ongoing Monitoring Process</td>
                  <td><span className="status-badge status-issues">Partially Compliant</span></td>
                  <td>Feb 05, 2025</td>
                  <td>May 05, 2025</td>
                  <td><button className="btn-small">View Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;