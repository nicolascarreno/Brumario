import React from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'

interface Jugador {
  nombre: string;
  presencias_sin_jugar: number;
}

interface TablaPresenciasSinJugarProp {
  jugadores: Jugador[];
  loading: boolean;
}

export const TablaPresenciasSinJugar: React.FC<TablaPresenciasSinJugarProp> = ({
  jugadores,
  loading,
}) => {
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <table className="tablaPosiciones" style={{ width: 500, marginBottom: 20 }}>
          <thead>
            <tr>
              <th
                className="th_black"
                style={{
                  width: '80px',
                  borderBottom: '1px solid black',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  textAlign: 'center'
                }}
              >
                MÁS PRESENCIAS SIN JUGAR
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadores
              .slice() // copiamos para no mutar
              .sort((a, b) => b.presencias_sin_jugar - a.presencias_sin_jugar) // orden descendente
              .slice(0, 8) // solo los 8 primeros
              .map((jugador, index) => (
                <tr key={jugador.nombre} className="tr">
                  <td className="td">
                    <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
                      <div style={{ width: 450, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className='nombres' style={{marginRight: 45}}>{index + 1}</span>
                          <img
                            src={'/brumario_escudo_sin_fondo.png'}
                            alt="App Logo"
                            width="20"
                            height="20"
                            style={{ marginRight: 20 }}
                          />
                          <Link to={`/jugador/${encodeURIComponent(jugador.nombre)}`} className="link">
                            {jugador.nombre}
                          </Link>
                        </div>
                        <div>
                          <span className='nombres'>{jugador.presencias_sin_jugar}</span>
                        </div>                        
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    )}
  </div>
);
};