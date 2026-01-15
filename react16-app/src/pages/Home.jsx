import React, { useState, useEffect } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  // Example: Save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('react16-count');
    if (saved) {
      setCount(parseInt(saved, 10));
    }
  }, []);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('react16-count', newCount);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h1>Home Page</h1>
      <p>Welcome to the React 16 application!</p>
      
      <div style={{ marginTop: '20px' }}>
        <p>Counter (saved in localStorage): <strong>{count}</strong></p>
        <button 
          onClick={handleIncrement}
          style={{
            padding: '10px 20px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', background: '#fff3cd', borderRadius: '4px' }}>
        <strong>Note:</strong> This counter value is stored in localStorage and will be 
        accessible from both React 16 and Vite apps!
      </div>
    </div>
  );
}
