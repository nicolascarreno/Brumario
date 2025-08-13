import * as XLSX from 'xlsx';
import Persona from './models/persona';
import Partido from './models/partido';

import mongoose from 'mongoose';
import connectDB from './db';

interface FilaJugador {
  Nombre: string;  // nombre exacto de la columna
}

type FilaPartido = (string | number | null)[];

export async function cargar_jugadores() {
    // Leer el archivo (puede ser desde un buffer, archivo local o base64)
    const workbook = XLSX.readFile('./src/db/Jugadores_Historico.xlsx'); // para Node.js, archivo local

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
          const nuevaPersona = new Persona({ name: nombrePersona });
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
    const workbook = XLSX.readFile('./src/db/Once_Historico.xlsx'); // para Node.js, archivo local

    // Obtener el nombre de la hoja que querés recorrer
    const nombreHoja = workbook.SheetNames[3]; // por ejemplo la primera hoja

    // Obtener la hoja
    const hoja = workbook.Sheets[nombreHoja];

    // Convertir la hoja a JSON (array de objetos)
    const datos = XLSX.utils.sheet_to_json<FilaPartido>(hoja, { header: 1 });

    for (const fila of datos) {
      //console.log(fila);

      const nroPartido = fila[0];
      const categoria = fila[3];
      const tipoPartido = fila[4];
      const competicion = fila[5]
        try {
          const nuevoPartido = new Partido({ name: nroPartido, categoria: categoria, tipo_partido: tipoPartido, competicion: competicion });
          await nuevoPartido.save();
          console.log(`Partido guardado: ${nroPartido}`);
      } catch (error: any) {
        if (error.code === 11000) {
          console.warn(`Duplicado: ${nroPartido} ya existe en la base de datos`);
        } else {
          console.error(`Error guardando ${nroPartido}:`, error);
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
  
main();
