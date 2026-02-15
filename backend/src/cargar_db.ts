import * as XLSX from 'xlsx';
import Persona from './models/persona';
import Partido, { GolEnContra, GolFavor, GolRecibido } from './models/partido';
import path from 'path';
import fs from 'fs';

import mongoose from 'mongoose';
import connectDB from './db/db';

import { crearEstadisticasBase, EstadisticaDetalladaPorAnio, excelDateToJSDate, FilaJugador, FilaPartido, formatDateDDMMYYYY } from './db/utils_db';

//type FilaPartido = (string | number | null)[];

// Función helper para encontrar el archivo Excel en diferentes ubicaciones
export function encontrarArchivoExcel(nombreArchivo: string): string {
  // Rutas posibles donde puede estar el archivo
  const rutasPosibles = [
    path.join(__dirname, 'db', nombreArchivo), // Desde dist/ o src/
    path.join(__dirname, '../src/db', nombreArchivo), // Desde dist/ hacia src/
    path.join(__dirname, '../../src/db', nombreArchivo), // Desde dist/cargar_db.js hacia src/
    path.join(process.cwd(), 'backend/src/db', nombreArchivo), // Desde raíz del proyecto
    path.join(process.cwd(), 'src/db', nombreArchivo), // Desde backend/
  ];

  for (const ruta of rutasPosibles) {
    if (fs.existsSync(ruta)) {
      return ruta;
    }
  }

  throw new Error(`No se pudo encontrar el archivo ${nombreArchivo} en ninguna de las rutas posibles: ${rutasPosibles.join(', ')}`);
}

export async function cargar_jugadores() {
    // Leer el archivo (puede ser desde un buffer, archivo local o base64)
    // La función encontrarArchivoExcel busca el archivo en diferentes ubicaciones
    const filePath = encontrarArchivoExcel('Jugadores_Historico.xlsx');
    const workbook = XLSX.readFile(filePath); // para Node.js, archivo local

    // Obtener el nombre de la hoja que querés recorrer
    const nombreHoja = workbook.SheetNames[0]; // por ejemplo la primera hoja

    // Obtener la hoja
    const hoja = workbook.Sheets[nombreHoja];

    // Convertir la hoja a JSON (array de objetos)
    const datos = XLSX.utils.sheet_to_json<FilaJugador>(hoja);

    for (const fila of datos) {
      console.log(fila);
      const nombrePersona = fila['Nombre'];
        try {
          const tipos_gol = { "cabeza": 0, "pie_jugada": 0, "penal": 0, "tiro_libre": 0, 'otros': 0 };
          const tipos_asistencia = { "cabeza": 0, "pie_jugada": 0, "corner": 0, "tiro_libre": 0, 'otros': 0 };
          const tipos_presencia_sin_jugar = {"ganados": 0, "empatados": 0, "perdidos": 0};
          const director_tecnico = {"ganados": 0, "empatados": 0, "perdidos": 0, "esquemas": {}};
          const debut: Date = excelDateToJSDate(fila['Debut'] ? fila['Debut'] : 1);
          const debut_oficial: Date = excelDateToJSDate(fila['Debut Oficial'] ? fila['Debut Oficial'] : 1);
          const dorsal = fila['Dorsal'];
          const nuevaPersona = new Persona({ nombre: nombrePersona, goles: 0, tipos_gol: tipos_gol, asistencias: 0, 
                                            amarillas: 0, rojas: 0, presencias_sin_jugar: 0, 
                                            titular: 0, suplente: 0, tipos_asistencia: tipos_asistencia,
                                            tipos_presencias_sin_jugar: tipos_presencia_sin_jugar,
                                            director_tecnico: director_tecnico, debut: debut,
                                            debut_oficial: debut_oficial, dorsal: dorsal });
          await nuevaPersona.save();
          console.log(`Persona guardada: ${nombrePersona}`);
      } catch (error: any) {
        if (error.code === 11000) {
          console.warn(`Duplicado: ${nombrePersona} ya existe en la base de datos`);
        } else {
          console.error(`Error guardando ${nombrePersona}:`, error);
        }
      }
    }
}

