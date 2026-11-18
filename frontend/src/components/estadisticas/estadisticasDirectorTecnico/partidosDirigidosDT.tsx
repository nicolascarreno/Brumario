import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const PartidosDirigidosDT = ({ jugador }: Props) => {

  const partidos_dirgidos = jugador.director_tecnico.ganados + jugador.director_tecnico.empatados + jugador.director_tecnico.perdidos;
  const Efectividad =
      partidos_dirgidos > 0? 
        (((3*jugador.director_tecnico.ganados+jugador.director_tecnico.empatados) / (3*partidos_dirgidos))).toFixed(2) // 0 decimales
        : 0;

  return (
    <div style={{paddingBottom: 10}}>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/dt3_sin_fondo.png'}
                alt="App Logo"
                width="40"
                height="40"
                style={{ marginLeft: 10, marginRight: 5 }}
            />
            <span className='nombre_estadistica'>
                Partidos Dirigidos
            </span>   
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Ganados</span>
            <span className='estadistica'>{jugador.director_tecnico.ganados}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Empatados</span>
            <span className='estadistica'>{jugador.director_tecnico.empatados}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Perdidos</span>
            <span className='estadistica'>{jugador.director_tecnico.perdidos}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Efectividad (%)</span>
            <span className='estadistica'>{Efectividad}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Partidos Totales</span>
            <span className='estadistica_clave'>{partidos_dirgidos}</span>
        </div>
    </div>
  )
}