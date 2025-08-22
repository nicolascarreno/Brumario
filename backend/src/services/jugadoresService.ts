import Jugador from "../models/persona"; // tu modelo de Mongoose

export const getJugadores = async () => {
  try {
    //const jugadores = await Jugador.find(); // devuelve todos los jugadores
    const jugadores = await Jugador.find({}, { _id: 0, nombre: 1, partidos: 1, goles: 1, asistencias: 1, amarillas: 1, rojas: 1, presencias_sin_jugar: 1 });
    console.log(jugadores)
    return jugadores;
  } catch (error) {
    throw new Error("Error al obtener jugadores: " + error);
  }
};