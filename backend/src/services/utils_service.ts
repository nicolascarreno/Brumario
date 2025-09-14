import { IPartido } from "../models/partido";

export interface HitoPartido {
  rival: string;
  competicion: string;
  tipo_partido: string;
  golesBrumario: string;
  golesRecibidos: string;
  fecha: Date;
}


export function crearHitoBase() {
  return {
    rival: "",
    competicion: "",
    tipo_partido: "",
    golesBrumario: "",
    golesRecibidos: "",
    fecha: new Date(),
  };
}

export interface Anio {
  anio: number;
  goles: number;
  asistencias:number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
  presencias: number;
}

export function crearAnioBase(anio: number) {
  return {
    anio: anio,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    presencias_sin_jugar: 0,
    presencias: 0,
  }
}

export function parseGoles(goles: string | number): number {
  if (typeof goles === "number") return goles; // ya es número
  if (!goles) return 0; // por si viene vacío

  // separar en espacio → ej. "0 (5)" → ["0", "(5)"]
  const partes = goles.split(" ");
  return Number(partes[0]); // te quedás con la primera parte
}

export function procesarPresencias(
  nombreJugador: string,
  partido: IPartido,
  estadisticas: Anio
) {
  for (const presencia of [...partido.titulares, ...partido.suplentes]) {
    if (presencia === nombreJugador) {
      estadisticas.presencias += 1;
    }
  }
}

export function procesarGolesYAsistencias(
  nombreJugador: string,
  partido: IPartido,
  estadisticas: Anio
) {
  let golesPartidoActual = 0;
  let asistenciasPartidoActual = 0;

  for (const goles of partido.golesFavor) {
    if (goles.gol === nombreJugador) {
      golesPartidoActual += 1;
      estadisticas.goles += 1;
    }
    if (goles.asistencia === nombreJugador) {
      asistenciasPartidoActual += 1;
      estadisticas.asistencias += 1;
    }
  }

  return { golesPartidoActual, asistenciasPartidoActual };
}

export function procesarTarjetas(
  nombreJugador: string,
  partido: IPartido,
  estadisticas: Anio
) {
  for (const amarilla of partido.amarillas) {
    if (amarilla === nombreJugador) {
      estadisticas.amarillas += 1;
    }
  }

  for (const roja of partido.rojas) {
    if (roja === nombreJugador) {
      estadisticas.rojas += 1;
    }
  }
}

export function procesarPresenciasSinJugar(
  nombreJugador: string,
  partido: IPartido,
  estadisticas: Anio
) {
  for (const presencia of partido.presencia_sin_jugar) {
    if (presencia === nombreJugador) {
      estadisticas.presencias_sin_jugar += 1;
    }
  }
}

export function encontrarMaximoPorAnio(
  anios: Anio[],
  campo: keyof Anio
): { anio: number; cantidad: number } {
  let maxCantidad = 0;
  let anioMax = 0;

  for (const anio of anios) {
    if (anio[campo] > maxCantidad) {
      maxCantidad = anio[campo];
      anioMax = anio.anio;
    }
  }

  return { anio: anioMax, cantidad: maxCantidad };
}