export async function cargar_partidos() {
  // Leer el archivo (puede ser desde un buffer, archivo local o base64)
    // La función encontrarArchivoExcel busca el archivo en diferentes ubicaciones
    const filePath = encontrarArchivoExcel('Once_Historico.xlsx');
    console.log(`📂 Leyendo archivo desde: ${filePath}`);
    const workbook = XLSX.readFile(filePath); // para Node.js, archivo local

    // Obtener el nombre de la hoja que querés recorrer
    const nombreHoja = workbook.SheetNames[0]; // por ejemplo la primera hoja

    // Obtener la hoja
    const hoja = workbook.Sheets[nombreHoja];

    // Convertir la hoja a JSON (array de objetos)
    const datos = XLSX.utils.sheet_to_json<FilaPartido>(hoja);
    //const datos = XLSX.utils.sheet_to_json<FilaPartido>(hoja, {
    //  defval: null
    //}).filter(fila =>
    //  fila && Object.values(fila).some(v => v !== null)
    //);
    console.log(`📊 Total de partidos a procesar: ${datos.length}`);
    
    let partidosGuardados = 0;
    let partidosConError = 0;
    
    for (let index = 0; index < datos.length; index++) {
      const fila = datos[index];      
      const titulares = [ fila['Titular 1'], fila['Titular 2'], fila['Titular 3'], fila['Titular 4'], fila['Titular 5'], fila['Titular 6'], 
                        fila['Titular 7'], fila['Titular 8'], fila['Titular 9'], fila['Titular 10'], fila['Titular 11'] ].filter(Boolean);

      const suplentes = [fila['Suplente 1'], fila['Suplente 2'], fila['Suplente 3'], fila['Suplente 4'], fila['Suplente 5'], fila['Suplente 6'],
                        fila['Suplente 7'], fila['Suplente 8'], fila['Suplente 9'], fila['Suplente 10'], fila['Suplente 11'],
                        fila['Suplente 12'], fila['Suplente 13'], fila['Suplente 14'], fila['Suplente 15'] ].filter(Boolean).filter(jugador => !titulares.includes(jugador));

      const golesFavor: GolFavor[] = [];
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

      const golesRecibidos: GolRecibido[] = [];
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


      const golesEnContra: GolEnContra[] = [];
      if (fila['Gol en contra']) {
        golesEnContra.push({
          gol: fila['Gol en contra'],           // nombre del jugador
          tipo: fila['Tipo de gol en contra']   // tipo de gol
        });
      }

      const amarillas: string[] = [];
      for (let i = 1; i <= 5; i++) {
        const amarilla = fila[`Tarjeta amarilla ${i}`];
        if (amarilla) {
          amarillas.push(amarilla);
        }
      }

      const rojas: string[] = [];
      for (let i = 1; i <= 5; i++) {
        const roja = fila[`Tarjeta roja ${i}`];
        if (roja) {
          rojas.push(roja);
        }
      }

      const presencia_sin_jugar: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const jugador = fila[`Presencia sin jugar ${i}`];
        if (jugador) {
          presencia_sin_jugar.push(jugador);
        }
      }
      const resultado = fila[`Estado`];
      const director_tecnico = fila["Director Tecnico"] ?? "";
      const cantidad_goles_anotados = fila['Goles Brumario'];
      const cantidad_goles_recibidos = fila['Goles Recibidos'];
      const esquema = fila['Esquema Tactico']; 
      const hora = fila['Hora']

      const fecha: Date = excelDateToJSDate(fila['Fecha']);
      const tipo_partido = fila['Tipo de partido'];

      try {
        contar_estadisticas(resultado, golesFavor, amarillas, rojas, presencia_sin_jugar, titulares, suplentes, director_tecnico, golesEnContra, String(cantidad_goles_anotados), String(cantidad_goles_recibidos), esquema, fecha, tipo_partido);
        
        const nuevoPartido = new Partido({ nro: fila['Partido'], golesRecibidos: golesRecibidos, esquema_tactico: esquema, fecha: fecha, hora: hora, resultado: resultado, categoria: fila['Categoria'], director_tecnico: director_tecnico, tipo_partido: fila['Tipo de partido'], competicion: fila['Competicion'], jornada: fila['Jornada'], cancha: fila['Cancha'], predio: fila['Predio'], ubicacion: fila['Ubicacion'], rival: fila['Rival'], goles_favor: fila['Goles Brumario'], goles_contra: fila['Goles Recibidos'], titulares: titulares, suplentes: suplentes, golesFavor: golesFavor, golesEnContra: golesEnContra, amarillas: amarillas, rojas: rojas, presencia_sin_jugar: presencia_sin_jugar });
        await nuevoPartido.save();
        partidosGuardados++;
        
        // Mostrar progreso cada 50 partidos
        if ((index + 1) % 50 === 0) {
          console.log(`⏳ Progreso: ${index + 1}/${datos.length} partidos procesados (${partidosGuardados} guardados, ${partidosConError} errores)`);
        }
      } catch (error: any) {
        partidosConError++;
        if (error.code === 11000) {
          // Duplicado - continuar sin error
          partidosGuardados++; // Contar duplicados como "guardados"
        } else {
          console.error(`❌ Error guardando partido ${fila['Partido']} (índice ${index}):`, error.message);
          if (error.stack) {
            console.error('Stack trace:', error.stack);
          }
        }
      }
    }    
    console.log(`✅ Partidos procesados: ${datos.length} total, ${partidosGuardados} guardados, ${partidosConError} con errores`);
    console.log(`📊 Actualizando estadísticas de ${Object.keys(estadisticas).length} jugadores...`);
    let estadisticasActualizadas = 0;
    let estadisticasConError = 0;
    
    for (const [nombre, { goles, asistencias, amarillas, rojas, presencias_sin_jugar, titular, suplente, tipos_gol, tipos_asistencia, tipos_presencia_sin_jugar, director_tecnico,
                          titular_por_anio, suplente_por_anio, goles_por_anio, goles_cabeza_por_anio,
                          goles_tiro_libre_por_anio, goles_penal_por_anio, goles_otro_por_anio, goles_pie_por_anio,
                          asistencias_por_anio, asistencias_cabeza_por_anio, asistencias_corner_por_anio,
                          asistencias_pie_por_anio, asistencias_tiro_libre_por_anio, 
                          asistencias_otro_por_anio, presencias_sin_jugar_por_anio, presencias_sin_jugar_empatados_por_anio,
                          presencias_sin_jugar_ganados_por_anio, presencias_sin_jugar_perdidos_por_anio,
                          amarillas_por_anio, rojas_por_anio }] of Object.entries(estadisticas)) {
      const estadisticas_por_anio = { titular_por_anio, suplente_por_anio, goles_por_anio, goles_cabeza_por_anio, goles_pie_por_anio,
                                      goles_penal_por_anio, goles_tiro_libre_por_anio, goles_otro_por_anio, asistencias_por_anio,
                                      asistencias_pie_por_anio, asistencias_tiro_libre_por_anio, asistencias_corner_por_anio,
                                      asistencias_cabeza_por_anio, asistencias_otro_por_anio, presencias_sin_jugar_por_anio,
                                      presencias_sin_jugar_ganados_por_anio, presencias_sin_jugar_empatados_por_anio,
                                      presencias_sin_jugar_perdidos_por_anio, amarillas_por_anio, rojas_por_anio };
      try {
        await Persona.findOneAndUpdate(
          { nombre },
          { $inc: { goles, asistencias, amarillas, rojas,  presencias_sin_jugar, titular, suplente, 
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
              "director_tecnico.goles_contra": director_tecnico.goles_contra},
            $set: { "director_tecnico.esquemas": director_tecnico.esquemas },
                    estadisticas_por_anio},     
          { new: true }
        );
        estadisticasActualizadas++;
      } catch (err: any) {
        estadisticasConError++;
        console.error(`❌ Error actualizando estadísticas de ${nombre}:`, err.message || err);
        if (err.stack) {
          console.error('Stack trace:', err.stack);
        }
      }
    }
    
    console.log(`✅ Estadísticas actualizadas: ${estadisticasActualizadas} jugadores, ${estadisticasConError} errores`);
}

