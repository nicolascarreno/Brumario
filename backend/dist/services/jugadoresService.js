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
exports.getJugadoresDetalles = exports.getJugadores = void 0;
const partido_1 = __importDefault(require("../models/partido"));
const persona_1 = __importDefault(require("../models/persona")); // tu modelo de Mongoose
const utils_service_1 = require("./utils_service");
const getJugadores = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugadores = yield persona_1.default.find({}, { _id: 0 });
        console.log(jugadores);
        return jugadores;
    }
    catch (error) {
        throw new Error("Error al obtener jugadores: " + error);
    }
});
exports.getJugadores = getJugadores;
const getJugadoresDetalles = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugador = yield persona_1.default.findOne({ nombre }, { _id: 0 });
        if (!jugador) {
            throw new Error(`No se encontró el jugador con nombre: ${nombre}`);
        }
        const jugadores = yield persona_1.default.find({}, { _id: 0, nombre: 1 });
        const partidosDirigidos = yield partido_1.default.find({ director_tecnico: nombre }, { _id: 0 });
        const partidosJugados = yield partido_1.default.find({
            $or: [
                { titulares: nombre }, // aparece en titulares
                { suplentes: nombre },
                { presencia_sin_jugar: nombre } // aparece en suplentes
            ]
        }, { _id: 0 } // 🎯 proyección, devolvés todos los campos o los que quieras
        );
        const debut = yield partido_1.default.find({
            $or: [
                { fecha: jugador.debut }, // aparece en titulares
            ]
        }, { _id: 0 } // 🎯 proyección, devolvés todos los campos o los que quieras
        );
        const debut_oficial = yield partido_1.default.find({
            $or: [
                { fecha: jugador.debut_oficial }, // aparece en titulares
            ]
        }, { _id: 0 } // 🎯 proyección, devolvés todos los campos o los que quieras
        );
        const jugadoresPreferidos = calcularTopJugadores(jugadores.map(j => j.toObject()), partidosDirigidos);
        return Object.assign(Object.assign({}, jugador.toObject()), { director_tecnico: Object.assign(Object.assign({}, JSON.parse(JSON.stringify(jugador.director_tecnico))), { jugadoresPreferidos }), hitos: hitos(nombre, partidosJugados, partidosDirigidos, debut, debut_oficial) });
    }
    catch (error) {
        throw new Error("Error al obtener jugador: " + error);
    }
});
exports.getJugadoresDetalles = getJugadoresDetalles;
const calcularTopJugadores = (jugadores, partidos) => {
    const jugadoresConPartidos = jugadores.map(j => (Object.assign(Object.assign({}, j), { partidos: 0 })));
    console.log(partidos.length);
    for (const partido of partidos) {
        for (const jugador of jugadoresConPartidos) {
            if (partido.titulares.includes(jugador.nombre)) {
                jugador.partidos += 1;
            }
        }
    }
    return jugadoresConPartidos
        .sort((a, b) => b.partidos - a.partidos)
        .slice(0, 8)
        .map(({ nombre }) => ({ nombre }));
};
function hitos(nombreJugador, partidos, partidosDirigidos, debut, debut_oficial) {
    let masGoles = 0;
    let masGolesPartido = (0, utils_service_1.crearHitoBase)();
    let masAsistencias = 0;
    let masAsistenciasPartido = (0, utils_service_1.crearHitoBase)();
    let masContribucionesGoles = 0;
    let masContribucionesAsistencias = 0;
    let masContribucionesPartido = (0, utils_service_1.crearHitoBase)();
    let mayorVictoriaDirigido = (0, utils_service_1.crearHitoBase)();
    let mayorDerrotaDirigido = (0, utils_service_1.crearHitoBase)();
    let masGolesDirigido = (0, utils_service_1.crearHitoBase)();
    let rachaInvictaDirigido = (0, utils_service_1.crearHitoRachaBase)();
    let rachaGanadosDirigido = (0, utils_service_1.crearHitoRachaBase)();
    let rachaSinGanarDirigido = (0, utils_service_1.crearHitoRachaBase)();
    let rachaPerdidosDirigido = (0, utils_service_1.crearHitoRachaBase)();
    let ultimoGol = (0, utils_service_1.crearGolFavorBase)();
    let ultimoGolPartido = (0, utils_service_1.crearHitoBase)();
    let anios = [];
    let debut_partido = debut.length > 0
        ? { rival: debut[0].rival, competicion: debut[0].competicion, tipo_partido: debut[0].tipo_partido, golesBrumario: debut[0].goles_favor, golesRecibidos: debut[0].goles_contra, fecha: debut[0].fecha }
        : (0, utils_service_1.crearHitoBase)();
    let debut_oficial_partido = debut_oficial.length > 0
        ? { rival: debut_oficial[0].rival, competicion: debut_oficial[0].competicion, tipo_partido: debut_oficial[0].tipo_partido, golesBrumario: debut_oficial[0].goles_favor, golesRecibidos: debut_oficial[0].goles_contra, fecha: debut_oficial[0].fecha }
        : (0, utils_service_1.crearHitoBase)();
    for (const partido of partidos) {
        const anio = partido.fecha.getFullYear();
        if (!anios.some(a => a.anio === anio)) {
            anios.push((0, utils_service_1.crearAnioBase)(anio));
        }
        const estadisticas_anio = anios.find(a => a.anio === anio);
        (0, utils_service_1.procesarPresencias)(nombreJugador, partido, estadisticas_anio);
        const { golesPartidoActual, asistenciasPartidoActual, ultimoGolInfo } = (0, utils_service_1.procesarGolesYAsistencias)(nombreJugador, partido, estadisticas_anio);
        (0, utils_service_1.procesarTarjetas)(nombreJugador, partido, estadisticas_anio);
        (0, utils_service_1.procesarPresenciasSinJugar)(nombreJugador, partido, estadisticas_anio);
        if (golesPartidoActual > masGoles) {
            masGoles = golesPartidoActual;
            masGolesPartido = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (asistenciasPartidoActual > masAsistencias) {
            masAsistencias = asistenciasPartidoActual;
            masAsistenciasPartido = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (golesPartidoActual > 0) {
            ultimoGolPartido = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
            ultimoGol = ultimoGolInfo;
        }
        if (golesPartidoActual + asistenciasPartidoActual > masContribucionesGoles + masContribucionesAsistencias) {
            masContribucionesGoles = golesPartidoActual;
            masContribucionesAsistencias = asistenciasPartidoActual;
            masContribucionesPartido = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
    }
    let rachaInvictaActual = (0, utils_service_1.crearHitoRachaBase)();
    let rachaGanadosActual = (0, utils_service_1.crearHitoRachaBase)();
    let rachaSinGanarActual = (0, utils_service_1.crearHitoRachaBase)();
    let rachaPerdidosActual = (0, utils_service_1.crearHitoRachaBase)();
    for (const partido of partidosDirigidos) {
        const mayor_victoria = (0, utils_service_1.parseGoles)(mayorVictoriaDirigido.golesBrumario) - (0, utils_service_1.parseGoles)(mayorVictoriaDirigido.golesRecibidos);
        const mayor_derrota = (0, utils_service_1.parseGoles)(mayorDerrotaDirigido.golesBrumario) - (0, utils_service_1.parseGoles)(mayorDerrotaDirigido.golesRecibidos);
        const mas_goles = (0, utils_service_1.parseGoles)(masGolesDirigido.golesBrumario) + (0, utils_service_1.parseGoles)(masGolesDirigido.golesRecibidos);
        const dif_resultado = (0, utils_service_1.parseGoles)(partido.goles_favor) - (0, utils_service_1.parseGoles)(partido.goles_contra);
        const goles_partido = (0, utils_service_1.parseGoles)(partido.goles_contra) + (0, utils_service_1.parseGoles)(partido.goles_favor);
        if (mayor_victoria < dif_resultado && dif_resultado > 0) {
            mayorVictoriaDirigido = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (mayor_derrota > dif_resultado && dif_resultado < 0) {
            mayorDerrotaDirigido = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        if (mas_goles < goles_partido) {
            masGolesDirigido = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        }
        const resultadoRacha = (0, utils_service_1.actualizarRachaInvicta)(Object.assign({}, rachaInvictaActual), Object.assign({}, rachaInvictaDirigido), partido);
        rachaInvictaActual = resultadoRacha.rachaActual;
        rachaInvictaDirigido = resultadoRacha.rachaMaxima;
        const resultadoRachaGanados = (0, utils_service_1.actualizarRachaGanados)(Object.assign({}, rachaGanadosActual), Object.assign({}, rachaGanadosDirigido), partido);
        rachaGanadosActual = resultadoRachaGanados.rachaActual;
        rachaGanadosDirigido = resultadoRachaGanados.rachaMaxima;
        const resultadoRachaSinGanar = (0, utils_service_1.actualizarRachaSinGanar)(Object.assign({}, rachaSinGanarActual), Object.assign({}, rachaSinGanarDirigido), partido);
        rachaSinGanarActual = resultadoRachaSinGanar.rachaActual;
        rachaSinGanarDirigido = resultadoRachaSinGanar.rachaMaxima;
        const resultadoRachaPerdidos = (0, utils_service_1.actualizarRachaPerdidos)(Object.assign({}, rachaPerdidosActual), Object.assign({}, rachaPerdidosDirigido), partido);
        rachaPerdidosActual = resultadoRachaPerdidos.rachaActual;
        rachaPerdidosDirigido = resultadoRachaPerdidos.rachaMaxima;
    }
    //console.log(anios)
    return {
        masGoles: { cantidad: masGoles, partido: masGolesPartido },
        masAsistencias: { cantidad: masAsistencias, partido: masAsistenciasPartido },
        masContribuciones: { cantidadGoles: masContribucionesGoles, cantidadAsistencias: masContribucionesAsistencias, partido: masContribucionesPartido },
        masGolesAnio: (0, utils_service_1.encontrarMaximoPorAnio)(anios, "goles"),
        masAsistenciasAnio: (0, utils_service_1.encontrarMaximoPorAnio)(anios, "asistencias"),
        masAmarillasAnio: (0, utils_service_1.encontrarMaximoPorAnio)(anios, "amarillas"),
        masRojasAnio: (0, utils_service_1.encontrarMaximoPorAnio)(anios, "rojas"),
        masPresenciasSinJugarAnio: (0, utils_service_1.encontrarMaximoPorAnio)(anios, "presencias_sin_jugar"),
        masPresenciasAnio: (0, utils_service_1.encontrarMaximoPorAnio)(anios, "presencias"),
        tecnicoMayorVictoria: { partido: mayorVictoriaDirigido },
        tecnicoMayorDerrota: { partido: mayorDerrotaDirigido },
        tecnicoMasGoles: { partido: masGolesDirigido },
        tecnicoRachaInvicta: { racha: rachaInvictaDirigido },
        tecnicoRachaGanados: { racha: rachaGanadosDirigido },
        tecnicoRachaSinGanar: { racha: rachaSinGanarDirigido },
        tecnicoRachaPerdidos: { racha: rachaPerdidosDirigido },
        ultimoGol: { partido: ultimoGolPartido, gol: ultimoGol },
        debut: { partido: debut_oficial_partido },
        debut_oficial: { partido: debut_oficial_partido }
    };
}
