import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const GolesPorcentajeJugador = ({ jugador }: Props) => {

  const partidos_jugados = jugador.titular + jugador.suplente;
  const porcentajeJugada =
      jugador.goles > 0? 
        ((jugador.tipos_gol.pie_jugada / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeCabeza =
      jugador.goles > 0? 
        ((jugador.tipos_gol.cabeza / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeTiroLibre = 
      jugador.goles > 0? 
        ((jugador.tipos_gol.tiro_libre / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajePenal =
      jugador.goles > 0? 
        ((jugador.tipos_gol.penal / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const promedioGol =
      jugador.goles > 0? 
        ((jugador.goles / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;

  return (
    <div>
        <div className='contenedor_estadistica_segunda_columna'>
            <span className='estadistica'>De Pie (jugada) (%)</span>
            <span className='estadistica'>{porcentajeJugada}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Cabeza (%)</span>
            <span className='estadistica'>{porcentajeCabeza}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Tiro Libre (%)</span>
            <span className='estadistica'>{porcentajeTiroLibre}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Penal (%)</span>
            <span className='estadistica'>{porcentajePenal}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Goles x Partido</span>
            <span className='estadistica_clave'>{promedioGol}</span>
        </div>
    </div>
  )
}