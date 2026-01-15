@echo off
echo.
echo Starting Single-SPA Micro-Frontend Project...
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo Installing dependencies...
echo.

REM Install root-config dependencies
echo Installing root-config...
cd root-config
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install root-config dependencies
    pause
    exit /b 1
)
cd ..

REM Install react16-app dependencies
echo Installing react16-app...
cd react16-app
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install react16-app dependencies
    pause
    exit /b 1
)
cd ..

REM Install vite-app dependencies
echo Installing vite-app...
cd vite-app
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install vite-app dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo All dependencies installed!
echo.
echo Starting all applications...
echo.
echo Root Config:  http://localhost:9000
echo React 16 App: http://localhost:8080
echo Vite App:     http://localhost:5173
echo.
echo Open http://localhost:9000 in your browser
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start all apps
start "Root Config" cmd /k "cd root-config && npm start"
timeout /t 2 /nobreak >nul
start "React 16 App" cmd /k "cd react16-app && npm start"
timeout /t 2 /nobreak >nul
start "Vite App" cmd /k "cd vite-app && npm run dev"

echo.
echo All servers started in separate windows!
echo Close those windows to stop the servers.
echo.
pause
