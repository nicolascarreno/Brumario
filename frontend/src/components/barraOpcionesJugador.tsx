import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/jugadores_barra_opciones.css';
import '../styles/detalles_jugador_barra.css';
import { BarraBusqueda2 } from "./barra_busqueda2";
import { Jugador } from "../services/service_utils";

interface BarraOpcionesJugador {
  onSelect: (opcion: string) => void; // callback para avisar qué botón fue clickeado
  jugadores: { nombre: string }[]; // lista de jugadores para la barra de búsqueda
}

export const BarraOpcionesJugador: React.FC<BarraOpcionesJugador> = ({ onSelect, jugadores }) => {
  const navigate = useNavigate();
  return (
    <div className='contendor_barra_opciones_general'>
      <div className="contenedor_barra_opciones">
        <button className="primer_boton_barra_opciones" onClick={() => navigate("/jugadores")}>
          <img src={'/volver2.png'} alt="App Logo" className="icono"/>
          <span>Ir a Jugadores</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => navigate("/partidos")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Ir a Partidos</span>
        </button>
      </div>
      <BarraBusqueda2 jugadores={jugadores} onSelect={(jugador) => navigate(`/jugador/${jugador.nombre}`)}/>
      <div className="contenedor_barra_opciones">
        <button className="primer_boton_barra_opciones" onClick={() => onSelect("general")}>
          <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Estad. Jugador</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("tecnico")}>
          <img src={'/scaloni_sin_fondo.png'} alt="App Logo" className="icono"/>
          <span>Estad. Técnico</span>
        </button>
        <button className="boton_barra_opciones" onClick={() => onSelect("arquero")}>
          <img src={'/arquero2_recorte.png'} alt="App Logo" className="icono"/>
          <span>Estad. Arquero</span>
        </button>
        <button className="ultimo_boton_barra_opciones" onClick={() => onSelect("hitos")}>
          <img src={'/hitos.png'} alt="App Logo" className="icono"/>
          <span>Hitos</span>
        </button>
      </div>
    </div>  
  );
};