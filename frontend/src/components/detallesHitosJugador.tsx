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
                      : `${jugador.hitos.masGoles.cantidad} (BRUMARIO ${jugador.hitos.masGoles.partido.golesBrumario} - ${jugador.hitos.masGoles.partido.golesRecibidos} ${jugador.hitos.masGoles.partido.rival}, ${jugador.hitos.masGoles.partido.competicion}, ${formatDateDDMMYYYY(jugador.hitos.masGoles.partido.fecha)})`
                    }
                  </span> 
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                    <span style={{ color: 'black' }}>Mas asistencias en un partido:</span>{" "}
                    {jugador.hitos.masAsistencias.cantidad === 0
                      ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene asistencias</span>
                      : `${jugador.hitos.masAsistencias.cantidad} (BRUMARIO ${jugador.hitos.masAsistencias.partido.golesBrumario} - ${jugador.hitos.masAsistencias.partido.golesRecibidos} ${jugador.hitos.masAsistencias.partido.rival}, ${jugador.hitos.masAsistencias.partido.competicion}, ${formatDateDDMMYYYY(jugador.hitos.masAsistencias.partido.fecha)})`
                    }
                    </span>
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                    <span style={{ color: 'black' }}>Mas presencias en un año calendario:</span>{" "}
                    {jugador.hitos.masPresenciasAnio.cantidad === 0
                      ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene presencias</span>
                      : `${jugador.hitos.masPresenciasAnio.cantidad} (${jugador.hitos.masPresenciasAnio.anio})`
                    }
                    </span>
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                    <span style={{ color: 'black' }}>Mas goles en un año calendario:</span>{" "}
                    {jugador.hitos.masGolesAnio.cantidad === 0
                      ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene goles</span>
                      : `${jugador.hitos.masGolesAnio.cantidad} (${jugador.hitos.masGolesAnio.anio})`
                    }
                    </span>
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                    <span style={{ color: 'black' }}>Mas asistencias en un año calendario:</span>{" "}
                    {jugador.hitos.masAsistenciasAnio.cantidad === 0
                      ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene asistencias</span>
                      : `${jugador.hitos.masAsistenciasAnio.cantidad} (${jugador.hitos.masAsistenciasAnio.anio})`
                    }
                    </span>
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                    <span style={{ color: 'black' }}>Mas amarillas en un año calendario:</span>{" "}
                    {jugador.hitos.masAmarillasAnio.cantidad === 0
                      ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene amarillas</span>
                      : `${jugador.hitos.masAmarillasAnio.cantidad} (${jugador.hitos.masAmarillasAnio.anio})`
                    }
                    </span>
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                    <span style={{ color: 'black' }}>Mas rojas en un año calendario:</span>{" "}
                    {jugador.hitos.masRojasAnio.cantidad === 0
                      ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene rojas</span>
                      : `${jugador.hitos.masRojasAnio.cantidad} (${jugador.hitos.masRojasAnio.anio})`
                    }
                    </span>
                  </div>
                  <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                    <span style={{ textIndent: 20 }} className="estadistica">
                    <span style={{ color: 'black' }}>Mas presencias sin jugar en un año calendario:</span>{" "}
                    {jugador.hitos.masPresenciasSinJugarAnio.cantidad === 0
                      ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene presencias sin jugar</span>
                      : `${jugador.hitos.masPresenciasSinJugarAnio.cantidad} (${jugador.hitos.masPresenciasSinJugarAnio.anio})`
                    }
                    </span>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex'}}>
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
                          Hitos Como Director Tecnico
                      </span>   
                  </div>
                </div>            
              </div>
              <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20 }} className="estadistica">
                <span style={{ color: 'black' }}>Mayor victoria:</span>{" "}
                {jugador.hitos.tecnicoMayorVictoria.partido.golesBrumario === ""
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias</span>
                  : `(BRUMARIO ${jugador.hitos.tecnicoMayorVictoria.partido.golesBrumario} - ${jugador.hitos.tecnicoMayorVictoria.partido.golesRecibidos} ${jugador.hitos.tecnicoMayorVictoria.partido.rival}, ${jugador.hitos.tecnicoMayorVictoria.partido.competicion}, ${formatDateDDMMYYYY(jugador.hitos.tecnicoMayorVictoria.partido.fecha)})`
                }
                </span>
              </div>
              <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20 }} className="estadistica">
                <span style={{ color: 'black' }}>Mayor derrota:</span>{" "}
                {jugador.hitos.tecnicoMayorDerrota.partido.golesBrumario === ""
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene derrotas</span>
                  : `(BRUMARIO ${jugador.hitos.tecnicoMayorDerrota.partido.golesBrumario} - ${jugador.hitos.tecnicoMayorDerrota.partido.golesRecibidos} ${jugador.hitos.tecnicoMayorDerrota.partido.rival}, ${jugador.hitos.tecnicoMayorDerrota.partido.competicion}, ${formatDateDDMMYYYY(jugador.hitos.tecnicoMayorDerrota.partido.fecha)})`
                }
                </span>
              </div>
              <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20 }} className="estadistica">
                <span style={{ color: 'black' }}>Mas goles en un partido:</span>{" "}
                {jugador.hitos.tecnicoMayorDerrota.partido.golesBrumario === ""
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene partidos dirigidos</span>
                  : `(BRUMARIO ${jugador.hitos.tecnicoMasGoles.partido.golesBrumario} - ${jugador.hitos.tecnicoMasGoles.partido.golesRecibidos} ${jugador.hitos.tecnicoMasGoles.partido.rival}, ${jugador.hitos.tecnicoMasGoles.partido.competicion}, ${formatDateDDMMYYYY(jugador.hitos.tecnicoMasGoles.partido.fecha)})`
                }
                </span>
              </div>
              <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20 }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos invicto:</span>{" "}
                {jugador.hitos.tecnicoRachaInvicta.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victoriass/empates</span>
                  : `${jugador.hitos.tecnicoRachaInvicta.racha.duracionPartidos} (${diasEntre(jugador.hitos.tecnicoRachaInvicta.racha.inicio.fecha, jugador.hitos.tecnicoRachaInvicta.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(jugador.hitos.tecnicoRachaInvicta.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(jugador.hitos.tecnicoRachaInvicta.racha.fin.fecha)})`
                }
                </span>
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};

function formatDateDDMMYYYY(date: Date | string): string {
  const d = new Date(date);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0"); // meses empiezan en 0
  const anio = d.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function diasEntre(f1: Date | string, f2: Date | string): number {
  const fecha1 = new Date(f1);
  const fecha2 = new Date(f2);

  if (isNaN(fecha1.getTime()) || isNaN(fecha2.getTime())) {
    throw new Error("Fechas inválidas");
  }

  const msPorDia = 1000 * 60 * 60 * 24;

  // Normalizo a medianoche para evitar problemas de huso horario
  fecha1.setHours(0, 0, 0, 0);
  fecha2.setHours(0, 0, 0, 0);

  const diff = Math.abs(fecha2.getTime() - fecha1.getTime());
  return Math.floor(diff / msPorDia);
}