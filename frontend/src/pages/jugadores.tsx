import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/App.css';
import '../styles/inicio.css';
import '../styles/jugadores.css';
import { getJugadores, Jugador } from "../services/jugadoresService";
//import brumario from '../../public/brumario.png';

export function Jugadores() {
  const navigate = useNavigate();
  const [jugadores, setJugadores] = useState<{ nombre: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching jugadores...");
        const data = await getJugadores();
        setJugadores(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  


  return (
    <div className="App">
      <div className="encabezado">     
        <img src={'/brumario.png'} alt="brumario" height={90} width={380} style={{ marginLeft: '18px', paddingTop: 20, paddingBottom: 20 }} />
        <span className='sitio_web'>Sitio Web Oficial</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
     {/* Tabla de favoritos */}
        <table className="tablaPosiciones" style={{ width: 500 }}>
          <thead>
            <tr>
              <th
                className="th_black"
                style={{ width: '80px', borderBottom: '1px solid black', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', textAlign: 'center' }}
              >
                JUGADORES
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="td" style={{ textAlign: 'center' }}>
                  Cargando...
                </td>
              </tr>
            ) : (
              jugadores.map((jugador) => (
                <tr className="tr" key={jugador.nombre}>
                  <td className="td">
                    <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
                      <div style={{ width: 300, display: 'flex', alignItems: 'center' }}>
                        <img src={'/brumario_escudo.jpeg'} alt="App Logo" width="40" height="40" style={{ marginRight: 30 }} />
                        <span>{jugador.nombre}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
    </div>
  );
}