export interface HitoPartido {
  rival: string;
  competicion: string;
  tipo_partido: string;
  golesBrumario: string;
  golesRecibidos: string;
  fecha: Date;
}


export function crearHitoBase() {
  return {
    rival: "",
    competicion: "",
    tipo_partido: "",
    golesBrumario: "",
    golesRecibidos: "",
    fecha: new Date(),
  };
}

export interface Anio {
  anio: number;
  goles: number;
  asistencias:number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
}

export function crearAnioBase(anio: number) {
  return {
    anio: anio,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    presencias_sin_jugar: 0,
  }
}