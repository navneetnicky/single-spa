import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function Root() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <div style={{ 
          background: '#fff3e0', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #ff9800'
        }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>
            Vite App (React 18)
          </h2>
          <nav>
            <Link to="/dashboard" style={{ marginRight: '15px', color: '#f57c00' }}>Dashboard</Link>
            <Link to="/profile" style={{ marginRight: '15px', color: '#f57c00' }}>Profile</Link>
            <Link to="/settings" style={{ marginRight: '15px', color: '#f57c00' }}>Settings</Link>
            <span style={{ margin: '0 10px', color: '#999' }}>|</span>
            <Link to="/home" style={{ color: '#1976d2' }}>← Back to React 16 App</Link>
          </nav>
        </div>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
