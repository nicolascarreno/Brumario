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

app.use("/jugadores", jugadoresRouter);
app.use("/partidos", partidosRouter);
app.get('/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

// 📦 Servir el frontend buildado de React
//const frontendPath = path.join(__dirname, '../../frontend/build');
//app.use(express.static(frontendPath));

//app.get(/.*/, (_, res) => {
//  res.sendFile(path.join(frontendPath, 'index.html'));
//});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});