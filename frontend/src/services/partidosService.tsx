export async function getPartidos(): Promise<Partido[]> {
  const response = await fetch(`http://localhost:4000/partidos`, {
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

export interface Partido {
    nro: string;
    categoria: string;
    tipo_partido: string;
    competicion: string;
    jornada: string;
    cancha: string;
    predio: string;
    ubicacion: string;
    rival: string;
    goles_favor: string;
    goles_contra: string;
    titulares: string[];
    suplentes: string[];
    golesFavor: GolFavor[];
    golesEnContra: GolEnContra[];
    amarillas: string[];
    rojas: string[];
    presencia_sin_jugar: string[];
    director_tecnico: string;
    fecha: Date;
    resultado: string;
}

export interface GolFavor {
  gol: string;
  tipo: string;
  resultadoParcial: string;
  asistencia: string;
  tipoAsistencia: string;
}

export interface GolEnContra {
  gol: string;
  tipo: string;
}
