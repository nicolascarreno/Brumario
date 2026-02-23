import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/App.css';
import '../styles/detalles_jugador.css'
import { BarraOpcionesJugador } from "../components/barraOpcionesJugador";
import { DetallesGeneralJugador } from "../components/detallesGeneralJugador";
import { DetallesTecnico } from "../components/detallesDirectorTecnico";
import { DetallesArquero } from "../components/detallesArquero";
import { Jugador } from "../services/service_utils";
import { DetallesHitos } from "../components/detallesHitosJugador";
import { getJugador } from "../services/jugadoresService";

export const DetallesJugador: React.FC = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const navigate = useNavigate();
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

  const renderContenido = () => {
      if (!jugador) return <div className="contenedor_error"><span className="nombre_estadistica">¡Ups! No se encontró el jugador buscado</span></div>;
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
        case "arquero":
          return (
            <DetallesArquero
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
      <img src={'/brumario.png'} alt="brumario" className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}/>
      <span className='sitio_web'>Sitio Web Oficial</span>
    </div>
    <div className="contenedor_general">
      {/* Columna izquierda → contenedor de botones */}
      <BarraOpcionesJugador onSelect={setOpcion}/>  

      {/* Render del contenido */}
      {loading ? (
              <div className="contenedor_loading_jugador">
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