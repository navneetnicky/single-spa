#!/bin/bash

echo "🚀 Starting Single-SPA Micro-Frontend Project..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "📦 Installing dependencies..."
echo ""

# Install root-config dependencies
echo "Installing root-config..."
cd root-config && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install root-config dependencies"
    exit 1
fi
cd ..

# Install react16-app dependencies
echo "Installing react16-app..."
cd react16-app && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install react16-app dependencies"
    exit 1
fi
cd ..

# Install vite-app dependencies
echo "Installing vite-app..."
cd vite-app && npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install vite-app dependencies"
    exit 1
fi
cd ..

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "🎯 Starting all applications..."
echo ""
echo "Root Config:  http://localhost:9000"
echo "React 16 App: http://localhost:8080"
echo "Vite App:     http://localhost:5173"
echo ""
echo "📝 Open http://localhost:9000 in your browser"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start all apps in background
cd root-config && npm start &
PID1=$!
cd ../react16-app && npm start &
PID2=$!
cd ../vite-app && npm run dev &
PID3=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all servers..."
    kill $PID1 $PID2 $PID3 2>/dev/null
    echo "✅ All servers stopped"
    exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Wait for all background processes
wait
