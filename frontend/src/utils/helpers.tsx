import { Jugador } from "../services/service_utils";
import { EstadisticaJugador } from "../interfaces/jugadorInterface"

// Extrae solo las claves de T cuyo valor es number
type ClavesNumericas<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

// Se le pasa por parametro una lista de Jugador el nombre del atributo y devuelve
// una lista de EstadisticaJugador 
export const obtenerEstadistica = (
  jugadores: Jugador[],
  atributo: ClavesNumericas<Jugador>
): EstadisticaJugador[] =>
  jugadores.map((j) => ({
    nombre: j.nombre,
    estadistica: j[atributo],
  }));