import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';
import '../styles/jugadores.css';
import '../styles/jugadores_barra_opciones.css';
import { getJugadores } from "../services/jugadoresService";
import { Jugador } from "../services/service_utils";
import { TablaJugadores } from '../components/tablaJugadores';
import { BarraOpciones } from "../components/barraOpciones";
import { BarraBusqueda } from "../components/barra_busqueda";
import { log } from "../logger/logger";
import { TablaEstadisticas } from '../components/tablaEstadisticas';
import { obtenerEstadistica } from '../utils/helpers';

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
        log(data);
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
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "partidos")}
            loading={loading}
            pagina={pagina}
            titulo="MAYORES PRESENCIAS"
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
      case "goleadores":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "goles")}
            loading={loading}
            pagina={pagina}
            titulo={"MÁXIMOS GOLEADORES"}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
      case "asistidores":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "asistencias")}
            loading={loading}
            pagina={pagina}
            titulo={"MÁXIMOS ASISTIDORES"}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
      case "amarillas":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "amarillas")}
            loading={loading}
            pagina={pagina}
            titulo={"MÁS TARJETAS AMARILLAS"}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
      case "rojas":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "rojas")}
            loading={loading}
            pagina={pagina}
            titulo={"MÁS TARJETAS ROJAS"}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}            
          />
        );
      case "presencias sin jugar":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "presencias_sin_jugar")}
            loading={loading}
            pagina={pagina}
            titulo={"MÁS PRESENCIAS SIN JUGAR"}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
          />
        );
      case "presencias totales":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "presencias_totales")}
            loading={loading}
            pagina={pagina}
            titulo={"MAYORES PRESENCIAS TOTALES"}
            totalPaginas={totalPaginas}
            handleAnterior={handleAnterior}
            handleSiguiente={handleSiguiente}
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
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>

      <div className='contenido_jugadores'>
        <BarraOpciones onSelect={setOpcion} />  
        {renderContenido()}
        <BarraBusqueda jugadores={jugadores} onSelect={(jugador) => navigate(`/jugador/${jugador.nombre}`)}/>
      </div>

  </div>
  );
}
