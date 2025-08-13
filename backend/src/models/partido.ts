import mongoose, { Schema, Document } from "mongoose";

interface IPartido extends Document {
    name: number;
    categoria: string;
    tipo_partido: string;
    competicion: string;
    createdAt: Date;
}

const partidoSchema: Schema = new Schema({
  name: { type: Number, required: true },
  categoria: { type: String, required: true },
  tipo_partido: { type: String, required: true },
  competicion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Partido = mongoose.model<IPartido>('Partido', partidoSchema); 
export default Partido;