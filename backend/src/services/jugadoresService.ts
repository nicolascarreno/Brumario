import Partido, { GolFavor } from "../models/partido";
import { IPartido } from "../models/partido";
import Persona from "../models/persona"; // tu modelo de Mongoose
import { actualizarRachaGanados, actualizarRachaGolesRecibidos, actualizarRachaInvicta, actualizarRachaPerdidos, actualizarRachaSinGanar, actualizarRachaVallaInvicta, Anio, crearAnioBase, crearGolFavorBase, crearHitoBase, crearHitoRachaBase, encontrarMaximoPorAnio, encontrarMinimoPorAnio, HitoPartido, HitoRacha, parseGoles, procesarArquero, procesarGolesYAsistencias, procesarPresencias, procesarPresenciasSinJugar, procesarTarjetas } from "./utils_service";
import { redis, NULL_SENTINEL } from "../config/redis"

export const getJugadores = async () => {
  try {
    const jugadores = await Persona.find({}, { _id: 0, nombre: 1, titular: 1, suplente: 1, goles: 1, asistencias: 1, amarillas: 1, rojas: 1, presencias_sin_jugar: 1 });
    console.log(jugadores)
    return jugadores;
  } catch (error) {
    throw new Error("Error al obtener jugadores: " + error);
  }
};

export const getJugadoresSinDetalles = async () => {
  try {
    const jugadores = await Persona.find({}, { nombre: 1, _id: 0 });
    console.log(jugadores)
    return jugadores;
  } catch (error) {
    throw new Error("Error al obtener jugadores: " + error);
  }
};

export const getJugadoresDetalles = async (nombre: string) => {
  console.log("========== getJugadoresDetalles ==========");
  try {
    const key = 'jugador:' + nombre;
    const cached = await redis.get<string>(key);

    if (cached == NULL_SENTINEL) throw new Error("No se encontró el jugador en la cache");
    if (cached != null) { 
      console.log("Jugador obtenido del cache");
      return cached;
    }

    const jugador = await Persona.findOne(
      { nombre },
      { _id: 0 },
    );

    if (!jugador) {
      throw new Error(`No se encontró el jugador con nombre: ${nombre}`);
    }

    const jugadores = await Persona.find({}, { _id: 0, nombre: 1 });
    const partidosDirigidos = await Partido.find(
      { director_tecnico: nombre },
      { _id: 0 }
    );
    const partidosJugados = await Partido.find(
      { 
        $or: [
          { titulares: nombre },  // aparece en titulares
          { suplentes: nombre },
          { presencia_sin_jugar: nombre }   // aparece en suplentes
        ]
      },
      { _id: 0 } // 🎯 proyección, devolvés todos los campos o los que quieras
    );

    const debut  = await Partido.find(
      { 
        $or: [
          { fecha: jugador.debut },  // aparece en titulares
        ]
      },
      { _id: 0 } // 🎯 proyección, devolvés todos los campos o los que quieras
    );

    const debut_oficial  = await Partido.find(
      { 
        $or: [
          { fecha: jugador.debut_oficial },  // aparece en titulares
        ]
      },
      { _id: 0 } // 🎯 proyección, devolvés todos los campos o los que quieras
    );

    const jugadoresPreferidos = calcularTopJugadores(jugadores.map(j => j.toObject()), partidosDirigidos);   
    const hitosJugador = hitos(nombre, partidosJugados, partidosDirigidos, debut, debut_oficial);
    const estadisticasDirectorTecnico = {
      ...JSON.parse(JSON.stringify(jugador.director_tecnico)),
      jugadoresPreferidos,
    }

    await redis.set(key, { ...jugador.toObject({ flattenMaps: true }), director_tecnico: estadisticasDirectorTecnico, hitos: hitosJugador })

    return {
      ...jugador.toObject({ flattenMaps: true }),
      director_tecnico: estadisticasDirectorTecnico,
      hitos: hitosJugador,
    };
  } catch (error) {
    throw new Error("Error al obtener jugador: " + error);
  }
};

const calcularTopJugadores = (
  jugadores: { nombre: string }[],
  partidos: IPartido[],
) => {
  const jugadoresConPartidos = jugadores.map(j => ({
    ...j,
    partidos: 0,
  }));

  //console.log(partidos.length)
  for (const partido of partidos) {
    for (const jugador of jugadoresConPartidos) {
      if (partido.titulares.includes(jugador.nombre)) {
        jugador.partidos += 1;
      }
    }
  }
  return jugadoresConPartidos
    .sort((a, b) => b.partidos - a.partidos)
    .slice(0, 8)
    .map(({ nombre }) => ({ nombre }));
};

