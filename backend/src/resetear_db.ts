import mongoose from 'mongoose';
import connectDB from './db/db';
import Persona from './models/persona';
import Partido from './models/partido';
import { cargar_jugadores, cargar_partidos } from './cargar_db';

async function resetearBaseDatos() {
  try {
    await connectDB(); // esperar conexión antes de resetear datos
    
    console.log('🔄 Iniciando reset de base de datos...');
    
    // Vaciar base de datos
    console.log('🗑️  Vaciando colección de Personas...');
    const personasEliminadas = await Persona.deleteMany({});
    console.log(`✅ ${personasEliminadas.deletedCount} personas eliminadas`);
    
    console.log('🗑️  Vaciando colección de Partidos...');
    const partidosEliminados = await Partido.deleteMany({});
    console.log(`✅ ${partidosEliminados.deletedCount} partidos eliminados`);
    
    // Cargar datos
    console.log('📥 Cargando jugadores...');
    try {
      await cargar_jugadores();
      const totalJugadores = await Persona.countDocuments();
      console.log(`✅ Jugadores cargados correctamente. Total: ${totalJugadores}`);
    } catch (error) {
      console.error('❌ Error cargando jugadores:', error);
      throw error;
    }
    
    console.log('📥 Cargando partidos...');
    try {
      await cargar_partidos();
      const totalPartidos = await Partido.countDocuments();
      console.log(`✅ Partidos cargados correctamente. Total: ${totalPartidos}`);
    } catch (error) {
      console.error('❌ Error cargando partidos:', error);
      throw error;
    }
    
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
    
    console.log('✅ Base de datos reseteada y cargada correctamente.');
  } catch (error) {
    console.error('❌ Error reseteando la base de datos:', error);
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect(); // cerrar conexión al final
  }
}

resetearBaseDatos();

