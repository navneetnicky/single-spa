# Single-SPA Microfrontend Architecture
## Complete Documentation & Code Flow Guide

---

# Table of Contents

1. [Introduction](#1-introduction)
2. [Project Structure](#2-project-structure)
3. [Architecture Overview](#3-architecture-overview)
4. [How Single-SPA Works](#4-how-single-spa-works)
5. [Root Configuration](#5-root-configuration)
6. [React 16 App (Webpack)](#6-react-16-app-webpack)
7. [Vite App (React 18)](#7-vite-app-react-18)
8. [Routing & Navigation Flow](#8-routing--navigation-flow)
9. [Data Sharing Between Apps](#9-data-sharing-between-apps)
10. [Build & Development Setup](#10-build--development-setup)
11. [Code Flow Diagrams](#11-code-flow-diagrams)
12. [Troubleshooting](#12-troubleshooting)

---

# 1. Introduction

## What is Single-SPA?

Single-SPA is a JavaScript framework for building **microfrontend architectures**. It allows multiple frontend applications (built with different frameworks like React, Vue, Angular) to coexist on the same page.

## What This Project Demonstrates

This project implements a microfrontend architecture with:

- **Two independent micro-applications**
- **Different React versions** (React 16 and React 18)
- **Different build tools** (Webpack and Vite)
- **Shared data via localStorage and cookies**
- **Route-based application switching**

## Key Benefits

| Benefit | Description |
|---------|-------------|
| **Independent Development** | Teams can work on separate apps without conflicts |
| **Technology Freedom** | Each app can use different frameworks/versions |
| **Incremental Upgrades** | Migrate piece by piece, not all at once |
| **Isolated Failures** | One app crashing doesn't break others |
| **Separate Deployments** | Deploy apps independently |

---

# 2. Project Structure

```
single-spa-project/
│
├── react16-app/                    # Micro-frontend #1
│   ├── src/
│   │   ├── index.js               # Single-SPA lifecycle exports
│   │   ├── index.html             # Main HTML (hosts all apps)
│   │   ├── spa-config.js          # App registration config
│   │   ├── Root.jsx               # Root component with router
│   │   └── pages/
│   │       ├── Home.jsx           # Home page component
│   │       ├── About.jsx          # About page component
│   │       └── Contact.jsx        # Contact page component
│   ├── webpack.config.js          # Webpack configuration
│   ├── package.json               # Dependencies & scripts
│   └── .babelrc                   # Babel configuration
│
├── vite-app/                       # Micro-frontend #2
│   ├── src/
│   │   ├── main.jsx               # Single-SPA lifecycle exports
│   │   ├── Root.jsx               # Root component with router
│   │   └── pages/
│   │       ├── Dashboard.jsx      # Dashboard page
│   │       ├── Profile.jsx        # Profile page
│   │       └── Settings.jsx       # Settings page
│   ├── vite.config.js             # Vite configuration
│   └── package.json               # Dependencies & scripts
│
├── start-all.sh                    # Unix startup script
└── start-all.bat                   # Windows startup script
```

## File Purposes

| File | Purpose |
|------|---------|
| `index.html` | Entry point, loads SystemJS and defines import maps |
| `spa-config.js` | Registers all micro-apps with Single-SPA |
| `index.js` / `main.jsx` | Exports lifecycle functions (bootstrap, mount, unmount) |
| `Root.jsx` | Main component with React Router setup |
| `webpack.config.js` | Bundles React 16 app in SystemJS format |
| `vite.config.js` | Bundles Vite app in SystemJS format |

---

# 3. Architecture Overview

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    index.html                            │   │
│   │  ┌─────────────────────────────────────────────────┐    │   │
│   │  │              SystemJS Import Maps                │    │   │
│   │  │  - single-spa (CDN)                              │    │   │
│   │  │  - @myapp/react16 (localhost:8080)              │    │   │
│   │  │  - @myapp/vite (localhost:5173)                 │    │   │
│   │  └─────────────────────────────────────────────────┘    │   │
│   │                                                          │   │
│   │  ┌─────────────────────────────────────────────────┐    │   │
│   │  │           <div id="single-spa-application">      │    │   │
│   │  │                                                  │    │   │
│   │  │    ┌──────────────┐    ┌──────────────┐         │    │   │
│   │  │    │  React 16    │ OR │   Vite App   │         │    │   │
│   │  │    │    App       │    │  (React 18)  │         │    │   │
│   │  │    └──────────────┘    └──────────────┘         │    │   │
│   │  │                                                  │    │   │
│   │  └─────────────────────────────────────────────────┘    │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Interaction

```
┌──────────────┐     registers      ┌──────────────┐
│  spa-config  │ ─────────────────► │  Single-SPA  │
│     .js      │                    │   (Router)   │
└──────────────┘                    └──────┬───────┘
                                           │
                          URL matches      │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
           /home, /about,          /dashboard,              other routes
           /contact                /profile, /settings
                    │                      │
                    ▼                      ▼
           ┌──────────────┐       ┌──────────────┐
           │  React 16    │       │   Vite App   │
           │    App       │       │  (React 18)  │
           │ Port: 8080   │       │ Port: 5173   │
           └──────────────┘       └──────────────┘
```

---

# 4. How Single-SPA Works

## Core Concepts

### 4.1 Application Lifecycle

Every Single-SPA application must export three lifecycle functions:

```javascript
// These are REQUIRED exports for every micro-app

export function bootstrap(props) {
  // Called once when app is first loaded
  // Initialize the application
  return Promise.resolve();
}

export function mount(props) {
  // Called every time the app should be displayed
  // Render your app to the DOM
  return Promise.resolve();
}

export function unmount(props) {
  // Called every time the app should be hidden
  // Clean up and remove from DOM
  return Promise.resolve();
}
```

### 4.2 Application States

```
                    ┌─────────────┐
                    │  NOT_LOADED │  (Initial state)
                    └──────┬──────┘
                           │ load()
                           ▼
                    ┌─────────────┐
                    │NOT_BOOTSTRAPPED│
                    └──────┬──────┘
                           │ bootstrap()
                           ▼
                    ┌─────────────┐
                    │ NOT_MOUNTED │ ◄─────────────┐
                    └──────┬──────┘               │
                           │ mount()              │ unmount()
                           ▼                      │
                    ┌─────────────┐               │
                    │   MOUNTED   │ ──────────────┘
                    └─────────────┘
```

### 4.3 SystemJS Module Loading

SystemJS is a module loader that enables dynamic imports in the browser:

```html
<!-- Define where modules are located -->
<script type="systemjs-importmap">
{
  "imports": {
    "@myapp/react16": "http://localhost:8080/myapp-react16.js",
    "@myapp/vite": "http://localhost:5173/myapp-vite.js"
  }
}
</script>

<!-- SystemJS loads modules on demand -->
<script>
  System.import('@myapp/react16'); // Fetches from localhost:8080
</script>
```

---

# 5. Root Configuration

The root configuration is the **orchestrator** that controls which micro-app is active.

## 5.1 HTML Entry Point (index.html)

**Location:** `react16-app/src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Single-SPA Microfrontend</title>

  <!-- SystemJS Library - Enables dynamic module loading -->
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/system.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/extras/amd.min.js"></script>

  <!-- Import Maps - Define module locations -->
  <script type="systemjs-importmap">
  {
    "imports": {
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.5/lib/system/single-spa.min.js",
      "react": "https://cdn.jsdelivr.net/npm/react@16.14.0/umd/react.production.min.js",
      "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.14.0/umd/react-dom.production.min.js",
      "react-router-dom": "https://cdn.jsdelivr.net/npm/react-router-dom@5.3.4/umd/react-router-dom.min.js",
      "@myapp/spa-config": "http://localhost:8080/spa-config.js",
      "@myapp/react16": "http://localhost:8080/myapp-react16.js",
      "@myapp/vite": "http://localhost:5173/myapp-vite.js"
    }
  }
  </script>
</head>
<body>
  <!-- Navigation (Always Visible) -->
  <nav style="background: #333; color: white; padding: 1rem;">
    <a href="/home">Home</a> |
    <a href="/about">About</a> |
    <a href="/contact">Contact</a> |
    <a href="/dashboard">Dashboard</a> |
    <a href="/profile">Profile</a> |
    <a href="/settings">Settings</a>
  </nav>

  <!-- Mount Point - Apps render here -->
  <div id="single-spa-application"></div>

  <!-- Load the spa-config to register and start apps -->
  <script>
    System.import('@myapp/spa-config');
  </script>
</body>
</html>
```

### Understanding Import Maps

| Module Name | URL | Purpose |
|-------------|-----|---------|
| `single-spa` | CDN | The orchestration framework |
| `react` | CDN | React library (shared) |
| `@myapp/spa-config` | localhost:8080 | App registration logic |
| `@myapp/react16` | localhost:8080 | React 16 micro-app bundle |
| `@myapp/vite` | localhost:5173 | Vite micro-app bundle |

## 5.2 App Registration (spa-config.js)

**Location:** `react16-app/src/spa-config.js`

```javascript
import { registerApplication, start } from 'single-spa';

// ═══════════════════════════════════════════════════════════════
// REGISTER REACT 16 APPLICATION
// ═══════════════════════════════════════════════════════════════
registerApplication({
  name: '@myapp/react16',                    // Unique app identifier
  app: () => System.import('@myapp/react16'), // Load function
  activeWhen: (location) => {                // When to activate
    const path = location.pathname;

    // Active for these routes:
    // - / (root)
    // - /home
    // - /about
    // - /contact

    if (path === '/' || path === '/home' ||
        path === '/about' || path === '/contact') {
      return true;
    }

    // Also active for sub-routes like /home/details
    return ['/home', '/about', '/contact'].some(route =>
      path.startsWith(route + '/')
    );
  },
});

// ═══════════════════════════════════════════════════════════════
// REGISTER VITE (REACT 18) APPLICATION
// ═══════════════════════════════════════════════════════════════
registerApplication({
  name: '@myapp/vite',
  app: () => System.import('@myapp/vite'),
  activeWhen: (location) => {
    const path = location.pathname;

    // Active for these routes:
    // - /dashboard
    // - /profile
    // - /settings

    return ['/dashboard', '/profile', '/settings'].some(route =>
      path === route || path.startsWith(route + '/')
    );
  },
});

// ═══════════════════════════════════════════════════════════════
// START SINGLE-SPA
// ═══════════════════════════════════════════════════════════════
start({
  urlRerouteOnly: true  // Only trigger on URL changes
});

console.log('Single-SPA configuration loaded!');
```

### How `activeWhen` Works

```
URL: /home
  │
  ├─► Check React 16 activeWhen → path === '/home' → TRUE → Mount React16
  │
  └─► Check Vite activeWhen → path !== '/dashboard|profile|settings' → FALSE

URL: /dashboard
  │
  ├─► Check React 16 activeWhen → path !== '/|home|about|contact' → FALSE
  │
  └─► Check Vite activeWhen → path === '/dashboard' → TRUE → Mount Vite
```

---

# 6. React 16 App (Webpack)

## 6.1 Package Configuration

**Location:** `react16-app/package.json`

```json
{
  "name": "@myapp/react16",
  "version": "1.0.0",
  "scripts": {
    "start": "webpack serve --port 8080",
    "build": "webpack --mode=production"
  },
  "dependencies": {
    "react": "^16.14.0",
    "react-dom": "^16.14.0",
    "react-router-dom": "^5.3.4",
    "single-spa": "^5.9.5",
    "single-spa-react": "^4.6.1"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/preset-env": "^7.24.0",
    "@babel/preset-react": "^7.23.3",
    "babel-loader": "^9.1.3",
    "css-loader": "^6.10.0",
    "html-webpack-plugin": "^5.6.0",
    "style-loader": "^3.3.4",
    "webpack": "^5.90.3",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.2"
  }
}
```

### Key Dependencies Explained

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 16.14.0 | React library |
| `react-router-dom` | 5.3.4 | Routing (v5 uses Switch/Route) |
| `single-spa-react` | 4.6.1 | Lifecycle adapter for React |
| `webpack` | 5.90.3 | Module bundler |

## 6.2 Webpack Configuration

**Location:** `react16-app/webpack.config.js`

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ═══════════════════════════════════════════════════════════
  // ENTRY POINTS
  // ═══════════════════════════════════════════════════════════
  entry: {
    'myapp-react16': './src/index.js',   // Main app bundle
    'spa-config': './src/spa-config.js', // Registration config
  },

  // ═══════════════════════════════════════════════════════════
  // OUTPUT CONFIGURATION
  // ═══════════════════════════════════════════════════════════
  output: {
    filename: '[name].js',              // myapp-react16.js, spa-config.js
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',            // CRITICAL: SystemJS format
    publicPath: 'http://localhost:8080/',
  },

  // ═══════════════════════════════════════════════════════════
  // DEVELOPMENT SERVER
  // ═══════════════════════════════════════════════════════════
  devServer: {
    port: 8080,
    historyApiFallback: true,           // Enable deep linking
    headers: {
      'Access-Control-Allow-Origin': '*', // Enable CORS
    },
    hot: false,                          // Disable HMR for Single-SPA
    liveReload: true,
  },

  // ═══════════════════════════════════════════════════════════
  // EXTERNALS - Don't bundle these (loaded from CDN)
  // ═══════════════════════════════════════════════════════════
  externals: ['react', 'react-dom', 'react-router-dom', 'single-spa'],

  // ═══════════════════════════════════════════════════════════
  // MODULE RULES
  // ═══════════════════════════════════════════════════════════
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',            // Transpile JSX
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PLUGINS
  // ═══════════════════════════════════════════════════════════
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,                    // Don't auto-inject scripts
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  mode: 'development',
  devtool: 'source-map',
};
```

### Critical Configuration Points

| Setting | Value | Why It Matters |
|---------|-------|----------------|
| `libraryTarget` | 'system' | Outputs SystemJS-compatible module |
| `externals` | [...] | Prevents bundling shared dependencies |
| `historyApiFallback` | true | Enables browser history navigation |
| `CORS headers` | '*' | Allows cross-origin module loading |

## 6.3 Entry Point (index.js)

**Location:** `react16-app/src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './Root';

// ═══════════════════════════════════════════════════════════════
// CREATE SINGLE-SPA LIFECYCLE FUNCTIONS
// ═══════════════════════════════════════════════════════════════

const lifecycles = singleSpaReact({
  React,                                    // React library
  ReactDOM,                                 // ReactDOM for rendering
  rootComponent: Root,                      // Main component

  // Where to mount the app
  domElementGetter: () => document.getElementById('single-spa-application'),

  // Error handling
  errorBoundary(err, info, props) {
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h2>Error in React 16 Application</h2>
        <p>{err.message}</p>
      </div>
    );
  },
});

// ═══════════════════════════════════════════════════════════════
// EXPORT LIFECYCLE FUNCTIONS (REQUIRED BY SINGLE-SPA)
// ═══════════════════════════════════════════════════════════════

export const { bootstrap, mount, unmount } = lifecycles;
```

### Lifecycle Function Flow

```
Browser loads @myapp/react16
         │
         ▼
┌─────────────────────────┐
│     bootstrap()         │  ← Called once on first load
│  - Initialize React     │
│  - Setup error boundary │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│       mount()           │  ← Called when route matches
│  - Create DOM element   │
│  - Render <Root />      │
└───────────┬─────────────┘
            │
      (user navigates away)
            │
            ▼
┌─────────────────────────┐
│      unmount()          │  ← Called when route doesn't match
│  - Remove from DOM      │
│  - Cleanup listeners    │
└─────────────────────────┘
```

## 6.4 Root Component (Root.jsx)

**Location:** `react16-app/src/Root.jsx`

```javascript
import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// ═══════════════════════════════════════════════════════════════
// MAIN ROOT COMPONENT
// ═══════════════════════════════════════════════════════════════

function Root() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>

        {/* Header with Navigation */}
        <header style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          color: 'white'
        }}>
          <h1>React 16 Application</h1>
          <nav>
            {/* Internal Routes */}
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {/* Link to Vite App (Cross-app navigation) */}
            <a href="/dashboard">Dashboard (Vite) →</a>
          </nav>
        </header>

        {/* Route Definitions */}
        <main style={{ padding: '20px' }}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default Root;
```

### React Router v5 Concepts

| Component | Purpose |
|-----------|---------|
| `BrowserRouter` | Enables HTML5 history API |
| `Switch` | Renders first matching route |
| `Route` | Maps URL path to component |
| `Link` | Navigation without page reload |
| `Redirect` | Redirects to another route |

## 6.5 Page Components

### Home.jsx

```javascript
import React, { useState, useEffect } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  // Load saved count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('react16-count');
    if (saved) {
      setCount(parseInt(saved, 10));
    }
  }, []);

  // Save count to localStorage (shared with Vite app)
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('react16-count', newCount);
  };

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the React 16 micro-frontend!</p>

      {/* Counter that persists via localStorage */}
      <div style={{ marginTop: '20px' }}>
        <p>Counter: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </div>
  );
}

export default Home;
```

---

# 7. Vite App (React 18)

## 7.1 Package Configuration

**Location:** `vite-app/package.json`

```json
{
  "name": "@myapp/vite",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite build --watch & vite preview --port 5173 --strictPort",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "single-spa": "^5.9.5",
    "single-spa-react": "^6.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.4"
  }
}
```

### Key Differences from React 16 App

| Aspect | React 16 App | Vite App |
|--------|--------------|----------|
| React Version | 16.14.0 | 18.2.0 |
| Router Version | 5.3.4 | 6.22.0 |
| Build Tool | Webpack | Vite |
| single-spa-react | 4.6.1 | 6.0.0 |
| Module Type | CommonJS | ES Modules |

## 7.2 Vite Configuration

**Location:** `vite-app/vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ═══════════════════════════════════════════════════════════
  // PLUGINS
  // ═══════════════════════════════════════════════════════════
  plugins: [react()],

  // ═══════════════════════════════════════════════════════════
  // DEV SERVER
  // ═══════════════════════════════════════════════════════════
  server: {
    port: 5173,
    cors: true,
  },

  // ═══════════════════════════════════════════════════════════
  // PREVIEW SERVER (Serves built files)
  // ═══════════════════════════════════════════════════════════
  preview: {
    port: 5173,
    strictPort: true,
    cors: true,
  },

  // ═══════════════════════════════════════════════════════════
  // BUILD CONFIGURATION
  // ═══════════════════════════════════════════════════════════
  build: {
    rollupOptions: {
      input: './src/main.jsx',
      output: {
        format: 'system',              // SystemJS format
        entryFileNames: 'myapp-vite.js',
      },
      external: ['single-spa'],        // Don't bundle single-spa
    },
    outDir: 'dist',
    minify: false,                     // Easier debugging
    watch: {},                         // Enable watch mode
  },
});
```

### Vite vs Webpack

| Feature | Webpack | Vite |
|---------|---------|------|
| Dev Server | webpack-dev-server | Native ES modules |
| Build Speed | Slower (bundles everything) | Fast (ES modules) |
| Config Complexity | More configuration | Minimal config |
| HMR | Plugin-based | Built-in |

## 7.3 Entry Point (main.jsx)

**Location:** `vite-app/src/main.jsx`

```javascript
import React from 'react';
import ReactDOMClient from 'react-dom/client';  // React 18 API
import singleSpaReact from 'single-spa-react';
import Root from './Root';