function hitos (nombreJugador: string, partidos: IPartido[], partidosDirigidos: IPartido[], debut: IPartido[], debut_oficial: IPartido[]) {
  let masGoles = 0;
  let masGolesPartido: HitoPartido = crearHitoBase();
  let masAsistencias = 0;
  let masAsistenciasPartido: HitoPartido = crearHitoBase();
  let masContribucionesGoles = 0;
  let masContribucionesAsistencias = 0;
  let masContribucionesPartido: HitoPartido = crearHitoBase();
  let mayorVictoriaDirigido: HitoPartido = crearHitoBase();
  let mayorDerrotaDirigido: HitoPartido = crearHitoBase();
  let masGolesDirigido: HitoPartido = crearHitoBase();
  let rachaInvictaDirigido: HitoRacha = crearHitoRachaBase();
  let rachaGanadosDirigido: HitoRacha = crearHitoRachaBase();
  let rachaSinGanarDirigido: HitoRacha = crearHitoRachaBase();  
  let rachaPerdidosDirigido: HitoRacha = crearHitoRachaBase();
  let ultimoGol: GolFavor = crearGolFavorBase();
  let ultimoGolPartido: HitoPartido = crearHitoBase();
  let arquero_mas_goles_recibidos = 0
  let arquero_mas_goles_recibidos_partido: HitoPartido = crearHitoBase();
  let arquero_racha_vallas_invictas: HitoRacha = crearHitoRachaBase();
  let arquero_racha_goles_recibidos: HitoRacha = crearHitoRachaBase();
  let anios: Anio[] = [];

  let debut_partido = debut.length > 0 
    ? {rival: debut[0].rival, competicion: debut[0].competicion, tipo_partido: debut[0].tipo_partido, golesBrumario: debut[0].goles_favor, golesRecibidos: debut[0].goles_contra, fecha: debut[0].fecha, nro: debut[0].nro}       
    : crearHitoBase(); 

  let debut_oficial_partido = debut_oficial.length > 0 
    ? {rival: debut_oficial[0].rival, competicion: debut_oficial[0].competicion, tipo_partido: debut_oficial[0].tipo_partido, golesBrumario: debut_oficial[0].goles_favor, golesRecibidos: debut_oficial[0].goles_contra, fecha: debut_oficial[0].fecha, nro: debut_oficial[0].nro}       
    : crearHitoBase(); 

  let rachaGolesRecibidosActual: HitoRacha = crearHitoRachaBase();
  let rachaVallaInvictaActual: HitoRacha = crearHitoRachaBase();

  for (const partido of partidos) {
    const anio = partido.fecha.getFullYear()
    if (!anios.some(a => a.anio === anio)) {
      anios.push(crearAnioBase(anio))
    }
    const estadisticas_anio = anios.find(a => a.anio === anio);

    procesarPresencias(nombreJugador, partido, estadisticas_anio!);
    const { golesPartidoActual, asistenciasPartidoActual, ultimoGolInfo } = 
      procesarGolesYAsistencias(nombreJugador, partido, estadisticas_anio!);
    procesarTarjetas(nombreJugador, partido, estadisticas_anio!);
    procesarPresenciasSinJugar(nombreJugador, partido, estadisticas_anio!);
    const arqueroGolesRecibidos = procesarArquero(nombreJugador, partido, estadisticas_anio!);

    if (golesPartidoActual > masGoles) {
      masGoles = golesPartidoActual;
      masGolesPartido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (asistenciasPartidoActual > masAsistencias) {
      masAsistencias = asistenciasPartidoActual;
      masAsistenciasPartido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (golesPartidoActual > 0) {
      ultimoGolPartido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      ultimoGol = ultimoGolInfo;
    }
    if (golesPartidoActual+asistenciasPartidoActual > masContribucionesGoles+masContribucionesAsistencias) {
      masContribucionesGoles = golesPartidoActual;
      masContribucionesAsistencias = asistenciasPartidoActual;
      masContribucionesPartido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (partido.titulares[0] === nombreJugador) {
      if (arqueroGolesRecibidos > arquero_mas_goles_recibidos) {
        arquero_mas_goles_recibidos = arqueroGolesRecibidos;
        arquero_mas_goles_recibidos_partido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
      }

      const resultadoRachaVallaInvicta = actualizarRachaVallaInvicta(
        { ...rachaVallaInvictaActual },
        { ...arquero_racha_vallas_invictas },
        partido
      )

      rachaVallaInvictaActual = resultadoRachaVallaInvicta.rachaActual;
      arquero_racha_vallas_invictas = resultadoRachaVallaInvicta.rachaMaxima;

      const resultadoRachaGolesRecibidos = actualizarRachaGolesRecibidos(
        { ...rachaGolesRecibidosActual },
        { ...arquero_racha_goles_recibidos },
        partido
      )
      rachaGolesRecibidosActual = resultadoRachaGolesRecibidos.rachaActual;
      arquero_racha_goles_recibidos = resultadoRachaGolesRecibidos.rachaMaxima;
    }
  }

  let rachaInvictaActual: HitoRacha = crearHitoRachaBase();
  let rachaGanadosActual: HitoRacha = crearHitoRachaBase();
  let rachaSinGanarActual: HitoRacha = crearHitoRachaBase();
  let rachaPerdidosActual: HitoRacha = crearHitoRachaBase();  
  for (const partido of partidosDirigidos) {
    const mayor_victoria = parseGoles(mayorVictoriaDirigido.golesBrumario) - parseGoles(mayorVictoriaDirigido.golesRecibidos);
    const mayor_derrota = parseGoles(mayorDerrotaDirigido.golesBrumario) - parseGoles(mayorDerrotaDirigido.golesRecibidos)
    const mas_goles = parseGoles(masGolesDirigido.golesBrumario) + parseGoles(masGolesDirigido.golesRecibidos) 
    const dif_resultado = parseGoles(partido.goles_favor) - parseGoles(partido.goles_contra);
    const goles_partido = parseGoles(partido.goles_contra) + parseGoles(partido.goles_favor);
    if (mayor_victoria < dif_resultado && dif_resultado > 0) {
      mayorVictoriaDirigido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (mayor_derrota > dif_resultado && dif_resultado < 0) {
      mayorDerrotaDirigido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }
    if (mas_goles < goles_partido) {
      masGolesDirigido = {nro: Number(partido.nro), rival: partido.rival, competicion: partido.competicion, tipo_partido: partido.tipo_partido, golesBrumario: partido.goles_favor, golesRecibidos: partido.goles_contra, fecha: partido.fecha};
    }

   const resultadoRacha = actualizarRachaInvicta(
    { ...rachaInvictaActual },
    { ...rachaInvictaDirigido },
    partido
  );
  rachaInvictaActual = resultadoRacha.rachaActual;
  rachaInvictaDirigido = resultadoRacha.rachaMaxima;

  const resultadoRachaGanados = actualizarRachaGanados(
    { ...rachaGanadosActual },
    { ...rachaGanadosDirigido },
    partido
  );
  rachaGanadosActual = resultadoRachaGanados.rachaActual;
  rachaGanadosDirigido = resultadoRachaGanados.rachaMaxima;

  const resultadoRachaSinGanar = actualizarRachaSinGanar(
    { ...rachaSinGanarActual },
    { ...rachaSinGanarDirigido },
    partido
  );
  rachaSinGanarActual = resultadoRachaSinGanar.rachaActual;
  rachaSinGanarDirigido = resultadoRachaSinGanar.rachaMaxima;

  const resultadoRachaPerdidos = actualizarRachaPerdidos(
    { ...rachaPerdidosActual },
    { ...rachaPerdidosDirigido },
    partido
  );
  rachaPerdidosActual = resultadoRachaPerdidos.rachaActual;
  rachaPerdidosDirigido = resultadoRachaPerdidos.rachaMaxima;
  }
  
  //console.log(anios)
  return {
    masGoles: { cantidad: masGoles, partido: masGolesPartido },
    masAsistencias: { cantidad: masAsistencias, partido: masAsistenciasPartido },
    masContribuciones: {cantidadGoles: masContribucionesGoles, cantidadAsistencias: masContribucionesAsistencias, partido: masContribucionesPartido},
    masGolesAnio: encontrarMaximoPorAnio(anios, "goles"),
    masAsistenciasAnio: encontrarMaximoPorAnio(anios, "asistencias"),
    masAmarillasAnio: encontrarMaximoPorAnio(anios, "amarillas"),
    masRojasAnio: encontrarMaximoPorAnio(anios, "rojas"),
    masPresenciasSinJugarAnio: encontrarMaximoPorAnio(anios, "presencias_sin_jugar"),
    masPresenciasAnio: encontrarMaximoPorAnio(anios, "presencias"),
    tecnicoMayorVictoria: {partido: mayorVictoriaDirigido},
    tecnicoMayorDerrota: {partido: mayorDerrotaDirigido},
    tecnicoMasGoles: {partido: masGolesDirigido},
    tecnicoRachaInvicta: {racha: rachaInvictaDirigido},
    tecnicoRachaGanados: {racha: rachaGanadosDirigido},
    tecnicoRachaSinGanar: {racha: rachaSinGanarDirigido},
    tecnicoRachaPerdidos: {racha: rachaPerdidosDirigido},
    ultimoGol: {partido: ultimoGolPartido, gol: ultimoGol},
    debut: {partido: debut_partido},
    debut_oficial: {partido: debut_oficial_partido},
    arqueroMasGolesRecibidos: {cantidad: arquero_mas_goles_recibidos, partido: arquero_mas_goles_recibidos_partido},
    arqueroMasVallasInvictasAnio: encontrarMaximoPorAnio(anios, "arquero_vallas_invictas"),
    arqueroMasPartidosAnio: encontrarMaximoPorAnio(anios, "arquero_partidos"),
    arqueroMasGolesRecibidosAnio: encontrarMaximoPorAnio(anios, "arquero_goles_recibidos"),
    arqueroMenosGolesRecibidosAnio: encontrarMinimoPorAnio(anios, "arquero_goles_recibidos"),
    arqueroRachaVallasInvictas: {racha: arquero_racha_vallas_invictas},
    arqueroRachaGolesRecibidos: {racha: arquero_racha_goles_recibidos},
  };  
}