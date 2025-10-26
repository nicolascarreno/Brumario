@echo off
echo ========================================
echo    PROBANDO CON MONGODB ATLAS
echo ========================================
echo.

echo 1. Asegurate de haber creado el archivo backend/.env
echo    con tu connection string de MongoDB Atlas
echo.

echo 2. Iniciando Backend...
cd backend
npm run dev

echo.
echo 3. Si todo funciona correctamente, veras:
echo    - "MongoDB conectado" en la consola
echo    - El servidor corriendo en http://localhost:4000
echo.

pause
