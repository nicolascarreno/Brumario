export interface Jugador {
  nombre: string;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
  titular: number;
  suplente: number;
}

export async function getJugadores(): Promise<Jugador[]> {
  const response = await fetch(`http://localhost:4000/jugadores`, {
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