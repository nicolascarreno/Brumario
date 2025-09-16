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

export interface EsquemaInfo {
  partidos: number;
  puntos: number;
}

export interface DirectorTecnico {
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;
  esquemas: Record<string, EsquemaInfo>;
  jugadoresPreferidos: { nombre: string }[];
}

export interface HitosPartido {
  rival: string;
  competicion: string;
  tipo_partido: string;
  golesBrumario: string;
  golesRecibidos: string;
  fecha: Date;
}

export interface HitoRacha {
  inicio: HitosPartido;
  fin: HitosPartido;
  duracionPartidos: number;
}

export interface Hitos {
  masGoles: {cantidad: number, partido: HitosPartido};
  masAsistencias: {cantidad: number, partido: HitosPartido};
  masGolesAnio: {cantidad: number, anio: number},
  masAsistenciasAnio: {cantidad: number, anio: number},
  masAmarillasAnio: {cantidad: number, anio: number},
  masRojasAnio: {cantidad: number, anio: number},
  masPresenciasSinJugarAnio: {cantidad: number, anio: number},
  masPresenciasAnio: {cantidad: number, anio: number},
  tecnicoMayorVictoria: {partido: HitosPartido},
  tecnicoMayorDerrota: {partido: HitosPartido},
  tecnicoMasGoles: {partido: HitosPartido},
  tecnicoRachaInvicta: {racha: HitoRacha}
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
  hitos: Hitos;
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

export async function getJugador(nombre: string): Promise<Jugador | null> {
  try {
    const res = await fetch(`http://localhost:4000/jugadores/${nombre}`, { cache: "no-store" });
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