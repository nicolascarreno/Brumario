export function crearEstadisticasBase() {
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

export function excelDateToJSDate(serial: number): Date {
  const days = Math.floor(serial);
  const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // 30 dic 1899

  // Sumar los días directamente
  const utcDate = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);

  // Crear un Date "limpio" en tu zona horaria (sin que se corra un día antes)
  return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
}


export function formatDateDDMMYYYY(date: Date): string {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0'); // meses empiezan en 0
  const anio = date.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

export interface FilaJugador {
    Nombre: string;  // nombre exacto de la columna
}

export interface FilaPartido {
    [key: string]: any;
    'Partido': number;  // nombre exacto de la columna
    'Fecha': number;
    'Hora': string;
    'Categoria': string;
    'Tipo de partido': string;
    'Competicion': string;
    'Jornada': number;
    'Cancha': string;
    'Predio': string;
    'Ubicacion': string;
    'Rival': string;
    'Goles Brumario': string;
    'Goles Recibidos': string;
    'Estado': string;
    'Esquema Tactico': string;
    'Director Tecnico': string;

    'Titular 1': string;
    'Titular 2': string;
    'Titular 3': string;
    'Titular 4': string;
    'Titular 5': string;
    'Titular 6': string;
    'Titular 7': string;
    'Titular 8': string;
    'Titular 9': string;
    'Titular 10': string;
    'Titular 11': string;

    'Suplente 1': string;
    'Suplente 2': string;
    'Suplente 3': string;
    'Suplente 4': string;
    'Suplente 5': string;
    'Suplente 6': string;
    'Suplente 7': string;
    'Suplente 8': string;
    'Suplente 9': string;
    'Suplente 10': string;
    'Suplente 11': string;
    'Suplente 12': string;
    'Suplente 13': string;
    'Suplente 14': string;
    'Suplente 15': string;

    'Gol a favor 1': string;
    'Tipo de gol 1': string;
    'Resultado parcial gol 1': string;
    'Asistencia de gol 1': string;
    'Tipo de asistencia de gol 1': string;

    'Gol a favor 2': string;
    'Tipo de gol 2': string;
    'Resultado parcial gol 2': string;
    'Asistencia de gol 2': string;
    'Tipo de asistencia de gol 2': string;

    'Gol a favor 3': string;
    'Tipo de gol 3': string;
    'Resultado parcial gol 3': string;
    'Asistencia de gol 3': string;
    'Tipo de asistencia de gol 3': string;

    'Gol a favor 4': string;
    'Tipo de gol 4': string;
    'Resultado parcial gol 4': string;
    'Asistencia de gol 4': string;
    'Tipo de asistencia de gol 4': string;

    'Gol a favor 5': string;
    'Tipo de gol 5': string;
    'Resultado parcial gol 5': string;
    'Asistencia de gol 5': string;
    'Tipo de asistencia de gol 5': string;

    'Gol a favor 6': string;
    'Tipo de gol 6': string;
    'Resultado parcial gol 6': string;
    'Asistencia de gol 6': string;
    'Tipo de asistencia de gol 6': string;

    'Gol a favor 7': string;
    'Tipo de gol 7': string;
    'Resultado parcial gol 7': string;
    'Asistencia de gol 7': string;
    'Tipo de asistencia de gol 7': string;

    'Gol en contra': string;
    'Tipo de gol en contra': string;

    'Tarjeta amarilla 1': string;
    'Tarjeta amarilla 2': string;
    'Tarjeta amarilla 3': string;
    'Tarjeta amarilla 4': string;
    'Tarjeta amarilla 5': string;
    'Tarjeta amarilla 6': string;
    'Tarjeta amarilla 7': string;
    'Tarjeta amarilla 8': string;
    'Tarjeta amarilla 9': string;
    'Tarjeta amarilla 10': string;
    'Tarjeta amarilla 11': string;

    'Tarjeta roja 1': string;
    'Tarjeta roja 2': string;
    'Tarjeta roja 3': string;
    'Tarjeta roja 4': string;
    'Tarjeta roja 5': string;

    'Presencia sin jugar 1': string;
    'Presencia sin jugar 2': string;
    'Presencia sin jugar 3': string;
    'Presencia sin jugar 4': string;
    'Presencia sin jugar 5': string;
    'Presencia sin jugar 6': string;
    'Presencia sin jugar 7': string;
    'Presencia sin jugar 8': string;
    'Presencia sin jugar 9': string;
    'Presencia sin jugar 10': string;
    'Presencia sin jugar 11': string;
    'Presencia sin jugar 12': string;
    'Presencia sin jugar 13': string;
    'Presencia sin jugar 14': string;
    'Presencia sin jugar 15': string;
    'Presencia sin jugar 16': string;
    'Presencia sin jugar 17': string;
    'Presencia sin jugar 18': string;
    'Presencia sin jugar 19': string;
    'Presencia sin jugar 20': string;
}