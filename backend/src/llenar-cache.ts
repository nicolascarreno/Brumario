import { getPartidoDetalles, getPartidos } from "./services/partidosService";
import { getJugadores, getJugadoresDetalles } from "./services/jugadoresService";
import Persona from "./models/persona";

const jugadoresPredeterminado = [ "Alberto, Gustavo",
                    "Appe, Pablo", 
                    "Bassedas, Santiago",
                    "Cáceres Monges, José Luis",
                    "Carballo, Leandro",
                    "Carreño, Nicolás",
                    "Carvalho, Martín",
                    "Córdoba, Darío",
                    "Cuevas, Matías Santiago",
                    "Dall' Armellina, Alejandro",
                    "Daneluk, Octavio",
                    "Danilov, Mariano",
                    "De Bernardi, Nahuel",
                    "De Marco, Adriano",
                    "De Marco, Augusto",
                    "Herjo, Facundo",
                    "Kitroser, Ariel",
                    "Labiaguerre, Julián",
                    "Lacava, Hernán",
                    "Lacava, Valentino",
                    "Mayada Fabbri, Gastón",
                    "Montenegro Fabbri, Bautista",
                    "Mulfetti, Matías",
                    "Palacios, Federico",
                    "Pensotti, Tomás",
                    "Prado, Demián Gabriel",
                    "Raspall, Tomás",
                    "Revale, Andrés",
                    "Rodríguez, Agustín",
                    "Vilariño, Manuel",
                    "Villarreal, Adrián",
                    "Villarreal, Pablo",
                    "Villaverde, Martín",
                    "Yafar, Yamil", 
                    "Zenobi, Laureano"]


export async function llenarCache() {
    let jugadores: string[] = [];
    try {
        const jugadoresCompleto = await Persona.find({}, {nombre: 1, _id: 0});
        for (const jugador of jugadoresCompleto) {
            jugadores.push(jugador.nombre)
        }
        console.log("Cargando todos los jugadores de la base de datos...")    
    }catch (error) {
        jugadores = jugadoresPredeterminado
        console.log("Error: no se pudieron obtener los jugadores de la base de datos para cargarlos a la cache, se usará la lista predeterminada")    
    }
    try {
        await getPartidos();
        console.log("getPartidos cargado al cache") 
    }
    catch (error) { 
        console.log("Error al llenar getPartidos: ", error) 
    }

    try {
        await getJugadores();
        console.log("getJugadores cargado al cache") 
    }
    catch (error) { 
        console.log("Error al llenar getJugadores: ", error) 
    }
    for (const jugador of jugadores) {
        try {
            await getJugadoresDetalles(jugador);
            console.log("getJugadoresDetalles: ", jugador, " cargado al cache") 
        }
        catch (error) { 
            console.log("Error al llenar getJugadoresDetalles: ", jugador, error) 
        }    
    }
}