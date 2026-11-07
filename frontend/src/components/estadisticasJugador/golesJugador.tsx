import React from 'react'
import { Jugador } from '../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const GolesJugador = ({ jugador }: Props) => {
  return (
    <div className='contenedor_tipo_estadistica2'>
        <div className='contenedor_estadistica_nombre'>
            <img src={'/goleadors_sin_fondo.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
            <span className='nombre_estadistica'>Goles</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Pie (jugada)</span>
            <span className='estadistica'>{jugador.tipos_gol.pie_jugada}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Cabeza</span>
            <span className='estadistica'>{jugador.tipos_gol.cabeza}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Tiro Libre</span>
            <span className='estadistica'>{jugador.tipos_gol.tiro_libre}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>De Penal</span>
            <span className='estadistica'>{jugador.tipos_gol.penal}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Goles Totales</span>
            <span className='estadistica_clave'>{jugador.goles}</span>
        </div>
    </div>
  )
}