@echo off
echo ========================================
echo    INICIANDO APLICACION BRUMARIO
echo    CON MONGODB ATLAS
echo ========================================
echo.

echo 1. Iniciando Backend con MongoDB Atlas...
echo    Asegurate de tener configurado MONGODB_URI en tu archivo .env
start "Backend" cmd /k "cd backend && npm run dev"

echo.
echo 2. Esperando 3 segundos...
timeout /t 3 /nobreak > nul

echo.
echo 3. Iniciando Frontend...
start "Frontend" cmd /k "cd frontend && set REACT_APP_API_URL=http://localhost:4000 && npm start"

echo.
echo ✅ Aplicacion iniciada!
echo    Backend: http://localhost:4000
echo    Frontend: http://localhost:3000
echo.
echo La aplicacion se abrira automaticamente en tu navegador.
echo.
pause
