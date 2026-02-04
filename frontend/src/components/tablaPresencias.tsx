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

  const jugadoresOrdenados = React.useMemo(() => {
  return jugadores
    .slice()
    .sort((a, b) => (b.titular + b.suplente) - (a.titular + a.suplente));
}, [jugadores]);

const jugadoresPorPagina = 8;
const inicio = (pagina - 1) * jugadoresPorPagina;
const fin = inicio + jugadoresPorPagina;

const jugadoresPaginaActual = jugadoresOrdenados.slice(inicio, fin);

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
                MAYORES PRESENCIAS
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadoresPaginaActual.map((jugador, index) => (
              <tr key={jugador.nombre} className="tr">
                <td className="td">
                  <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
                    <div className='dataTabla'>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className='indice'>
                          {inicio + index + 1}
                        </span>

                        <img
                          src={'/brumario_escudo_sin_fondo.png'}
                          alt="App Logo"
                          width="20"
                          height="20"
                          className='imagen_brumario'
                        />

                        <Link
                          to={`/jugador/${encodeURIComponent(jugador.nombre)}`}
                          className="link"
                        >
                          {jugador.nombre}
                        </Link>
                      </div>

                      <div>
                        <span className='estadistica'>
                          {jugador.titular + jugador.suplente}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: 20
          }}
        >
          {/* Izquierda */}
          <div style={{ width: '50px', textAlign: 'center' }}>
            {pagina > 1 && (
              <button
                className='boton_cambiar_pagina'
                onClick={handleAnterior}
              >
                {'<'}
              </button>
            )}
          </div>

          {/* Centro */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span className='nro_pagina'>
              Página {pagina} de {totalPaginas}
            </span>
          </div>

          {/* Derecha */}
          <div style={{ width: '50px', textAlign: 'center' }}>
            {pagina < totalPaginas && (
              <button
                className='boton_cambiar_pagina'
                onClick={handleSiguiente}
              >
                {'>'}
              </button>
            )}
          </div>
        </div>

      </>
    )}
  </div>
);
};