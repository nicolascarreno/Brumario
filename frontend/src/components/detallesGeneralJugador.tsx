import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'

interface Jugador {
  nombre: string;
  titular: number;
  suplente: number;
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
  const partidos_jugados = jugador.titular + jugador.suplente;
  const porcentajeTitular =
      partidos_jugados > 0? 
        ((jugador.titular / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeSuplente =
      partidos_jugados > 0? 
        ((jugador.suplente / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
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
                <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica'>De Titular</span>
                    <span className='estadistica'>{jugador.titular}</span>
                </div>
                <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica'>De Titular (%)</span>
                    <span className='estadistica'>{porcentajeTitular}</span>
                </div>
                <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica'>De Suplente</span>
                    <span className='estadistica'>{jugador.suplente}</span>
                </div>
                <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica'>De Suplente (%)</span>
                    <span className='estadistica'>{porcentajeSuplente}</span>
                </div>
                <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica_clave'>Partidos Totales</span>
                    <span className='estadistica_clave'>{jugador.titular + jugador.suplente}</span>
                </div>
            </div>
        </div>
      </>
    )}
  </div>
);
};