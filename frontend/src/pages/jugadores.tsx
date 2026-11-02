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
  const [opcion, setOpcion] = useState("plantilla");

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderContenido = () => {
    switch (opcion) {
      case "plantilla":
        return (
          <TablaJugadores
            jugadores={jugadores}
            loading={loading}
          />
        );
      case "presencias":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "partidos")}
            loading={loading}
            titulo="MAYORES PRESENCIAS"
          />
        );
      case "goleadores":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "goles")}
            loading={loading}
            titulo={"MÁXIMOS GOLEADORES"}
          />
        );
      case "asistidores":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "asistencias")}
            loading={loading}
            titulo={"MÁXIMOS ASISTIDORES"}
          />
        );
      case "amarillas":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "amarillas")}
            loading={loading}
            titulo={"MÁS TARJETAS AMARILLAS"}
          />
        );
      case "rojas":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "rojas")}
            loading={loading}
            titulo={"MÁS TARJETAS ROJAS"}   
          />
        );
      case "presencias sin jugar":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "presencias_sin_jugar")}
            loading={loading}
            titulo={"MÁS PRESENCIAS SIN JUGAR"}
          />
        );
      case "presencias totales":
        return (
          <TablaEstadisticas
            jugadores={obtenerEstadistica(jugadores, "presencias_totales")}
            loading={loading}
            titulo={"MAYORES PRESENCIAS TOTALES"}
          />
        );
      default:
        return (
          <TablaJugadores
            jugadores={jugadores}
            loading={loading}
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
