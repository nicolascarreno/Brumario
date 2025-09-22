import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
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
                        partidos.map((partido, i) => (
                            <tr key={i}>
                                <td>BRUMARIO {partido.goles_favor} - {partido.goles_contra} {partido.rival}</td>
                                <td>{formatDateDDMMYYYY(partido.fecha)}</td>
                            </tr>
                        ))
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