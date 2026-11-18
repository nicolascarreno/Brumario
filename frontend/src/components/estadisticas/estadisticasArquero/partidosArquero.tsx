import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

const PartidosArquero = ({ jugador }: Props) => {

 const partidos_atajados = jugador.arquero.partidos;
 const Efectividad =
        partidos_atajados > 0? 
            (((3*jugador.arquero.ganados+jugador.arquero.empatados) / (3*partidos_atajados))).toFixed(2) // 0 decimales
            : 0;

  return (
    <div>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/arquero3_sin_fondo.png'}
                alt="App Logo"
                width="40"
                height="40"
                style={{ marginLeft: 10, marginRight: 5 }}
            />
            <span className='nombre_estadistica'>
                Partidos Atajados
            </span>   
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Ganados</span>
            <span className='estadistica'>{jugador.arquero.ganados}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Empatados</span>
            <span className='estadistica'>{jugador.arquero.empatados}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Perdidos</span>
            <span className='estadistica'>{jugador.arquero.perdidos}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Efectividad (%)</span>
            <span className='estadistica'>{Efectividad}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Partidos Totales</span>
            <span className='estadistica_clave'>{partidos_atajados}</span>
        </div>
    </div>
  )
}

export default PartidosArquero