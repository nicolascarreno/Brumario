import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

const GolesRecibidosArquero = ({ jugador }: Props) => {
  return (
    <div>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/goleadors_sin_fondo.png'}
                alt="App Logo"
                width="40"
                height="40"
                style={{ marginLeft: 10, marginRight: 5 }}
            />
            <span className='nombre_estadistica'>
                Goles Recibidos
            </span>   
        </div>
        <div>
            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                <span className='estadistica'>De Pie(jugada)</span>
                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.pie_jugada}</span>
            </div>
            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                <span className='estadistica'>De Cabeza</span>
                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.cabeza}</span>
            </div>
            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                <span className='estadistica'>De Tiro Libre</span>
                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.tiro_libre}</span>
            </div>
            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                <span className='estadistica'>De Penal</span>
                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.penal}</span>
            </div>
            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                <span className='estadistica_clave'>Goles Recibidos</span>
                <span className='estadistica_clave'>{jugador.arquero.goles_recibidos}</span>
            </div>
        </div>
    </div>
  )
}

export default GolesRecibidosArquero