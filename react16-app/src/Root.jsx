import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export default function Root() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <div style={{ 
          background: '#e3f2fd', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #2196f3'
        }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
            React 16 Application
          </h2>
          <nav>
            <Link to="/home" style={{ marginRight: '15px', color: '#1976d2' }}>Home</Link>
            <Link to="/about" style={{ marginRight: '15px', color: '#1976d2' }}>About</Link>
            <Link to="/contact" style={{ marginRight: '15px', color: '#1976d2' }}>Contact</Link>
            <span style={{ margin: '0 10px', color: '#999' }}>|</span>
            <Link to="/dashboard" style={{ color: '#f57c00' }}>Go to Vite App →</Link>
          </nav>
        </div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
