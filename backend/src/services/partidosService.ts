import { redis, guardarEnCache } from "../config/redis"
import { getPartidosRepo, getPartidosLibresRepo, getPartidosSeniorRepo, getPartidoPorNroRepo } from "../repositories/partidosRepo"
import { hitos } from "./utils/utils_hitos_partidos"


export const getPartidos = async () => {
  console.log("========== getPartidos ==========");
  try {

    const key = 'partidos';
    const cached = await redis.get<string>(key);
    if (cached) {
      console.log("Partidos obtenidos de la cache");
      return cached;
    }

    const partidos = await getPartidosRepo()
    const partidosLibres = await getPartidosLibresRepo()    
    const partidosSenior = await getPartidosSeniorRepo()

    const hitosPartidos = hitos(partidosLibres, partidosSenior);

    await guardarEnCache(key, { partidos, hitos: hitosPartidos})

    return {
      partidos,
      hitos: hitosPartidos
    }
  } catch (error) {
    throw new Error("Error al obtener jugadores: " + error);
  }
};

export const getPartidoDetalles = async (nro: string) => {
  try {
    console.log(nro)
    const partido = await getPartidoPorNroRepo(nro)

    if (!partido) {
      throw new Error(`No se encontró el jugador con nombre: ${nro}`);
    }

    return partido;
  } catch (error) {
    throw new Error("Error al obtener el partido: " + error);
  }
};