import React from 'react'
import { Jugador } from '../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const AmarillasJugador = ({ jugador }: Props) => {
  
  const partidos_jugados = jugador.titular + jugador.suplente;
  const promedioAmarillas =
      jugador.amarillas > 0? 
        ((jugador.amarillas / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;

  return (
    <div>
        <div className='contenedor_estadistica_nombre'>
            <img src={'/amarilla_sin_fondo2.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
            <span className='nombre_estadistica'>Amarillas</span>   
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Amarillas x Partido</span>
            <span className='estadistica'>{promedioAmarillas}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Amarillas Totales</span>
            <span className='estadistica_clave'>{jugador.amarillas}</span>
        </div>
    </div>
  )
}