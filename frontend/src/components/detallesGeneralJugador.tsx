import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'

interface Jugador {
  nombre: string;
  partidos: number;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
}

interface DetallesGeneralJugadorProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesGeneralJugador: React.FC<DetallesGeneralJugadorProp> = ({
  jugador,
  loading,
}) => {
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <div style={{ width: 850, gap: 100 }}>
            <div className='contenedor_nombre'>
                <img
                    src={'/brumario_escudo_sin_fondo.png'}
                    alt="App Logo"
                    width="100"
                    height="100"
                    style={{ marginRight: 20 }}
                />
                <span className='nombre'>
                    {jugador.nombre}
                </span>
            </div>
            <div className='contenedor_estadistica'>
                <div className='contenedor_estadistica_nombre'>
                    <img
                        src={'/jugador_sin_fondo.png'}
                        alt="App Logo"
                        width="30"
                        height="40"
                        style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    <span className='nombre_estadistica'>
                        Partidos Jugados
                    </span>   
                </div>
                <div style={{display: 'flex', padding: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica'>Partidos Totales</span>
                    <span className='estadistica'>{jugador.partidos}</span>
                </div>
            </div>
        </div>
      </>
    )}
  </div>
);
};