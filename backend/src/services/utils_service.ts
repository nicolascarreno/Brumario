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