import React from 'react';

interface Jugador {
  nombre: string;
  partidos: number;
  goles: number;
  asistencias: number;
  amarillas: number;
}

interface TablaJugadoresProps {
  jugadores: Jugador[];
  jugadoresMostrados: Jugador[];
  loading: boolean;
  pagina: number;
  totalPaginas: number;
  handleAnterior: () => void;
  handleSiguiente: () => void;
}

export const TablaJugadores: React.FC<TablaJugadoresProps> = ({
  jugadores,
  jugadoresMostrados,
  loading,
  pagina,
  totalPaginas,
  handleAnterior,
  handleSiguiente
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <table className="tablaPosiciones" style={{ width: 500, marginBottom: 20 }}>
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
                  {jugadores.length} JUGADORES
                </th>
              </tr>
            </thead>
            <tbody>
              {jugadoresMostrados.map(jugador => (
                <tr key={jugador.nombre} className="tr">
                  <td className="td">
                    <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
                      <div style={{ width: 300, display: 'flex', alignItems: 'center' }}>
                        <img
                          src={'/brumario_escudo_sin_fondo.png'}
                          alt="App Logo"
                          width="20"
                          height="20"
                          style={{ marginRight: 30 }}
                        />
                        <span className='nombres'>{jugador.nombre}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            {/* Columna izquierda */}
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

            {/* Columna central */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span className='nro_pagina'>Página {pagina} de {totalPaginas}</span>
            </div>

            {/* Columna derecha */}
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
