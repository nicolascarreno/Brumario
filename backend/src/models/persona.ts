import mongoose, { Schema, Document } from "mongoose";

interface IPersona extends Document {
    name: string;
    createdAt: Date;
}

const personaSchema: Schema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model<IPersona>('Persona', personaSchema); 
export default User;