// ═══════════════════════════════════════════════════════════════
// CREATE SINGLE-SPA LIFECYCLE FUNCTIONS (React 18 Style)
// ═══════════════════════════════════════════════════════════════

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,                           // Note: ReactDOMClient, not ReactDOM
  rootComponent: Root,
  domElementGetter: () => document.getElementById('single-spa-application'),
  errorBoundary(err, info, props) {
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h2>Error in Vite (React 18) Application</h2>
        <p>{err.message}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```

### React 18 API Difference

```javascript
// React 16/17 (ReactDOM.render)
ReactDOM.render(<App />, document.getElementById('root'));

// React 18 (createRoot)
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);
```

## 7.4 Root Component (Root.jsx)

**Location:** `vite-app/src/Root.jsx`

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// ═══════════════════════════════════════════════════════════════
// MAIN ROOT COMPONENT (React Router v6)
// ═══════════════════════════════════════════════════════════════

function Root() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>

        {/* Header with Navigation */}
        <header style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '20px',
          color: 'white'
        }}>
          <h1>Vite (React 18) Application</h1>
          <nav>
            {/* Internal Routes */}
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>

            {/* Link to React 16 App (Cross-app navigation) */}
            <a href="/home">← Home (React 16)</a>
          </nav>
        </header>

        {/* Route Definitions (v6 Syntax) */}
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default Root;
```

