import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { Jugador } from "../services/service_utils"
import { PartidosJugador } from "./estadisticas/estadisticasJugador/partidosJugador" 
import { GolesJugador } from './estadisticas/estadisticasJugador/golesJugador';
import { GolesPorcentajeJugador } from './estadisticas/estadisticasJugador/golesPorcentajeJugador';
import { PresenciasSinJugarJugador } from './estadisticas/estadisticasJugador/presenciasSinJugarJugador';
import AsistenciasJugador from './estadisticas/estadisticasJugador/asistenciasJugador';
import { AsistenciasPorcentajeJugador } from './estadisticas/estadisticasJugador/asistenciasPorcentajeJugador';
import { AmarillasJugador } from './estadisticas/estadisticasJugador/amarillasJugador';
import { RojasJugador } from './estadisticas/estadisticasJugador/rojasJugador';
import { valorPorAnioYTipo } from "../utils/helpers"

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
                  <PartidosJugador jugador={jugadorVista} />
                  <GolesJugador jugador={jugadorVista} />
                  <GolesPorcentajeJugador jugador={jugadorVista} />
              </div>
              <div className='contenedor_tipo_estadistica'>
                  <PresenciasSinJugarJugador jugador={jugadorVista} />
                  <AsistenciasJugador jugador={jugadorVista} />
                  <AsistenciasPorcentajeJugador jugador={jugadorVista} />
              </div>
              <div className='contenedor_tipo_estadistica'>
                  <AmarillasJugador jugador={jugadorVista} />
                  <RojasJugador jugador={jugadorVista} />
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};