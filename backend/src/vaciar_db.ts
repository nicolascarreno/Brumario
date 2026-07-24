import mongoose from 'mongoose';
import connectDB from './db/db';
import Persona from './models/persona';
import Partido from './models/partido';

import "./config/env"
import { Redis } from "@upstash/redis";
 

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function vaciarBaseDatos() {
  try {
    await connectDB(); // esperar conexión antes de vaciar datos
    
    console.log('🗑️  Vaciamdo colección de Personas...');
    const personasEliminadas = await Persona.deleteMany({});
    console.log(`✅ ${personasEliminadas.deletedCount} personas eliminadas`);
    
    console.log('🗑️  Vaciamdo colección de Partidos...');
    const partidosEliminados = await Partido.deleteMany({});
    console.log(`✅ ${partidosEliminados.deletedCount} partidos eliminados`);
    
    console.log('✅ Base de datos vaciada correctamente.');

    await redis.flushdb();
  } catch (error) {
    console.error('❌ Error vaciando la base de datos:', error);
    throw error;
  } finally {
    await mongoose.disconnect(); // cerrar conexión al final
  }
}

vaciarBaseDatos();