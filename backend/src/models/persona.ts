import mongoose, { Schema, Document } from "mongoose";

interface IPersona extends Document {
    name: string;
    createdAt: Date;
}

const personaSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const Persona = mongoose.model<IPersona>('Persona', personaSchema); 
export default Persona;