import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar, Arquero } from '../services/service_utils';

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
  arquero: Arquero;
}

interface DetallesArqueroProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesArquero: React.FC<DetallesArqueroProp> = ({
  jugador,
  loading,
}) => {
    const partidos_atajados = jugador.arquero.partidos;
    const tandas_atajadas = jugador.arquero.tandas_penales.ganados + jugador.arquero.tandas_penales.perdidos;
    const vallas_invictas = jugador.arquero.vallas_invictas;
    const Efectividad =
        partidos_atajados > 0? 
            (((3*jugador.arquero.ganados+jugador.arquero.empatados) / (3*partidos_atajados))).toFixed(2) // 0 decimales
            : 0;
    const EfectividadPenales =
        tandas_atajadas > 0? 
            (((jugador.arquero.tandas_penales.ganados) / (tandas_atajadas))).toFixed(2) // 0 decimales
            : 0;
    const PorcentajeVallasInvictas =
         vallas_invictas > 0 && partidos_atajados > 0? 
            (((vallas_invictas) / (partidos_atajados))).toFixed(2) // 0 decimales
            : 0;
    const GolesRecibidosXPartido =
        partidos_atajados > 0? 
            ((jugador.arquero.goles_recibidos / partidos_atajados)).toFixed(2) // 0 decimales
            : 0;
    const porcentajeJugada =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.pie_jugada / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;
    const porcentajeCabeza =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.cabeza / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;
    const porcentajeTiroLibre =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.tiro_libre / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;
    const porcentajePenal =
        jugador.arquero.goles_recibidos > 0?
            ((jugador.arquero.tipos_goles_recibidos.penal / jugador.arquero.goles_recibidos)).toFixed(2)
            : 0;


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
                          src={'/arquero3_sin_fondo.png'}
                          alt="App Logo"
                          width="40"
                          height="40"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Partidos Atajados
                      </span>   
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Ganados</span>
                      <span className='estadistica'>{jugador.arquero.ganados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Empatados</span>
                      <span className='estadistica'>{jugador.arquero.empatados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Perdidos</span>
                      <span className='estadistica'>{jugador.arquero.perdidos}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Efectividad (%)</span>
                      <span className='estadistica'>{Efectividad}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Partidos Totales</span>
                      <span className='estadistica_clave'>{partidos_atajados}</span>
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
                          Goles Recibidos
                      </span>   
                    </div>
                    <div className='contenedor_arquero'>
                        <div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica'>De Pie(jugada)</span>
                                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.pie_jugada}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica'>De Cabeza</span>
                                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.cabeza}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica'>De Tiro Libre</span>
                                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.tiro_libre}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica'>De Penal</span>
                                <span className='estadistica'>{jugador.arquero.tipos_goles_recibidos.penal}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica_clave'>Goles Recibidos</span>
                                <span className='estadistica_clave'>{jugador.arquero.goles_recibidos}</span>
                            </div>
                        </div>
                        <div>
                            <div className='contenedor_estadistica_arquero_segunda_columna'>
                                <span className='estadistica'>De Pie (jugada) (%)</span>
                                <span className='estadistica'>{porcentajeJugada}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica'>De Cabeza (%)</span>
                                <span className='estadistica'>{porcentajeCabeza}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica'>De Tiro Libre (%)</span>
                                <span className='estadistica'>{porcentajeTiroLibre}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica'>De Penal (%)</span>
                                <span className='estadistica'>{porcentajePenal}</span>
                            </div>
                            <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                                <span className='estadistica_clave'>Goles x Partido</span>
                                <span className='estadistica_clave'>{GolesRecibidosXPartido}</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            <div className='contenedor_tipo_estadistica'>
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
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};