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

export interface DirectorTecnico {
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;
  esquemas: Record<string, number>;
}

const DirectorTecnicoSchema = new Schema({
  ganados: Number,
  empatados: Number,
  perdidos: Number,
  goles_favor: Number,
  goles_contra: Number,
  esquemas: {
    type: Map,
    of: Number,
    default: {} // vacío al inicio
  },
}, { _id: false });

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
    createdAt: { type: Date, default: Date.now }
});

const Persona = mongoose.model<IPersona>('Persona', personaSchema); 
export default Persona;