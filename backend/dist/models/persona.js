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
const tiposGolSchema = new mongoose_1.Schema({
    cabeza: Number,
    pie_jugada: Number,
    penal: Number,
    tiro_libre: Number,
    otros: Number,
}, { _id: false });
const tiposAsistenciaSchema = new mongoose_1.Schema({
    cabeza: Number,
    pie_jugada: Number,
    corner: Number,
    tiro_libre: Number,
    otros: Number,
}, { _id: false });
const tiposPresenciaSinJugarSchema = new mongoose_1.Schema({
    ganados: Number,
    empatados: Number,
    perdidos: Number,
}, { _id: false });
const EsquemaInfoSchema = new mongoose_1.Schema({
    partidos: { type: Number, default: 0 },
    puntos: { type: Number, default: 0 },
}, { _id: false });
const DirectorTecnicoSchema = new mongoose_1.Schema({
    ganados: Number,
    empatados: Number,
    perdidos: Number,
    goles_favor: Number,
    goles_contra: Number,
    esquemas: {
        type: Map,
        of: EsquemaInfoSchema, // 👈 cada formación tendrá { partidos, puntos }
        default: {},
    },
}, { _id: false });
const personaSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true, unique: true },
    titular: { type: Number, required: true },
    suplente: { type: Number, required: true },
    goles: { type: Number, required: true },
    tipos_gol: tiposGolSchema,
    asistencias: { type: Number, required: true },
    tipos_asistencia: tiposAsistenciaSchema,
    amarillas: { type: Number, required: true },
    rojas: { type: Number, required: true },
    presencias_sin_jugar: { type: Number, required: true },
    tipos_presencias_sin_jugar: tiposPresenciaSinJugarSchema,
    director_tecnico: DirectorTecnicoSchema,
    debut: { type: Date, required: true },
    debut_oficial: { type: Date, required: true },
    dorsal: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
});
const Persona = mongoose_1.default.model('Persona', personaSchema);
exports.default = Persona;