interface TiposGol {
  cabeza: number;
  pie_jugada: number;
  penal: number;
  tiro_libre: number;
  otros: number;
}
const tipoGolMap: Record<string, keyof TiposGol> = {
  "Pie (jugada)": "pie_jugada",
  "Penal": "penal",
  "Tiro Libre": "tiro_libre",
  "Cabeza": "cabeza",
  "Otros": "otros"
};
interface TiposAsistencia {
  cabeza: number;
  pie_jugada: number;
  corner: number;
  tiro_libre: number;
  otros: number;
}
const tipoAsistenciaMap: Record<string, keyof TiposAsistencia> = {
  "Pie (jugada)": "pie_jugada",
  "Córner": "corner",
  "Tiro Libre": "tiro_libre",
  "Cabeza": "cabeza",
  "Otros": "otros"
};

interface TiposPresenciasSinJugar {
  ganados: number;
  empatados: number;
  perdidos: number;
}

interface EsquemaInfo {
  partidos: number;
  puntos: number
} 

interface DirectorTecnico {
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;
  esquemas: { [formacion: string]: EsquemaInfo };
}

const estadisticas: Record<string, { goles: number, asistencias: number, 
                                    amarillas: number, rojas: number, presencias_sin_jugar: number,
                                    titular: number, suplente: number, tipos_gol: TiposGol,
                                    tipos_asistencia: TiposAsistencia, tipos_presencia_sin_jugar: TiposPresenciasSinJugar,
                                    director_tecnico: DirectorTecnico, goles_por_anio: EstadisticaDetalladaPorAnio,
                                    titular_por_anio: EstadisticaDetalladaPorAnio,
                                    suplente_por_anio: EstadisticaDetalladaPorAnio,
                                    goles_pie_por_anio: EstadisticaDetalladaPorAnio,
                                    goles_cabeza_por_anio: EstadisticaDetalladaPorAnio,
                                    goles_penal_por_anio: EstadisticaDetalladaPorAnio,
                                    goles_tiro_libre_por_anio: EstadisticaDetalladaPorAnio,
                                    goles_otro_por_anio: EstadisticaDetalladaPorAnio,
                                    asistencias_por_anio: EstadisticaDetalladaPorAnio,
                                    asistencias_pie_por_anio: EstadisticaDetalladaPorAnio,
                                    asistencias_tiro_libre_por_anio: EstadisticaDetalladaPorAnio,
                                    asistencias_corner_por_anio: EstadisticaDetalladaPorAnio,
                                    asistencias_cabeza_por_anio: EstadisticaDetalladaPorAnio,
                                    asistencias_otro_por_anio: EstadisticaDetalladaPorAnio,
                                    presencias_sin_jugar_por_anio: EstadisticaDetalladaPorAnio,
                                    presencias_sin_jugar_ganados_por_anio: EstadisticaDetalladaPorAnio,
                                    presencias_sin_jugar_empatados_por_anio: EstadisticaDetalladaPorAnio,
                                    presencias_sin_jugar_perdidos_por_anio: EstadisticaDetalladaPorAnio,
                                    amarillas_por_anio: EstadisticaDetalladaPorAnio,
                                    rojas_por_anio: EstadisticaDetalladaPorAnio }> = {};

