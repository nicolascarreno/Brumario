import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';

export function Inicio() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="encabezado">     
        <h1>11 Brumario</h1>
      </div>
      <div className="botones-container">
        <button className="boton-cuadrado" onClick={() => navigate('/jugadores')}>
          <span>Jugadores</span>
        </button>
        <button className="boton-cuadrado">
          <span>Partidos</span>
        </button>
      </div>
    </div>
  );
}