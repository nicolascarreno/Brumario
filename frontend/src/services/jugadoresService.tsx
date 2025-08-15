export interface Jugador {
  nombre: string;
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
  return data.jugadores;
}