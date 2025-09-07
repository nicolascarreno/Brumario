import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar, Hitos } from '../services/jugadoresService';

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
  hitos: Hitos;
}

interface DetallesHitosProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesHitos: React.FC<DetallesHitosProp> = ({
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
        <div style={{ width: 850, gap: 100 }}>
            <div className='contenedor_nombre'>
                <img
                    src={'/brumario_escudo_sin_fondo.png'}
                    alt="App Logo"
                    width="100"
                    height="100"
                    style={{ marginRight: 20 }}
                />
                <span className='nombre'>
                    {jugador.nombre}
                </span>
            </div>
            <div className='contenedor_estadistica'>
              <div style={{display: 'flex'}}>
                <div style={{paddingBottom: 10}}>
                  <div className='contenedor_estadistica_nombre'>
                      <img
                          src={'/diego2_sin_fondo.png'}
                          alt="App Logo"
                          width="40"
                          height="50"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Hitos Como Jugador
                      </span>   
                  </div>
                  <div style={{ paddingTop: 5, paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                      <span style={{ color: 'black' }}>Mas goles en un partido:</span>{" "}
                      {jugador.hitos.masGoles.cantidad === 0
                        ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene goles</span>
                        : `${jugador.hitos.masGoles.cantidad} (BRUMARIO ${jugador.hitos.masGoles.partido.golesBrumario} - ${jugador.hitos.masGoles.partido.golesRecibidos} ${jugador.hitos.masGoles.partido.rival}, ${jugador.hitos.masGoles.partido.competicion})`
                      }
                    </span> 
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                      <span style={{ color: 'black' }}>Mas asistencias en un partido:</span>{" "}
                      {jugador.hitos.masAsistencias.cantidad === 0
                        ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene asistencias</span>

                        : `${jugador.hitos.masAsistencias.cantidad} (BRUMARIO ${jugador.hitos.masAsistencias.partido.golesBrumario} - ${jugador.hitos.masAsistencias.partido.golesRecibidos} ${jugador.hitos.masAsistencias.partido.rival}, ${jugador.hitos.masAsistencias.partido.competicion})`
                      }
                    </span> 
                  </div>

                </div>
              </div>
              <div style={{display: 'flex'}}>
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
                          Hitos Como Director Tecnico
                      </span>   
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