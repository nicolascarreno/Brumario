export interface TiposGol {
  cabeza: number;
  pie_jugada: number;
  penal: number;
  tiro_libre: number;
  otros: number;
}

export interface TiposAsistencia {
  cabeza: number;
  pie_jugada: number;
  corner: number;
  tiro_libre: number;
  otros: number;
}

export interface TiposPresenciasSinJugar {
  ganados: number;
  empatados: number;
  perdidos: number;
}

export interface DirectorTecnico {
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;
}

export interface Jugador {
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