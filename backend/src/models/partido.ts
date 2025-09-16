import mongoose, { Schema, Document } from "mongoose";


export interface GolEnContra {
  gol: string;
  tipo: string;
}

const golEnContraSchema = new Schema({
  gol: String,
  tipo: String,
}, { _id: false });

export interface GolFavor {
  gol: string;
  tipo: string;
  resultadoParcial: string;
  asistencia: string;
  tipoAsistencia: string;
}

const golFavorSchema = new Schema({
  gol: String,
  tipo: String,
  resultadoParcial: String,
  asistencia: String,
  tipoAsistencia: String
}, { _id: false });

export interface IPartido extends Document {
    nro: string;
    categoria: string;
    tipo_partido: string;
    competicion: string;
    jornada: string;
    cancha: string;
    predio: string;
    ubicacion: string;
    rival: string;
    goles_favor: string;
    goles_contra: string;
    titulares: string[];
    suplentes: string[];
    golesFavor: GolFavor[];
    golesEnContra: GolEnContra[];
    amarillas: string[];
    rojas: string[];
    presencia_sin_jugar: string[];
    director_tecnico: string;
    fecha: Date;
    resultado: string;
    createdAt: Date;
}

const partidoSchema: Schema = new Schema({
  nro: { type: String, required: true, unique: true },
  categoria: { type: String, required: true },
  tipo_partido: { type: String, required: true },
  competicion: { type: String, required: true },
  jornada: { type: String, required: false },
  cancha: { type: String, required: true },
  predio: { type: String, required: true },
  ubicacion: { type: String, required: true },
  rival: { type: String, required: true },
  goles_favor: { type: String, required: true },
  goles_contra: { type: String, required: true },
  titulares: [{ type: String }],
  suplentes: [{ type: String }],
  golesFavor: [golFavorSchema],
  golesEnContra: [golEnContraSchema],
  amarillas: [{ type: String }],
  rojas: [{ type: String }],
  presencia_sin_jugar: [{ type: String }],
  director_tecnico: { type: String, required: false },
  fecha: { type: Date, required: true },
  resultado: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Partido = mongoose.model<IPartido>('Partido', partidoSchema); 
export default Partido;