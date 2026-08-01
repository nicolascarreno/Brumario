import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Partido } from "../services/service_utils";
import { getPartido } from "../services/partidosService";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/App.css';
import '../styles/inicio.css';
import { BarraOpcionesPartido } from "../components/barraOpcionesPartido";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { DetallesPartido } from "../components/detallesPartido";
import { log } from '../logger/logger';

export const PartidoDetalle: React.FC = () => {
  const navigate = useNavigate();
  const { nro } = useParams<{ nro: string }>();
  const [partido, setPartido] = useState<Partido | null>(null);
  const [loading, setLoading] = useState(true);
  const [opcion, setOpcion] = useState("plantilla");

  useEffect(() => {
    const fetchPartido = async () => {
      log(nro);
      const data = await getPartido(nro!);
      setPartido(data);
      setLoading(false);
    };
    fetchPartido();
  }, [nro]);

  const renderContenido = () => {
        if (!partido) return <div className="contenedor_error"><span className="nombre_estadistica">¡Ups! No se encontró el partido buscado</span></div>;
        switch (opcion) {
          case "general":
            return (
              <DetallesPartido
                partido={partido}
                loading={loading}
              />
            );
          default:
            return (
              <DetallesPartido
                partido={partido}
                loading={loading}
              />
            );
        }
      };

    return (
    <div>
      <div className="encabezado">
        <img src={'/brumario.png'} alt="brumario" className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}/>
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>
      <div className="contenedor_general_partido">
        {/* Columna izquierda → contenedor de botones */}
        <BarraOpcionesPartido />  
  
        {/* Render del contenido */}
        {loading ? (
                <div className="contenedor_loading_partido">
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
