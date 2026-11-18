import React from 'react'
import { Jugador } from '../../../services/service_utils'

interface Props {
    jugador: Jugador
}

export const JugadoresPreferidosDT = ({ jugador }: Props) => {
  return (
    <div className='contenedor_jugadores_preferidos'>
        <div className='contenedor_estadistica_nombre'>
            <img
                src={'/estrella.png'}
                alt="App Logo"
                width="40"
                height="40"
                style={{ marginLeft: 10 }}
            />
            <span className='nombre_estadistica'>
                Jugadores Preferidos
            </span>   
        </div>
        <div className='contenedor_jugadores_preferidos_texto'>
        {Object.keys(jugador.director_tecnico.esquemas).length === 0 ? (
            <span style={{ fontStyle: 'italic' }}>
            No dirigió ningún partido
            </span>
        ) : (
            <span className="estadistica">
            {jugador.director_tecnico.jugadoresPreferidos
                .map(p => {
                const partes = p.nombre.split(',').map(s => s.trim());
                if (partes.length === 2) {
                    const [apellido, nombre] = partes;
                    return `${nombre} ${apellido}`;
                } else {
                    // Caso en que solo hay un nombre (sin coma ni apellido)
                    return partes[0];
                }
                })
                .join(', ')
            }
            </span>
        )}
        </div>                  
    </div>  
  )
}