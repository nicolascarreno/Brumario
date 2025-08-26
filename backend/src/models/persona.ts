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

interface IPersona extends Document {
    nombre: string;
    titular: number;
    suplente: number;
    goles: number;
    tipos_gol: TiposGol;
    asistencias: number;
    amarillas: number;
    rojas: number;
    presencias_sin_jugar: number;
    createdAt: Date;
}

const personaSchema: Schema = new Schema({
    nombre: { type: String, required: true, unique: true },
    titular: { type: Number, required: true },
    suplente: { type: Number, required: true },
    goles: { type: Number, required: true },
    tipos_gol: tiposGolSchema,
    asistencias: { type: Number, required: true },
    amarillas: { type: Number, required: true },
    rojas: { type: Number, required: true },
    presencias_sin_jugar: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Persona = mongoose.model<IPersona>('Persona', personaSchema); 
export default Persona;