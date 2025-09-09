import Partido from "../models/partido";
import { IPartido } from "../models/partido";
import Jugador from "../models/persona"; // tu modelo de Mongoose
import { Anio, crearAnioBase, crearHitoBase, HitoPartido } from "./utils_service";

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
          { suplentes: nombre },
          { presencia_sin_jugar: nombre }   // aparece en suplentes
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
  let anios: Anio[] = [];
  for (const partido of partidos) {
    let golesPartidoActual = 0;
    let asistenciasPartidoActual = 0;
    const anio = partido.fecha.getFullYear()
    if (!anios.some(a => a.anio === anio)) {
      anios.push(crearAnioBase(anio))
    }
    const estadisticas_anio = anios.find(a => a.anio === anio);

    console.log([...partido.titulares, ...partido.suplentes])
    for (const presencia of [...partido.titulares, ...partido.suplentes]) {
      if (presencia == nombreJugador){
        estadisticas_anio!.presencias += 1;  
      }
    }
    
    //Mas Goles
    for (const goles of partido.golesFavor) {
      if (goles.gol == nombreJugador) {
        golesPartidoActual += 1;
        estadisticas_anio!.goles += 1;
      }
      if (goles.asistencia == nombreJugador) {
        asistenciasPartidoActual += 1;  
        estadisticas_anio!.asistencias += 1;      
      }
    }
    for (const amarilla of partido.amarillas) {
      if (amarilla == nombreJugador) {
        estadisticas_anio!.amarillas += 1;
      }
    }
    for (const roja of partido.rojas) {
      if (roja == nombreJugador) {
        estadisticas_anio!.rojas += 1;
      }
    }
    
    for (const presencia_sin_jugar of partido.presencia_sin_jugar) {
      console.log(partido.presencia_sin_jugar)
      if (presencia_sin_jugar == nombreJugador) {
        estadisticas_anio!.presencias_sin_jugar += 1;
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
  console.log(anios)
  let anio_goles = 0;
  let anio_asistencias = 0;
  let anio_amarillas = 0;
  let anio_rojas = 0;
  let anio_presencias_sin_jugar = 0;
  let anio_presencias = 0;
  let mas_goles_anio = 0;
  let mas_asistencias_anio = 0;
  let mas_amarillas_anio = 0;
  let mas_rojas_anio = 0;
  let mas_presencias_sin_jugar_anio= 0;
  let mas_presencias_anio = 0;
  for (const anio of anios) {
    if (anio.goles > mas_goles_anio) {
      mas_goles_anio = anio.goles;
      anio_goles = anio.anio;
    }
    if (anio.asistencias > mas_asistencias_anio) {
      mas_asistencias_anio = anio.asistencias;
      anio_asistencias = anio.anio;
    }
    if (anio.amarillas > mas_amarillas_anio) {
      mas_amarillas_anio = anio.amarillas;
      anio_amarillas = anio.anio;
    }
    if (anio.rojas > mas_rojas_anio) {
      mas_rojas_anio = anio.rojas;
      anio_rojas = anio.anio;
    }
    if (anio.presencias_sin_jugar > mas_presencias_sin_jugar_anio) {
      mas_presencias_sin_jugar_anio = anio.presencias_sin_jugar;
      anio_presencias_sin_jugar = anio.anio;
    }
    if (anio.presencias > mas_presencias_anio) {
      mas_presencias_anio = anio.presencias;
      anio_presencias = anio.anio;
    }
  }
  return {
    masGoles: { cantidad: masGoles, partido: masGolesPartido },
    masAsistencias: { cantidad: masAsistencias, partido: masAsistenciasPartido },
    masGolesAnio: { anio: anio_goles, cantidad: mas_goles_anio },
    masAsistenciasAnio: { anio: anio_asistencias, cantidad: mas_asistencias_anio },
    masAmarillasAnio: { anio: anio_amarillas, cantidad: mas_amarillas_anio },
    masRojasAnio: { anio: anio_rojas, cantidad: mas_rojas_anio },
    masPresenciasSinJugarAnio: { anio: anio_presencias_sin_jugar, cantidad: mas_presencias_sin_jugar_anio },
    masPresenciasAnio: { anio: anio_presencias, cantidad: mas_presencias_anio },
  };  
}