import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './styles/App.css';
import './styles/inicio.css';
import { Inicio } from './pages/inicio';
import { Jugadores } from './pages/jugadores';
import { DetallesJugador } from "./pages/detallesJugador";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugador/:nombre" element={<DetallesJugador />} />
      </Routes>
    </Router>
  );
}

export default App;