@echo off
echo ====================================
echo    Starting Email Sender App
echo ====================================
echo.

echo Starting backend server...
start "Email Sender Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "Email Sender Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ====================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ====================================
echo.
echo Press any key to exit...
pause >nul
