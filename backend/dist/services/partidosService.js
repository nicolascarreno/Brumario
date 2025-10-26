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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartidoDetalles = exports.getPartidos = void 0;
const partido_1 = __importDefault(require("../models/partido"));
const utils_service_1 = require("./utils_service");
const getPartidos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield partido_1.default.find({}, { _id: 0, createdAt: 0 });
        const partidosLibres = yield partido_1.default.find({ categoria: "Libres" }, { _id: 0, createdAt: 0 });
        const partidosSenior = yield partido_1.default.find({ categoria: "Senior" }, { _id: 0, createdAt: 0 });
        console.log(partidos);
        return {
            partidos,
            hitos: hitos(partidosLibres, partidosSenior)
        };
    }
    catch (error) {
        throw new Error("Error al obtener jugadores: " + error);
    }
});
exports.getPartidos = getPartidos;
const getPartidoDetalles = (nro) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(nro);
        const partido = yield partido_1.default.findOne({ nro }, { _id: 0 });
        if (!partido) {
            throw new Error(`No se encontró el jugador con nombre: ${nro}`);
        }
        return partido;
    }
    catch (error) {
        throw new Error("Error al obtener el partido: " + error);
    }
});
exports.getPartidoDetalles = getPartidoDetalles;
function hitos(partidosLibres, partidosSenior) {
    let mayorVictoriaLibres = (0, utils_service_1.crearHitoBase)();
    let mayorDerrotaLibres = (0, utils_service_1.crearHitoBase)();
    let masGolesLibres = (0, utils_service_1.crearHitoBase)();
    let rachaInvictaLibres = (0, utils_service_1.crearHitoRachaBase)();
    let rachaGanadosLibres = (0, utils_service_1.crearHitoRachaBase)();
    let rachaSinGanarLibres = (0, utils_service_1.crearHitoRachaBase)();
    let rachaPerdidosLibres = (0, utils_service_1.crearHitoRachaBase)();
    let ganadosLibres = 0;
    let empatadosLibres = 0;
    let perdidosLibres = 0;
    let masPresenciasSinJugarPartidoLibres = (0, utils_service_1.crearHitoBase)();
    let masPresenciasSinJugarCantidadLibres = 0;
    let mayorVictoriaSenior = (0, utils_service_1.crearHitoBase)();
    let mayorDerrotaSenior = (0, utils_service_1.crearHitoBase)();
    let masGolesSenior = (0, utils_service_1.crearHitoBase)();
    let rachaInvictaSenior = (0, utils_service_1.crearHitoRachaBase)();
    let rachaGanadosSenior = (0, utils_service_1.crearHitoRachaBase)();
    let rachaSinGanarSenior = (0, utils_service_1.crearHitoRachaBase)();
    let rachaPerdidosSenior = (0, utils_service_1.crearHitoRachaBase)();
    let ganadosSenior = 0;
    let empatadosSenior = 0;
    let perdidosSenior = 0;
    let masPresenciasSinJugarCantidadSenior = 0;
    let masPresenciasSinJugarPartidoSenior = (0, utils_service_1.crearHitoBase)();
    let rachaInvictaActual = (0, utils_service_1.crearHitoRachaBase)();
    let rachaGanadosActual = (0, utils_service_1.crearHitoRachaBase)();
    let rachaSinGanarActual = (0, utils_service_1.crearHitoRachaBase)();
    let rachaPerdidosActual = (0, utils_service_1.crearHitoRachaBase)();
    for (const partido of partidosLibres) {
        const mayor_victoria = (0, utils_service_1.parseGoles)(mayorVictoriaLibres.golesBrumario) - (0, utils_service_1.parseGoles)(mayorVictoriaLibres.golesRecibidos);
        const mayor_derrota = (0, utils_service_1.parseGoles)(mayorDerrotaLibres.golesBrumario) - (0, utils_service_1.parseGoles)(mayorDerrotaLibres.golesRecibidos);
        const mas_goles = (0, utils_service_1.parseGoles)(masGolesLibres.golesBrumario) + (0, utils_service_1.parseGoles)(masGolesLibres.golesRecibidos);
        const dif_resultado = (0, utils_service_1.parseGoles)(partido.goles_favor) - (0, utils_service_1.parseGoles)(partido.goles_contra);
        const goles_partido = (0, utils_service_1.parseGoles)(partido.goles_contra) + (0, utils_service_1.parseGoles)(partido.goles_favor);
        if (mayor_victoria < dif_resultado && dif_resultado > 0) {
            mayorVictoriaLibres = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (mayor_derrota > dif_resultado && dif_resultado < 0) {
            mayorDerrotaLibres = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (mas_goles < goles_partido) {
            masGolesLibres = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (partido.presencia_sin_jugar.length > masPresenciasSinJugarCantidadLibres) {
            masPresenciasSinJugarPartidoLibres = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
            masPresenciasSinJugarCantidadLibres = partido.presencia_sin_jugar.length;
        }
        if (partido.resultado == "Ganado") {
            ganadosLibres += 1;
        }
        else if (partido.resultado == "Empatado") {
            empatadosLibres += 1;
        }
        else {
            perdidosLibres += 1;
        }
        const resultadoRacha = (0, utils_service_1.actualizarRachaInvicta)(Object.assign({}, rachaInvictaActual), Object.assign({}, rachaInvictaLibres), partido);
        rachaInvictaActual = resultadoRacha.rachaActual;
        rachaInvictaLibres = resultadoRacha.rachaMaxima;
        const resultadoRachaGanados = (0, utils_service_1.actualizarRachaGanados)(Object.assign({}, rachaGanadosActual), Object.assign({}, rachaGanadosLibres), partido);
        rachaGanadosActual = resultadoRachaGanados.rachaActual;
        rachaGanadosLibres = resultadoRachaGanados.rachaMaxima;
        const resultadoRachaSinGanar = (0, utils_service_1.actualizarRachaSinGanar)(Object.assign({}, rachaSinGanarActual), Object.assign({}, rachaSinGanarLibres), partido);
        rachaSinGanarActual = resultadoRachaSinGanar.rachaActual;
        rachaSinGanarLibres = resultadoRachaSinGanar.rachaMaxima;
        const resultadoRachaPerdidos = (0, utils_service_1.actualizarRachaPerdidos)(Object.assign({}, rachaPerdidosActual), Object.assign({}, rachaPerdidosLibres), partido);
        rachaPerdidosActual = resultadoRachaPerdidos.rachaActual;
        rachaPerdidosLibres = resultadoRachaPerdidos.rachaMaxima;
    }
    rachaInvictaActual = (0, utils_service_1.crearHitoRachaBase)();
    rachaGanadosActual = (0, utils_service_1.crearHitoRachaBase)();
    rachaSinGanarActual = (0, utils_service_1.crearHitoRachaBase)();
    rachaPerdidosActual = (0, utils_service_1.crearHitoRachaBase)();
    for (const partido of partidosSenior) {
        const mayor_victoria = (0, utils_service_1.parseGoles)(mayorVictoriaSenior.golesBrumario) - (0, utils_service_1.parseGoles)(mayorVictoriaSenior.golesRecibidos);
        const mayor_derrota = (0, utils_service_1.parseGoles)(mayorDerrotaSenior.golesBrumario) - (0, utils_service_1.parseGoles)(mayorDerrotaSenior.golesRecibidos);
        const mas_goles = (0, utils_service_1.parseGoles)(masGolesSenior.golesBrumario) + (0, utils_service_1.parseGoles)(masGolesSenior.golesRecibidos);
        const dif_resultado = (0, utils_service_1.parseGoles)(partido.goles_favor) - (0, utils_service_1.parseGoles)(partido.goles_contra);
        const goles_partido = (0, utils_service_1.parseGoles)(partido.goles_contra) + (0, utils_service_1.parseGoles)(partido.goles_favor);
        if (mayor_victoria < dif_resultado && dif_resultado > 0) {
            mayorVictoriaSenior = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (mayor_derrota > dif_resultado && dif_resultado < 0) {
            mayorDerrotaSenior = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (mas_goles < goles_partido) {
            masGolesSenior = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (partido.presencia_sin_jugar.length > masPresenciasSinJugarCantidadSenior) {
            masPresenciasSinJugarPartidoSenior = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
            masPresenciasSinJugarCantidadSenior = partido.presencia_sin_jugar.length;
        }
        if (partido.resultado == "Ganado") {
            ganadosSenior += 1;
        }
        else if (partido.resultado == "Empatado") {
            empatadosSenior += 1;
        }
        else {
            perdidosSenior += 1;
        }
        const resultadoRacha = (0, utils_service_1.actualizarRachaInvicta)(Object.assign({}, rachaInvictaActual), Object.assign({}, rachaInvictaSenior), partido);
        rachaInvictaActual = resultadoRacha.rachaActual;
        rachaInvictaSenior = resultadoRacha.rachaMaxima;
        const resultadoRachaGanados = (0, utils_service_1.actualizarRachaGanados)(Object.assign({}, rachaGanadosActual), Object.assign({}, rachaGanadosSenior), partido);
        rachaGanadosActual = resultadoRachaGanados.rachaActual;
        rachaGanadosSenior = resultadoRachaGanados.rachaMaxima;
        const resultadoRachaSinGanar = (0, utils_service_1.actualizarRachaSinGanar)(Object.assign({}, rachaSinGanarActual), Object.assign({}, rachaSinGanarSenior), partido);
        rachaSinGanarActual = resultadoRachaSinGanar.rachaActual;
        rachaSinGanarSenior = resultadoRachaSinGanar.rachaMaxima;
        const resultadoRachaPerdidos = (0, utils_service_1.actualizarRachaPerdidos)(Object.assign({}, rachaPerdidosActual), Object.assign({}, rachaPerdidosSenior), partido);
        rachaPerdidosActual = resultadoRachaPerdidos.rachaActual;
        rachaPerdidosSenior = resultadoRachaPerdidos.rachaMaxima;
    }
    return {
        mayorVictoriaLibres: { partido: mayorVictoriaLibres },
        mayorDerrotaLibres: { partido: mayorDerrotaLibres },
        masGolesLibres: { partido: masGolesLibres },
        mayorVictoriaSenior: { partido: mayorVictoriaSenior },
        mayorDerrotaSenior: { partido: mayorDerrotaSenior },
        masGolesSenior: { partido: masGolesSenior },
        rachaInvictaLibres: { racha: rachaInvictaLibres },
        rachaGanadosLibres: { racha: rachaGanadosLibres },
        rachaSinGanarLibres: { racha: rachaSinGanarLibres },
        rachaPerdidosLibres: { racha: rachaPerdidosLibres },
        rachaInvictaSenior: { racha: rachaInvictaSenior },
        rachaGanadosSenior: { racha: rachaGanadosSenior },
        rachaSinGanarSenior: { racha: rachaSinGanarSenior },
        rachaPerdidosSenior: { racha: rachaPerdidosSenior },
        ganadosLibres: ganadosLibres,
        empatadosLibres: empatadosLibres,
        perdidosLibres: perdidosLibres,
        ganadosSenior: ganadosSenior,
        empatadosSenior: empatadosSenior,
        perdidosSenior: perdidosSenior,
        masPresenciasSinJugarLibres: { cantidad: masPresenciasSinJugarCantidadLibres, partido: masPresenciasSinJugarPartidoLibres },
        masPresenciasSinJugarSenior: { cantidad: masPresenciasSinJugarCantidadSenior, partido: masPresenciasSinJugarPartidoSenior }
    };
}
