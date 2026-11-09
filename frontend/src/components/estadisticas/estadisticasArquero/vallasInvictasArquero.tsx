import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

const VallasInvictasArquero = ({ jugador }: Props) => {

  const partidos_atajados = jugador.arquero.partidos;
  const vallas_invictas = jugador.arquero.vallas_invictas;

  const PorcentajeVallasInvictas =
        vallas_invictas > 0 && partidos_atajados > 0? 
        (((vallas_invictas) / (partidos_atajados))).toFixed(2) // 0 decimales
        : 0;

  return (
    <div className='contenedor_tipo_estadistica3' style={{paddingBottom: 10}}>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/candado.png'}
                alt="App Logo"
                width="40"
                height="40"
                style={{ marginLeft: 10, marginRight: 5 }}
            />
            <span className='nombre_estadistica'>
                Vallas Invictas
            </span>   
        </div>
        <div style={{display: "flex"}}>
            <div>
                <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica'>Efectividad (%)</span>
                    <span className='estadistica'>{PorcentajeVallasInvictas}</span>
                </div>
                <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                    <span className='estadistica_clave'>Vallas Invictas</span>
                    <span className='estadistica_clave'>{jugador.arquero.vallas_invictas}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VallasInvictasArquero