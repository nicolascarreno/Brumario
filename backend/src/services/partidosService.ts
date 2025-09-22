import Partido from "../models/partido";

export const getPartidos = async () => {
  try {
    const partidos = await Partido.find({}, { _id: 0, createdAt: 0 });
    console.log(partidos)
    return partidos;
  } catch (error) {
    throw new Error("Error al obtener jugadores: " + error);
  }
};