import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { TiposAsistencia, TiposGol, TiposPresenciasSinJugar } from '../services/jugadoresService';

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
}

interface DetallesGeneralJugadorProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesGeneralJugador: React.FC<DetallesGeneralJugadorProp> = ({
  jugador,
  loading,
}) => {
  const partidos_jugados = jugador.titular + jugador.suplente;
  const porcentajeTitular =
      partidos_jugados > 0? 
        ((jugador.titular / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeSuplente =
      partidos_jugados > 0? 
        ((jugador.suplente / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeJugada =
      jugador.goles > 0? 
        ((jugador.tipos_gol.pie_jugada / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeCabeza =
      jugador.goles > 0? 
        ((jugador.tipos_gol.cabeza / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeTiroLibre = 
      jugador.goles > 0? 
        ((jugador.tipos_gol.tiro_libre / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajePenal =
      jugador.goles > 0? 
        ((jugador.tipos_gol.penal / jugador.goles)).toFixed(2) // 0 decimales
        : 0;
  const promedioGol =
      jugador.goles > 0? 
        ((jugador.goles / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaJugada =
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.pie_jugada / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaCabeza =
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.cabeza / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaTiroLibre = 
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.tiro_libre / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaCorner =
      jugador.asistencias > 0? 
        ((jugador.tipos_asistencia.corner / jugador.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const promedioAsistencias =
      jugador.asistencias > 0? 
        ((jugador.asistencias / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const efectividadPresenciasSinJugar =
      jugador.presencias_sin_jugar > 0? 
        (((jugador.tipos_presencias_sin_jugar.empatados + 3*jugador.tipos_presencias_sin_jugar.ganados) / (3*jugador.presencias_sin_jugar))).toFixed(2) // 0 decimales
        : 0;
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
                          src={'/jugador_sin_fondo.png'}
                          alt="App Logo"
                          width="30"
                          height="40"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Partidos Jugados
                      </span>   
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Titular</span>
                      <span className='estadistica'>{jugador.titular}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Titular (%)</span>
                      <span className='estadistica'>{porcentajeTitular}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Suplente</span>
                      <span className='estadistica'>{jugador.suplente}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Suplente (%)</span>
                      <span className='estadistica'>{porcentajeSuplente}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Partidos Totales</span>
                      <span className='estadistica_clave'>{jugador.titular + jugador.suplente}</span>
                  </div>
                </div>
                  <div style={{paddingLeft: 50}}>
                    <div className='contenedor_estadistica_nombre'>
                      <img src={'/goleadors_sin_fondo.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
                      <span className='nombre_estadistica'>Goles</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Pie (jugada)</span>
                      <span className='estadistica'>{jugador.tipos_gol.pie_jugada}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Cabeza</span>
                      <span className='estadistica'>{jugador.tipos_gol.cabeza}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Tiro Libre</span>
                      <span className='estadistica'>{jugador.tipos_gol.tiro_libre}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Penal</span>
                      <span className='estadistica'>{jugador.tipos_gol.penal}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Goles Totales</span>
                      <span className='estadistica_clave'>{jugador.goles}</span>
                  </div>
                </div>
                <div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '65px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
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
                      <span className='estadistica_clave'>{promedioGol}</span>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex'}}>
                <div>
                  <div className='contenedor_estadistica_nombre'>
                      <img
                          src={'/cerveza_sin_fondo.png'}
                          alt="App Logo"
                          width="35"
                          height="35"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Presen. Sin Jugar
                      </span>   
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Ganados</span>
                      <span className='estadistica'>{jugador.tipos_presencias_sin_jugar.ganados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Empatados</span>
                      <span className='estadistica'>{jugador.tipos_presencias_sin_jugar.empatados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Perdidos</span>
                      <span className='estadistica'>{jugador.tipos_presencias_sin_jugar.perdidos}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Efectividad (%)</span>
                      <span className='estadistica'>{efectividadPresenciasSinJugar}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Presencias Totales</span>
                      <span className='estadistica_clave'>{jugador.presencias_sin_jugar}</span>
                  </div>
                </div>
                  <div style={{paddingLeft: 50}}>
                    <div className='contenedor_estadistica_nombre'>
                      <img src={'/asistencia6.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
                      <span className='nombre_estadistica'>Asistencias</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Pie (jugada)</span>
                      <span className='estadistica'>{jugador.tipos_asistencia.pie_jugada}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Cabeza</span>
                      <span className='estadistica'>{jugador.tipos_asistencia.cabeza}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Tiro Libre</span>
                      <span className='estadistica'>{jugador.tipos_asistencia.tiro_libre}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Corner</span>
                      <span className='estadistica'>{jugador.tipos_asistencia.corner}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Asistencias Totales</span>
                      <span className='estadistica_clave'>{jugador.asistencias}</span>
                  </div>
                </div>
                <div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '65px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Pie (jugada) (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaJugada}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Cabeza (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaCabeza}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Tiro Libre (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaTiroLibre}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Corner (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaCorner}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Asistencias x Partido</span>
                      <span className='estadistica_clave'>{promedioAsistencias}</span>
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