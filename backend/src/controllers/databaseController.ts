import { Request, Response, NextFunction } from "express";
import { resetDB } from "../services/databaseService";

export const resetDBController = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        console.log("Reset DB controller called");
        await resetDB();
        return res.status(200).json({ message: "Base de datos reseteada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al resetear la base de datos" });
    }
}