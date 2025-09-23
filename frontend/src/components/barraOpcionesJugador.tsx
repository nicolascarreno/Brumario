import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/jugadores_barra_opciones.css';
import '../styles/detalles_jugador_barra.css';

interface BarraOpcionesJugador {
  onSelect: (opcion: string) => void; // callback para avisar qué botón fue clickeado
}

export const BarraOpcionesJugador: React.FC<BarraOpcionesJugador> = ({ onSelect }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="contenedor_navegar">
        <button className="primer_boton_navegar" onClick={() => navigate("/jugadores")}>
          <img src={'/diego_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Ir a Jugadores</span>
        </button>
        <button className="ultimo_boton_navegar" onClick={() => navigate("/")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Ir a Partidos</span>
        </button>
      </div>
      <div className="contenedor_navegar">
        <button className="primer_boton_barra_opciones" onClick={() => onSelect("general")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Estad. Jugador</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("tecnico")}>
          <img src={'/scaloni_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
          <span>Estad. Técnico</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => onSelect("hitos")}>
          <img src={'/hitos.png'} alt="App Logo" width="30" height="30"/>
          <span>Hitos</span>
        </button>
      </div>
    </div>  
  );
};