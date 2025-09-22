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
    <div>
      <div className="contenedor_navegar">
        <button className="ultimo_boton_navegar" onClick={() => navigate("/")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Ir a Inicio</span>
        </button>
        <button className="primer_boton_navegar" onClick={() => navigate("/jugadores")}>
          <img src={'/diego_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Ir a Jugadores</span>
        </button>
      </div>
      <div className="contenedor_navegar">
        <button className="primer_boton_barra_opciones" onClick={() => onSelect("general")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Jugador</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("general")}>
          <img src={'/scaloni_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Director Técnico</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => onSelect("general")}>
          <img src={'/hitos.png'} alt="App Logo" width="30" height="30"/>
          <span>Hitos</span>
        </button>
      </div>
    </div>  
  );
};