import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const AsistenciasJugador = ({ jugador }: Props) => {
  return (
    <div className='contenedor_tipo_estadistica2'>
        <div className='contenedor_estadistica_nombre'>
            <img src={'/asistencia6.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
            <span className='nombre_estadistica'>Asistencias</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Pie (jugada)</span>
            <span className='estadistica'>{jugador.tipos_asistencia.pie_jugada}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Cabeza</span>
            <span className='estadistica'>{jugador.tipos_asistencia.cabeza}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Tiro Libre</span>
            <span className='estadistica'>{jugador.tipos_asistencia.tiro_libre}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Corner</span>
            <span className='estadistica'>{jugador.tipos_asistencia.corner}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Asistencias Totales</span>
            <span className='estadistica_clave'>{jugador.asistencias}</span>
        </div>
    </div>
  )
}

export default AsistenciasJugador