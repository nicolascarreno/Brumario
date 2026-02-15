import mongoose, { Schema, Document } from "mongoose";

export interface TiposGol {
  cabeza: number;
  pie_jugada: number;
  penal: number;
  tiro_libre: number;
  otros: number;
}

const tiposGolSchema = new Schema({
  cabeza: Number,
  pie_jugada: Number,
  penal: Number,
  tiro_libre: Number,
  otros: Number,
}, { _id: false });

export interface TiposAsistencia {
  cabeza: number;
  pie_jugada: number;
  corner: number;
  tiro_libre: number;
  otros: number;
}

const tiposAsistenciaSchema = new Schema({
  cabeza: Number,
  pie_jugada: Number,
  corner: Number,
  tiro_libre: Number,
  otros: Number,
}, { _id: false });

export interface TiposPresenciasSinJugar {
  ganados: number;
  empatados: number;
  perdidos: number;
}

const tiposPresenciaSinJugarSchema = new Schema({
  ganados: Number,
  empatados: Number,
  perdidos: Number,
}, { _id: false });

export interface EsquemaInfo {
  partidos: number;
  puntos: number;
}

export interface DirectorTecnico {
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;
  esquemas: Record<string, EsquemaInfo>;
}

const EsquemaInfoSchema = new Schema({
  partidos: { type: Number, default: 0 },
  puntos: { type: Number, default: 0 },
}, { _id: false });

const DirectorTecnicoSchema = new Schema({
  ganados: Number,
  empatados: Number,
  perdidos: Number,
  goles_favor: Number,
  goles_contra: Number,
  esquemas: {
    type: Map,
    of: EsquemaInfoSchema, // 👈 cada formación tendrá { partidos, puntos }
    default: {},
  },
}, { _id: false });

type EstadisticaPorAnio = Record<string, number>;

type EstadisticaDetalladaPorAnio = {
  total_por_anio: Record<string, number>;
  oficial_por_anio: Record<string, number>;
  amistoso_por_anio: Record<string, number>;
};

export const EstadisticaDetalladaPorAnioSchema = new Schema(
  {
    total_por_anio: { type: Map, of: Number, default: {} },
    oficial_por_anio: { type: Map, of: Number, default: {} },
    amistoso_por_anio: { type: Map, of: Number, default: {} }
  },
  { _id: false }
);

/*
interface IEstadisticasPorAnio {
  titular_por_anio: EstadisticaPorAnio;
  suplente_por_anio: EstadisticaPorAnio;

  goles_por_anio: EstadisticaPorAnio;
  goles_cabeza_por_anio: EstadisticaPorAnio;
  goles_pie_por_anio: EstadisticaPorAnio;
  goles_penal_por_anio: EstadisticaPorAnio;
  goles_tiro_libre_por_anio: EstadisticaPorAnio;
  goles_otro_por_anio: EstadisticaPorAnio;

  asistencias_por_anio: EstadisticaPorAnio;
  asistencias_pie_por_anio: EstadisticaPorAnio;
  asistencias_tiro_libre_por_anio: EstadisticaPorAnio;
  asistencias_corner_por_anio: EstadisticaPorAnio;
  asistencias_cabeza_por_anio: EstadisticaPorAnio;
  asistencias_otro_por_anio: EstadisticaPorAnio;

  amarillas_por_anio: EstadisticaPorAnio;
  rojas_por_anio: EstadisticaPorAnio;

  presencias_sin_jugar_por_anio: EstadisticaPorAnio;
  presencias_sin_jugar_ganados_por_anio: EstadisticaPorAnio;
  presencias_sin_jugar_empatados_por_anio: EstadisticaPorAnio;
  presencias_sin_jugar_perdidos_por_anio: EstadisticaPorAnio;
}*/

interface IEstadisticasPorAnio {
  titular_por_anio: EstadisticaDetalladaPorAnio;
  suplente_por_anio: EstadisticaDetalladaPorAnio;

  goles_por_anio: EstadisticaDetalladaPorAnio;
  goles_cabeza_por_anio: EstadisticaDetalladaPorAnio;
  goles_pie_por_anio: EstadisticaDetalladaPorAnio;
  goles_penal_por_anio: EstadisticaDetalladaPorAnio;
  goles_tiro_libre_por_anio: EstadisticaDetalladaPorAnio;
  goles_otro_por_anio: EstadisticaDetalladaPorAnio;

  asistencias_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_pie_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_tiro_libre_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_corner_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_cabeza_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_otro_por_anio: EstadisticaDetalladaPorAnio;

