import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

const TandasPenalesArquero = ({ jugador }: Props) => {

  const tandas_atajadas = jugador.arquero.tandas_penales.ganados + jugador.arquero.tandas_penales.perdidos;
  const EfectividadPenales =
    tandas_atajadas > 0? 
        (((jugador.arquero.tandas_penales.ganados) / (tandas_atajadas))).toFixed(2) // 0 decimales
        : 0;

  return (
    <div style={{paddingBottom: 10}}>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/penal_recortado_sin_fondo.png'}
                alt="App Logo"
                width="40"
                height="30"
                style={{ marginLeft: 10, marginRight: 5, marginTop: 5, marginBottom: 5 }}
            />
            <span className='nombre_estadistica'>
                Tandas Penales
            </span>   
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Ganadas</span>
            <span className='estadistica'>{jugador.arquero.tandas_penales.ganados}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Perdidas</span>
            <span className='estadistica'>{jugador.arquero.tandas_penales.perdidos}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Efectividad</span>
            <span className='estadistica_clave'>{EfectividadPenales}</span>
        </div>
    </div>
  )
}

export default TandasPenalesArquero