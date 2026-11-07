import React from 'react'
import { Jugador } from '../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const PartidosJugador = ({ jugador }: Props) => {

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
    <div style={{paddingBottom: 10}}>
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
  )
}