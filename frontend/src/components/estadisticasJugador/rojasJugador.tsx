import React from 'react'
import { Jugador } from '../../services/service_utils';

interface Props {
    jugador: Jugador
}

export const RojasJugador = ({ jugador }: Props) => {

  const partidos_jugados = jugador.titular + jugador.suplente;
  const promedioRojas =
      jugador.rojas > 0? 
        ((jugador.rojas / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;

  return (
    <div className='contenedor_tipo_estadistica2'>
        <div className='contenedor_estadistica_nombre'>
            <img src={'/roja_sin_fondo.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
            <span className='nombre_estadistica'>Rojas</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Rojas x Partido</span>
            <span className='estadistica'>{promedioRojas}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Rojas Totales</span>
            <span className='estadistica_clave'>{jugador.rojas}</span>
        </div>
    </div>
  )
}