import React from "react";
import '../styles/jugadores_barra_opciones.css';

interface BarraOpciones {
  onSelect: (opcion: string) => void; // callback para avisar qué botón fue clickeado
}

export const BarraOpciones: React.FC<BarraOpciones> = ({ onSelect }) => {
  return (
    <div className="contenedor_barra_opciones">
      <button className="primer_boton_barra_opciones" onClick={() => onSelect("plantilla")}>
        <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
        <span>Plantilla</span>
      </button>
      <button className="boton_barra_opciones" onClick={() => onSelect("presencias")}>
        <img src={'/jugador_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
        <span>Mas Presencias</span>
      </button>
      <button className="boton_barra_opciones" onClick={() => onSelect("goleadores")}>
        <img src={'/goleadors_sin_fondo.png'} alt="App Logo" width="30" height="30"/>
        <span>Goleadores</span>
      </button>
      <button className="ultimo_boton_barra_opciones" onClick={() => onSelect("asistidores")}>
        <img src={'/asistencia6.png'} alt="App Logo" width="30" height="30"/>
        <span>Asistidores</span>
      </button>
    </div>
  );
};
