import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/inicio.css';
import '../styles/jugadores.css';
import '../styles/jugadores_barra_opciones.css';
import { getPartidos } from "../services/partidosService";
import { HitosPartidos, Partido } from "../services/service_utils";
import { PartidosTodos } from '../components/partidosTodos';
import { BarraOpcionesPartidos } from "../components/barraOpcionesPartidos";
import CircularProgress from '@mui/material/CircularProgress';
import { PartidosHitos } from '../components/partidosHitos';

export function Partidos() {
  const navigate = useNavigate();
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [hitos, setHitos] = useState<HitosPartidos>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagina, setPagina] = useState<number>(1);
  const [opcion, setOpcion] = useState("plantilla");
  const jugadoresPorPagina = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPartidos();
        setPartidos(data.partidos);
        setHitos(data.hitos);
        console.log(data)
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
      case "general":
        return (
          <PartidosTodos
            partidos={partidos}
            loading={loading}
          />
        );
      case "hitos":
        return (
          <PartidosHitos
            hitos={hitos}
            loading={loading}
          />
        );
      default:
        return (
          <PartidosTodos
            partidos={partidos}
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
          height={90}
          width={380}
          style={{ marginLeft: '18px', paddingTop: 20, paddingBottom: 20 }}
        />
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>

      <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
        {/* Columna izquierda → contenedor de botones */}
        <BarraOpcionesPartidos onSelect={setOpcion} />  
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
}
