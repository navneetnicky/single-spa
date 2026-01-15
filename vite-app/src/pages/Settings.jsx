import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en'
  });

  useEffect(() => {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    // Also set as a cookie for demonstration
    document.cookie = `theme=${settings.theme}; path=/; max-age=31536000`;
    alert('Settings saved to localStorage and cookies!');
  };

  const handleClear = () => {
    localStorage.clear();
    alert('All localStorage cleared!');
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h1>Settings Page</h1>
      <p>Configure your application settings (React 18)</p>

      <div style={{ marginTop: '20px', maxWidth: '500px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Theme:
          </label>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              style={{ marginRight: '10px', width: '18px', height: '18px' }}
            />
            <span style={{ fontWeight: 'bold' }}>Enable Notifications</span>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Language:
          </label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
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
            Save Settings
          </button>

          <button
            onClick={handleClear}
            style={{
              padding: '12px 30px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Clear All Data
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e1f5fe', borderRadius: '4px' }}>
        <strong>Current Storage:</strong>
        <ul>
          <li>localStorage items: {Object.keys(localStorage).length}</li>
          <li>Cookies: {document.cookie || 'None'}</li>
        </ul>
      </div>
    </div>
  );
}
