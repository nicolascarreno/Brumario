import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import '../styles/partido.css'
import { Partido } from '../services/partidosService';

interface PartidosTodosProp {
  partidos: Partido[];
  loading: boolean;
}

export const PartidosTodos: React.FC<PartidosTodosProp> = ({
  partidos,
  loading,
}) => {
    console.log(partidos)
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
            <div className='contenedor_estadistica'>
                <table className="tabla-partidos">
                  <tbody>
                    {Array.isArray(partidos) && partidos.length > 0 ? (
  // ordenamos por fecha ascendente (de más antiguo a más reciente)
  [...partidos]
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .map((partido, i) => {
      const esLocal = i % 2 === 0;

                        return (
                          <tr key={i}>
                            <td style={{paddingBottom: 0, height: 50}}>
                              <div style={{ display: "flex" }}>
                                {/* Fecha */}
                                <span className="partido" style={{ paddingRight: 20, paddingLeft: 10 }}>
                                  {formatDateDDMMYYYY(partido.fecha)}
                                </span>
                                <span className="partido" style={{ paddingRight: 20, paddingLeft: 0, width: 60 }}>
                                  {partido.hora || "-------"}
                                </span>
                                <span className="partido" style={{ paddingRight: 20, paddingLeft: 10, width: 200 }}>
                                  {partido.rival}
                                </span>
                                <div style={{width: 100, paddingRight: 20, paddingLeft: 10 }}>
                                  <img 
                                    src={iconosEstado[partido.resultado as "Ganado" | "Empatado" | "Perdido"]} 
                                    alt={partido.resultado} 
                                    style={{ width: 15, height: 15, marginRight: 10, verticalAlign: 'middle' }} 
                                  />
                                  <span className="partido" style={{ paddingRight: 0, paddingLeft: 0, width: 100 }}>
                                    {partido.goles_favor} - {partido.goles_contra}
                                  </span>
                                </div>
                                <span className="partido" style={{ paddingRight: 20, paddingLeft: 10, width: 250 }}>
                                  {partido.competicion} ({partido.categoria})
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7}>No hay partidos</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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