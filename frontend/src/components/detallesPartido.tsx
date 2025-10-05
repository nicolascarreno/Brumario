import React, { JSX } from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import '../styles/detalles_partido.css'
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar, Hitos, Partido } from '../services/service_utils';
import { formatDateDDMMYYYY } from './partidosTodos';


interface DetallesPartidoProp {
  partido: Partido;
  loading: boolean;
}

export const DetallesPartido: React.FC<DetallesPartidoProp> = ({
  partido,
  loading,
}) => {

  const iconosEstado = {
    Ganado: "/victoria2.png",
    Empatado: "/empate3.png",
    Perdido: "/derrota2.png"
  };
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <div style={{ width: 850, gap: 100 }}>
            <div className='contenedor_nombre_partido'>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <span className='estadistica_clave'>{partido.competicion} ({partido.categoria})</span>
                  <span className='estadistica'>{formatDateDDMMYYYY(partido.fecha)} {partido.hora}</span>
                </div>
                <div style={{display: "flex", width: 830, alignItems: 'center'}}>
                  <img
                      src={'/brumario_escudo_sin_fondo.png'}
                      alt="App Logo"
                      width="100"
                      height="100"
                      style={{ marginRight: 20 }}
                  />
                  <div style={{width: 500}}><span className='nombre'>{partido.rival}</span></div>
                  <div style={{display: 'flex', width: 260, alignItems: 'center', justifyContent: "center"}}>
                      <img
                          src={iconosEstado[partido.resultado as "Ganado" | "Empatado" | "Perdido"]}
                          alt={partido.resultado}
                          style={{ width: 30, height: 30, marginRight: 10, verticalAlign: 'middle' }}
                      />
                      <span className='nombre'>{partido.goles_favor} - {partido.goles_contra}</span>
                  </div>
                </div>
            </div>
            <div className='contenedor_estadistica'>
              <div style={{paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px'}}>
                <span className='estadistica'>Ubicacion: {partido.ubicacion}</span>
                <span className='estadistica'>Sede: {partido.predio}</span>
                <span className='estadistica'>Cancha: {partido.cancha}</span>
                <span className='estadistica'>Jornada: {partido.jornada}</span>
              </div>
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
                          Formación
                      </span>   
                  </div>
                  <span className='estadistica' style={{paddingLeft: 35}}>Esquema Táctico: {partido.esquema_tactico}</span>
                  {partido.titulares.length === 0 ? (
  <p style={{ marginLeft: 37, fontStyle: 'italic', marginRight: 90 }}>
    No hay datos disponibles
  </p>
) : (
  <table style={{ marginLeft: 15, textAlign: 'left', marginBottom: 15, marginTop: 15 }}>
    <tbody>
      {partido.titulares.map((jugador, index) => {
        const [apellido, nombre] = jugador.split(",").map(s => s.trim());
        const nombreBackend = jugador; 

        // Contar goles
        const goles = partido.golesFavor
          ? partido.golesFavor.filter(g => g.gol === nombreBackend).length
          : 0;

        // Contar asistencias
        const asistencias = partido.golesFavor
          ? partido.golesFavor.filter(g => g.asistencia === nombreBackend).length
          : 0;

        // Contar amarillas
        const amarillas = partido.amarillas
          ? partido.amarillas.filter(a => a === nombreBackend).length
          : 0;

        // Contar rojas
        const rojas = partido.rojas
          ? partido.rojas.filter(r => r === nombreBackend).length
          : 0;

        // 🔹 Usamos React.ReactNode[] en vez de string[] | JSX.Element[]
        const partes: React.ReactNode[] = [];

        if (goles > 0) {
          partes.push(
            <>⚽{goles > 1 ? `(${goles})` : ""}</>
          );
        }
        if (asistencias > 0) {
          partes.push(
            <>
              <img
                src="/asistencia6.png"
                alt="Asistencia"
                style={{ width: 18, height: 18, verticalAlign: "middle", marginLeft: 5 }}
              />
              {asistencias > 1 ? `(${asistencias})` : ""}
            </>
          );
        }
        if (amarillas > 0) {
          partes.push(
            <>
              <img
                src="/amarilla_sin_fondo2.png"
                alt="Amarilla"
                style={{ width: 22, height: 22, verticalAlign: "middle", marginLeft: 5 }}
              />
              {amarillas > 1 ? `(${amarillas})` : ""}
            </>
          );
        }
        if (rojas > 0) {
          partes.push(
            <>
              <img
                src="/roja_sin_fondo.png"
                alt="Roja"
                style={{ width: 22, height: 22, verticalAlign: "middle", marginLeft: 5 }}
              />
              {rojas > 1 ? `(${rojas})` : ""}
            </>
          );
        }

        return (
          <tr key={index}>
            <td className='estadistica' style={{ paddingLeft: 20 }}>
              {nombre} {apellido}
              {partes.length > 0 && (
                <> {partes.map((p, i) => (
                  <span key={i}>
                    {i > 0 ? ", " : ""}{p}
                  </span>
                ))}</>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}

{partido.suplentes.length === 0 ? (
  <p style={{ marginLeft: 37, fontStyle: 'italic', marginRight: 90 }}>
    No hay datos disponibles
  </p>
) : (
  <table style={{ marginLeft: 15, textAlign: 'left', marginBottom: 15 }}>
    <tbody>
      {partido.suplentes.map((jugador, index) => {
        const [apellido, nombre] = jugador.split(",").map(s => s.trim());

        // 🔹 Contar goles de este jugador
        const goles = partido.golesFavor
          ? partido.golesFavor.filter(g => g.gol === jugador).length
          : 0;

        // 🔹 Contar asistencias de este jugador
        const asistencias = partido.golesFavor
          ? partido.golesFavor.filter(g => g.asistencia === jugador).length
          : 0;

        return (
          <tr key={index}>
            <td className='estadistica' style={{ paddingLeft: 20 }}>
              {nombre} {apellido}
              {goles > 0 && (
                <> ⚽{goles > 1 ? `(${goles})` : ""}</>
              )}
              {asistencias > 0 && (
                <> <img src="/asistencia6.png" alt="Asistencia" style={{ width: 18, height: 18, verticalAlign: "middle", marginLeft: 5 }} 
              />{asistencias > 1 ? `(${asistencias})` : ""}</>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}

                    <span className='estadistica' style={{paddingLeft: 35}}>DT: {partido.director_tecnico}</span>
                </div>
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};