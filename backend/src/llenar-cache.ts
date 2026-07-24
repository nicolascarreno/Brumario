import { getPartidoDetalles, getPartidos } from "./services/partidosService";

export async function llenarCache() {
    try {
        await getPartidos();
        console.log("getPartidos cargado al cache") 
    }
    catch (error) { 
        console.log("Error al llenar getPartidos: ", error) 
    }
}