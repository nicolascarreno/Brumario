import { actualizarRachaGanados, actualizarRachaInvicta, actualizarRachaPerdidos, actualizarRachaSinGanar, crearHitoBase, crearHitoRachaBase, HitoPartido, HitoRacha, parseGoles } from "./utils_service";
import { IPartido } from "../../models/partido"

export function hitos(partidosLibres: IPartido[], partidosSenior: IPartido[]){
  let mayorVictoriaLibres: HitoPartido = crearHitoBase();
  let mayorDerrotaLibres: HitoPartido = crearHitoBase();
  let masGolesLibres: HitoPartido = crearHitoBase();
  let rachaInvictaLibres: HitoRacha = crearHitoRachaBase();
  let rachaGanadosLibres: HitoRacha = crearHitoRachaBase();
  let rachaSinGanarLibres: HitoRacha = crearHitoRachaBase();  
  let rachaPerdidosLibres: HitoRacha = crearHitoRachaBase();
  let ganadosLibres = 0;
  let empatadosLibres = 0;
  let perdidosLibres = 0;
  let masPresenciasSinJugarPartidoLibres: HitoPartido = crearHitoBase();
  let masPresenciasSinJugarCantidadLibres = 0;

  let mayorVictoriaSenior: HitoPartido = crearHitoBase();
  let mayorDerrotaSenior: HitoPartido = crearHitoBase();
  let masGolesSenior: HitoPartido = crearHitoBase();
  let rachaInvictaSenior: HitoRacha = crearHitoRachaBase();
  let rachaGanadosSenior: HitoRacha = crearHitoRachaBase();
  let rachaSinGanarSenior: HitoRacha = crearHitoRachaBase();  
  let rachaPerdidosSenior: HitoRacha = crearHitoRachaBase();
  let ganadosSenior = 0;
  let empatadosSenior = 0;
  let perdidosSenior = 0;
  let masPresenciasSinJugarCantidadSenior = 0;
  let masPresenciasSinJugarPartidoSenior: HitoPartido = crearHitoBase();

  let rachaInvictaActual: HitoRacha = crearHitoRachaBase();
  let rachaGanadosActual: HitoRacha = crearHitoRachaBase();
  let rachaSinGanarActual: HitoRacha = crearHitoRachaBase();
  let rachaPerdidosActual: HitoRacha = crearHitoRachaBase();

  for (const partido of partidosLibres){
    const mayor_victoria = parseGoles(mayorVictoriaLibres.golesBrumario) - parseGoles(mayorVictoriaLibres.golesRecibidos);
    const mayor_derrota = parseGoles(mayorDerrotaLibres.golesBrumario) - parseGoles(mayorDerrotaLibres.golesRecibidos)
    const mas_goles = parseGoles(masGolesLibres.golesBrumario) + parseGoles(masGolesLibres.golesRecibidos) 
    const dif_resultado = parseGoles(partido.goles_favor) - parseGoles(partido.goles_contra);
    const goles_partido = parseGoles(partido.goles_contra) + parseGoles(partido.goles_favor);
    if (mayor_victoria < dif_resultado && dif_resultado > 0) {
      mayorVictoriaLibres = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (mayor_derrota > dif_resultado && dif_resultado < 0) {
      mayorDerrotaLibres = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (mas_goles < goles_partido) {
      masGolesLibres = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (partido.presencia_sin_jugar.length > masPresenciasSinJugarCantidadLibres) {
      masPresenciasSinJugarPartidoLibres = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      masPresenciasSinJugarCantidadLibres = partido.presencia_sin_jugar.length
    }
    if (partido.resultado == "Ganado"){
      ganadosLibres += 1;
    }
    else if (partido.resultado == "Empatado"){
      empatadosLibres += 1;
    }
    else {
      perdidosLibres += 1;
    }

    const resultadoRacha = actualizarRachaInvicta(
        { ...rachaInvictaActual },
        { ...rachaInvictaLibres },
        partido
      );
      rachaInvictaActual = resultadoRacha.rachaActual;
      rachaInvictaLibres = resultadoRacha.rachaMaxima;
    
      const resultadoRachaGanados = actualizarRachaGanados(
        { ...rachaGanadosActual },
        { ...rachaGanadosLibres },
        partido
      );
      rachaGanadosActual = resultadoRachaGanados.rachaActual;
      rachaGanadosLibres = resultadoRachaGanados.rachaMaxima;
    
      const resultadoRachaSinGanar = actualizarRachaSinGanar(
        { ...rachaSinGanarActual },
        { ...rachaSinGanarLibres },
        partido
      );
      rachaSinGanarActual = resultadoRachaSinGanar.rachaActual;
      rachaSinGanarLibres = resultadoRachaSinGanar.rachaMaxima;
    
      const resultadoRachaPerdidos = actualizarRachaPerdidos(
        { ...rachaPerdidosActual },
        { ...rachaPerdidosLibres },
        partido
      );
      rachaPerdidosActual = resultadoRachaPerdidos.rachaActual;
      rachaPerdidosLibres = resultadoRachaPerdidos.rachaMaxima;
  }

  rachaInvictaActual = crearHitoRachaBase();
  rachaGanadosActual = crearHitoRachaBase();
  rachaSinGanarActual = crearHitoRachaBase();
  rachaPerdidosActual = crearHitoRachaBase(); 

  for (const partido of partidosSenior){
    const mayor_victoria = parseGoles(mayorVictoriaSenior.golesBrumario) - parseGoles(mayorVictoriaSenior.golesRecibidos);
    const mayor_derrota = parseGoles(mayorDerrotaSenior.golesBrumario) - parseGoles(mayorDerrotaSenior.golesRecibidos)
    const mas_goles = parseGoles(masGolesSenior.golesBrumario) + parseGoles(masGolesSenior.golesRecibidos) 
    const dif_resultado = parseGoles(partido.goles_favor) - parseGoles(partido.goles_contra);
    const goles_partido = parseGoles(partido.goles_contra) + parseGoles(partido.goles_favor);
    if (mayor_victoria < dif_resultado && dif_resultado > 0) {
      mayorVictoriaSenior = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (mayor_derrota > dif_resultado && dif_resultado < 0) {
      mayorDerrotaSenior = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (mas_goles < goles_partido) {
      masGolesSenior = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (partido.presencia_sin_jugar.length > masPresenciasSinJugarCantidadSenior) {
      masPresenciasSinJugarPartidoSenior = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      masPresenciasSinJugarCantidadSenior = partido.presencia_sin_jugar.length;
    }
    if (partido.resultado == "Ganado"){
      ganadosSenior += 1;
    }
    else if (partido.resultado == "Empatado"){
      empatadosSenior += 1;
    }
    else {
      perdidosSenior += 1;
    }

    const resultadoRacha = actualizarRachaInvicta(
        { ...rachaInvictaActual },
        { ...rachaInvictaSenior },
        partido
      );
      rachaInvictaActual = resultadoRacha.rachaActual;
      rachaInvictaSenior = resultadoRacha.rachaMaxima;
    
      const resultadoRachaGanados = actualizarRachaGanados(
        { ...rachaGanadosActual },
        { ...rachaGanadosSenior },
        partido
      );
      rachaGanadosActual = resultadoRachaGanados.rachaActual;
      rachaGanadosSenior = resultadoRachaGanados.rachaMaxima;
    
      const resultadoRachaSinGanar = actualizarRachaSinGanar(
        { ...rachaSinGanarActual },
        { ...rachaSinGanarSenior },
        partido
      );
      rachaSinGanarActual = resultadoRachaSinGanar.rachaActual;
      rachaSinGanarSenior = resultadoRachaSinGanar.rachaMaxima;
    
      const resultadoRachaPerdidos = actualizarRachaPerdidos(
        { ...rachaPerdidosActual },
        { ...rachaPerdidosSenior },
        partido
      );
      rachaPerdidosActual = resultadoRachaPerdidos.rachaActual;
      rachaPerdidosSenior = resultadoRachaPerdidos.rachaMaxima;
  }
  return {
    mayorVictoriaLibres: {partido: mayorVictoriaLibres},
    mayorDerrotaLibres: {partido: mayorDerrotaLibres},
    masGolesLibres: {partido: masGolesLibres},
    mayorVictoriaSenior: {partido: mayorVictoriaSenior},
    mayorDerrotaSenior: {partido: mayorDerrotaSenior},
    masGolesSenior: {partido: masGolesSenior},
    rachaInvictaLibres: {racha: rachaInvictaLibres},
    rachaGanadosLibres: {racha: rachaGanadosLibres},
    rachaSinGanarLibres: {racha: rachaSinGanarLibres},
    rachaPerdidosLibres: {racha: rachaPerdidosLibres},
    rachaInvictaSenior: {racha: rachaInvictaSenior},
    rachaGanadosSenior: {racha: rachaGanadosSenior},
    rachaSinGanarSenior: {racha: rachaSinGanarSenior},
    rachaPerdidosSenior: {racha: rachaPerdidosSenior},
    ganadosLibres: ganadosLibres,
    empatadosLibres: empatadosLibres,
    perdidosLibres:  perdidosLibres,
    ganadosSenior: ganadosSenior,
    empatadosSenior: empatadosSenior,
    perdidosSenior:  perdidosSenior,
    masPresenciasSinJugarLibres: {cantidad: masPresenciasSinJugarCantidadLibres, partido: masPresenciasSinJugarPartidoLibres},
    masPresenciasSinJugarSenior: {cantidad: masPresenciasSinJugarCantidadSenior, partido: masPresenciasSinJugarPartidoSenior}
  }
}