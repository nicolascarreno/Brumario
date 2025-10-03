import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';
import '../styles/jugadores.css';
import '../styles/jugadores_barra_opciones.css';
import { getJugadores } from "../services/jugadoresService";
import { Jugador } from "../services/service_utils";
import { TablaJugadores } from '../components/tablaJugadores';
import { TablaPresencias } from '../components/tablaPresencias';
import { TablaGoleadores } from '../components/tablaGoleadores';
import { TablaAsistidores } from '../components/tablaAsistidores';
import { TablaAmarillas } from '../components/tablaAmarillas';
import { TablaRojas } from '../components/tablaRojas';
import { TablaPresenciasSinJugar } from '../components/tablaPresenciasSinJugar';
import { BarraOpciones } from "../components/barraOpciones";
import { BarraBusqueda } from "../components/barra_busqueda";

export function Jugadores() {
  const navigate = useNavigate();
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagina, setPagina] = useState<number>(1);
  const [opcion, setOpcion] = useState("plantilla");
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

  const renderContenido = () => {
    switch (opcion) {
      case "plantilla":
        return (
          <TablaJugadores
            jugadores={jugadores}
            jugadoresMostrados={jugadoresMostrados}
            loading={loading}
            pagina={pagina}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
      case "presencias":
        return (
          <TablaPresencias
            jugadores={jugadores}
            loading={loading}
            pagina={pagina}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
      case "goleadores":
        return (
          <TablaGoleadores
            jugadores={jugadores}
            loading={loading}
          />
        );
      case "asistidores":
        return (
          <TablaAsistidores
            jugadores={jugadores}
            loading={loading}
          />
        );
      case "amarillas":
        return (
          <TablaAmarillas
            jugadores={jugadores}
            loading={loading}
          />
        );
      case "rojas":
        return (
          <TablaRojas
            jugadores={jugadores}
            loading={loading}
          />
        );
      case "presencias sin jugar":
        return (
          <TablaPresenciasSinJugar
            jugadores={jugadores}
            loading={loading}
          />
        );
      default:
        return (
          <TablaJugadores
            jugadores={jugadores}
            jugadoresMostrados={jugadoresMostrados}
            loading={loading}
            pagina={pagina}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
    }
  };

  return (
    <div className="App">
      <div className="encabezado">
        <img
          src={'/brumario.png'}
          alt="brumario"
          className='logo'
        />
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>

      <div className='contenido_jugadores'>
        {/* Columna izquierda → contenedor de botones */}
        <BarraOpciones onSelect={setOpcion} />  
        {renderContenido()}
        <BarraBusqueda jugadores={jugadores} onSelect={(jugador) => navigate(`/jugador/${jugador.nombre}`)}/>
      </div>

  </div>
  );
}
