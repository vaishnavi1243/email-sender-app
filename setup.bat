@echo off
echo ====================================
echo    Email Sender App Setup Script
echo ====================================
echo.

echo [1/4] Setting up backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed
    pause
    exit /b 1
)

echo.
echo [2/4] Setting up frontend...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed
    pause
    exit /b 1
)

echo.
echo [3/4] Setup complete!
echo.
echo [4/4] Next steps:
echo.
echo 1. Configure your email settings in backend\.env
echo 2. Open TWO terminals:
echo.
echo    Terminal 1 - Backend:
echo    cd backend
echo    npm run dev
echo.
echo    Terminal 2 - Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Visit http://localhost:3000 in your browser
echo.
echo ====================================
echo    Setup Complete! Happy Emailing!
echo ====================================
pause
