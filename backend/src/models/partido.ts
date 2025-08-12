import mongoose, { Schema, Document } from "mongoose";

interface IPartido extends Document {
    name: string;
    createdAt: Date;
}

const partidoSchema: Schema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Partido = mongoose.model<IPartido>('Partido', partidoSchema); 
export default Partido;