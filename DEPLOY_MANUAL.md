# Deploy Manual en Render

## Configuración para Plan Gratuito

Con el plan gratuito de Render solo puedes tener **un servicio**, por lo que hemos configurado la aplicación para que el backend sirva tanto la API como los archivos estáticos del frontend.

## Estructura del Proyecto

```
brumario/
├── package.json          # Scripts para manejar ambos proyectos
├── render.yaml           # Configuración de Render
├── backend/              # API de Node.js + Express
│   ├── src/
│   └── package.json
└── frontend/             # React App
    ├── src/
    └── package.json
```

## Variables de Entorno Necesarias

### En Render Dashboard:

1. **NODE_ENV**: `production`
2. **MONGODB_URI**: `mongodb+srv://ncarreno_db_user:Kj0CEGNVXNyFT8Zi@brumario.exqorlm.mongodb.net/?appName=brumario`
3. **PORT**: `10000` (Render lo asigna automáticamente, pero puedes especificarlo)
4. **REACT_APP_API_URL**: (vacío - se usa la misma URL del servicio)

## Pasos para Deploy Manual

### 1. Crear el Servicio en Render

1. Ve a [render.com](https://render.com) y haz login
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura el servicio:
   - **Name**: `brumario-app`
   - **Environment**: `Node`
   - **Plan**: `Free`
   - **Build Command**: `npm run install:all && npm run build`
   - **Start Command**: `npm start`

### 2. Configurar Variables de Entorno

En la sección "Environment" del dashboard de Render:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://ncarreno_db_user:Kj0CEGNVXNyFT8Zi@brumario.exqorlm.mongodb.net/?appName=brumario
PORT=10000
REACT_APP_API_URL=
```

### 3. Configurar Health Check

- **Health Check Path**: `/api/hello`

### 4. Deploy

1. Click en "Create Web Service"
2. Render comenzará el build automáticamente
3. El proceso tomará varios minutos

## Cómo Funciona

1. **Build Process**:
   - Instala dependencias del backend y frontend
   - Compila TypeScript del backend
   - Builda la aplicación React

2. **Runtime**:
   - El servidor Express sirve la API en `/api/*`
   - Sirve archivos estáticos del frontend en rutas no-API
   - Todas las rutas no-API redirigen al `index.html` de React

## URLs de la Aplicación

- **Frontend**: `https://tu-app.onrender.com/`
- **API Jugadores**: `https://tu-app.onrender.com/api/jugadores`
- **API Partidos**: `https://tu-app.onrender.com/api/partidos`
- **Health Check**: `https://tu-app.onrender.com/api/hello`

## Troubleshooting

### Si el build falla:
- Verifica que todas las dependencias estén en los package.json correctos
- Revisa los logs de build en Render

### Si la app no carga:
- Verifica que las variables de entorno estén configuradas
- Revisa los logs de runtime en Render
- Asegúrate de que MongoDB Atlas permita conexiones desde cualquier IP

### Si la API no responde:
- Verifica que las rutas estén prefijadas con `/api`
- Revisa que el health check esté en `/api/hello`

## Notas Importantes

- Con el plan gratuito, la app se "duerme" después de 15 minutos de inactividad
- El primer request después de dormir puede tomar 30+ segundos
- MongoDB Atlas debe estar configurado para permitir conexiones desde `0.0.0.0/0`
