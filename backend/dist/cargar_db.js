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
exports.cargar_jugadores = cargar_jugadores;
exports.cargar_partidos = cargar_partidos;
const XLSX = __importStar(require("xlsx"));
const persona_1 = __importDefault(require("./models/persona"));
const partido_1 = __importDefault(require("./models/partido"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./db/db"));
const utils_db_1 = require("./db/utils_db");
//type FilaPartido = (string | number | null)[];
function cargar_jugadores() {
    return __awaiter(this, void 0, void 0, function* () {
        // Leer el archivo (puede ser desde un buffer, archivo local o base64)
        const workbook = XLSX.readFile('./src/db/Jugadores_Historico.xlsx'); // para Node.js, archivo local
        // Obtener el nombre de la hoja que querés recorrer
        const nombreHoja = workbook.SheetNames[0]; // por ejemplo la primera hoja
        // Obtener la hoja
        const hoja = workbook.Sheets[nombreHoja];
        // Convertir la hoja a JSON (array de objetos)
        const datos = XLSX.utils.sheet_to_json(hoja);
        for (const fila of datos) {
            console.log(fila);
            const nombrePersona = fila['Nombre'];
            try {
                const tipos_gol = { "cabeza": 0, "pie_jugada": 0, "penal": 0, "tiro_libre": 0, 'otros': 0 };
                const tipos_asistencia = { "cabeza": 0, "pie_jugada": 0, "corner": 0, "tiro_libre": 0, 'otros': 0 };
                const tipos_presencia_sin_jugar = { "ganados": 0, "empatados": 0, "perdidos": 0 };
                const director_tecnico = { "ganados": 0, "empatados": 0, "perdidos": 0, "esquemas": {} };
                const debut = (0, utils_db_1.excelDateToJSDate)(fila['Debut'] ? fila['Debut'] : 1);
                const debut_oficial = (0, utils_db_1.excelDateToJSDate)(fila['Debut Oficial'] ? fila['Debut Oficial'] : 1);
                const dorsal = fila['Dorsal'];
                const nuevaPersona = new persona_1.default({ nombre: nombrePersona, goles: 0, tipos_gol: tipos_gol, asistencias: 0,
                    amarillas: 0, rojas: 0, presencias_sin_jugar: 0,
                    titular: 0, suplente: 0, tipos_asistencia: tipos_asistencia,
                    tipos_presencias_sin_jugar: tipos_presencia_sin_jugar,
                    director_tecnico: director_tecnico, debut: debut,
                    debut_oficial: debut_oficial, dorsal: dorsal });
                yield nuevaPersona.save();
                console.log(`Persona guardada: ${nombrePersona}`);
            }
            catch (error) {
                if (error.code === 11000) {
                    console.warn(`Duplicado: ${nombrePersona} ya existe en la base de datos`);
                }
                else {
                    console.error(`Error guardando ${nombrePersona}:`, error);
                }
            }
        }
    });
}
function cargar_partidos() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Leer el archivo (puede ser desde un buffer, archivo local o base64)
        const workbook = XLSX.readFile('./src/db/Once_Historico.xlsx'); // para Node.js, archivo local
        // Obtener el nombre de la hoja que querés recorrer
        const nombreHoja = workbook.SheetNames[0]; // por ejemplo la primera hoja
        // Obtener la hoja
        const hoja = workbook.Sheets[nombreHoja];
        // Convertir la hoja a JSON (array de objetos)
        const datos = XLSX.utils.sheet_to_json(hoja);
        for (const fila of datos) {
            const titulares = [fila['Titular 1'], fila['Titular 2'], fila['Titular 3'], fila['Titular 4'], fila['Titular 5'], fila['Titular 6'],
                fila['Titular 7'], fila['Titular 8'], fila['Titular 9'], fila['Titular 10'], fila['Titular 11']].filter(Boolean);
            const suplentes = [fila['Suplente 1'], fila['Suplente 2'], fila['Suplente 3'], fila['Suplente 4'], fila['Suplente 5'], fila['Suplente 6'],
                fila['Suplente 7'], fila['Suplente 8'], fila['Suplente 9'], fila['Suplente 10'], fila['Suplente 11'],
                fila['Suplente 12'], fila['Suplente 13'], fila['Suplente 14'], fila['Suplente 15']].filter(Boolean).filter(jugador => !titulares.includes(jugador));
            const golesFavor = [];
            for (let i = 1; i <= 7; i++) {
                const gol = fila[`Gol a favor ${i}`];
                if (gol) {
                    golesFavor.push({
                        gol,
                        tipo: fila[`Tipo de gol ${i}`],
                        resultadoParcial: fila[`Resultado parcial gol ${i}`],
                        asistencia: fila[`Asistencia de gol ${i}`],
                        tipoAsistencia: fila[`Tipo de asistencia de gol ${i}`]
                    });
                }
            }
            const golesRecibidos = [];
            for (let i = 1; i <= 8; i++) {
                const arquero = fila[`Gol recibido ${i}`];
                if (arquero) {
                    golesRecibidos.push({
                        arquero,
                        tipo: fila[`Tipo de gol recibido ${i}`],
                        resultadoParcial: fila[`Resultado parcial gol recibido ${i}`],
                    });
                }
            }
            const golesEnContra = [];
            if (fila['Gol en contra']) {
                golesEnContra.push({
                    gol: fila['Gol en contra'], // nombre del jugador
                    tipo: fila['Tipo de gol en contra'] // tipo de gol
                });
            }
            const amarillas = [];
            for (let i = 1; i <= 5; i++) {
                const amarilla = fila[`Tarjeta amarilla ${i}`];
                if (amarilla) {
                    amarillas.push(amarilla);
                }
            }
            const rojas = [];
            for (let i = 1; i <= 5; i++) {
                const roja = fila[`Tarjeta roja ${i}`];
                if (roja) {
                    rojas.push(roja);
                }
            }
            const presencia_sin_jugar = [];
            for (let i = 1; i <= 20; i++) {
                const jugador = fila[`Presencia sin jugar ${i}`];
                if (jugador) {
                    presencia_sin_jugar.push(jugador);
                }
            }
            const resultado = fila[`Estado`];
            const director_tecnico = (_a = fila["Director Tecnico"]) !== null && _a !== void 0 ? _a : "";
            const cantidad_goles_anotados = fila['Goles Brumario'];
            const cantidad_goles_recibidos = fila['Goles Recibidos'];
            const esquema = fila['Esquema Tactico'];
            const hora = fila['Hora'];
            const fecha = (0, utils_db_1.excelDateToJSDate)(fila['Fecha']);
            contar_estadisticas(resultado, golesFavor, amarillas, rojas, presencia_sin_jugar, titulares, suplentes, director_tecnico, golesEnContra, String(cantidad_goles_anotados), String(cantidad_goles_recibidos), esquema);
            //console.log(estadisticas);
            try {
                const nuevoPartido = new partido_1.default({ nro: fila['Partido'], golesRecibidos: golesRecibidos, esquema_tactico: esquema, fecha: fecha, hora: hora, resultado: resultado, categoria: fila['Categoria'], director_tecnico: director_tecnico, tipo_partido: fila['Tipo de partido'], competicion: fila['Competicion'], jornada: fila['Jornada'], cancha: fila['Cancha'], predio: fila['Predio'], ubicacion: fila['Ubicacion'], rival: fila['Rival'], goles_favor: fila['Goles Brumario'], goles_contra: fila['Goles Recibidos'], titulares: titulares, suplentes: suplentes, golesFavor: golesFavor, golesEnContra: golesEnContra, amarillas: amarillas, rojas: rojas, presencia_sin_jugar: presencia_sin_jugar });
                yield nuevoPartido.save();
                console.log(`Partido guardado: ${nuevoPartido}`);
            }
            catch (error) {
                if (error.code === 11000) {
                    //console.warn(`Duplicado: el partido ${fila['Partido']} ya existe en la base de datos`);
                }
                else {
                    console.error(`Error guardando ${fila['Partido']}:`, error);
                }
            }
        }
        for (const [nombre, { goles, asistencias, amarillas, rojas, presencias_sin_jugar, titular, suplente, tipos_gol, tipos_asistencia, tipos_presencia_sin_jugar, director_tecnico }] of Object.entries(estadisticas)) {
            try {
                yield persona_1.default.findOneAndUpdate({ nombre }, { $inc: { goles, asistencias, amarillas, rojas, presencias_sin_jugar, titular, suplente,
                        "tipos_gol.cabeza": tipos_gol.cabeza, "tipos_gol.pie_jugada": tipos_gol.pie_jugada,
                        "tipos_gol.penal": tipos_gol.penal, "tipos_gol.tiro_libre": tipos_gol.tiro_libre,
                        "tipos_gol.otros": tipos_gol.otros, "tipos_asistencia.cabeza": tipos_asistencia.cabeza,
                        "tipos_asistencia.pie_jugada": tipos_asistencia.pie_jugada, "tipos_asistencia.corner": tipos_asistencia.corner,
                        "tipos_asistencia.tiro_libre": tipos_asistencia.tiro_libre, "tipos_asistencia.otros": tipos_asistencia.otros,
                        "tipos_presencias_sin_jugar.ganados": tipos_presencia_sin_jugar.ganados,
                        "tipos_presencias_sin_jugar.empatados": tipos_presencia_sin_jugar.empatados,
                        "tipos_presencias_sin_jugar.perdidos": tipos_presencia_sin_jugar.perdidos,
                        "director_tecnico.ganados": director_tecnico.ganados,
                        "director_tecnico.perdidos": director_tecnico.perdidos,
                        "director_tecnico.empatados": director_tecnico.empatados,
                        "director_tecnico.goles_favor": director_tecnico.goles_favor,
                        "director_tecnico.goles_contra": director_tecnico.goles_contra },
                    $set: { "director_tecnico.esquemas": director_tecnico.esquemas } }, { new: true });
            }
            catch (err) {
                console.error("Error actualizando jugador:", err);
            }
        }
    });
}
const tipoGolMap = {
    "Pie (jugada)": "pie_jugada",
    "Penal": "penal",
    "Tiro Libre": "tiro_libre",
    "Cabeza": "cabeza",
    "Otros": "otros"
};
const tipoAsistenciaMap = {
    "Pie (jugada)": "pie_jugada",
    "Córner": "corner",
    "Tiro Libre": "tiro_libre",
    "Cabeza": "cabeza",
    "Otros": "otros"
};
const estadisticas = {};
function contar_estadisticas(resultado, golesFavor, amarillas, rojas, presenciasSinJugar, titulares, suplentes, director_tecnico, golesContra, cantidad_goles_anotados, cantidad_goles_recibidos, esquema) {
    var _a, _b;
    // contar partidos jugados
    for (let nombreJugador of titulares) {
        if (!estadisticas[nombreJugador]) {
            estadisticas[nombreJugador] = (0, utils_db_1.crearEstadisticasBase)();
        }
        estadisticas[nombreJugador].titular += 1;
    }
    for (let nombreJugador of suplentes) {
        if (!estadisticas[nombreJugador]) {
            estadisticas[nombreJugador] = (0, utils_db_1.crearEstadisticasBase)();
        }
        estadisticas[nombreJugador].suplente += 1;
    }
    // contar goles
    for (const gol of golesFavor) {
        const nombreGoleador = gol.gol; // en tu JSON el campo `gol` es el jugador
        const nombreAsistidor = gol.asistencia;
        if (!estadisticas[nombreGoleador]) {
            estadisticas[nombreGoleador] = (0, utils_db_1.crearEstadisticasBase)();
        }
        estadisticas[nombreGoleador].goles += 1;
        const clave_gol = (_a = tipoGolMap[gol.tipo]) !== null && _a !== void 0 ? _a : "otros"; // si no existe, va a "otros"
        estadisticas[nombreGoleador].tipos_gol[clave_gol] += 1;
        if (!estadisticas[nombreAsistidor]) {
            estadisticas[nombreAsistidor] = (0, utils_db_1.crearEstadisticasBase)();
        }
        estadisticas[nombreAsistidor].asistencias += 1;
        const clave_asistencia = (_b = tipoAsistenciaMap[gol.tipoAsistencia]) !== null && _b !== void 0 ? _b : "otros"; // si no existe, va a "otros"
        estadisticas[nombreAsistidor].tipos_asistencia[clave_asistencia] += 1;
    }
    for (const jugadorAmarilla of amarillas) {
        if (!estadisticas[jugadorAmarilla]) {
            estadisticas[jugadorAmarilla] = (0, utils_db_1.crearEstadisticasBase)();
        }
        estadisticas[jugadorAmarilla].amarillas += 1;
    }
    for (const jugadorRoja of rojas) {
        if (!estadisticas[jugadorRoja]) {
            estadisticas[jugadorRoja] = (0, utils_db_1.crearEstadisticasBase)();
        }
        estadisticas[jugadorRoja].rojas += 1;
    }
    for (const jugadorSinJugar of presenciasSinJugar) {
        if (!estadisticas[jugadorSinJugar]) {
            estadisticas[jugadorSinJugar] = (0, utils_db_1.crearEstadisticasBase)();
        }
        estadisticas[jugadorSinJugar].presencias_sin_jugar += 1;
        if (resultado == 'Ganado') {
            estadisticas[jugadorSinJugar].tipos_presencia_sin_jugar.ganados += 1;
        }
        else if (resultado == 'Empatado') {
            estadisticas[jugadorSinJugar].tipos_presencia_sin_jugar.empatados += 1;
        }
        else {
            estadisticas[jugadorSinJugar].tipos_presencia_sin_jugar.perdidos += 1;
        }
    }
    if (director_tecnico) {
        if (!estadisticas[director_tecnico]) {
            if (director_tecnico.includes('/')) {
                let directores_tecnicos = director_tecnico.split('/');
                for (const tecnico of directores_tecnicos) {
                    if (!estadisticas[tecnico]) {
                        estadisticas[tecnico] = (0, utils_db_1.crearEstadisticasBase)();
                        if (cantidad_goles_anotados.includes(' ')) {
                            estadisticas[tecnico].director_tecnico.goles_favor += parseInt(cantidad_goles_anotados.split(" ")[0], 10);
                            estadisticas[tecnico].director_tecnico.goles_contra += parseInt(cantidad_goles_recibidos.split(" ")[0], 10);
                        }
                        else {
                            estadisticas[tecnico].director_tecnico.goles_favor += parseInt(cantidad_goles_anotados, 10);
                            estadisticas[tecnico].director_tecnico.goles_contra += parseInt(cantidad_goles_recibidos, 10);
                        }
                    }
                    if (!estadisticas[tecnico].director_tecnico.esquemas[esquema]) {
                        estadisticas[tecnico].director_tecnico.esquemas[esquema] = { partidos: 0, puntos: 0 };
                    }
                    estadisticas[tecnico].director_tecnico.esquemas[esquema].partidos += 1;
                    if (resultado == 'Ganado') {
                        estadisticas[tecnico].director_tecnico.ganados += 1;
                        estadisticas[tecnico].director_tecnico.esquemas[esquema].puntos += 3;
                    }
                    else if (resultado == 'Perdido') {
                        estadisticas[tecnico].director_tecnico.perdidos += 1;
                    }
                    else {
                        estadisticas[tecnico].director_tecnico.empatados += 1;
                        estadisticas[tecnico].director_tecnico.esquemas[esquema].puntos += 1;
                    }
                }
            }
        }
        else {
            if (cantidad_goles_anotados.includes(' ')) {
                estadisticas[director_tecnico].director_tecnico.goles_favor += parseInt(cantidad_goles_anotados.split(" ")[0], 10);
                estadisticas[director_tecnico].director_tecnico.goles_contra += parseInt(cantidad_goles_recibidos.split(" ")[0], 10);
            }
            else {
                estadisticas[director_tecnico].director_tecnico.goles_favor += parseInt(cantidad_goles_anotados, 10);
                estadisticas[director_tecnico].director_tecnico.goles_contra += parseInt(cantidad_goles_recibidos, 10);
            }
            if (!estadisticas[director_tecnico].director_tecnico.esquemas[esquema]) {
                estadisticas[director_tecnico].director_tecnico.esquemas[esquema] = { partidos: 0, puntos: 0 };
            }
            estadisticas[director_tecnico].director_tecnico.esquemas[esquema].partidos += 1;
            if (resultado == 'Ganado') {
                estadisticas[director_tecnico].director_tecnico.ganados += 1;
                estadisticas[director_tecnico].director_tecnico.esquemas[esquema].puntos += 3;
            }
            else if (resultado == 'Empatado') {
                estadisticas[director_tecnico].director_tecnico.empatados += 1;
                estadisticas[director_tecnico].director_tecnico.esquemas[esquema].puntos += 1;
            }
            else {
                estadisticas[director_tecnico].director_tecnico.perdidos += 1;
            }
        }
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)(); // esperar conexión antes de cargar datos
            yield cargar_jugadores();
            console.log('✅ Base de datos cargada correctamente.');
            yield cargar_partidos();
            console.log('✅ Base de datos cargada correctamente.');
        }
        catch (error) {
            console.error('❌ Error cargando la base de datos:', error);
        }
        finally {
            yield mongoose_1.default.disconnect(); // cerrar conexión al final
        }
    });
}
main();
