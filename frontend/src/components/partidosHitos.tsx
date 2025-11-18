import React, { JSX } from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import '../styles/detalles_partido.css'
import {HitosPartidos} from '../services/service_utils'
import { formatDateDDMMYYYY } from './partidosTodos';
import { diasEntre } from './detallesHitosJugador';

interface HitosPartidosProp {
  hitos?: HitosPartidos
  loading: boolean;
}

export const PartidosHitos: React.FC<HitosPartidosProp> = ({
  hitos,
  loading
}) => {
  let porcentajeLibres = '';
  let porcentajeSenior = '';

  if (hitos) {
    const puntosLibres = hitos.ganadosLibres * 3 + hitos.empatadosLibres * 1;
    const totalLibres =
      (hitos.ganadosLibres + hitos.empatadosLibres + hitos.perdidosLibres) * 3;

    porcentajeLibres = totalLibres > 0 ? ((puntosLibres / totalLibres) * 100).toFixed(1) : "0.0";

    const puntosSenior = hitos.ganadosSenior * 3 + hitos.empatadosSenior * 1;
    const totalSenior =
      (hitos.ganadosSenior + hitos.empatadosSenior + hitos.perdidosSenior) * 3;

    porcentajeSenior = totalSenior > 0 ? ((puntosSenior / totalSenior) * 100).toFixed(1) : "0.0";
  }

  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <div className='contenedor_general_gris'>
          <div className='contenedor_estadistica'>
            <div className='contenedor_estadistica_nombre'>
              <img
                  src={'/brumario_escudo_sin_fondo.png'}
                  alt="App Logo"
                  width="50"
                  height="50"
                  style={{ marginLeft: 10, marginRight: 5 }}
              />
              <span className='nombre_estadistica'>
                  Hitos Libres
              </span>   
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className="contenedor_estadistica_nombre">
              <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Historial:</span>{" "}
                {hitos ? (
                  `${hitos.ganadosLibres}G - ${hitos.empatadosLibres}E - ${hitos.perdidosLibres}P (Efectividad: ${porcentajeLibres}%)`
                ) : (
                  <span style={{ fontStyle: "italic", fontWeight: "normal", color: "black" }}>
                    Sin datos disponibles
                  </span>
                )}
              </span>
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
              <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mayor victoria:</span>{" "}
                {hitos?.mayorVictoriaLibres.partido.golesBrumario === ""
                  ? (
                    <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>
                      No tiene goles
                    </span>
                  ) : (
                    <Link to={`/partidos/${hitos?.mayorVictoriaLibres.partido.nro}`} style={{textDecoration: 'none', color: 'inherit', cursor: 'pointer'}}>
                      <span style={{ color: '#434343' }}>
                        (BRUMARIO {hitos?.mayorVictoriaLibres.partido.golesBrumario} - 
                        {hitos?.mayorVictoriaLibres.partido.golesRecibidos}{" "}
                        {hitos?.mayorVictoriaLibres.partido.rival},{" "}
                        {hitos?.mayorVictoriaLibres.partido.competicion},{" "}
                        {formatDateDDMMYYYY(hitos?.mayorVictoriaLibres.partido.fecha)})
                      </span>
                    </Link>
                  )
                }
              </span> 
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
              <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mayor derrota:</span>{" "}
                {hitos?.mayorDerrotaLibres.partido.golesBrumario === ""
                  ? (
                    <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>
                      No tiene goles
                    </span>
                  ) : (
                    <Link
                      to={`/partidos/${hitos?.mayorDerrotaLibres.partido.nro}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ color: '#434343' }}>
                        (BRUMARIO {hitos?.mayorDerrotaLibres.partido.golesBrumario} - 
                        {hitos?.mayorDerrotaLibres.partido.golesRecibidos}{" "}
                        {hitos?.mayorDerrotaLibres.partido.rival},{" "}
                        {hitos?.mayorDerrotaLibres.partido.competicion},{" "}
                        {formatDateDDMMYYYY(hitos?.mayorDerrotaLibres.partido.fecha)})
                      </span>
                    </Link>
                  )
                }
              </span>
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
              <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Más goles en un partido:</span>{" "}
                {hitos?.masGolesLibres.partido.golesBrumario === ""
                  ? (
                    <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>
                      No tiene goles
                    </span>
                  ) : (
                    <Link
                      to={`/partidos/${hitos?.masGolesLibres.partido.nro}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ color: '#434343' }}>
                        (BRUMARIO {hitos?.masGolesLibres.partido.golesBrumario} - 
                        {hitos?.masGolesLibres.partido.golesRecibidos}{" "}
                        {hitos?.masGolesLibres.partido.rival},{" "}
                        {hitos?.masGolesLibres.partido.competicion},{" "}
                        {formatDateDDMMYYYY(hitos?.masGolesLibres.partido.fecha)})
                      </span>
                    </Link>
                  )
                }
              </span> 
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
              <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Más presencias sin jugar en un partido:</span>{" "}
                {hitos?.masPresenciasSinJugarLibres.partido.golesBrumario === ""
                  ? (
                    <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>
                      No hay presencias sin jugar
                    </span>
                  ) : (
                    <Link
                      to={`/partidos/${hitos?.masPresenciasSinJugarLibres.partido.nro}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ color: '#434343' }}>
                        {hitos?.masPresenciasSinJugarLibres.cantidad}{" "}
                        (BRUMARIO {hitos?.masPresenciasSinJugarLibres.partido.golesBrumario} - 
                        {hitos?.masPresenciasSinJugarLibres.partido.golesRecibidos}{" "}
                        {hitos?.masPresenciasSinJugarLibres.partido.rival},{" "}
                        {hitos?.masPresenciasSinJugarLibres.partido.competicion},{" "}
                        {formatDateDDMMYYYY(hitos?.masPresenciasSinJugarLibres.partido.fecha)})
                      </span>
                    </Link>
                  )
                }
              </span> 
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos invicto:</span>{" "}
                {hitos?.rachaInvictaLibres.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaInvictaLibres.racha.duracionPartidos} (${diasEntre(hitos?.rachaInvictaLibres.racha.inicio.fecha, hitos?.rachaInvictaLibres.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaInvictaLibres.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaInvictaLibres.racha.fin.fecha)})`
                }
                </span>
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos consecutivos ganados:</span>{" "}
                {hitos?.rachaGanadosLibres.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaGanadosLibres.racha.duracionPartidos} (${diasEntre(hitos?.rachaGanadosLibres.racha.inicio.fecha, hitos?.rachaGanadosLibres.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaGanadosLibres.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaGanadosLibres.racha.fin.fecha)})`
                }
                </span>
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos consecutivos sin ganar:</span>{" "}
                {hitos?.rachaSinGanarLibres.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaSinGanarLibres.racha.duracionPartidos} (${diasEntre(hitos?.rachaSinGanarLibres.racha.inicio.fecha, hitos?.rachaSinGanarLibres.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaSinGanarLibres.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaSinGanarLibres.racha.fin.fecha)})`
                }
                </span>
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos consecutivos perdidos:</span>{" "}
                {hitos?.rachaPerdidosLibres.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaPerdidosLibres.racha.duracionPartidos} (${diasEntre(hitos?.rachaPerdidosLibres.racha.inicio.fecha, hitos?.rachaPerdidosLibres.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaPerdidosLibres.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaPerdidosLibres.racha.fin.fecha)})`
                }
                </span>
            </div>
            <div className='contenedor_estadistica_nombre' style={{marginTop: 30}}>
              <img
                  src={'/brumario_escudo_sin_fondo.png'}
                  alt="App Logo"
                  width="50"
                  height="50"
                  style={{ marginLeft: 10, marginRight: 5 }}
              />
              <span className='nombre_estadistica'>
                  Hitos Senior
              </span>   
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className="contenedor_estadistica_nombre">
              <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Historial:</span>{" "}
                {hitos ? (
                  `${hitos.ganadosSenior}G - ${hitos.empatadosSenior}E - ${hitos.perdidosSenior}P (Efectividad: ${porcentajeSenior}%)`
                ) : (
                  <span style={{ fontStyle: "italic", fontWeight: "normal", color: "black" }}>
                    Sin datos disponibles
                  </span>
                )}
              </span>
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className="contenedor_estadistica_nombre">
              <span style={{ textIndent: 20, textAlign: "left" }} className="estadistica">
                <span style={{ color: "black" }}>Mayor victoria:</span>{" "}
                {hitos?.mayorVictoriaSenior.partido.golesBrumario === "" ? (
                  <span style={{fontStyle: "italic", fontWeight: "normal", color: "black"}}>
                    No tiene goles
                  </span>
                ) : (
                  <Link
                    to={`/partidos/${hitos?.mayorVictoriaSenior.partido.nro}`}
                    style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                    <span style={{ color: "#434343" }}>
                      (BRUMARIO {hitos?.mayorVictoriaSenior.partido.golesBrumario} -{" "}
                      {hitos?.mayorVictoriaSenior.partido.golesRecibidos}{" "}
                      {hitos?.mayorVictoriaSenior.partido.rival},{" "}
                      {hitos?.mayorVictoriaSenior.partido.competicion},{" "}
                      {formatDateDDMMYYYY(hitos?.mayorVictoriaSenior.partido.fecha)})
                    </span>
                  </Link>
                )}
              </span>
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className="contenedor_estadistica_nombre">
              <span style={{ textIndent: 20, textAlign: "left" }} className="estadistica">
                <span style={{ color: "black" }}>Mayor derrota:</span>{" "}
                {hitos?.mayorDerrotaSenior.partido.golesBrumario === "" ? (
                  <span style={{fontStyle: "italic", fontWeight: "normal", color: "black"}}>
                    No tiene goles
                  </span>
                ) : (
                  <Link
                    to={`/partidos/${hitos?.mayorDerrotaSenior.partido.nro}`}
                    style={{textDecoration: "none", color: "inherit",cursor: "pointer"}}>
                    <span style={{ color: "#434343" }}>
                      (BRUMARIO {hitos?.mayorDerrotaSenior.partido.golesBrumario} -{" "}
                      {hitos?.mayorDerrotaSenior.partido.golesRecibidos}{" "}
                      {hitos?.mayorDerrotaSenior.partido.rival},{" "}
                      {hitos?.mayorDerrotaSenior.partido.competicion},{" "}
                      {formatDateDDMMYYYY(hitos?.mayorDerrotaSenior.partido.fecha)})
                    </span>
                  </Link>
                )}
              </span>
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className="contenedor_estadistica_nombre">
              <span style={{ textIndent: 20, textAlign: "left" }} className="estadistica">
                <span style={{ color: "black" }}>Más goles en un partido:</span>{" "}
                {hitos?.masGolesSenior.partido.golesBrumario === "" ? (
                  <span style={{fontStyle: "italic", fontWeight: "normal", color: "black"}}>
                    No tiene goles
                  </span>
                ) : (
                  <Link
                    to={`/partidos/${hitos?.masGolesSenior.partido.nro}`}
                    style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}                  >
                    <span style={{ color: "#434343" }}>
                      (BRUMARIO {hitos?.masGolesSenior.partido.golesBrumario} -{" "}
                      {hitos?.masGolesSenior.partido.golesRecibidos}{" "}
                      {hitos?.masGolesSenior.partido.rival},{" "}
                      {hitos?.masGolesSenior.partido.competicion},{" "}
                      {formatDateDDMMYYYY(hitos?.masGolesSenior.partido.fecha)})
                    </span>
                  </Link>
                )}
              </span>
            </div>
            <div style={{ paddingTop: 5, paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
              <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Más presencias sin jugar en un partido:</span>{" "}
                {hitos?.masPresenciasSinJugarSenior.partido.golesBrumario === "" ? (
                  <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>
                    No hay presencias sin jugar
                  </span>
                ) : (
                  <Link
                    to={`/partidos/${hitos?.masPresenciasSinJugarSenior.partido.nro}`}
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    <span style={{ color: '#434343' }}>
                      {hitos?.masPresenciasSinJugarSenior.cantidad} (BRUMARIO {hitos?.masPresenciasSinJugarSenior.partido.golesBrumario} -{" "}
                      {hitos?.masPresenciasSinJugarSenior.partido.golesRecibidos}{" "}
                      {hitos?.masPresenciasSinJugarSenior.partido.rival},{" "}
                      {hitos?.masPresenciasSinJugarSenior.partido.competicion},{" "}
                      {formatDateDDMMYYYY(hitos?.masPresenciasSinJugarSenior.partido.fecha)})
                    </span>
                  </Link>
                )}
              </span> 
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos invicto:</span>{" "}
                {hitos?.rachaInvictaSenior.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaInvictaSenior.racha.duracionPartidos} (${diasEntre(hitos?.rachaInvictaSenior.racha.inicio.fecha, hitos?.rachaInvictaSenior.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaInvictaSenior.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaInvictaSenior.racha.fin.fecha)})`
                }
                </span>
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos consecutivos ganados:</span>{" "}
                {hitos?.rachaGanadosSenior.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaGanadosSenior.racha.duracionPartidos} (${diasEntre(hitos?.rachaGanadosSenior.racha.inicio.fecha, hitos?.rachaGanadosSenior.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaGanadosSenior.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaGanadosSenior.racha.fin.fecha)})`
                }
                </span>
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos consecutivos sin ganar:</span>{" "}
                {hitos?.rachaSinGanarSenior.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaSinGanarSenior.racha.duracionPartidos} (${diasEntre(hitos?.rachaSinGanarSenior.racha.inicio.fecha, hitos?.rachaSinGanarSenior.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaSinGanarSenior.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaSinGanarSenior.racha.fin.fecha)})`
                }
                </span>
            </div>
            <div style={{ paddingLeft: 15 }} className='contenedor_estadistica_nombre'>
                <span style={{ textIndent: 20, textAlign: 'left' }} className="estadistica">
                <span style={{ color: 'black' }}>Mas partidos consecutivos perdidos:</span>{" "}
                {hitos?.rachaPerdidosSenior.racha.duracionPartidos === 0
                  ? <span style={{ fontStyle: 'italic', fontWeight: 'normal', color: 'black' }}>No tiene victorias/empates</span>
                  : `${hitos?.rachaPerdidosSenior.racha.duracionPartidos} (${diasEntre(hitos?.rachaPerdidosSenior.racha.inicio.fecha, hitos?.rachaPerdidosSenior.racha.fin.fecha)} días) (Inicia el ${formatDateDDMMYYYY(hitos?.rachaPerdidosSenior.racha.inicio.fecha)}, Finaliza el ${formatDateDDMMYYYY(hitos?.rachaPerdidosSenior.racha.fin.fecha)})`
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