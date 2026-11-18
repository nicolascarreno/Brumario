import { EstadisticaDetalladaPorAnio, Jugador } from "../services/service_utils";
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

type TipoPartido = "total" | "oficial" | "amistoso";

export function valorPorAnioYTipo(
  total: number,
  estadistica: EstadisticaDetalladaPorAnio | undefined,
  anio: number | null,
  tipo: TipoPartido
): number {
  if (!estadistica) return total;

  if (!anio && tipo === "total") {
    return total;
  }

  const key = `${tipo}_por_anio` as const;
  const mapa = estadistica[key];

  if (!anio) {
    // todos los años pero filtrado por tipo
    return Object.values(mapa).reduce((acc, v) => acc + v, 0);
  }

  return mapa[anio] ?? 0;
}