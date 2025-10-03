import { Request, Response } from "express";
import { getPartidoDetalles, getPartidos } from "../services/partidosService";

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

export const partidoDetalleController = async (req: Request, res: Response) => {
  const { nro } = req.params;
  console.log(req.params)
  try {
        console.log(nro)
        console.log("Jugadores controller called");
        const partido = await getPartidoDetalles(nro);
        console.log(partido)
        return res.status(200).json({ partido });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
};