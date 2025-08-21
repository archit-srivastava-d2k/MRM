import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Database, 
  CheckSquare, 
  BarChart2, 
  Settings,
  Users,
  FileText,
  ChevronDown
} from 'lucide-react';

const Sidebar = () => {
  const [isModelBuilderOpen, setIsModelBuilderOpen] = useState(false);

  const toggleModelBuilder = () => {
    setIsModelBuilderOpen(!isModelBuilderOpen);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <h2>MRM System</h2>
        <p>Model Risk Management</p>
      </div>
      
      <div className="nav-links">
        <h3>MAIN</h3>
        <div className="nav-item-container">
          <div 
            className="nav-item flex justify-between items-center cursor-pointer"
            onClick={toggleModelBuilder}
          >
            <div className="flex items-center">
              <Database size={20} />
              <span>Model Builder</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transform transition-transform ${isModelBuilderOpen ? 'rotate-180' : ''}`}
            />
          </div>
          {isModelBuilderOpen && (
            <div className="ml-6 mt-1">
              <NavLink 
                to="/modelbuilder/new-model" 
                className={({ isActive }) => isActive ? "nav-item active pl-4" : "nav-item pl-4"}
              >
                <span>New Model</span>
              </NavLink>
              <NavLink 
                to="/modelbuilder/import" 
                className={({ isActive }) => isActive ? "nav-item active pl-4" : "nav-item pl-4"}
              >
                <span>Import Model</span>
              </NavLink>
            </div>
          )}
        </div>
        <NavLink to="/registry" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Database size={20} />
          <span>Model Registry</span>
        </NavLink>
        
        <NavLink to="/validation" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <CheckSquare size={20} />
          <span>Validation</span>
        </NavLink>
        
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <BarChart2 size={20} />
          <span>Reports & Dashboard</span>
        </NavLink>
      </div>
      
      <div className="nav-links">
        <h3>ADMIN</h3>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        
        <NavLink to="/users" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Users size={20} />
          <span>User Management</span>
        </NavLink>
        
        <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <FileText size={20} />
          <span>Audit Logs</span>
        </NavLink>
      </div>
      
      <div className="sidebar-footer">
        <p>© 2025 MRM System</p>
        <p>v1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;