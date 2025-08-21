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
                MAYORES PRESENCIAS
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadores
              .slice() // copiamos para no mutar
              .sort((a, b) => b.partidos - a.partidos) // orden descendente
              .slice(0, 8) // solo los 8 primeros
              .map(jugador => (
                <tr key={jugador.nombre} className="tr">
                  <td className="td">
                    <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
                      <div style={{ width: 450, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={'/brumario_escudo_sin_fondo.png'}
                            alt="App Logo"
                            width="20"
                            height="20"
                            style={{ marginRight: 30 }}
                          />
                          <span className='nombres'>{jugador.nombre}</span>
                        </div>
                        <div>
                          <span className='nombres'>{jugador.partidos}</span>
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