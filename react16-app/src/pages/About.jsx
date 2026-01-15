import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h1>About Page</h1>
      <p>This is the About page running on React 16.14.0</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Features:</h3>
        <ul>
          <li>React 16 with React Router v5</li>
          <li>Integrated with Single-SPA</li>
          <li>Shares localStorage and cookies with other apps</li>
          <li>Independent deployment and development</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '4px' }}>
        <strong>Deep linking works!</strong>
        <p>You can bookmark this URL and it will load directly to this page.</p>
        <p>Current URL: <code>{window.location.pathname}</code></p>
      </div>
    </div>
  );
}