  amarillas_por_anio: EstadisticaDetalladaPorAnio;
  rojas_por_anio: EstadisticaDetalladaPorAnio;

  presencias_sin_jugar_por_anio: EstadisticaDetalladaPorAnio;
  presencias_sin_jugar_ganados_por_anio: EstadisticaDetalladaPorAnio;
  presencias_sin_jugar_empatados_por_anio: EstadisticaDetalladaPorAnio;
  presencias_sin_jugar_perdidos_por_anio: EstadisticaDetalladaPorAnio;
}

/*
const estadisticasPorAnioSchema = new Schema(
  {
    titular_por_anio: { type: Map, of: Number, default: {} },
    suplente_por_anio: { type: Map, of: Number, default: {} },

    goles_por_anio: { type: Map, of: Number, default: {} },
    goles_cabeza_por_anio: { type: Map, of: Number, default: {} },
    goles_pie_por_anio: { type: Map, of: Number, default: {} },
    goles_penal_por_anio: { type: Map, of: Number, default: {} },
    goles_tiro_libre_por_anio: { type: Map, of: Number, default: {} },
    goles_otro_por_anio: { type: Map, of: Number, default: {} },

    asistencias_por_anio: { type: Map, of: Number, default: {} },
    asistencias_pie_por_anio: { type: Map, of: Number, default: {} },
    asistencias_tiro_libre_por_anio: { type: Map, of: Number, default: {} },
    asistencias_corner_por_anio: { type: Map, of: Number, default: {} },
    asistencias_cabeza_por_anio: { type: Map, of: Number, default: {} },
    asistencias_otro_por_anio: { type: Map, of: Number, default: {} },

    amarillas_por_anio: { type: Map, of: Number, default: {} },
    rojas_por_anio: { type: Map, of: Number, default: {} },

    presencias_sin_jugar_por_anio: { type: Map, of: Number, default: {} },
    presencias_sin_jugar_ganados_por_anio: { type: Map, of: Number, default: {} },
    presencias_sin_jugar_empatados_por_anio: { type: Map, of: Number, default: {} },
    presencias_sin_jugar_perdidos_por_anio: { type: Map, of: Number, default: {} },
  },
  { _id: false }
);
*/
export const estadisticasPorAnioSchema = new Schema(
  {
    titular_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    suplente_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    
    goles_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    goles_cabeza_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    goles_pie_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    goles_penal_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    goles_tiro_libre_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    goles_otro_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    
    asistencias_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    asistencias_pie_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    asistencias_tiro_libre_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    asistencias_corner_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    asistencias_cabeza_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    asistencias_otro_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },

    amarillas_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    rojas_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },

    presencias_sin_jugar_por_anio: { type: EstadisticaDetalladaPorAnioSchema,  default: () => ({}) },
    presencias_sin_jugar_ganados_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    presencias_sin_jugar_empatados_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) },
    presencias_sin_jugar_perdidos_por_anio: { type: EstadisticaDetalladaPorAnioSchema, default: () => ({}) }
  },
  { _id: false }
);

interface IPersona extends Document {
    nombre: string;
    titular: number;
    suplente: number;
    goles: number;
    tipos_gol: TiposGol;
    asistencias: number;
    tipos_asistencia: TiposAsistencia;
    amarillas: number;
    rojas: number;
    presencias_sin_jugar: number;
    tipos_presencias_sin_jugar: TiposPresenciasSinJugar
    director_tecnico: DirectorTecnico;
    debut: Date;
    debut_oficial: Date;
    dorsal: number;
    estadisticas_por_anio: IEstadisticasPorAnio;
    createdAt: Date;
}

const personaSchema: Schema = new Schema({
    nombre: { type: String, required: true, unique: true },
    titular: { type: Number, required: true },
    suplente: { type: Number, required: true },
    goles: { type: Number, required: true },
    tipos_gol: tiposGolSchema,
    asistencias: { type: Number, required: true },
    tipos_asistencia: tiposAsistenciaSchema,
    amarillas: { type: Number, required: true },
    rojas: { type: Number, required: true },
    presencias_sin_jugar: { type: Number, required: true },
    tipos_presencias_sin_jugar: tiposPresenciaSinJugarSchema,
    director_tecnico: DirectorTecnicoSchema,
    debut: { type: Date, required: true },
    debut_oficial: { type: Date, required: true },
    dorsal: { type: Number, required: false },
    estadisticas_por_anio: { type: estadisticasPorAnioSchema, default: {} },
    createdAt: { type: Date, default: Date.now }
});

const Persona = mongoose.model<IPersona>('Persona', personaSchema); 
export default Persona;