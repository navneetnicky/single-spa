# 🚀 Quick Start Guide

## Prerequisites
- Node.js 16 or higher
- npm (comes with Node.js)

## Installation Steps

### Option 1: Automatic (Recommended)

**For Mac/Linux:**
```bash
./start-all.sh
```

**For Windows:**
```bash
start-all.bat
```

This will:
1. Install all dependencies
2. Start all three applications
3. Open them on the correct ports

### Option 2: Manual

Open 3 terminal windows:

**Terminal 1 - Root Config:**
```bash
cd root-config
npm install
npm start
```

**Terminal 2 - React 16 App:**
```bash
cd react16-app
npm install
npm start
```

**Terminal 3 - Vite App:**
```bash
cd vite-app
npm install
npm run dev
```

## Access the Application

Once all servers are running, open your browser to:

**http://localhost:9000**

## Test the Features

### 1. Test Separate Routes
- Click "Home (React 16)" - loads React 16 app at `/home`
- Click "Dashboard (Vite)" - loads Vite app at `/dashboard`
- Notice the different colored headers!

### 2. Test localStorage Sharing
- Go to Home (`/home`)
- Click "Increment" several times
- Go to Dashboard (`/dashboard`)
- See the same count value displayed!

### 3. Test Deep Linking
- Navigate to any page (e.g., `/profile`)
- Copy the URL from the address bar
- Open in a new tab
- Page loads directly!

### 4. Test Browser Navigation
- Navigate between different pages
- Click browser back button
- Click browser forward button
- Everything works seamlessly!

## Troubleshooting

**"Cannot find module" errors:**
```bash
# Delete all node_modules and reinstall
rm -rf root-config/node_modules react16-app/node_modules vite-app/node_modules
./start-all.sh
```

**Port already in use:**
- Kill the process using the port:
```bash
# Mac/Linux
lsof -ti:9000 | xargs kill
lsof -ti:8080 | xargs kill
lsof -ti:5173 | xargs kill

# Windows (in cmd as admin)
netstat -ano | findstr :9000
taskkill /PID <PID> /F
```

**Apps not loading:**
1. Check all 3 servers are running
2. Clear browser cache
3. Check browser console for errors

## Next Steps

- Read the main README.md for detailed documentation
- Modify the pages in `src/pages/` folders
- Add new routes by editing `Root.jsx` files
- Experiment with sharing more data via localStorage

## Getting Help

- Check browser console (F12) for errors
- Check terminal output for server errors
- Review the main README.md for more details
