import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import CircularProgress from '@mui/material/CircularProgress';


interface Jugador {
  nombre: string;
  titular: number;
  suplente: number;
}

interface TablaJugadoresProps {
  jugadores: Jugador[];
  loading: boolean;
  pagina: number;
  totalPaginas: number;
  handleAnterior: () => void;
  handleSiguiente: () => void;
}

export const TablaPresencias: React.FC<TablaJugadoresProps> = ({
  jugadores,
  loading,
  pagina,
  totalPaginas,
  handleAnterior,
  handleSiguiente
}) => {
  return (
  <div style={{ flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
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
                MAYORES PRESENCIAS
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadores
              .slice() // copiamos para no mutar
              .sort((a, b) => (b.titular + b.suplente) - (a.titular + a.suplente)) // orden descendente
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
                          <span className='estadistica'>{jugador.titular + jugador.suplente}</span>
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