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

export const getPartidoDetalles = async (nro: string) => {
  try {
    console.log(nro)
    const partido = await Partido.findOne(
      { nro },
      { _id: 0 },
    );

    if (!partido) {
      throw new Error(`No se encontró el jugador con nombre: ${nro}`);
    }
    return partido;
  } catch (error) {
    throw new Error("Error al obtener el partido: " + error);
  }
};