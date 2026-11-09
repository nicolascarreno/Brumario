import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

const GolesRecibidosPorcentajeArquero = ({ jugador }: Props) => {

    const partidos_atajados = jugador.arquero.partidos;
    const GolesRecibidosXPartido =
        partidos_atajados > 0? 
            ((jugador.arquero.goles_recibidos / partidos_atajados)).toFixed(2) // 0 decimales
            : 0;
    const porcentajeJugada =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.pie_jugada / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;
    const porcentajeCabeza =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.cabeza / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;
    const porcentajeTiroLibre =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.tiro_libre / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;
    const porcentajePenal =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.penal / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;

  return (
    <div style={{paddingTop: "60px"}}>   
        <div className='contenedor_estadistica_arquero_segunda_columna'>
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
            <span className='estadistica_clave'>{GolesRecibidosXPartido}</span>
        </div>
    </div>
  )
}

export default GolesRecibidosPorcentajeArquero