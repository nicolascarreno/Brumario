import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import { Jugador } from "../services/service_utils";
import PartidosArquero from './estadisticas/estadisticasArquero/partidosArquero';
import GolesRecibidosArquero from './estadisticas/estadisticasArquero/golesRecibidosArquero';
import GolesRecibidosPorcentajeArquero from './estadisticas/estadisticasArquero/golesRecibidosPorcentajeArquero';
import TandasPenalesArquero from './estadisticas/estadisticasArquero/tandasPenalesArquero';
import VallasInvictasArquero from './estadisticas/estadisticasArquero/vallasInvictasArquero';

interface DetallesArqueroProp {
  jugador: Jugador;
  loading: boolean;
}

export const DetallesArquero: React.FC<DetallesArqueroProp> = ({
  jugador,
  loading,
}) => {

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
                <PartidosArquero jugador={jugador} />
                <div className='contenedor_tipo_estadistica2' style={{paddingBottom: 10, display: "flex", flexDirection: "row" }}>
                    <GolesRecibidosArquero jugador={jugador} />
                    <GolesRecibidosPorcentajeArquero jugador={jugador} />
                </div>
              </div>
            <div className='contenedor_tipo_estadistica'>
                <TandasPenalesArquero jugador={jugador} />
                <VallasInvictasArquero jugador={jugador} />
              </div>
          </div>
        </div>
      </>
    )}
  </div>
);
};