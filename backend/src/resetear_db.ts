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
    console.log('🗑️  Vaciamdo colección de Personas...');
    const personasEliminadas = await Persona.deleteMany({});
    console.log(`✅ ${personasEliminadas.deletedCount} personas eliminadas`);
    
    console.log('🗑️  Vaciamdo colección de Partidos...');
    const partidosEliminados = await Partido.deleteMany({});
    console.log(`✅ ${partidosEliminados.deletedCount} partidos eliminados`);
    
    // Cargar datos
    console.log('📥 Cargando jugadores...');
    await cargar_jugadores();
    console.log('✅ Jugadores cargados correctamente.');
    
    console.log('📥 Cargando partidos...');
    await cargar_partidos();
    console.log('✅ Partidos cargados correctamente.');
    
    console.log('✅ Base de datos reseteada y cargada correctamente.');
  } catch (error) {
    console.error('❌ Error reseteando la base de datos:', error);
    throw error;
  } finally {
    await mongoose.disconnect(); // cerrar conexión al final
  }
}

resetearBaseDatos();

