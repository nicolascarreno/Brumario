import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { TiposAsistencia, TiposGol, TiposPresenciasSinJugar, IEstadisticasPorAnio, EstadisticaDetalladaPorAnio } from '../services/service_utils';

interface Jugador {
  nombre: string;
  titular: number;
  suplente: number;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  presencias_sin_jugar: number;
  tipos_gol: TiposGol;
  tipos_asistencia: TiposAsistencia;
  tipos_presencias_sin_jugar: TiposPresenciasSinJugar;
  estadisticas_por_anio: IEstadisticasPorAnio;
}

interface DetallesGeneralJugadorProp {
  jugador: Jugador;
  loading: boolean;
}

type TipoPartido = "total" | "oficial" | "amistoso";

export const DetallesGeneralJugador: React.FC<DetallesGeneralJugadorProp> = ({
  jugador,
  loading,
}) => {
    const [tipoPartido, setTipoPartido] = React.useState<TipoPartido>("total");
    const [anioSeleccionado, setAnioSeleccionado] = React.useState<number | null>(null);
    const aniosDisponibles = React.useMemo(() => {
    const titular = jugador.estadisticas_por_anio?.titular_por_anio.total_por_anio || {};
    const suplente = jugador.estadisticas_por_anio?.suplente_por_anio.total_por_anio || {};

    const anios = new Set<number>([
      ...Object.keys(titular).map(Number),
      ...Object.keys(suplente).map(Number),
    ]);

    return Array.from(anios).sort((a, b) => b - a);
  }, [jugador]);

  const estadisticas = jugador.estadisticas_por_anio;
  const jugadorVista = React.useMemo(() => ({
    ...jugador,

    titular: valorPorAnioYTipo(
      jugador.titular,
      estadisticas?.titular_por_anio,
      anioSeleccionado,
      tipoPartido
    ),

    suplente: valorPorAnioYTipo(
      jugador.suplente,
      estadisticas?.suplente_por_anio,
      anioSeleccionado,
      tipoPartido
    ),

    goles: valorPorAnioYTipo(
      jugador.goles,
      estadisticas?.goles_por_anio,
      anioSeleccionado,
      tipoPartido
    ),

    asistencias: valorPorAnioYTipo(
      jugador.asistencias,
      estadisticas?.asistencias_por_anio,
      anioSeleccionado,
      tipoPartido
    ),

    amarillas: valorPorAnioYTipo(
      jugador.amarillas,
      estadisticas?.amarillas_por_anio,
      anioSeleccionado,
      tipoPartido
    ),

    rojas: valorPorAnioYTipo(
      jugador.rojas,
      estadisticas?.rojas_por_anio,
      anioSeleccionado,
      tipoPartido
    ),

    presencias_sin_jugar: valorPorAnioYTipo(
      jugador.presencias_sin_jugar,
      estadisticas?.presencias_sin_jugar_por_anio,
      anioSeleccionado,
      tipoPartido
    ),

    tipos_presencias_sin_jugar: {
      perdidos: valorPorAnioYTipo(jugador.tipos_presencias_sin_jugar.perdidos, estadisticas?.presencias_sin_jugar_perdidos_por_anio, anioSeleccionado, tipoPartido),
      ganados: valorPorAnioYTipo(jugador.tipos_presencias_sin_jugar.ganados, estadisticas?.presencias_sin_jugar_ganados_por_anio, anioSeleccionado, tipoPartido),
      empatados: valorPorAnioYTipo(jugador.tipos_presencias_sin_jugar.empatados, estadisticas?.presencias_sin_jugar_empatados_por_anio, anioSeleccionado, tipoPartido),
    },

    tipos_gol: {
      cabeza: valorPorAnioYTipo(jugador.tipos_gol.cabeza, estadisticas?.goles_cabeza_por_anio, anioSeleccionado, tipoPartido),
      pie_jugada: valorPorAnioYTipo(jugador.tipos_gol.pie_jugada, estadisticas?.goles_pie_por_anio, anioSeleccionado, tipoPartido),
      penal: valorPorAnioYTipo(jugador.tipos_gol.penal, estadisticas?.goles_penal_por_anio, anioSeleccionado, tipoPartido),
      tiro_libre: valorPorAnioYTipo(jugador.tipos_gol.tiro_libre, estadisticas?.goles_tiro_libre_por_anio, anioSeleccionado, tipoPartido),
      otros: valorPorAnioYTipo(jugador.tipos_gol.otros, estadisticas?.goles_otro_por_anio, anioSeleccionado, tipoPartido),
    },

    tipos_asistencia: {
      cabeza: valorPorAnioYTipo(jugador.tipos_asistencia.cabeza, estadisticas?.asistencias_cabeza_por_anio, anioSeleccionado, tipoPartido),
      pie_jugada: valorPorAnioYTipo(jugador.tipos_asistencia.pie_jugada, estadisticas?.asistencias_pie_por_anio, anioSeleccionado, tipoPartido),
      tiro_libre: valorPorAnioYTipo(jugador.tipos_asistencia.tiro_libre, estadisticas?.asistencias_tiro_libre_por_anio, anioSeleccionado, tipoPartido),
      corner: valorPorAnioYTipo(jugador.tipos_asistencia.corner, estadisticas?.asistencias_corner_por_anio, anioSeleccionado, tipoPartido),
      otros: valorPorAnioYTipo(jugador.tipos_asistencia.otros, estadisticas?.asistencias_otro_por_anio, anioSeleccionado, tipoPartido),
    }

  }), [jugador, estadisticas, anioSeleccionado, tipoPartido]);
  const partidos_jugados = jugadorVista.titular + jugadorVista.suplente;
  const porcentajeTitular =
      partidos_jugados > 0? 
        ((jugadorVista.titular / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeSuplente =
      partidos_jugados > 0? 
        ((jugadorVista.suplente / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeJugada =
      jugadorVista.goles > 0? 
        ((jugadorVista.tipos_gol.pie_jugada / jugadorVista.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeCabeza =
      jugadorVista.goles > 0? 
        ((jugadorVista.tipos_gol.cabeza / jugadorVista.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeTiroLibre = 
      jugadorVista.goles > 0? 
        ((jugadorVista.tipos_gol.tiro_libre / jugadorVista.goles)).toFixed(2) // 0 decimales
        : 0;
  const porcentajePenal =
      jugadorVista.goles > 0? 
        ((jugadorVista.tipos_gol.penal / jugadorVista.goles)).toFixed(2) // 0 decimales
        : 0;
  const promedioGol =
      jugadorVista.goles > 0? 
        ((jugadorVista.goles / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaJugada =
      jugadorVista.asistencias > 0? 
        ((jugadorVista.tipos_asistencia.pie_jugada / jugadorVista.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaCabeza =
      jugadorVista.asistencias > 0? 
        ((jugadorVista.tipos_asistencia.cabeza / jugadorVista.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaTiroLibre = 
      jugadorVista.asistencias > 0? 
        ((jugadorVista.tipos_asistencia.tiro_libre / jugadorVista.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const porcentajeAsistenciaCorner =
      jugadorVista.asistencias > 0? 
        ((jugadorVista.tipos_asistencia.corner / jugadorVista.asistencias)).toFixed(2) // 0 decimales
        : 0;
  const promedioAsistencias =
      jugadorVista.asistencias > 0? 
        ((jugadorVista.asistencias / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const efectividadPresenciasSinJugar =
      jugadorVista.presencias_sin_jugar > 0? 
        (((jugadorVista.tipos_presencias_sin_jugar.empatados + 3*jugadorVista.tipos_presencias_sin_jugar.ganados) / (3*jugadorVista.presencias_sin_jugar))).toFixed(2) // 0 decimales
        : 0;
  const promedioAmarillas =
      jugadorVista.amarillas > 0? 
        ((jugadorVista.amarillas / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;
  const promedioRojas =
      jugadorVista.rojas > 0? 
        ((jugadorVista.rojas / partidos_jugados)).toFixed(2) // 0 decimales
        : 0;

  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <div className='contenedor_general_gris'>
            <div className='contenedor_nombre'>
                <img src={'/brumario_escudo_sin_fondo.png'} alt="App Logo" className='imagen_logo'/>
                <span className='nombre'>{jugador.nombre}</span>
            </div>
            <div className='contenedor_estadistica'>
              <div style={{ paddingBottom: 20, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center", height: 20 }}>
                  <label className='select_anio_label'>
                    Año:
                  </label>
                  <select
                    value={anioSeleccionado ?? ""}
                    onChange={(e) =>
                      setAnioSeleccionado(e.target.value ? Number(e.target.value) : null)
                    }
                    className='select_anio'
                  >
                    <option value="">Todos</option>
                    {aniosDisponibles.map(anio => (
                      <option key={anio} value={anio}>
                        {anio}
                      </option>
                    ))}
                  </select>
                    <label className='select_anio_label' style={{ marginLeft: 20 }}>
                      Partidos:
                    </label>

                    <select
                      value={tipoPartido}
                      onChange={(e) => setTipoPartido(e.target.value as TipoPartido)}
                      className="select_anio"
                    >
                      <option value="total">Todos</option>
                      <option value="oficial">Oficiales</option>
                      <option value="amistoso">Amistosos</option>
                    </select>
                  
                </div>
              <div className='contenedor_tipo_estadistica'>
                <div style={{paddingBottom: 10}}>
                  <div className='contenedor_estadistica_nombre'>
                      <img
                          src={'/jugador_sin_fondo.png'}
                          alt="App Logo"
                          width="30"
                          height="40"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Partidos Jugados
                      </span>   
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Titular</span>
                      <span className='estadistica'>{jugadorVista.titular}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Titular (%)</span>
                      <span className='estadistica'>{porcentajeTitular}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Suplente</span>
                      <span className='estadistica'>{jugadorVista.suplente}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Suplente (%)</span>
                      <span className='estadistica'>{porcentajeSuplente}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Partidos Totales</span>
                      <span className='estadistica_clave'>{jugadorVista.titular + jugadorVista.suplente}</span>
                  </div>
                </div>
                  <div className='contenedor_tipo_estadistica2'>
                    <div className='contenedor_estadistica_nombre'>
                      <img src={'/goleadors_sin_fondo.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
                      <span className='nombre_estadistica'>Goles</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Pie (jugada)</span>
                      <span className='estadistica'>{jugadorVista.tipos_gol.pie_jugada}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Cabeza</span>
                      <span className='estadistica'>{jugadorVista.tipos_gol.cabeza}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Tiro Libre</span>
                      <span className='estadistica'>{jugadorVista.tipos_gol.tiro_libre}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Penal</span>
                      <span className='estadistica'>{jugadorVista.tipos_gol.penal}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Goles Totales</span>
                      <span className='estadistica_clave'>{jugadorVista.goles}</span>
                  </div>
                </div>
                <div>
                    <div className='contenedor_estadistica_segunda_columna'>
                      <span className='estadistica'>De Pie (jugada) (%)</span>
                      <span className='estadistica'>{porcentajeJugada}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Cabeza (%)</span>
                      <span className='estadistica'>{porcentajeCabeza}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Tiro Libre (%)</span>
                      <span className='estadistica'>{porcentajeTiroLibre}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Penal (%)</span>
                      <span className='estadistica'>{porcentajePenal}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Goles x Partido</span>
                      <span className='estadistica_clave'>{promedioGol}</span>
                  </div>
                </div>
              </div>
              <div className='contenedor_tipo_estadistica'>
                <div>
                  <div className='contenedor_estadistica_nombre'>
                      <img
                          src={'/cerveza_sin_fondo.png'}
                          alt="App Logo"
                          width="35"
                          height="35"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Presen. Sin Jugar
                      </span>   
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Ganados</span>
                      <span className='estadistica'>{jugadorVista.tipos_presencias_sin_jugar.ganados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Empatados</span>
                      <span className='estadistica'>{jugadorVista.tipos_presencias_sin_jugar.empatados}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Perdidos</span>
                      <span className='estadistica'>{jugadorVista.tipos_presencias_sin_jugar.perdidos}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Efectividad (%)</span>
                      <span className='estadistica'>{efectividadPresenciasSinJugar}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Presencias Totales</span>
                      <span className='estadistica_clave'>{jugadorVista.presencias_sin_jugar}</span>
                  </div>
                </div>
                  <div className='contenedor_tipo_estadistica2'>
                    <div className='contenedor_estadistica_nombre'>
                      <img src={'/asistencia6.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
                      <span className='nombre_estadistica'>Asistencias</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Pie (jugada)</span>
                      <span className='estadistica'>{jugadorVista.tipos_asistencia.pie_jugada}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Cabeza</span>
                      <span className='estadistica'>{jugadorVista.tipos_asistencia.cabeza}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Tiro Libre</span>
                      <span className='estadistica'>{jugadorVista.tipos_asistencia.tiro_libre}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Corner</span>
                      <span className='estadistica'>{jugadorVista.tipos_asistencia.corner}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Asistencias Totales</span>
                      <span className='estadistica_clave'>{jugadorVista.asistencias}</span>
                  </div>
                </div>
                <div>
                    <div className='contenedor_estadistica_segunda_columna'>
                      <span className='estadistica'>De Pie (jugada) (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaJugada}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Cabeza (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaCabeza}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Tiro Libre (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaTiroLibre}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>De Corner (%)</span>
                      <span className='estadistica'>{porcentajeAsistenciaCorner}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Asistencias x Partido</span>
                      <span className='estadistica_clave'>{promedioAsistencias}</span>
                  </div>
                </div>
              </div>
              <div className='contenedor_tipo_estadistica'>
                <div>
                  <div className='contenedor_estadistica_nombre'>
                      <img src={'/amarilla_sin_fondo2.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
                      <span className='nombre_estadistica'>Amarillas</span>   
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Amarillas x Partido</span>
                      <span className='estadistica'>{promedioAmarillas}</span>
                  </div>
                  <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Amarillas Totales</span>
                      <span className='estadistica_clave'>{jugadorVista.amarillas}</span>
                  </div>
                </div>
                  <div className='contenedor_tipo_estadistica2'>
                    <div className='contenedor_estadistica_nombre'>
                      <img src={'/roja_sin_fondo.png'} alt="App Logo" width="40" height="40" style={{ marginLeft: 10, marginRight: 5 }}/>
                      <span className='nombre_estadistica'>Rojas</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '5px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica'>Rojas x Partido</span>
                      <span className='estadistica'>{promedioRojas}</span>
                    </div>
                    <div style={{display: 'flex', paddingLeft: '10px', paddingTop: '20px', paddingBottom: '10px', justifyContent: 'space-between', width: 220, marginLeft: 25}}>
                      <span className='estadistica_clave'>Rojas Totales</span>
                      <span className='estadistica_clave'>{jugadorVista.rojas}</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};

function valorPorAnioYTipo(
  total: number,
  estadistica: EstadisticaDetalladaPorAnio | undefined,
  anio: number | null,
  tipo: TipoPartido
): number {
  if (!estadistica) return total;

  if (!anio && tipo === "total") {
    return total;
  }

  const key = `${tipo}_por_anio` as const;
  const mapa = estadistica[key];

  if (!anio) {
    // todos los años pero filtrado por tipo
    return Object.values(mapa).reduce((acc, v) => acc + v, 0);
  }

  return mapa[anio] ?? 0;
}

function valorPorAnio2(
  total: number,
  mapaPorAnio: Record<number, number> | undefined,
  anio: number | null
): number {
  if (!anio || !mapaPorAnio) return total;
  return mapaPorAnio[anio] ?? 0;
}