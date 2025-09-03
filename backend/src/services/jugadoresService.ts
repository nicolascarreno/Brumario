import Partido from "../models/partido";
import Jugador from "../models/persona"; // tu modelo de Mongoose

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
    const partidos = await Partido.find(
      { director_tecnico: nombre },     // 🔎 filtro → trae solo los que tienen ese técnico
      { _id: 0, titulares: 1 }          // 🎯 proyección → campos que querés devolver
    );

    const jugadoresPreferidos = calcularTopJugadores(jugadores.map(j => j.toObject()), partidos);

    
    return {
      ...jugador.toObject(),
      director_tecnico: {
        ...JSON.parse(JSON.stringify(jugador.director_tecnico)),
        jugadoresPreferidos,
      },
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