function contar_estadisticas(
  resultado: string,
  golesFavor: GolFavor[],
  amarillas: Array<string>,
  rojas: Array<string>,
  presenciasSinJugar: Array<string>,
  titulares: Array<string>,
  suplentes: Array<string>,
  director_tecnico: string,
  golesContra: GolEnContra[],
  cantidad_goles_anotados: string,
  cantidad_goles_recibidos: string,
  esquema: string,
  fecha: Date,
  tipo_partido: string
) {
  // contar partidos jugados
  for (let nombreJugador of titulares) {
    if (!estadisticas[nombreJugador]) {
      estadisticas[nombreJugador] = crearEstadisticasBase();
    }
    estadisticas[nombreJugador].titular += 1;
    estadisticas[nombreJugador].titular_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreJugador].titular_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
    if (tipo_partido === 'Oficial') {
      estadisticas[nombreJugador].titular_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreJugador].titular_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
    }
    else if (tipo_partido === 'Amistoso') {
      estadisticas[nombreJugador].titular_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreJugador].titular_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
    }
  }

  for (let nombreJugador of suplentes) {
    if (!estadisticas[nombreJugador]) {
      estadisticas[nombreJugador] = crearEstadisticasBase();
    }
    estadisticas[nombreJugador].suplente += 1;
    estadisticas[nombreJugador].suplente_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreJugador].suplente_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;

    if(tipo_partido === 'Oficial') {
      estadisticas[nombreJugador].suplente_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreJugador].suplente_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
    }
    else if(tipo_partido === 'Amistoso') {
      estadisticas[nombreJugador].suplente_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreJugador].suplente_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
    }
  }

  // contar goles
  for (const gol of golesFavor) {
    const nombreGoleador = gol.gol; // en tu JSON el campo `gol` es el jugador
    const nombreAsistidor = gol.asistencia; 
    if (!estadisticas[nombreGoleador]) {
      estadisticas[nombreGoleador] = crearEstadisticasBase();
    }
    estadisticas[nombreGoleador].goles += 1;
    estadisticas[nombreGoleador].goles_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;

    if (tipo_partido === 'Oficial') {
      estadisticas[nombreGoleador].goles_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
    }
    else if (tipo_partido === 'Amistoso') {
      estadisticas[nombreGoleador].goles_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
    }

    const clave_gol = tipoGolMap[gol.tipo] ?? "otros"; // si no existe, va a "otros"
    estadisticas[nombreGoleador].tipos_gol[clave_gol] += 1;

    if (clave_gol === 'pie_jugada') {
      estadisticas[nombreGoleador].goles_pie_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_pie_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreGoleador].goles_pie_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_pie_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreGoleador].goles_pie_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_pie_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else if (clave_gol === 'cabeza') {
      estadisticas[nombreGoleador].goles_cabeza_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_cabeza_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreGoleador].goles_cabeza_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_cabeza_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreGoleador].goles_cabeza_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_cabeza_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else if (clave_gol === 'penal') {
      estadisticas[nombreGoleador].goles_penal_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_penal_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreGoleador].goles_penal_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_penal_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreGoleador].goles_penal_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_penal_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else if (clave_gol === 'tiro_libre') {
      estadisticas[nombreGoleador].goles_tiro_libre_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_tiro_libre_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreGoleador].goles_tiro_libre_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_tiro_libre_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreGoleador].goles_tiro_libre_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_tiro_libre_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else{
      estadisticas[nombreGoleador].goles_otro_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_otro_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreGoleador].goles_otro_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_otro_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreGoleador].goles_otro_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreGoleador].goles_otro_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }

    if (!estadisticas[nombreAsistidor]) {
      estadisticas[nombreAsistidor] = crearEstadisticasBase();
    }
    estadisticas[nombreAsistidor].asistencias += 1;
    const clave_asistencia = tipoAsistenciaMap[gol.tipoAsistencia] ?? "otros"; // si no existe, va a "otros"
    estadisticas[nombreAsistidor].tipos_asistencia[clave_asistencia] += 1;
    estadisticas[nombreAsistidor].asistencias_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;

    if (clave_asistencia === 'pie_jugada') {
      estadisticas[nombreAsistidor].asistencias_pie_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_pie_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreAsistidor].asistencias_pie_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_pie_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreAsistidor].asistencias_pie_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_pie_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else if (clave_asistencia === 'tiro_libre') {
      estadisticas[nombreAsistidor].asistencias_tiro_libre_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_tiro_libre_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreAsistidor].asistencias_tiro_libre_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_tiro_libre_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreAsistidor].asistencias_tiro_libre_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_tiro_libre_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else if (clave_asistencia === 'corner') {
      estadisticas[nombreAsistidor].asistencias_corner_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_corner_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreAsistidor].asistencias_corner_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_corner_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreAsistidor].asistencias_corner_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_corner_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else if (clave_asistencia === 'cabeza') {
      estadisticas[nombreAsistidor].asistencias_cabeza_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_cabeza_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreAsistidor].asistencias_cabeza_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_cabeza_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreAsistidor].asistencias_cabeza_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_cabeza_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      } 
    }
    else{
      estadisticas[nombreAsistidor].asistencias_otro_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_otro_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[nombreAsistidor].asistencias_otro_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_otro_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[nombreAsistidor].asistencias_otro_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[nombreAsistidor].asistencias_otro_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
  }

  for (const jugadorAmarilla of amarillas) {
    if (!estadisticas[jugadorAmarilla]) {
      estadisticas[jugadorAmarilla] = crearEstadisticasBase();
    }
    estadisticas[jugadorAmarilla].amarillas += 1;
    estadisticas[jugadorAmarilla].amarillas_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[jugadorAmarilla].amarillas_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
    if (tipo_partido === 'Oficial') {
      estadisticas[jugadorAmarilla].amarillas_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[jugadorAmarilla].amarillas_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
    }
    else if (tipo_partido === 'Amistoso') {
      estadisticas[jugadorAmarilla].amarillas_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[jugadorAmarilla].amarillas_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
    }
  }

  for (const jugadorRoja of rojas) {
    if (!estadisticas[jugadorRoja]) {
      estadisticas[jugadorRoja] = crearEstadisticasBase();
    }
    estadisticas[jugadorRoja].rojas += 1;
    estadisticas[jugadorRoja].rojas_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[jugadorRoja].rojas_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
    if (tipo_partido === 'Oficial') {
      estadisticas[jugadorRoja].rojas_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[jugadorRoja].rojas_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
    }
    else if (tipo_partido === 'Amistoso') {
      estadisticas[jugadorRoja].rojas_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[jugadorRoja].rojas_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
    }
  }

  for (const jugadorSinJugar of presenciasSinJugar) {
    if (!estadisticas[jugadorSinJugar]) {
      estadisticas[jugadorSinJugar] = crearEstadisticasBase();
    }
    estadisticas[jugadorSinJugar].presencias_sin_jugar += 1;
    estadisticas[jugadorSinJugar].presencias_sin_jugar_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
    if (tipo_partido === 'Oficial') {
      estadisticas[jugadorSinJugar].presencias_sin_jugar_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
    }
    else if (tipo_partido === 'Amistoso') {
      estadisticas[jugadorSinJugar].presencias_sin_jugar_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
    } 
    if (resultado == 'Ganado') {
      estadisticas[jugadorSinJugar].tipos_presencia_sin_jugar.ganados += 1;
      estadisticas[jugadorSinJugar].presencias_sin_jugar_ganados_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_ganados_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[jugadorSinJugar].presencias_sin_jugar_ganados_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_ganados_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[jugadorSinJugar].presencias_sin_jugar_ganados_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_ganados_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else if (resultado == 'Empatado') {
      estadisticas[jugadorSinJugar].tipos_presencia_sin_jugar.empatados += 1;
      estadisticas[jugadorSinJugar].presencias_sin_jugar_empatados_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_empatados_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[jugadorSinJugar].presencias_sin_jugar_empatados_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_empatados_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[jugadorSinJugar].presencias_sin_jugar_empatados_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_empatados_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
    else {
      estadisticas[jugadorSinJugar].tipos_presencia_sin_jugar.perdidos += 1;
      estadisticas[jugadorSinJugar].presencias_sin_jugar_perdidos_por_anio.total_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_perdidos_por_anio.total_por_anio[fecha.getFullYear()] || 0) + 1;
      if (tipo_partido === 'Oficial') {
        estadisticas[jugadorSinJugar].presencias_sin_jugar_perdidos_por_anio.oficial_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_perdidos_por_anio.oficial_por_anio[fecha.getFullYear()] || 0) + 1;
      }
      else if (tipo_partido === 'Amistoso') {
        estadisticas[jugadorSinJugar].presencias_sin_jugar_perdidos_por_anio.amistoso_por_anio[fecha.getFullYear()] = (estadisticas[jugadorSinJugar].presencias_sin_jugar_perdidos_por_anio.amistoso_por_anio[fecha.getFullYear()] || 0) + 1;
      }
    }
  }
  if (director_tecnico) {
    if (!estadisticas[director_tecnico]) {
      if (director_tecnico.includes('/')) {
        let directores_tecnicos = director_tecnico.split('/');
        for (const tecnico of directores_tecnicos) {
          if (!estadisticas[tecnico]) {  
            estadisticas[tecnico] = crearEstadisticasBase();
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
              estadisticas[tecnico].director_tecnico.esquemas[esquema] = { partidos: 0, puntos: 0};
          }
          estadisticas[tecnico].director_tecnico.esquemas[esquema].partidos += 1;
          if (resultado == 'Ganado') {
            estadisticas[tecnico].director_tecnico.ganados +=  1;  
            estadisticas[tecnico].director_tecnico.esquemas[esquema].puntos += 3;
          }
          else if (resultado == 'Perdido') {
            estadisticas[tecnico].director_tecnico.perdidos +=  1;
          }
          else {
            estadisticas[tecnico].director_tecnico.empatados +=  1;
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
        estadisticas[director_tecnico].director_tecnico.esquemas[esquema] = { partidos: 0, puntos: 0};
      }
      estadisticas[director_tecnico].director_tecnico.esquemas[esquema].partidos += 1;
      if (resultado == 'Ganado') {
        estadisticas[director_tecnico].director_tecnico.ganados +=  1;
        estadisticas[director_tecnico].director_tecnico.esquemas[esquema].puntos += 3;
      }
      else if (resultado == 'Empatado') {
        estadisticas[director_tecnico].director_tecnico.empatados +=  1;
        estadisticas[director_tecnico].director_tecnico.esquemas[esquema].puntos += 1;
      }
      else {
        estadisticas[director_tecnico].director_tecnico.perdidos += 1;
      }
    }
  }
 
}


async function main() {
  try {
    await connectDB(); // esperar conexión antes de cargar datos
    await cargar_jugadores();
    console.log('✅ Base de datos cargada correctamente.');
    await cargar_partidos()
    console.log('✅ Base de datos cargada correctamente.');
  } catch (error) {
    console.error('❌ Error cargando la base de datos:', error);
  } finally {
    await mongoose.disconnect(); // cerrar conexión al final
  }
}

// Solo ejecutar main() si se ejecuta directamente el archivo (no cuando se importa)
if (require.main === module) {
  main();
}