### React Router v5 vs v6

| v5 Syntax | v6 Syntax |
|-----------|-----------|
| `<Switch>` | `<Routes>` |
| `<Route component={...}>` | `<Route element={<.../>}>` |
| `<Redirect to="...">` | `<Navigate to="...">` |
| `useHistory()` | `useNavigate()` |

## 7.5 Page Components

### Dashboard.jsx

```javascript
import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [react16Count, setReact16Count] = useState(0);

  // Read shared data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('react16-count');
    if (saved) {
      setReact16Count(parseInt(saved, 10));
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>This is the Vite (React 18) micro-frontend!</p>

      {/* Display shared data from React 16 app */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f0f0f0'
      }}>
        <h3>Shared Data</h3>
        <p>Counter from React 16 app: <strong>{react16Count}</strong></p>
        <small>This value is stored in localStorage by the React 16 app</small>
      </div>
    </div>
  );
}

export default Dashboard;
```

---

# 8. Routing & Navigation Flow

## 8.1 Route Distribution

```
┌────────────────────────────────────────────────────────────────┐
│                      URL ROUTING MAP                            │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│   React 16 App (Port 8080)         Vite App (Port 5173)        │
│   ┌─────────────────────┐          ┌─────────────────────┐     │
│   │  /         → Home   │          │  /dashboard → Dashboard│  │
│   │  /home     → Home   │          │  /profile   → Profile │   │
│   │  /about    → About  │          │  /settings  → Settings│   │
│   │  /contact  → Contact│          └─────────────────────┘     │
│   └─────────────────────┘                                       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

## 8.2 Navigation Flow Diagram

```
User clicks link: /dashboard
         │
         ▼
