import Persona, { IPersona } from "../models/persona";

interface PersonaResumen {
    nombre: string, 
    titular: number, 
    suplente: number, 
    goles: number, 
    asistencias: number, 
    amarillas: number, 
    rojas: number, 
    presencias_sin_jugar: number
}

export async function getJugadoresRepo(): Promise<PersonaResumen[]> {
    return await Persona.find({}, { _id: 0, nombre: 1, titular: 1, suplente: 1, goles: 1, asistencias: 1, amarillas: 1, rojas: 1, presencias_sin_jugar: 1 }).lean();
}

interface PersonaNombre {
    nombre: string;
}

export async function getJugadoresNombresRepo(): Promise<PersonaNombre[]> {
    return await Persona.find({}, { _id: 0, nombre: 1 }).lean();
}

export async function getJugadorRepo(nombre:string): Promise<IPersona | null> {
    return await Persona.findOne({ nombre: nombre}, { _id: 0 }).lean();
}