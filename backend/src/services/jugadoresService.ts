import Partido, { GolFavor } from "../models/partido";
import { IPartido } from "../models/partido";
import { actualizarRachaGanados, actualizarRachaGolesRecibidos, actualizarRachaInvicta, actualizarRachaPerdidos, actualizarRachaSinGanar, actualizarRachaVallaInvicta, Anio, crearAnioBase, crearGolFavorBase, crearHitoBase, crearHitoRachaBase, encontrarMaximoPorAnio, encontrarMinimoPorAnio, HitoPartido, HitoRacha, parseGoles, procesarArquero, procesarGolesYAsistencias, procesarPresencias, procesarPresenciasSinJugar, procesarTarjetas } from "./utils/utils_service";
import { guardarEnCache, obtenerDeCache } from "../config/redis"
import { getJugadoresRepo, getJugadorRepo, getJugadoresNombresRepo } from "../repositories/jugadoresRepo";
import { getPartidosDirigidosRepo, getPresenciasTotalesRepo, getPartidoPorFechaRepo } from "../repositories/partidosRepo";
import { hitos } from "./utils/utils_hitos_jugador"


export const getJugadores = async () => {
  try {
    const key = 'jugadores'
    const cached = await obtenerDeCache(key);
    if (cached) {
      console.log("Jugadores obtenidos del cache");
      return cached;
    }
    
    const jugadores = await getJugadoresRepo();
    await guardarEnCache(key, jugadores);

    return jugadores;
  } catch (error) {
    throw new Error("Error al obtener jugadores: " + error);
  }
};

export const getJugadoresDetalles = async (nombre: string) => {
  try {
    const key = 'jugador:' + nombre;
    const cached = await obtenerDeCache(key);
    if (cached) {
      console.log("Jugador obtenido del cache");
      return cached;
    }

    const jugador = await getJugadorRepo(nombre);
    if (!jugador) {
      throw new Error(`No se encontró el jugador con nombre: ${nombre}`);
    }

    const jugadores = await getJugadoresNombresRepo();
    const partidosDirigidos = await getPartidosDirigidosRepo(nombre);
    const partidosJugados = await getPresenciasTotalesRepo(nombre);
    const debut = await getPartidoPorFechaRepo(jugador.debut);
    const debut_oficial = await getPartidoPorFechaRepo(jugador.debut_oficial)

    const jugadoresPreferidos = calcularTopJugadores(jugadores, partidosDirigidos);   
    const hitosJugador = hitos(nombre, partidosJugados, partidosDirigidos, debut, debut_oficial);
    const estadisticasDirectorTecnico = {
      ...JSON.parse(JSON.stringify(jugador.director_tecnico)),
      jugadoresPreferidos,
    }

    await guardarEnCache(key, { ...jugador, director_tecnico: estadisticasDirectorTecnico, hitos: hitosJugador })
    
    return {
      ...jugador,
      director_tecnico: estadisticasDirectorTecnico,
      hitos: hitosJugador,
    };
  } catch (error) {
    throw new Error("Error al obtener jugador: " + error);
  }
};

const calcularTopJugadores = (
  jugadores: { nombre: string }[],
  partidos: IPartido[],
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