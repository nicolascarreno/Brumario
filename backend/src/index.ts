import express from 'express';
import cors from 'cors';
import Persona from './models/persona';

const app = express();
const PORT = 4000;

import connectDB from './db';
connectDB();

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

/*async function crearPersonaPrueba() {
  const persona = new Persona({ name: 'Juan Gómez' });
  await persona.save();
  console.log('Persona creada:', persona);
}

crearPersonaPrueba();
*/

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});