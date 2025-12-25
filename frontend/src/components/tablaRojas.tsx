import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import CircularProgress from '@mui/material/CircularProgress';

interface Jugador {
  nombre: string;
  rojas: number;
}

interface TablaRojasProps {
  jugadores: Jugador[];
  loading: boolean;
}

export const TablaRojas: React.FC<TablaRojasProps> = ({
  jugadores,
  loading,
}) => {
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <div style={{ width: 500, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 50 }}>
        <CircularProgress sx={{ color: '#ff0000' }} size={100} />
        <span style={{ fontWeight: 'bold', marginTop: '10px' }}>Cargando...</span>
      </div>
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
                MÁS TARJETAS ROJAS
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadores
              .slice() // copiamos para no mutar
              .sort((a, b) => b.rojas - a.rojas) // orden descendente
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
                          <span className='estadistica'>{jugador.rojas}</span>
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