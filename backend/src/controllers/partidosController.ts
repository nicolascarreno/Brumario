import { Request, Response } from "express";
import { getPartidos } from "../services/partidosService";

export const partidosController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        console.log("Jugadores controller called");
        const partidos = await getPartidos();
        console.log(partidos)
        return res.status(200).json({ partidos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
};