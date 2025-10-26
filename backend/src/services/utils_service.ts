import mongoose from "mongoose";
import { GolFavor, IPartido } from "../models/partido";

export interface HitoPartido {
  nro: number;
  rival: string;
  competicion: string;
  tipo_partido: string;
  golesBrumario: string;
  golesRecibidos: string;
  fecha: Date;
}


export function crearHitoBase() {
  return {
    nro: 0,
    rival: "",
    competicion: "",
    tipo_partido: "",
    golesBrumario: "",
    golesRecibidos: "",
    fecha: new Date(),
  };
}

export interface HitoRacha {
  inicio: HitoPartido;
  fin: HitoPartido;
  duracionPartidos: number;
}

export function crearHitoRachaBase() {
  return {
    inicio: crearHitoBase(),
    fin: crearHitoBase(),
    duracionPartidos: 0,
  }
}

export function crearGolFavorBase() {
  return {
  gol: "",
  tipo: "",
  resultadoParcial: "",
  asistencia: "",
  tipoAsistencia: "",
  }
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
  let ultimoGolInfo: GolFavor = crearGolFavorBase()

  for (const goles of partido.golesFavor) {
    if (goles.gol === nombreJugador) {
      golesPartidoActual += 1;
      estadisticas.goles += 1;
      ultimoGolInfo = goles
    }
    if (goles.asistencia === nombreJugador) {
      asistenciasPartidoActual += 1;
      estadisticas.asistencias += 1;
    }
  }

  return { golesPartidoActual, asistenciasPartidoActual, ultimoGolInfo };
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

export function crearPartidoBase(): IPartido {
  return {
    _id: new mongoose.Types.ObjectId(), // si lo necesitás porque hereda de Document
    nro: "",
    categoria: "",
    tipo_partido: "",
    competicion: "",
    jornada: "",
    cancha: "",
    predio: "",
    ubicacion: "",
    rival: "",
    goles_favor: "0",
    goles_contra: "0",
    titulares: [],
    suplentes: [],
    golesFavor: [],
    golesEnContra: [],
    amarillas: [],
    rojas: [],
    presencia_sin_jugar: [],
    director_tecnico: "",
    fecha: new Date(0),     // fecha "vacía" (Epoch)
    createdAt: new Date(0), // idem
  } as unknown as IPartido;
}

// Función modularizada para actualizar la racha invicta
export function actualizarRachaInvicta(
  rachaInvictaActual: HitoRacha,
  rachaInvictaDirigido: HitoRacha,
  partido: IPartido
): { rachaActual: HitoRacha; rachaMaxima: HitoRacha } {
  if (partido.resultado == 'Ganado' || partido.resultado == 'Empatado') {
      if(rachaInvictaActual.duracionPartidos == 0) {
        rachaInvictaActual = {inicio: {nro: 0, rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              fin: {nro: 0, rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              duracionPartidos: 0}
      }
      rachaInvictaActual.duracionPartidos += 1;
      rachaInvictaActual.fin = {nro: 0, rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
        rachaInvictaDirigido = {
          inicio: { ...rachaInvictaActual.inicio },
          fin: { ...rachaInvictaActual.fin },
          duracionPartidos: rachaInvictaActual.duracionPartidos,
        };
      }
    }
    else {
      rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido}
  }

export function actualizarRachaGanados(
  rachaInvictaActual: HitoRacha,
  rachaInvictaDirigido: HitoRacha,
  partido: IPartido
): { rachaActual: HitoRacha; rachaMaxima: HitoRacha } {
  if (partido.resultado == 'Ganado') {
      if(rachaInvictaActual.duracionPartidos == 0) {
        rachaInvictaActual = {inicio: {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              fin: {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              duracionPartidos: 0}
      }
      rachaInvictaActual.duracionPartidos += 1;
      rachaInvictaActual.fin = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
        rachaInvictaDirigido = {
          inicio: { ...rachaInvictaActual.inicio },
          fin: { ...rachaInvictaActual.fin },
          duracionPartidos: rachaInvictaActual.duracionPartidos,
        };
      }
    }
    else {
      rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido}
  }

  export function actualizarRachaSinGanar(
  rachaInvictaActual: HitoRacha,
  rachaInvictaDirigido: HitoRacha,
  partido: IPartido
): { rachaActual: HitoRacha; rachaMaxima: HitoRacha } {
  if (partido.resultado == 'Empatado' || partido.resultado == 'Perdido') {
      if(rachaInvictaActual.duracionPartidos == 0) {
        rachaInvictaActual = {inicio: {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              fin: {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              duracionPartidos: 0}
      }
      rachaInvictaActual.duracionPartidos += 1;
      rachaInvictaActual.fin = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
        rachaInvictaDirigido = {
          inicio: { ...rachaInvictaActual.inicio },
          fin: { ...rachaInvictaActual.fin },
          duracionPartidos: rachaInvictaActual.duracionPartidos,
        };
      }
    }
    else {
      rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido}
  }

    export function actualizarRachaPerdidos(
  rachaInvictaActual: HitoRacha,
  rachaInvictaDirigido: HitoRacha,
  partido: IPartido
): { rachaActual: HitoRacha; rachaMaxima: HitoRacha } {
  if (partido.resultado == 'Perdido') {
      if(rachaInvictaActual.duracionPartidos == 0) {
        rachaInvictaActual = {inicio: {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              fin: {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha}, 
                              duracionPartidos: 0}
      }
      rachaInvictaActual.duracionPartidos += 1;
      rachaInvictaActual.fin = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
        rachaInvictaDirigido = {
          inicio: { ...rachaInvictaActual.inicio },
          fin: { ...rachaInvictaActual.fin },
          duracionPartidos: rachaInvictaActual.duracionPartidos,
        };
      }
    }
    else {
      rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido}
  }