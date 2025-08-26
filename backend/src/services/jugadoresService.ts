import Jugador from "../models/persona"; // tu modelo de Mongoose

export const getJugadores = async () => {
  try {
    //const jugadores = await Jugador.find(); // devuelve todos los jugadores
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

    return jugador;
  } catch (error) {
    throw new Error("Error al obtener jugador: " + error);
  }
};