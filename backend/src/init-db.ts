import mongoose from 'mongoose';
import * as XLSX from 'xlsx';
import connectDB from './db/db';
import Persona from './models/persona';
import Partido from './models/partido';
import { cargar_jugadores, cargar_partidos, encontrarArchivoExcel } from './cargar_db';
import { FilaJugador, FilaPartido } from './db/utils_db';
import { llenarCache } from './llenar-cache'

function contar_partidos () {
  const filePath = encontrarArchivoExcel('Once_Historico.xlsx');
  console.log(`📂 Leyendo archivo desde: ${filePath}`);
  const workbook = XLSX.readFile(filePath); // para Node.js, archivo local

  // Obtener el nombre de la hoja que querés recorrer
  const nombreHoja = workbook.SheetNames[0]; // por ejemplo la primera hoja

  // Obtener la hoja
  const hoja = workbook.Sheets[nombreHoja];

  // Convertir la hoja a JSON (array de objetos)
  const datos = XLSX.utils.sheet_to_json<FilaPartido>(hoja);
  console.log(`📊 Total de partidos a procesar: ${datos.length}`);
  return datos.length;
}

function contar_jugadores () {
  const filePath = encontrarArchivoExcel('Jugadores_Historico.xlsx');
  const workbook = XLSX.readFile(filePath); // para Node.js, archivo local

  // Obtener el nombre de la hoja que querés recorrer
  const nombreHoja = workbook.SheetNames[0]; // por ejemplo la primera hoja

  // Obtener la hoja
  const hoja = workbook.Sheets[nombreHoja];

  // Convertir la hoja a JSON (array de objetos)
  const datos = XLSX.utils.sheet_to_json<FilaJugador>(hoja);
  return datos.length;
}

async function inicializarBaseDatos() {
  try {
    console.log('🔄 Iniciando inicialización de base de datos...');
    
    await connectDB();
    
    // Verificar si la base de datos ya tiene datos
    const totalPersonas = await Persona.countDocuments();
    const totalPartidos = await Partido.countDocuments();
    
    console.log(`📊 Estado actual: ${totalPersonas} personas, ${totalPartidos} partidos`);

    if (totalPersonas === contar_jugadores() && totalPartidos === contar_partidos()) {
      console.log('✅ La base de datos ya está inicializada correctamente. No se requiere acción.');
      return;
    }
    
    // Solo resetear si la base está vacía o tiene muy pocos datos (probablemente falló el reset anterior)

    console.log('🗑️  Base de datos vacía o incompleta, iniciando reset...');
    
    // Vaciar base de datos
    console.log('🗑️  Vaciando colección de Personas...');
    const personasEliminadas = await Persona.deleteMany({});
    console.log(`✅ ${personasEliminadas.deletedCount} personas eliminadas`);
    
    console.log('🗑️  Vaciando colección de Partidos...');
    const partidosEliminados = await Partido.deleteMany({});
    console.log(`✅ ${partidosEliminados.deletedCount} partidos eliminados`);
    
    // Cargar datos
    console.log('📥 Cargando jugadores...');
    await cargar_jugadores();
    const totalJugadores = await Persona.countDocuments();
    console.log(`✅ Jugadores cargados correctamente. Total: ${totalJugadores}`);
    
    console.log('📥 Cargando partidos...');
    await cargar_partidos();
    const totalPartidosFinal = await Partido.countDocuments();
    console.log(`✅ Partidos cargados correctamente. Total: ${totalPartidosFinal}`);
    
    // Verificar estadísticas de jugadores
    const jugadoresConEstadisticas = await Persona.countDocuments({ 
      $or: [
        { goles: { $gt: 0 } },
        { asistencias: { $gt: 0 } },
        { titular: { $gt: 0 } },
        { suplente: { $gt: 0 } }
      ]
    });
    console.log(`📊 Jugadores con estadísticas actualizadas: ${jugadoresConEstadisticas}`);
    
    console.log('✅ Base de datos inicializada correctamente.');

  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack);
    }
    // No lanzar error para que el servidor pueda iniciar igual
  }
}

// Exportar la función para uso opcional
export { inicializarBaseDatos };

// Ejecutar automáticamente cuando se importa en producción
if (process.env.NODE_ENV === 'production') {
  // Esperar un poco antes de ejecutar para que el servidor esté listo
  setTimeout(async () => {
    await inicializarBaseDatos();
    await llenarCache();
  }, 10000); // Esperar 10 segundos para que el servidor esté completamente listo
}

