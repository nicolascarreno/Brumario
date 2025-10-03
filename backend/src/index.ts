import express from 'express';
import cors from 'cors';
import Persona from './models/persona';
import jugadoresRouter from "./routes/jugadoresRoutes";
import partidosRouter from "./routes/partidosRoutes";

const app = express();
const PORT = 4000;

import connectDB from './db/db';
connectDB();

app.use(cors());

app.use("/jugadores", jugadoresRouter);
app.use("/partidos", partidosRouter);
app.get('/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});