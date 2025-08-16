import { Request, Response, NextFunction } from "express";
import { getJugadores } from "../services/jugadoresService";

export const jugadoresController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        console.log("Jugadores controller called");
        const jugadores = await getJugadores();
        console.log(jugadores)
        return res.status(200).json({ jugadores });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
};