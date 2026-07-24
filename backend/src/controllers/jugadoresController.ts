import { Request, Response, NextFunction } from "express";
import { getJugadores, getJugadoresDetalles, getJugadoresSinDetalles} from "../services/jugadoresService";

export const jugadoresController = async (req: Request, res: Response): Promise<Response | void> => {
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

export const jugadoresSinDetallesController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        console.log("Jugadores sin detalles controller called");
        const jugadores = await getJugadoresSinDetalles();
        console.log(jugadores)
        return res.status(200).json({ jugadores });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
};

export const jugadorDetalleController = async (req: Request, res: Response) => {
  const { nombre } = req.params;
  try {
        console.log("Jugador Detalles controller called");
        const jugador = await getJugadoresDetalles(nombre);
        //console.log(jugador)
        return res.status(200).json({ jugador });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
};