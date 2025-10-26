import { Jugador } from "./service_utils";

export async function getJugadores(): Promise<Jugador[]> {
  const API_URL = process.env.REACT_APP_API_URL || window.location.origin;
  const response = await fetch(`${API_URL}/api/jugadores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los jugadores");
  }

  const data = await response.json();
  console.log(data)
  return data.jugadores;
}

export async function getJugador(nombre: string): Promise<Jugador | null> {
  const API_URL = process.env.REACT_APP_API_URL || window.location.origin;
  try {
    const res = await fetch(`${API_URL}/api/jugadores/${nombre}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Error al traer jugador");
    }
    const data = await res.json();
    console.log(data);
    return data.jugador as Jugador;
  } catch (err) {
    console.error("Error cargando jugador:", err);
    return null;
  }
}