┌─────────────────────────────────┐
│  Browser URL changes to         │
│  /dashboard                     │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│  Single-SPA intercepts          │
│  navigation event               │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│  Evaluate activeWhen for        │
│  all registered apps            │
├─────────────────────────────────┤
│  @myapp/react16: FALSE          │
│  @myapp/vite: TRUE              │
└───────────────┬─────────────────┘
                │
         ┌──────┴──────┐
         │             │
         ▼             ▼
┌─────────────┐  ┌─────────────┐
│  Unmount    │  │  Mount      │
│  React 16   │  │  Vite App   │
│  App        │  │             │
└─────────────┘  └─────────────┘
                        │
                        ▼
               ┌─────────────────┐
               │  Vite App       │
               │  renders        │
               │  Dashboard      │
               └─────────────────┘
```

## 8.3 Cross-App Navigation

### Method 1: HTML Anchor Tags

```jsx
// In React 16 app - Navigate to Vite app
<a href="/dashboard">Go to Dashboard</a>

// In Vite app - Navigate to React 16 app
<a href="/home">Go to Home</a>
```

### Method 2: Programmatic Navigation

```javascript
// Works from any app
window.history.pushState({}, '', '/dashboard');

// Dispatch event to notify Single-SPA
window.dispatchEvent(new PopStateEvent('popstate'));
```

### Why Not Use React Router's Link?

React Router's `<Link>` only works within the same React app. For cross-app navigation, you need to use:
- HTML `<a>` tags
- `window.history.pushState()`
- Single-SPA's navigation utilities

---

# 9. Data Sharing Between Apps

## 9.1 Methods of Sharing Data

```
┌─────────────────────────────────────────────────────────────┐
│                  DATA SHARING OPTIONS                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. localStorage    - Persistent, survives page refresh     │
│  2. sessionStorage  - Per-tab, cleared on tab close         │
│  3. Cookies         - Persistent, sent with requests        │
│  4. URL Parameters  - Shareable, bookmarkable               │
│  5. Custom Events   - Real-time communication               │
│  6. Shared State    - Via utility modules                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 9.2 localStorage Example

