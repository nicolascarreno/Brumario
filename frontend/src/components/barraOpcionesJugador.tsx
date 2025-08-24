import React from "react";
import '../styles/jugadores_barra_opciones.css';

interface BarraOpcionesJugador {
  onSelect: (opcion: string) => void; // callback para avisar qué botón fue clickeado
}

export const BarraOpcionesJugador: React.FC<BarraOpcionesJugador> = ({ onSelect }) => {
  return (
    <div className="contenedor_barra_opciones">
      <button className="primer_boton_barra_opciones" onClick={() => onSelect("general")}>
        <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
        <span>Info. General</span>
      </button>
      <button className="ultimo_boton_barra_opciones" onClick={() => onSelect("presencias sin jugar")}>
        <img src={'/cerveza_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
        <span>Presen. Sin Jugar</span>
      </button>
    </div>
  );
};