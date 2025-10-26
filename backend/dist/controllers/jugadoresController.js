"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jugadorDetalleController = exports.jugadoresController = void 0;
const jugadoresService_1 = require("../services/jugadoresService");
const jugadoresController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Jugadores controller called");
        const jugadores = yield (0, jugadoresService_1.getJugadores)();
        console.log(jugadores);
        return res.status(200).json({ jugadores });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
});
exports.jugadoresController = jugadoresController;
const jugadorDetalleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        console.log("Jugadores controller called");
        const jugador = yield (0, jugadoresService_1.getJugadoresDetalles)(nombre);
        console.log(jugador);
        return res.status(200).json({ jugador });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
});
exports.jugadorDetalleController = jugadorDetalleController;