### React 16 App - Writing Data

```javascript
// Home.jsx
const handleIncrement = () => {
  const newCount = count + 1;
  setCount(newCount);

  // Save to localStorage
  localStorage.setItem('react16-count', newCount.toString());
};
```

### Vite App - Reading Data

```javascript
// Dashboard.jsx
useEffect(() => {
  const saved = localStorage.getItem('react16-count');
  if (saved) {
    setReact16Count(parseInt(saved, 10));
  }
}, []);
```

## 9.3 Cookie Example

### Settings.jsx - Writing to Cookie

```javascript
const saveToCookie = (key, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`;
};

// Usage
saveToCookie('user-theme', 'dark');
```

### Reading Cookie

```javascript
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

// Usage
const theme = getCookie('user-theme'); // 'dark'
```

## 9.4 Custom Events (Real-time)

### Publishing Event

```javascript
// In React 16 app
const publishEvent = (eventName, data) => {
  const event = new CustomEvent(eventName, { detail: data });
  window.dispatchEvent(event);
};

// Usage
publishEvent('user-logged-in', { userId: 123, name: 'John' });
```

### Subscribing to Event

```javascript
// In Vite app
useEffect(() => {
  const handler = (event) => {
    console.log('User logged in:', event.detail);
  };

  window.addEventListener('user-logged-in', handler);

  return () => {
    window.removeEventListener('user-logged-in', handler);
  };
}, []);
```

---

# 10. Build & Development Setup

## 10.1 Development Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                  DEVELOPMENT SETUP                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Terminal 1: React 16 App                                   │
│  $ cd react16-app                                           │
│  $ npm install                                              │
│  $ npm start                                                │
│  → Running on http://localhost:8080                         │
│                                                              │
│  Terminal 2: Vite App                                       │
│  $ cd vite-app                                              │
│  $ npm install                                              │
│  $ npm run dev                                              │
│  → Running on http://localhost:5173                         │
│                                                              │
│  Open Browser:                                               │
│  → http://localhost:8080                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 10.2 Startup Scripts

### Unix/Mac (start-all.sh)

```bash
#!/bin/bash

