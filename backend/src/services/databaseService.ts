import Partido, { GolFavor } from "../models/partido";
import { IPartido } from "../models/partido";
import Persona from "../models/persona"; // tu modelo de Mongoose
import { cargar_jugadores, cargar_partidos } from "../cargar_db";

export const resetDB = async () => {
  try {
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

  } catch (error) {
    throw new Error("Error al resetear la base de datos: " + error);
  }
};