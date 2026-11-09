import React from 'react'
import { Jugador } from '../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const AsistenciasPorcentajeJugador = ({ jugador }: Props) => {

  const partidos_jugados = jugador.titular + jugador.suplente;
  const porcentajeAsistenciaJugada =
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.pie_jugada / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaCabeza =
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.cabeza / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaTiroLibre = 
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.tiro_libre / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaCorner =
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.corner / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const promedioAsistencias =
      jugador.asistencias > 0? 
        ((jugador.asistencias / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;

  return (
    <div>
        <div className='contenedor_estadistica_segunda_columna'>
            <span className='estadistica'>De Pie (jugada) (%)</span>
            <span className='estadistica'>{porcentajeAsistenciaJugada}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Cabeza (%)</span>
            <span className='estadistica'>{porcentajeAsistenciaCabeza}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Tiro Libre (%)</span>
            <span className='estadistica'>{porcentajeAsistenciaTiroLibre}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Corner (%)</span>
            <span className='estadistica'>{porcentajeAsistenciaCorner}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Asistencias x Partido</span>
            <span className='estadistica_clave'>{promedioAsistencias}</span>
        </div>
    </div>
  )
}