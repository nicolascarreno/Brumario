import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});