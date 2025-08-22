import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Jugador {
  nombre: string;
  edad: number;
  posicion: string;
  equipo: string;
  // lo que quieras
}

export const DetallesJugador: React.FC = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const [jugador, setJugador] = useState<Jugador | null>(null);
  const [loading, setLoading] = useState(true);

  {/*useEffect(() => {
    const fetchJugador = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/jugadores/${nombre}`);
        const data = await res.json();
        setJugador(data);
      } catch (err) {
        console.error("Error cargando jugador", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJugador();
  }, [nombre]);

  if (loading) return <p>Cargando...</p>;
  if (!jugador) return <p>No se encontró el jugador</p>;*/}

  return (
    <div style={{ padding: 20 }}>
      <h2>{nombre}</h2>
    </div>
  );
};
