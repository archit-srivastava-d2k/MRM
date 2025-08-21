import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ModelRegistry from './pages/ModelRegistry';
import ModelValidation from './pages/ModelValidation';
import Dashboard from './pages/Dashboard';
import './App.css';
import ModelBuilder from './pages/ModelBuilder';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path='/modelbuilder/new-model' element={<ModelBuilder />} /> 
            <Route path="/registry" element={<ModelRegistry />} />
            <Route path="/validation" element={<ModelValidation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/registry" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;