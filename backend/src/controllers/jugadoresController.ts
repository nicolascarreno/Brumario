import { Request, Response, NextFunction } from "express";
//import { registerNewUser,loginUser } from "../services/authServices";

export const jugadoresController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.log("Jugadores controller called");
    const jugadores = [
        { nombre: "Juan Pérez" },
        { nombre: "Diego Gómez" },
        { nombre: "Carlos Ruiz" }
    ];
    return res.status(200).json({ jugadores });
};