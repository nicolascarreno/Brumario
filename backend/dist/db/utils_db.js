"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearEstadisticasBase = crearEstadisticasBase;
exports.excelDateToJSDate = excelDateToJSDate;
exports.formatDateDDMMYYYY = formatDateDDMMYYYY;
function crearEstadisticasBase() {
    return {
        goles: 0,
        asistencias: 0,
        amarillas: 0,
        rojas: 0,
        presencias_sin_jugar: 0,
        titular: 0,
        suplente: 0,
        tipos_gol: { cabeza: 0, pie_jugada: 0, penal: 0, tiro_libre: 0, otros: 0 },
        tipos_asistencia: { cabeza: 0, pie_jugada: 0, corner: 0, tiro_libre: 0, otros: 0 },
        tipos_presencia_sin_jugar: { ganados: 0, empatados: 0, perdidos: 0 },
        director_tecnico: { ganados: 0, empatados: 0, perdidos: 0, goles_favor: 0, goles_contra: 0, esquemas: {} }
    };
}
function excelDateToJSDate(serial) {
    const days = Math.floor(serial);
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // 30 dic 1899
    // Sumar los días directamente
    const utcDate = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    // Crear un Date "limpio" en tu zona horaria (sin que se corra un día antes)
    return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
}
function formatDateDDMMYYYY(date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // meses empiezan en 0
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
}
