import mongoose from 'mongoose';
import connectDB from './db/db';
import Persona from './models/persona';
import Partido from './models/partido';
import { cargar_jugadores, cargar_partidos } from './cargar_db';

async function inicializarBaseDatos() {
  try {
    console.log('🔄 Iniciando inicialización de base de datos...');
    
    await connectDB();
    
    // Verificar si la base de datos ya tiene datos
    const totalPersonas = await Persona.countDocuments();
    const totalPartidos = await Partido.countDocuments();
    
    console.log(`📊 Estado actual: ${totalPersonas} personas, ${totalPartidos} partidos`);
    
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
  setTimeout(() => {
    inicializarBaseDatos().catch(err => {
      console.error('Error en inicialización de BD:', err);
    });
  }, 10000); // Esperar 10 segundos para que el servidor esté completamente listo
}