echo "Starting Single-SPA Microfrontend..."

# Install dependencies
echo "Installing React 16 app dependencies..."
cd react16-app && npm install

echo "Installing Vite app dependencies..."
cd ../vite-app && npm install
cd ..

# Start apps in background
echo "Starting React 16 app on port 8080..."
cd react16-app && npm start &

echo "Starting Vite app on port 5173..."
cd ../vite-app && npm run dev &

echo ""
echo "All apps started!"
echo "Open http://localhost:8080 in your browser"
```

### Windows (start-all.bat)

```batch
@echo off
echo Starting Single-SPA Microfrontend...

echo Installing React 16 app dependencies...
cd react16-app
call npm install

echo Installing Vite app dependencies...
cd ..\vite-app
call npm install
cd ..

echo Starting apps...
start cmd /k "cd react16-app && npm start"
start cmd /k "cd vite-app && npm run dev"

echo.
echo All apps started!
echo Open http://localhost:8080 in your browser
```

## 10.3 Production Build

### React 16 App

```bash
cd react16-app
npm run build
# Outputs to: react16-app/dist/
#   - myapp-react16.js
#   - spa-config.js
#   - index.html
```

### Vite App

```bash
cd vite-app
npm run build
# Outputs to: vite-app/dist/
#   - myapp-vite.js
```

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  PRODUCTION DEPLOYMENT                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CDN / Static Host                                          │
│  ├── index.html          (Root HTML)                        │
│  ├── spa-config.js       (App registration)                 │
│  ├── myapp-react16.js    (React 16 bundle)                  │
│  └── myapp-vite.js       (Vite bundle)                      │
│                                                              │
│  Update import maps to point to CDN URLs:                   │
│  "@myapp/react16": "https://cdn.example.com/myapp-react16.js"│
│  "@myapp/vite": "https://cdn.example.com/myapp-vite.js"     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

# 11. Code Flow Diagrams

## 11.1 Application Initialization

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION STARTUP FLOW                      │
└─────────────────────────────────────────────────────────────────┘

Browser loads http://localhost:8080
                    │
                    ▼
        ┌───────────────────────┐
        │   Load index.html     │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Load SystemJS        │
        │  from CDN             │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Parse Import Maps    │
        │  (module → URL)       │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  System.import(       │
        │  '@myapp/spa-config') │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  spa-config.js        │
        │  executes             │
        │                       │
        │  - registerApplication│
        │    (@myapp/react16)   │
        │  - registerApplication│
        │    (@myapp/vite)      │
        │  - start()            │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Single-SPA evaluates │
        │  current URL          │
        │                       │
        │  URL: /               │
        │  Match: @myapp/react16│
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  System.import(       │
        │  '@myapp/react16')    │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  React 16 app         │
        │  - bootstrap()        │
        │  - mount()            │
        │  → Renders to DOM     │
        └───────────────────────┘
```

