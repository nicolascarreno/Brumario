import { HitosPartidos, Partido } from "./service_utils";

interface Partidos{
  partidos: Partido[],
  hitos: HitosPartidos
}

export async function getPartidos(): Promise<Partidos> {
  const API_URL = process.env.REACT_APP_API_URL;
  const response = await fetch(`${API_URL}/partidos`, {
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
  return data.partidos
}

export async function getPartido(nro: string): Promise<Partido | null> {
  const API_URL = process.env.REACT_APP_API_URL;
  console.log(nro)
  try {
    const res = await fetch(`${API_URL}/partidos/${nro}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Error al traer jugador");
    }
    const data = await res.json();
    console.log(data);
    return data.partido as Partido;
  } catch (err) {
    console.error("Error cargando jugador:", err);
    return null;
  }
}