import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/jugadores_barra_opciones.css';
import '../styles/detalles_jugador_barra.css';

interface BarraOpcionesPartidos {
  onSelect: (opcion: string) => void; // callback para avisar qué botón fue clickeado
}

export const BarraOpcionesPartidos: React.FC<BarraOpcionesPartidos> = ({ onSelect }) => {
  const navigate = useNavigate();
  return (
    <div className='contendor_barra_opciones_general'>
      <div className="contenedor_barra_opciones">
        <button className="primer_boton_barra_opciones" onClick={() => navigate("/")}>
          <img src={'/volver2.png'} alt="App Logo" className="icono"/>
          <span>Ir a Inicio</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => navigate("/jugadores")}>
          <img src={'/diego_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Ir a Jugadores</span>
        </button>
      </div>
      <div className="contenedor_barra_opciones">
        <button className="primer_boton_barra_opciones" onClick={() => onSelect("general")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Resultados</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => onSelect("hitos")}>
          <img src={'/hitos.png'} alt="App Logo" className="icono"/>
          <span>Hitos</span>
        </button>
      </div>
    </div>  
  );
};