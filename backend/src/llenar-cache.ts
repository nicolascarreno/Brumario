import { getPartidoDetalles, getPartidos } from "./services/partidosService";
import { getJugadores } from "./services/jugadoresService";

export async function llenarCache() {
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
}