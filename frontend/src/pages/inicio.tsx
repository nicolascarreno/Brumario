import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';
//import escudo from '../../public/brumario_escudo.jpeg';
//import diego from '../../public/diego.png';
//import brumario from '../../public/brumario.png';

export function Inicio() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="encabezado">     
        <img src={'brumario.png'} alt="brumario" height={90} width={380} style={{ marginLeft: '18px', paddingTop: 20, paddingBottom: 20 }} />
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>
      <div className="botones-container">
        <button className="boton-cuadrado" onClick={() => navigate('/jugadores')}>
          <img src={'/diego.png'} alt="Diego" className="boton-imagen" width={160} height={190} />
          <span>Jugadores</span>
        </button>
        <button className="boton-cuadrado">
          <img src={'/brumario_escudo_sin_fondo.png'} alt="Escudo Brumario" className="boton-imagen" width={195} height={195} />
          <span>Partidos</span>
        </button>
      </div>  
    </div>
  );
}



{/*Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif*/}