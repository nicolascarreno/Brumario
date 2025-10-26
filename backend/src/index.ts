import express from 'express';
import cors from 'cors';
import jugadoresRouter from "./routes/jugadoresRoutes";
import partidosRouter from "./routes/partidosRoutes";
import path from 'path';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

import connectDB from './db/db';
connectDB();

app.use(cors());

// Rutas de la API
app.use("/api/jugadores", jugadoresRouter);
app.use("/api/partidos", partidosRouter);
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

// 📦 Servir el frontend buildado de React
const frontendPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(frontendPath));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get(/^(?!\/api).*/, (_, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});