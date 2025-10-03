import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import '../styles/detalles_partido.css'
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar, Hitos, Partido } from '../services/service_utils';


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
            <div className='contenedor_nombre'>
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
                          Formación
                      </span>   
                  </div>
                  {partido.titulares.length === 0 ? (
                    <p style={{ marginLeft: 37, fontStyle: 'italic', marginRight: 90 }}>
                        No hay datos disponibles
                    </p>
                    ) : (
                    <table style={{ marginLeft: 15, textAlign: 'left', marginBottom: 15 }}>
                        <tbody>
                            {partido.titulares.map((jugador, index) => {
                            const [apellido, nombre] = jugador.split(",").map(s => s.trim());

                            // 🔹 Contar goles de este jugador
                            const goles = partido.golesFavor
                                ? partido.golesFavor.filter(g => g.gol === jugador).length
                                : 0;

                            return (
                                <tr key={index}>
                                <td className='estadistica' style={{ paddingLeft: 20 }}>
                                    {nombre} {apellido}
                                    {goles > 0 && (
                                    <> ⚽{goles > 1 ? `(${goles})` : ""}</>
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

                            return (
                                <tr key={index}>
                                <td className='estadistica' style={{ paddingLeft: 20 }}>
                                    {nombre} {apellido}
                                    {goles > 0 && (
                                    <> ⚽{goles > 1 ? `(${goles})` : ""}</>
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