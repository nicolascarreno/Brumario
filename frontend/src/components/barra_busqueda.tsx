import React from "react";
import { Jugador } from "../services/service_utils";
import "../styles/barra_busqueda.css"

interface BarraBusquedaProps {
  jugadores: Jugador[];
  onSelect: (jugador: Jugador) => void;
}

export function BarraBusqueda({ jugadores, onSelect }: BarraBusquedaProps) {
  const [query, setQuery] = React.useState("");

  const jugadoresFiltrados =
  query.trim() === ""
    ? []
    : jugadores
        .filter((j) =>
          j.nombre.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6);

  return (
    <div className="contenedor_busqueda">
    <input
      type="text"
      placeholder="Buscar jugador..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="buscar"
    />

      {query.trim() !== "" && (
        <div className="contenedor_jugadores" >
        <div style={{
            position: 'absolute',
            width: 300,
            height: 300,
            backgroundImage: `url(${process.env.PUBLIC_URL}/brumario_escudo_sin_fondo.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.075,
            pointerEvents: 'none',
        }} />
          {jugadoresFiltrados.map((j) => (
            <div
              key={j.nombre}
              onClick={() => onSelect(j)}
              className="nombre_jugador"
            >
              {j.nombre}
            </div>
          ))}

          {jugadoresFiltrados.length === 0 && (
            <p className="nombre_jugador">
              No se encontraron jugadores
            </p>
          )}
        </div>
      )}
    </div>
  );
}