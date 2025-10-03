import React from "react";
import '../styles/jugadores_barra_opciones.css';
import { useNavigate } from "react-router-dom";

interface BarraOpcionesPartido {
}

export const BarraOpcionesPartido: React.FC<BarraOpcionesPartido> = () => {
  const navigate = useNavigate();
  return (
    <div className="contenedor_barra_opciones_general">
      <div className="contenedor_barra_opciones">
        <button className="primer_boton_barra_opciones" onClick={() => navigate("/partidos")}>
          <img src={'/volver2.png'} alt="App Logo" className="icono"/>
          <span>Atrás</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => navigate("/jugadores")}>
          <img src={'/diego_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Ir a Jugadores</span>
        </button>
      </div>
    </div>
  );
};