import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';
import '../styles/jugadores.css';
import { getJugadores, Jugador } from "../services/jugadoresService";

export function Jugadores() {
  const navigate = useNavigate();
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagina, setPagina] = useState<number>(1);
  const jugadoresPorPagina = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getJugadores();
        setJugadores(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPaginas = Math.ceil(jugadores.length / jugadoresPorPagina);

  const jugadoresMostrados = jugadores.slice(
    (pagina - 1) * jugadoresPorPagina,
    pagina * jugadoresPorPagina
  );

  const handleAnterior = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  const handleSiguiente = () => {
    if (pagina < totalPaginas) setPagina(pagina + 1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <div className="encabezado">
        <img
          src={'/brumario.png'}
          alt="brumario"
          height={90}
          width={380}
          style={{ marginLeft: '18px', paddingTop: 20, paddingBottom: 20 }}
        />
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>

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
                  <tr key={jugador.name} className="tr">
                    <td className="td">
                      <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
                        <div style={{ width: 300, height: 0, display: 'flex', alignItems: 'center' }}>
                          <img
                            src={'/brumario_escudo.jpeg'}
                            alt="App Logo"
                            width="20"
                            height="20"
                            style={{ marginRight: 30 }}
                          />
                          <span className='nombres'>{jugador.name}</span>
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
    </div>
  );
}
