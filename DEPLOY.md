# Deploy en Render con MongoDB Atlas

## Configuración necesaria

### 1. MongoDB Atlas (Base de datos en la nube)
1. Ve a https://www.mongodb.com/atlas
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (opción gratuita M0)
4. Configura el acceso:
   - **Username**: `brumario-user`
   - **Password**: Genera una contraseña segura
   - **Database Access**: Agrega el usuario
   - **Network Access**: Agrega `0.0.0.0/0` (acceso desde cualquier IP)
5. Obtén la connection string:
   ```
   mongodb+srv://brumario-user:<password>@cluster0.xxxxx.mongodb.net/brumario?retryWrites=true&w=majority
   ```

### 2. Variables de entorno

#### Backend:
- `NODE_ENV`: production
- `MONGODB_URI`: tu connection string de MongoDB Atlas
- `PORT`: Render lo asigna automáticamente

#### Frontend:
- `REACT_APP_API_URL`: URL del backend en Render (ej: https://brumario-backend.onrender.com)

## Pasos para deployar:

### Opción 1: Deploy automático con render.yaml
1. **Actualiza el render.yaml** con tu connection string de MongoDB Atlas
2. Sube el código a GitHub
3. Ve a Render Dashboard → New → Blueprint
4. Conecta tu repositorio de GitHub
5. Render detectará el archivo render.yaml y creará los servicios automáticamente

### Opción 2: Deploy manual

#### Backend:
1. Crear un nuevo Web Service en Render
2. Conectar tu repositorio de GitHub
3. Configurar:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Environment: Node
4. Agregar variables de entorno:
   - `NODE_ENV`: production
   - `MONGODB_URI`: tu connection string de MongoDB Atlas

#### Frontend:
1. Crear un nuevo Static Site en Render
2. Conectar tu repositorio de GitHub
3. Configurar:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
4. Agregar variable de entorno:
   - `REACT_APP_API_URL`: URL del backend (ej: https://brumario-backend.onrender.com)

## Cargar datos iniciales:

Una vez que el backend esté desplegado, puedes cargar los datos:

```bash
# Opción 1: Desde tu máquina local
cd backend
set MONGODB_URI=tu_connection_string_de_atlas
npm run cargar-db

# Opción 2: Desde Render (usando el shell web)
# Ve a tu servicio backend en Render → Shell
# Ejecuta: npm run cargar-db
```

## Notas importantes:
- MongoDB Atlas es gratuito hasta 512MB
- El backend debe estar desplegado antes que el frontend para obtener su URL
- Asegúrate de que el backend tenga un endpoint de health check (ya tienes `/hello`)
- Los archivos Excel en `backend/src/db/` deben estar incluidos en el deploy
- La aplicación creará automáticamente las colecciones en MongoDB Atlas

## URLs finales:
- **Frontend**: https://brumario-frontend.onrender.com
- **Backend**: https://brumario-backend.onrender.com
- **Health Check**: https://brumario-backend.onrender.com/hello
