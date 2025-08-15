import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';
//import brumario from '../../public/brumario.png';

export function Jugadores() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="encabezado">     
        <img src={'/brumario.png'} alt="brumario" height={90} width={380} style={{ marginLeft: '18px', paddingTop: 20, paddingBottom: 20 }} />
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>
      <h1>Jugadores</h1>
    </div>
  );
}