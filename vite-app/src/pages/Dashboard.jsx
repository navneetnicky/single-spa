import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [react16Count, setReact16Count] = useState(0);

  useEffect(() => {
    // Read the count saved by React 16 app
    const saved = localStorage.getItem('react16-count');
    if (saved) {
      setReact16Count(parseInt(saved, 10));
    }

    // Load own count
    const ownCount = localStorage.getItem('vite-count');
    if (ownCount) {
      setCount(parseInt(ownCount, 10));
    }
  }, []);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('vite-count', newCount);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the Vite app running React 18!</p>

      <div style={{ 
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        <div style={{ padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
          <h3>React 16 App Counter</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{react16Count}</p>
          <small>This value was set by the React 16 app and read from localStorage</small>
        </div>

        <div style={{ padding: '15px', background: '#fff3e0', borderRadius: '8px' }}>
          <h3>Vite App Counter</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
          <button 
            onClick={handleIncrement}
            style={{
              padding: '10px 20px',
              background: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Increment
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '4px' }}>
        <strong>✓ localStorage/Cookies are shared!</strong>
        <p>Both apps can read and write to the same localStorage and cookies.</p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f3e5f5', borderRadius: '4px' }}>
        <strong>✓ Deep linking works!</strong>
        <p>Current URL: <code>{window.location.pathname}</code></p>
        <p>You can bookmark this page and it will load directly here.</p>
      </div>
    </div>
  );
}
