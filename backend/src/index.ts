import express from 'express';
import cors from 'cors';
import Persona from './models/persona';
import jugadoresRouter from "./routes/jugadoresRoutes";

const app = express();
const PORT = 4000;

import connectDB from './db/db';
connectDB();

app.use(cors());

app.use("/jugadores", jugadoresRouter);
app.get('/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});