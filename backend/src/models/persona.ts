import mongoose, { Schema, Document } from "mongoose";

interface IPersona extends Document {
    nombre: string;
    partidos: number;
    createdAt: Date;
}

const personaSchema: Schema = new Schema({
    nombre: { type: String, required: true, unique: true },
    partidos: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Persona = mongoose.model<IPersona>('Persona', personaSchema); 
export default Persona;