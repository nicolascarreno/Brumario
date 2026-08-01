import { HitosPartidos, Partido } from "./service_utils";
import { log } from '../logger/logger';

interface Partidos{
  partidos: Partido[],
  hitos: HitosPartidos
}

export async function getPartidos(): Promise<Partidos> {
  const API_URL = process.env.REACT_APP_API_URL || window.location.origin;
  const response = await fetch(`${API_URL}/api/partidos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los jugadores");
  }

  const data = await response.json();
  log(data);
  return data.partidos
}

export async function getPartido(nro: string): Promise<Partido | null> {
  const API_URL = process.env.REACT_APP_API_URL || window.location.origin;
  try {
    const res = await fetch(`${API_URL}/api/partidos/${nro}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Error al traer jugador");
    }
    const data = await res.json();
    return data.partido as Partido;
  } catch (err) {
    console.error("Error cargando jugador:", err);
    return null;
  }
}