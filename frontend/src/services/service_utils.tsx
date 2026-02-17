export interface Partido {
    nro: string;
    categoria: string;
    tipo_partido: string;
    competicion: string;
    jornada: string;
    cancha: string;
    predio: string;
    ubicacion: string;
    rival: string;
    goles_favor: string;
    goles_contra: string;
    titulares: string[];
    suplentes: string[];
    reemplazos: Reemplazo[];
    golesFavor: GolFavor[];
    golesEnContra: GolEnContra[];
    golesRecibidos: GolRecibido[];
    amarillas: string[];
    rojas: string[];
    presencia_sin_jugar: string[];
    director_tecnico: string;
    fecha: Date;
    hora: string;
    resultado: string;
    esquema_tactico: string;
}

export interface Reemplazo {
  entra: string;
  sale: string;
}

export interface GolFavor {
  gol: string;
  tipo: string;
  resultadoParcial: string;
  asistencia: string;
  tipoAsistencia: string;
}

export interface GolRecibido {
  arquero: string;
  tipo: string;
  resultadoParcial: string;
}

export interface GolEnContra {
  gol: string;
  tipo: string;
}

export interface TiposGol {
  cabeza: number;
  pie_jugada: number;
  penal: number;
  tiro_libre: number;
  otros: number;
}

export interface TiposAsistencia {
  cabeza: number;
  pie_jugada: number;
  corner: number;
  tiro_libre: number;
  otros: number;
}

export interface TiposPresenciasSinJugar {
  ganados: number;
  empatados: number;
  perdidos: number;
}

export interface EsquemaInfo {
  partidos: number;
  puntos: number;
}

export interface DirectorTecnico {
  ganados: number;
  empatados: number;
  perdidos: number;
  goles_favor: number;
  goles_contra: number;
  esquemas: Record<string, EsquemaInfo>;
  jugadoresPreferidos: { nombre: string }[];
}

export interface HitosPartidos{
  mayorVictoriaLibres: {partido: HitosPartido},
  mayorDerrotaLibres: {partido: HitosPartido},
  masGolesLibres: {partido: HitosPartido},
  mayorVictoriaSenior: {partido: HitosPartido},
  mayorDerrotaSenior: {partido: HitosPartido},
  masGolesSenior: {partido: HitosPartido},
  rachaInvictaLibres: {racha: HitoRacha},
  rachaGanadosLibres: {racha: HitoRacha},
  rachaSinGanarLibres: {racha: HitoRacha},
  rachaPerdidosLibres: {racha: HitoRacha},
  rachaInvictaSenior: {racha: HitoRacha},
  rachaGanadosSenior: {racha: HitoRacha},
  rachaSinGanarSenior: {racha: HitoRacha},
  rachaPerdidosSenior: {racha: HitoRacha},
  ganadosLibres: number,
  empatadosLibres: number,
  perdidosLibres: number,
  ganadosSenior: number,
  empatadosSenior: number,
  perdidosSenior: number,
  masPresenciasSinJugarLibres: {cantidad: number, partido: HitosPartido},
  masPresenciasSinJugarSenior: {cantidad: number, partido: HitosPartido}
}

export interface HitosPartido {
  nro: number;
  rival: string;
  competicion: string;
  tipo_partido: string;
  golesBrumario: string;
  golesRecibidos: string;
  fecha: Date;
}

export interface HitoRacha {
  inicio: HitosPartido;
  fin: HitosPartido;
  duracionPartidos: number;
}

export interface Hitos {
  masGoles: {cantidad: number, partido: HitosPartido};
  masAsistencias: {cantidad: number, partido: HitosPartido};
  masContribuciones: {cantidadGoles: number, cantidadAsistencias: number, partido: HitosPartido},
  masGolesAnio: {cantidad: number, anio: number},
  masAsistenciasAnio: {cantidad: number, anio: number},
  masAmarillasAnio: {cantidad: number, anio: number},
  masRojasAnio: {cantidad: number, anio: number},
  masPresenciasSinJugarAnio: {cantidad: number, anio: number},
  masPresenciasAnio: {cantidad: number, anio: number},
  tecnicoMayorVictoria: {partido: HitosPartido},
  tecnicoMayorDerrota: {partido: HitosPartido},
  tecnicoMasGoles: {partido: HitosPartido},
  tecnicoRachaInvicta: {racha: HitoRacha},
  tecnicoRachaGanados: {racha: HitoRacha},
  tecnicoRachaSinGanar: {racha: HitoRacha},
  tecnicoRachaPerdidos: {racha: HitoRacha},
  ultimoGol: {partido: HitosPartido, gol: GolFavor},
  debut: {partido: HitosPartido},
  debut_oficial: {partido: HitosPartido}
}

//export type EstadisticaPorAnio = Record<string, number>;

export type EstadisticaDetalladaPorAnio = {
  total_por_anio: Record<string, number>;
  oficial_por_anio: Record<string, number>;
  amistoso_por_anio: Record<string, number>;
};

export interface IEstadisticasPorAnio {
  titular_por_anio: EstadisticaDetalladaPorAnio;
  suplente_por_anio: EstadisticaDetalladaPorAnio;

  goles_por_anio: EstadisticaDetalladaPorAnio;
  goles_cabeza_por_anio: EstadisticaDetalladaPorAnio;
  goles_pie_por_anio: EstadisticaDetalladaPorAnio;
  goles_penal_por_anio: EstadisticaDetalladaPorAnio;
  goles_tiro_libre_por_anio: EstadisticaDetalladaPorAnio;
  goles_otro_por_anio: EstadisticaDetalladaPorAnio;

  asistencias_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_pie_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_tiro_libre_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_corner_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_cabeza_por_anio: EstadisticaDetalladaPorAnio;
  asistencias_otro_por_anio: EstadisticaDetalladaPorAnio;

  amarillas_por_anio: EstadisticaDetalladaPorAnio;
  rojas_por_anio: EstadisticaDetalladaPorAnio;

  presencias_sin_jugar_por_anio: EstadisticaDetalladaPorAnio;
  presencias_sin_jugar_ganados_por_anio: EstadisticaDetalladaPorAnio;
  presencias_sin_jugar_empatados_por_anio: EstadisticaDetalladaPorAnio;
  presencias_sin_jugar_perdidos_por_anio: EstadisticaDetalladaPorAnio;
}

export interface Jugador {
  nombre: string;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
  titular: number;
  suplente: number;
  tipos_gol: TiposGol;
  tipos_asistencia: TiposAsistencia;
  tipos_presencias_sin_jugar: TiposPresenciasSinJugar;
  director_tecnico: DirectorTecnico;
  debut: Date;
  debut_oficial: Date;
  dorsal: number;
  hitos: Hitos;
  estadisticas_por_anio: IEstadisticasPorAnio;
}