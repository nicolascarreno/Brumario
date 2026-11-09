import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar } from '../services/service_utils';
import { Jugador } from "../services/service_utils"
import { PartidosDirigidosDT } from './estadisticas/estadisticasDirectorTecnico/partidosDirigidosDT';
import DiferenciaGolDT from './estadisticas/estadisticasDirectorTecnico/diferenciaGolDT';


interface DetallesTecnicoProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesTecnico: React.FC<DetallesTecnicoProp> = ({ jugador, loading }) => {
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <div className='contenedor_general_gris'>
            <div className='contenedor_nombre'>
                <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" className='imagen_logo'/>
                <span className='nombre'>{jugador.nombre}</span>
            </div>
            <div className='contenedor_estadistica'>
              <div className='contenedor_tipo_estadistica'>
                <PartidosDirigidosDT jugador={jugador} />
                <DiferenciaGolDT jugador={jugador} />
              </div>
              <div className='contenedor_tipo_estadistica'>
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
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};