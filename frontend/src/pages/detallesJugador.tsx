import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/App.css';
import { BarraOpcionesJugador } from "../components/barraOpcionesJugador";
import { DetallesGeneralJugador } from "../components/detallesGeneralJugador";
import { DetallesTecnico } from "../components/detallesDirectorTecnico";
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar } from "../services/jugadoresService";

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
}

export const DetallesJugador: React.FC = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const [jugador, setJugador] = useState<Jugador | null>(null);
  const [loading, setLoading] = useState(true);
  const [opcion, setOpcion] = useState("plantilla");

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        console.log()
        const res = await fetch(`http://localhost:4000/jugadores/${nombre}`);
        const data = await res.json();
        console.log(data)
        setJugador(data.jugador);
      } catch (err) {
        console.error("Error cargando jugador", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJugador();
  }, [nombre]);

  if (loading) return <p>Cargando...</p>;
  if (!jugador) return <p>No se encontró el jugador</p>;

  const renderContenido = () => {
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
      <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
        {/* Columna izquierda → contenedor de botones */}
        <BarraOpcionesJugador onSelect={setOpcion}/>  
        {renderContenido()}
      </div>
    </div>

  );
};
