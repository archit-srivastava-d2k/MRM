import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Database, 
  CheckSquare, 
  BarChart2, 
  Settings,
  Users,
  FileText
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <h2>MRM System</h2>
        <p>Model Risk Management</p>
      </div>
      
      <div className="nav-links">
        <h3>MAIN</h3>
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