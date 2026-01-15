#!/bin/bash

echo "Starting Single-SPA Micro-Frontend Project..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "Installing dependencies..."
echo ""

# Install react16-app dependencies
echo "Installing react16-app..."
cd react16-app && npm install
if [ $? -ne 0 ]; then
    echo "Failed to install react16-app dependencies"
    exit 1
fi
cd ..

# Install vite-app dependencies
echo "Installing vite-app..."
cd vite-app && npm install
if [ $? -ne 0 ]; then
    echo "Failed to install vite-app dependencies"
    exit 1
fi
cd ..

echo ""
echo "All dependencies installed!"
echo ""
echo "Starting all applications..."
echo ""
echo "React 16 App (Main): http://localhost:8080"
echo "Vite App:            http://localhost:5173"
echo ""
echo "Open http://localhost:8080 in your browser"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start all apps in background
cd react16-app && npm start &
PID1=$!
cd ../vite-app && npm run dev &
PID2=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping all servers..."
    kill $PID1 $PID2 2>/dev/null
    echo "All servers stopped"
    exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Wait for all background processes
wait
