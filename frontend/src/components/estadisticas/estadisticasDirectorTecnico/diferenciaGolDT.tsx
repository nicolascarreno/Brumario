import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

const DiferenciaGolDT = ({ jugador }: Props) => {


  const partidos_dirgidos = jugador.director_tecnico.ganados + jugador.director_tecnico.empatados + jugador.director_tecnico.perdidos;
  const GolesRecibidosXPartido =
      partidos_dirgidos > 0? 
        ((jugador.director_tecnico.goles_contra / partidos_dirgidos)).toFixed(2) // 0 decimales
        : 0;
  const GolesAnotadosXPartido =
      partidos_dirgidos > 0? 
        ((jugador.director_tecnico.goles_favor / partidos_dirgidos)).toFixed(2) // 0 decimales
        : 0;
  const DiferenciaDeGol = jugador.director_tecnico.goles_favor - jugador.director_tecnico.goles_contra

  return (
    <div className='contenedor_tipo_estadistica2' style={{paddingBottom: 10}}>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/goleadors_sin_fondo.png'}
                alt="App Logo"
                width="40"
                height="40"
                style={{ marginLeft: 10, marginRight: 5 }}
            />
            <span className='nombre_estadistica'>
                Diferencia De Gol
            </span>   
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Goles A Favor</span>
            <span className='estadistica'>{jugador.director_tecnico.goles_favor}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Anotados x Partido</span>
            <span className='estadistica'>{GolesAnotadosXPartido}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Goles En Contra</span>
            <span className='estadistica'>{jugador.director_tecnico.goles_contra}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica'>Recibidos x Partido</span>
            <span className='estadistica'>{GolesRecibidosXPartido}</span>
        </div>
        <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
            <span className='estadistica_clave'>Diferencia De Gol</span>
            <span className='estadistica_clave'>{DiferenciaDeGol > 0 ? `+${DiferenciaDeGol}` : DiferenciaDeGol}</span>
        </div>
    </div>
  )
}

export default DiferenciaGolDT