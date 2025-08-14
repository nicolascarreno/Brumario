import * as XLSX from 'xlsx';
import Persona from './models/persona';
import Partido, { GolEnContra, GolFavor } from './models/partido';

import mongoose from 'mongoose';
import connectDB from './db';

import { FilaJugador, FilaPartido2 } from './db/utils_db';

//type FilaPartido = (string | number | null)[];

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
    const workbook = XLSX.readFile('./src/db/Once_Historico2.xlsx'); // para Node.js, archivo local

    // Obtener el nombre de la hoja que querés recorrer
    const nombreHoja = workbook.SheetNames[0]; // por ejemplo la primera hoja

    // Obtener la hoja
    const hoja = workbook.Sheets[nombreHoja];

    // Convertir la hoja a JSON (array de objetos)
    const datos = XLSX.utils.sheet_to_json<FilaPartido2>(hoja);

    for (const fila of datos) {
      
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

      try {
        const nuevoPartido = new Partido({ nro: fila['Partido'], categoria: fila['Categoria'], tipo_partido: fila['Tipo de partido'], competicion: fila['Competicion'], jornada: fila['Jornada'], cancha: fila['Cancha'], predio: fila['Predio'], ubicacion: fila['Ubicacion'], rival: fila['Rival'], goles_favor: fila['Goles Brumario'], goles_contra: fila['Goles Recibidos'], titulares: titulares, suplentes: suplentes, golesFavor: golesFavor, golesEnContra: golesEnContra, amarillas: amarillas, rojas: rojas, presencia_sin_jugar: presencia_sin_jugar });
        await nuevoPartido.save();
        console.log(`Partido guardado: ${nuevoPartido}`);
      } catch (error: any) {
        if (error.code === 11000) {
          console.warn(`Duplicado: el partido ${fila['Partido']} ya existe en la base de datos`);
        } else {
          console.error(`Error guardando ${fila['Partido']}:`, error);
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
