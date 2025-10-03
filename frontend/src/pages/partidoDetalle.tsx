import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Partido } from "../services/service_utils";
import { getPartido } from "../services/partidosService";

import CircularProgress from '@mui/material/CircularProgress';
import '../styles/App.css';
import { BarraOpcionesPartido } from "../components/barraOpcionesPartido";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { DetallesPartido } from "../components/detallesPartido";

export const PartidoDetalle: React.FC = () => {
  const { nro } = useParams<{ nro: string }>();
  const [partido, setPartido] = useState<Partido | null>(null);
  const [loading, setLoading] = useState(true);
  const [opcion, setOpcion] = useState("plantilla");

  useEffect(() => {
    const fetchPartido = async () => {
      console.log(nro);
      const data = await getPartido(nro!);
      setPartido(data);
      setLoading(false);
    };
    fetchPartido();
  }, [nro]);

  const renderContenido = () => {
        if (!partido) return <p>No se encontró el jugador</p>;
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
        <BarraOpcionesPartido />  
  
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
