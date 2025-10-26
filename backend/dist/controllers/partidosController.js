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
exports.partidoDetalleController = exports.partidosController = void 0;
const partidosService_1 = require("../services/partidosService");
const partidosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Jugadores controller called");
        const partidos = yield (0, partidosService_1.getPartidos)();
        console.log(partidos);
        return res.status(200).json({ partidos });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
});
exports.partidosController = partidosController;
const partidoDetalleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nro } = req.params;
    console.log(req.params);
    try {
        console.log(nro);
        console.log("Jugadores controller called");
        const partido = yield (0, partidosService_1.getPartidoDetalles)(nro);
        console.log(partido);
        return res.status(200).json({ partido });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener jugadores" });
    }
});
exports.partidoDetalleController = partidoDetalleController;
