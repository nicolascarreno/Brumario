import React from 'react'
import { Jugador } from '../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const PresenciasSinJugarJugador = ({ jugador }: Props) => {

  const efectividadPresenciasSinJugar =
      jugador.presencias_sin_jugar > 0? 
        (((jugador.tipos_presencias_sin_jugar.empatados + 3*jugador.tipos_presencias_sin_jugar.ganados) / (3*jugador.presencias_sin_jugar))).toFixed(2) // 0 decimales
        : 0;

  return (
    <div>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/cerveza_sin_fondo.png'}
                alt="App Logo"
                width="35"
                height="35"
                style={{ marginLeft: 10, marginRight: 5 }}
            />
            <span className='nombre_estadistica'>
                Presen. Sin Jugar
            </span>   
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Ganados</span>
            <span className='estadistica'>{jugador.tipos_presencias_sin_jugar.ganados}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Empatados</span>
            <span className='estadistica'>{jugador.tipos_presencias_sin_jugar.empatados}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Perdidos</span>
            <span className='estadistica'>{jugador.tipos_presencias_sin_jugar.perdidos}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Efectividad (%)</span>
            <span className='estadistica'>{efectividadPresenciasSinJugar}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Presencias Totales</span>
            <span className='estadistica_clave'>{jugador.presencias_sin_jugar}</span>
        </div>
    </div>
  )
}