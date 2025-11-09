import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'

interface Jugador {
  nombre: string;
  asistencias: number;
}

interface TablaAsistidoresProps {
  jugadores: Jugador[];
  loading: boolean;
}

export const TablaAsistidores: React.FC<TablaAsistidoresProps> = ({
  jugadores,
  loading,
}) => {
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <table className="tablaPosiciones" style={{ marginBottom: 20 }}>
          <thead>
            <tr>
              <th
                className="th_black"
                style={{
                  width: '80px',
                  borderBottom: '1px solid black',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  textAlign: 'center'
                }}
              >
                MÁXIMOS ASISTIDORES
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadores
              .slice() // copiamos para no mutar
              .sort((a, b) => b.asistencias - a.asistencias) // orden descendente
              .slice(0, 8) // solo los 8 primeros
              .map((jugador, index) => (
                <tr key={jugador.nombre} className="tr">
                  <td className="td">
                    <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
                      <div className='dataTabla'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className='indice'>{index + 1}</span>
                          <img
                            src={'/brumario_escudo_sin_fondo.png'}
                            alt="App Logo"
                            width="20"
                            height="20"
                            className='imagen_brumario'
                          />
                          <Link to={`/jugador/${encodeURIComponent(jugador.nombre)}`} className="link">
                            {jugador.nombre}
                          </Link>
                        </div>
                        <div>
                          <span className='estadistica'>{jugador.asistencias}</span>
                        </div>                        
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    )}
  </div>
);
};