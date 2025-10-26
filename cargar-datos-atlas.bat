@echo off
echo ========================================
echo    CARGANDO DATOS EN MONGODB ATLAS
echo ========================================
echo.

echo 1. Asegurate de haber creado el archivo backend/.env
echo    con tu connection string de MongoDB Atlas
echo.

echo 2. Cargando datos...
cd backend
npm run cargar-db

echo.
echo 3. Si todo funciona correctamente, veras:
echo    - "MongoDB conectado" en la consola
echo    - Los datos cargandose en tu cluster de Atlas
echo.

pause
