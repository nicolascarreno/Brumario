import React from "react";
import '../styles/jugadores_barra_opciones.css';
import { useNavigate } from "react-router-dom";

interface BarraOpciones {
  onSelect: (opcion: string, pagina: number) => void;
}

export const BarraOpciones: React.FC<BarraOpciones> = ({ onSelect }) => {
  const navigate = useNavigate();
  return (
    <div className="contenedor_barra_opciones_general">
      <div className="contenedor_barra_opciones">
        <button className="primer_boton_barra_opciones" onClick={() => navigate("/")}>
          <img src={'/volver2.png'} alt="App Logo" className="icono"/>
          <span>Ir a Inicio</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => navigate("/partidos")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Ir a Partidos</span>
        </button>
      </div>
      <div className="contenedor_barra_opciones">
        <button className="primer_boton_barra_opciones" onClick={() => onSelect("plantilla", 1)}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Plantilla</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("presencias", 1)}>
          <img src={'/jugador_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Más Presencias</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("goleadores", 1)}>
          <img src={'/goleadors_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Goleadores</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("asistidores", 1)}>
          <img src={'/asistencia6.png'} alt="App Logo" className="icono"/>
          <span>Asistidores</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("amarillas", 1)}>
          <img src={'/amarilla_sin_fondo2.png'} alt="App Logo" className="icono"/>
          <span>Amarillas</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("rojas", 1)}>
          <img src={'/roja_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Rojas</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("presencias sin jugar", 1)}>
          <img src={'/cerveza_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Presen. Sin Jugar</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => onSelect("presencias totales", 1)}>
          <img src={'/estrella.png'} alt="App Logo" className="icono"/>
          <span>Presen. Totales</span>
        </button>
      </div>
    </div>
  );
};