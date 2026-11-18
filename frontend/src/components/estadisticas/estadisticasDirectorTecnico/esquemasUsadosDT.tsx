import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const EsquemasUsadosDT = ({ jugador }: Props) => {
  return (
    <div style={{paddingBottom: 10}}>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/esquema4.png'}
                alt="App Logo"
                width="40"
                height="40"
                style={{ marginLeft: 10, marginRight: 5 }}
            />
            <span className='nombre_estadistica'>
                Esquemas Usados
            </span>   
        </div>
        {Object.keys(jugador.director_tecnico.esquemas).length === 0 ? (
        <p style={{ marginLeft: 37, fontStyle: 'italic', marginRight: 90 }}>No dirigió ningún partido</p>
        ) : (
        <table className='tabla_esquemas'>
        <thead>
            <tr>
            <th>Esquemas</th>
            <th>Partidos</th>
            <th>Efectividad</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(jugador.director_tecnico.esquemas).map(([formacion, datos]) => (
            <tr key={formacion}>
                <td className='estadistica'>{formacion}</td>
                <td className='estadistica'>{datos.partidos}</td>
                <td className='estadistica'>{(datos.puntos / (3*datos.partidos)).toFixed(2)}</td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
  )
}