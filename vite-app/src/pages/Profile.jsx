import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    // Load profile from localStorage
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(userData));
    alert('Profile saved to localStorage!');
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h1>Profile Page</h1>
      <p>Manage your profile (React 18 with Vite)</p>

      <div style={{ marginTop: '20px', maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Bio:
          </label>
          <textarea
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              minHeight: '100px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: '12px 30px',
            background: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Save Profile
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '4px' }}>
        <strong>Note:</strong> Profile data is saved in localStorage and will persist 
        across page reloads and be accessible from both apps!
      </div>
    </div>
  );
}
