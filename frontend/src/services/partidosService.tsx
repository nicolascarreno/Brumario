import { Partido } from "./service_utils";

export async function getPartidos(): Promise<Partido[]> {
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