## 11.2 Route Change Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ROUTE CHANGE FLOW                             │
│                    /home → /dashboard                            │
└─────────────────────────────────────────────────────────────────┘

        User at /home (React 16 mounted)
                    │
                    │  User clicks "Dashboard"
                    ▼
        ┌───────────────────────┐
        │  Browser pushes       │
        │  /dashboard to        │
        │  history              │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Single-SPA receives  │
        │  popstate event       │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Re-evaluate all      │
        │  activeWhen functions │
        │                       │
        │  @myapp/react16:      │
        │    /dashboard ✗ FALSE │
        │                       │
        │  @myapp/vite:         │
        │    /dashboard ✓ TRUE  │
        └───────────┬───────────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
┌─────────────────┐  ┌─────────────────┐
│  @myapp/react16 │  │  @myapp/vite    │
│                 │  │                 │
│  unmount()      │  │  Is loaded?     │
│  - ReactDOM     │  │  ├─ No: load    │
│    .unmountAt   │  │  │   bootstrap   │
│    (container)  │  │  └─ Yes: skip   │
│  - Remove from  │  │                 │
│    DOM          │  │  mount()        │
└─────────────────┘  │  - createRoot   │
                     │  - render       │
                     │    <Root />     │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │  Vite app       │
                     │  displays       │
                     │  Dashboard      │
                     │  component      │
                     └─────────────────┘
