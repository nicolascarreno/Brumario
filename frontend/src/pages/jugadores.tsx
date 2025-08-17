import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';
import '../styles/jugadores.css';
import '../styles/jugadores_barra_opciones.css';
import { getJugadores, Jugador } from "../services/jugadoresService";
import { TablaJugadores } from '../components/tablaJugadores';

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

      <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
        <div className='contenedor_barra_opciones'>
          <button className='boton_barra_opciones'>
            <img src="/brumario_escudo.jpeg" alt="icono" style={{ width: '30px', height: '30px'}}></img>
            <span>Plantilla</span>
          </button>
        </div>     
          <TablaJugadores
            jugadores={jugadores}
            jugadoresMostrados={jugadoresMostrados}
            loading={loading}
            pagina={pagina}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        </div>

  </div>
  );
}
