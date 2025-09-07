import Partido from "../models/partido";
import { IPartido } from "../models/partido";
import Jugador from "../models/persona"; // tu modelo de Mongoose
import { crearHitoBase, HitoPartido } from "./utils_service";

export const getJugadores = async () => {
  try {
    const jugadores = await Jugador.find({}, { _id: 0 });
    console.log(jugadores)
    return jugadores;
  } catch (error) {
    throw new Error("Error al obtener jugadores: " + error);
  }
};

export const getJugadoresDetalles = async (nombre: string) => {
  try {
    const jugador = await Jugador.findOne(
      { nombre },
      { _id: 0 },
    );

    if (!jugador) {
      throw new Error(`No se encontró el jugador con nombre: ${nombre}`);
    }

    const jugadores = await Jugador.find({}, { _id: 0, nombre: 1 });0
    const partidosDirigidos = await Partido.find(
      { director_tecnico: nombre },     // 🔎 filtro → trae solo los que tienen ese técnico
      { _id: 0, titulares: 1 }          // 🎯 proyección → campos que querés devolver
    );
    const partidosJugados = await Partido.find(
      { 
        $or: [
          { titulares: nombre },  // aparece en titulares
          { suplentes: nombre }   // aparece en suplentes
        ]
      },
      { _id: 0 } // 🎯 proyección, devolvés todos los campos o los que quieras
    );

    const jugadoresPreferidos = calcularTopJugadores(jugadores.map(j => j.toObject()), partidosDirigidos);    
    return {
      ...jugador.toObject(),
      director_tecnico: {
        ...JSON.parse(JSON.stringify(jugador.director_tecnico)),
        jugadoresPreferidos,
      },
      hitos: hitos(nombre, partidosJugados),
    };
  } catch (error) {
    throw new Error("Error al obtener jugador: " + error);
  }
};

const calcularTopJugadores = (
  jugadores: { nombre: string }[],
  partidos: { titulares: string[] }[]
) => {
  const jugadoresConPartidos = jugadores.map(j => ({
    ...j,
    partidos: 0,
  }));

  for (const partido of partidos) {
    for (const jugador of jugadoresConPartidos) {
      if (partido.titulares.includes(jugador.nombre)) {
        jugador.partidos += 1;
      }
    }
  }
  return jugadoresConPartidos
    .sort((a, b) => b.partidos - a.partidos)
    .slice(0, 8)
    .map(({ nombre }) => ({ nombre }));
};

function hitos (nombreJugador: string, partidos: IPartido[]) {
  let masGoles = 0;
  let masGolesPartido: HitoPartido = crearHitoBase();
  let masAsistencias = 0;
  let masAsistenciasPartido: HitoPartido = crearHitoBase();
  for (const partido of partidos) {
    let golesPartidoActual = 0;
    let asistenciasPartidoActual = 0;
    //Mas Goles
    for (const goles of partido.golesFavor) {
      if (goles.gol == nombreJugador) {
        golesPartidoActual += 1;
      }
      if (goles.asistencia == nombreJugador) {
        asistenciasPartidoActual += 1;        
      }
    }

    if (golesPartidoActual > masGoles) {
      masGoles = golesPartidoActual;
      masGolesPartido = {rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (asistenciasPartidoActual > masAsistencias) {
      masAsistencias = asistenciasPartidoActual;
      masAsistenciasPartido = {rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
  }
  return {
    masGoles: { cantidad: masGoles, partido: masGolesPartido },
    masAsistencias: { cantidad: masAsistencias, partido: masAsistenciasPartido }
  };  
}