```

## 11.3 Data Flow Between Apps

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA SHARING FLOW                             │
└─────────────────────────────────────────────────────────────────┘

React 16 App                           Vite App
┌─────────────────┐                    ┌─────────────────┐
│                 │                    │                 │
│  Home.jsx       │                    │  Dashboard.jsx  │
│                 │                    │                 │
│  ┌───────────┐  │                    │  ┌───────────┐  │
│  │ count: 5  │  │                    │  │ react16   │  │
│  └───────────┘  │                    │  │ Count: ?  │  │
│       │        │                    │  └───────────┘  │
│       │ click  │                    │       ▲        │
│       ▼        │                    │       │        │
│  count = 6     │                    │       │        │
│       │        │                    │       │        │
│       ▼        │                    │       │        │
│  localStorage  │    ══════════════► │  localStorage  │
│  .setItem(     │    Shared Storage  │  .getItem(     │
│  'react16-     │                    │  'react16-     │
│   count', 6)   │                    │   count')      │
│                │                    │       │        │
└─────────────────┘                    │       ▼        │
                                       │  react16       │
                                       │  Count: 6      │
                                       │                │
                                       └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  localStorage is shared because both apps run on same domain    │
│  (localhost:8080). The Vite app is loaded as a module, but      │
│  executes in the same browser context.                          │
└─────────────────────────────────────────────────────────────────┘
```

---

# 12. Troubleshooting

## 12.1 Common Issues

### Issue: App Not Loading

**Symptom:** Blank page, console shows "Failed to fetch"

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Dev server not running | Start with `npm start` or `npm run dev` |
| Wrong port in import map | Verify ports: 8080 (React16), 5173 (Vite) |
| CORS blocked | Ensure CORS headers are set |

### Issue: Styles Not Applied

**Symptom:** Components render but look unstyled

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| CSS not bundled | Check webpack/vite config for CSS loaders |
| CSS-in-JS conflict | Use scoped styles or CSS modules |

### Issue: Router Not Working

**Symptom:** Clicking links doesn't navigate

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| historyApiFallback off | Enable in webpack dev server |
| Wrong router version | v5 uses Switch, v6 uses Routes |

### Issue: Multiple React Instances

**Symptom:** Hooks error: "Invalid hook call"

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| React bundled twice | Add react to externals |
| Version mismatch | Each app should bundle its own React |

## 12.2 Debug Checklist

```
□ Both dev servers running?
  - React 16: http://localhost:8080
  - Vite: http://localhost:5173

□ Import maps correct?
  - Check URLs in index.html
  - Verify files exist at those URLs

□ Console errors?
  - Check browser developer tools
  - Look for CORS or 404 errors

□ Network requests successful?
  - Open Network tab
  - Verify .js files load with 200 status

□ Single-SPA registered correctly?
  - Add console.log to spa-config.js
  - Verify activeWhen returns expected values
```

## 12.3 Useful Console Commands

```javascript
// Check registered applications
console.log(window.singleSpa.getAppNames());
// Output: ['@myapp/react16', '@myapp/vite']

// Check app status
console.log(window.singleSpa.getAppStatus('@myapp/react16'));
// Output: 'MOUNTED' or 'NOT_MOUNTED'

// Manually navigate
window.singleSpa.navigateToUrl('/dashboard');

// Check current active apps
console.log(window.singleSpa.getMountedApps());
```

---

# Summary

This Single-SPA microfrontend architecture demonstrates:

1. **Multiple React Versions** - React 16 and React 18 coexisting
2. **Different Build Tools** - Webpack and Vite working together
3. **Route-Based Loading** - Apps mount/unmount based on URL
4. **Shared Data** - localStorage enables cross-app communication
5. **Independent Development** - Each app has its own dev server
6. **Unified User Experience** - Seamless navigation between apps

## Quick Reference

| Component | Technology | Port | Routes |
|-----------|------------|------|--------|
| Root Config | SystemJS | 8080 | - |
| React 16 App | Webpack + React 16 | 8080 | /, /home, /about, /contact |
| Vite App | Vite + React 18 | 5173 | /dashboard, /profile, /settings |

## Start Development

```bash
# Option 1: Use startup script
./start-all.sh      # Unix/Mac
start-all.bat       # Windows

# Option 2: Manual start
cd react16-app && npm install && npm start &
cd vite-app && npm install && npm run dev &

# Open browser
open http://localhost:8080
```

---

**Document Version:** 1.0
**Last Updated:** January 2026
**Project:** Single-SPA Microfrontend Demo
