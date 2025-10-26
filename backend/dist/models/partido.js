"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const golEnContraSchema = new mongoose_1.Schema({
    gol: String,
    tipo: String,
}, { _id: false });
const golFavorSchema = new mongoose_1.Schema({
    gol: String,
    tipo: String,
    resultadoParcial: String,
    asistencia: String,
    tipoAsistencia: String
}, { _id: false });
const golRecibidoSchema = new mongoose_1.Schema({
    arquero: String,
    tipo: String,
    resultadoParcial: String,
}, { _id: false });
const partidoSchema = new mongoose_1.Schema({
    nro: { type: String, required: true, unique: true },
    categoria: { type: String, required: true },
    tipo_partido: { type: String, required: true },
    competicion: { type: String, required: true },
    jornada: { type: String, required: false },
    cancha: { type: String, required: true },
    predio: { type: String, required: true },
    ubicacion: { type: String, required: true },
    rival: { type: String, required: true },
    goles_favor: { type: String, required: true },
    goles_contra: { type: String, required: true },
    titulares: [{ type: String }],
    suplentes: [{ type: String }],
    golesFavor: [golFavorSchema],
    golesEnContra: [golEnContraSchema],
    golesRecibidos: [golRecibidoSchema],
    amarillas: [{ type: String }],
    rojas: [{ type: String }],
    presencia_sin_jugar: [{ type: String }],
    director_tecnico: { type: String, required: false },
    fecha: { type: Date, required: true },
    hora: { type: String, required: false },
    resultado: { type: String, required: true },
    esquema_tactico: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});
const Partido = mongoose_1.default.model('Partido', partidoSchema);
exports.default = Partido;
