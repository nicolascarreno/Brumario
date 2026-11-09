import React from 'react';
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { Jugador } from "../services/service_utils"
import { PartidosDirigidosDT } from './estadisticas/estadisticasDirectorTecnico/partidosDirigidosDT';
import { DiferenciaGolDT } from './estadisticas/estadisticasDirectorTecnico/diferenciaGolDT';
import { EsquemasUsadosDT } from './estadisticas/estadisticasDirectorTecnico/esquemasUsadosDT';
import { JugadoresPreferidosDT } from './estadisticas/estadisticasDirectorTecnico/jugadoresPreferidosDT';


interface DetallesTecnicoProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesTecnico: React.FC<DetallesTecnicoProp> = ({ jugador, loading }) => {
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
              <div className='contenedor_tipo_estadistica'>
                <PartidosDirigidosDT jugador={jugador} />
                <DiferenciaGolDT jugador={jugador} />
              </div>
              <div className='contenedor_tipo_estadistica'>
                <EsquemasUsadosDT jugador={jugador} />
                <JugadoresPreferidosDT jugador={jugador} />            
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};