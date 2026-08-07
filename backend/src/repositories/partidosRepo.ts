import Partido, { GolFavor } from "../models/partido";
import { IPartido } from "../models/partido";

export async function getPartidosRepo(): Promise<IPartido[]> {
    return await Partido.find({}, { _id: 0, fecha: 1, hora: 1, categoria: 1, director_tecnico: 1, rival: 1, competicion: 1, tipo_partido: 1, goles_favor: 1, goles_contra: 1, resultado: 1, golesFavor: 1, nro: 1 }).lean()
}

export async function getPartidosLibresRepo(): Promise<IPartido[]> {
    return await Partido.find({ categoria: "Libres" }, { _id: 0, createdAt: 0 }).lean()
}

export async function getPartidosSeniorRepo(): Promise<IPartido[]> {
    return await Partido.find({ categoria: "Senior" }, { _id: 0, createdAt: 0 }).lean()
}

export async function getPartidosDirigidosRepo(nombre:string): Promise<IPartido[]> {
    return await Partido.find({director_tecnico: nombre}, { _id: 0 }).lean();
}

export async function getPresenciasTotalesRepo(nombre:string): Promise<IPartido[]> {
    return await Partido.find( 
        {$or: 
            [{ titulares: nombre }, 
             { suplentes: nombre },
             { presencias_sin_jugar: nombre }] 
        }, 
        { _id: 0 }).lean();
    }

export async function getPartidoPorFechaRepo(fecha:Date): Promise<IPartido[]> {
    return await Partido.find({ fecha: fecha }, { _id: 0 });
}

export async function getPartidoPorNroRepo(nro:string): Promise<IPartido | null> {
    return await Partido.findOne({ nro: nro}, { _id: 0 }).lean()
}