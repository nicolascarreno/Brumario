import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/App.css';
import { BarraOpcionesJugador } from "../components/barraOpcionesJugador";
import { DetallesGeneralJugador } from "../components/detallesGeneralJugador";
import { DetallesTecnico } from "../components/detallesDirectorTecnico";
import { DirectorTecnico, Hitos, TiposAsistencia, TiposGol, TiposPresenciasSinJugar } from "../services/service_utils";
import { DetallesHitos } from "../components/detallesHitosJugador";
import { getJugador } from "../services/jugadoresService";

interface Jugador {
  nombre: string;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
  titular: number;
  suplente: number;
  tipos_gol: TiposGol;
  tipos_asistencia: TiposAsistencia;
  tipos_presencias_sin_jugar: TiposPresenciasSinJugar;
  director_tecnico: DirectorTecnico;
  hitos: Hitos;
}

export const DetallesJugador: React.FC = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const [jugador, setJugador] = useState<Jugador | null>(null);
  const [loading, setLoading] = useState(true);
  const [opcion, setOpcion] = useState("plantilla");

  useEffect(() => {
    const fetchJugador = async () => {
      const data = await getJugador(nombre!);
      setJugador(data);
      setLoading(false);
    };
    fetchJugador();
  }, [nombre]);

  console.log(jugador);

  if (!jugador && !loading) return <p>No se encontró el jugador</p>;


  const renderContenido = () => {
      if (!jugador) return <p>No se encontró el jugador</p>;
      switch (opcion) {
        case "general":
          return (
            <DetallesGeneralJugador
              jugador={jugador}
              loading={loading}
            />
          );
        case "tecnico":
          return (
            <DetallesTecnico
              jugador={jugador}
              loading={loading}
            />
          );
        case "hitos":
          return (
            <DetallesHitos
              jugador={jugador}
              loading={loading}
            />
          );
        default:
          return (
            <DetallesGeneralJugador
              jugador={jugador}
              loading={loading}
            />
          );
      }
    };

  return (
  <div className="app">
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
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      {/* Columna izquierda → contenedor de botones */}
      <BarraOpcionesJugador onSelect={setOpcion}/>  

      {/* Render del contenido */}
      {loading ? (
              <div style={{ width: 500, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 100 }}>
                <CircularProgress sx={{ color: '#ff0000' }} size={100} />
                <span style={{ fontWeight: 'bold', marginTop: '10px' }}>Cargando...</span>
              </div>
            ) : (
        renderContenido()
      )}
    </div>
  </div>
);

};