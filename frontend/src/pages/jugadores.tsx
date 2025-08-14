import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';

export function Jugadores() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="encabezado">     
        <h1>11 Brumario</h1>
      </div>
      <h1>Jugadores</h1>
    </div>
  );
}