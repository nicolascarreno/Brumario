"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearHitoBase = crearHitoBase;
exports.crearHitoRachaBase = crearHitoRachaBase;
exports.crearGolFavorBase = crearGolFavorBase;
exports.crearAnioBase = crearAnioBase;
exports.parseGoles = parseGoles;
exports.procesarPresencias = procesarPresencias;
exports.procesarGolesYAsistencias = procesarGolesYAsistencias;
exports.procesarTarjetas = procesarTarjetas;
exports.procesarPresenciasSinJugar = procesarPresenciasSinJugar;
exports.encontrarMaximoPorAnio = encontrarMaximoPorAnio;
exports.crearPartidoBase = crearPartidoBase;
exports.actualizarRachaInvicta = actualizarRachaInvicta;
exports.actualizarRachaGanados = actualizarRachaGanados;
exports.actualizarRachaSinGanar = actualizarRachaSinGanar;
exports.actualizarRachaPerdidos = actualizarRachaPerdidos;
const mongoose_1 = __importDefault(require("mongoose"));
function crearHitoBase() {
    return {
        nro: 0,
        rival: "",
        competicion: "",
        tipo_partido: "",
        golesBrumario: "",
        golesRecibidos: "",
        fecha: new Date(),
    };
}
function crearHitoRachaBase() {
    return {
        inicio: crearHitoBase(),
        fin: crearHitoBase(),
        duracionPartidos: 0,
    };
}
function crearGolFavorBase() {
    return {
        gol: "",
        tipo: "",
        resultadoParcial: "",
        asistencia: "",
        tipoAsistencia: "",
    };
}
function crearAnioBase(anio) {
    return {
        anio: anio,
        goles: 0,
        asistencias: 0,
        amarillas: 0,
        rojas: 0,
        presencias_sin_jugar: 0,
        presencias: 0,
    };
}
function parseGoles(goles) {
    if (typeof goles === "number")
        return goles; // ya es número
    if (!goles)
        return 0; // por si viene vacío
    // separar en espacio → ej. "0 (5)" → ["0", "(5)"]
    const partes = goles.split(" ");
    return Number(partes[0]); // te quedás con la primera parte
}
function procesarPresencias(nombreJugador, partido, estadisticas) {
    for (const presencia of [...partido.titulares, ...partido.suplentes]) {
        if (presencia === nombreJugador) {
            estadisticas.presencias += 1;
        }
    }
}
function procesarGolesYAsistencias(nombreJugador, partido, estadisticas) {
    let golesPartidoActual = 0;
    let asistenciasPartidoActual = 0;
    let ultimoGolInfo = crearGolFavorBase();
    for (const goles of partido.golesFavor) {
        if (goles.gol === nombreJugador) {
            golesPartidoActual += 1;
            estadisticas.goles += 1;
            ultimoGolInfo = goles;
        }
        if (goles.asistencia === nombreJugador) {
            asistenciasPartidoActual += 1;
            estadisticas.asistencias += 1;
        }
    }
    return { golesPartidoActual, asistenciasPartidoActual, ultimoGolInfo };
}
function procesarTarjetas(nombreJugador, partido, estadisticas) {
    for (const amarilla of partido.amarillas) {
        if (amarilla === nombreJugador) {
            estadisticas.amarillas += 1;
        }
    }
    for (const roja of partido.rojas) {
        if (roja === nombreJugador) {
            estadisticas.rojas += 1;
        }
    }
}
function procesarPresenciasSinJugar(nombreJugador, partido, estadisticas) {
    for (const presencia of partido.presencia_sin_jugar) {
        if (presencia === nombreJugador) {
            estadisticas.presencias_sin_jugar += 1;
        }
    }
}
function encontrarMaximoPorAnio(anios, campo) {
    let maxCantidad = 0;
    let anioMax = 0;
    for (const anio of anios) {
        if (anio[campo] > maxCantidad) {
            maxCantidad = anio[campo];
            anioMax = anio.anio;
        }
    }
    return { anio: anioMax, cantidad: maxCantidad };
}
function crearPartidoBase() {
    return {
        _id: new mongoose_1.default.Types.ObjectId(), // si lo necesitás porque hereda de Document
        nro: "",
        categoria: "",
        tipo_partido: "",
        competicion: "",
        jornada: "",
        cancha: "",
        predio: "",
        ubicacion: "",
        rival: "",
        goles_favor: "0",
        goles_contra: "0",
        titulares: [],
        suplentes: [],
        golesFavor: [],
        golesEnContra: [],
        amarillas: [],
        rojas: [],
        presencia_sin_jugar: [],
        director_tecnico: "",
        fecha: new Date(0), // fecha "vacía" (Epoch)
        createdAt: new Date(0), // idem
    };
}
// Función modularizada para actualizar la racha invicta
function actualizarRachaInvicta(rachaInvictaActual, rachaInvictaDirigido, partido) {
    if (partido.resultado == 'Ganado' || partido.resultado == 'Empatado') {
        if (rachaInvictaActual.duracionPartidos == 0) {
            rachaInvictaActual = { inicio: { nro: 0, rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                fin: { nro: 0, rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                duracionPartidos: 0 };
        }
        rachaInvictaActual.duracionPartidos += 1;
        rachaInvictaActual.fin = { nro: 0, rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
            rachaInvictaDirigido = {
                inicio: Object.assign({}, rachaInvictaActual.inicio),
                fin: Object.assign({}, rachaInvictaActual.fin),
                duracionPartidos: rachaInvictaActual.duracionPartidos,
            };
        }
    }
    else {
        rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido };
}
function actualizarRachaGanados(rachaInvictaActual, rachaInvictaDirigido, partido) {
    if (partido.resultado == 'Ganado') {
        if (rachaInvictaActual.duracionPartidos == 0) {
            rachaInvictaActual = { inicio: { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                fin: { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                duracionPartidos: 0 };
        }
        rachaInvictaActual.duracionPartidos += 1;
        rachaInvictaActual.fin = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
            rachaInvictaDirigido = {
                inicio: Object.assign({}, rachaInvictaActual.inicio),
                fin: Object.assign({}, rachaInvictaActual.fin),
                duracionPartidos: rachaInvictaActual.duracionPartidos,
            };
        }
    }
    else {
        rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido };
}
function actualizarRachaSinGanar(rachaInvictaActual, rachaInvictaDirigido, partido) {
    if (partido.resultado == 'Empatado' || partido.resultado == 'Perdido') {
        if (rachaInvictaActual.duracionPartidos == 0) {
            rachaInvictaActual = { inicio: { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                fin: { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                duracionPartidos: 0 };
        }
        rachaInvictaActual.duracionPartidos += 1;
        rachaInvictaActual.fin = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
            rachaInvictaDirigido = {
                inicio: Object.assign({}, rachaInvictaActual.inicio),
                fin: Object.assign({}, rachaInvictaActual.fin),
                duracionPartidos: rachaInvictaActual.duracionPartidos,
            };
        }
    }
    else {
        rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido };
}
function actualizarRachaPerdidos(rachaInvictaActual, rachaInvictaDirigido, partido) {
    if (partido.resultado == 'Perdido') {
        if (rachaInvictaActual.duracionPartidos == 0) {
            rachaInvictaActual = { inicio: { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                fin: { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha },
                duracionPartidos: 0 };
        }
        rachaInvictaActual.duracionPartidos += 1;
        rachaInvictaActual.fin = { nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha };
        if (rachaInvictaActual.duracionPartidos > rachaInvictaDirigido.duracionPartidos) {
            rachaInvictaDirigido = {
                inicio: Object.assign({}, rachaInvictaActual.inicio),
                fin: Object.assign({}, rachaInvictaActual.fin),
                duracionPartidos: rachaInvictaActual.duracionPartidos,
            };
        }
    }
    else {
        rachaInvictaActual = crearHitoRachaBase();
    }
    return { rachaActual: rachaInvictaActual, rachaMaxima: rachaInvictaDirigido };
}
