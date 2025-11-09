import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar } from '../services/service_utils';

interface Jugador {
  nombre: string;
  titular: number;
  suplente: number;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
  tipos_gol: TiposGol;
  tipos_asistencia: TiposAsistencia;
  tipos_presencias_sin_jugar: TiposPresenciasSinJugar;
  director_tecnico: DirectorTecnico;
}

interface DetallesTecnicoProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesTecnico: React.FC<DetallesTecnicoProp> = ({
  jugador,
  loading,
}) => {
  const partidos_dirgidos = jugador.director_tecnico.ganados + 
                            jugador.director_tecnico.empatados +
                            jugador.director_tecnico.perdidos;
  const Efectividad =
      partidos_dirgidos > 0? 
        (((3*jugador.director_tecnico.ganados+jugador.director_tecnico.empatados) / (3*partidos_dirgidos))).toFixed(2) // 0 decimales
        : 0;
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
                <div style={{paddingBottom: 10}}>
                  <div className='contenedor_estadistica_nombre'>
                      <img
                          src={'/dt3_sin_fondo.png'}
                          alt="App Logo"
                          width="40"
                          height="40"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Partidos Dirigidos
                      </span>   
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Ganados</span>
                      <span className='estadistica'>{jugador.director_tecnico.ganados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Empatados</span>
                      <span className='estadistica'>{jugador.director_tecnico.empatados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Perdidos</span>
                      <span className='estadistica'>{jugador.director_tecnico.perdidos}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Efectividad (%)</span>
                      <span className='estadistica'>{Efectividad}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Partidos Totales</span>
                      <span className='estadistica_clave'>{partidos_dirgidos}</span>
                  </div>
                </div>
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
                  <table style={{ width: 290, marginLeft: 15, textAlign: 'center' }}>
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