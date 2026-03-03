import React, { JSX } from 'react';
import { Link } from "react-router-dom";
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import '../styles/detalles_partido.css'
import { DirectorTecnico, TiposAsistencia, TiposGol, TiposPresenciasSinJugar, Hitos, Partido } from '../services/service_utils';
import { formatDateDDMMYYYY } from './partidosTodos';


interface DetallesPartidoProp {
  partido: Partido;
  loading: boolean;
}

export const DetallesPartido: React.FC<DetallesPartidoProp> = ({
  partido,
  loading,
}) => {

  const iconosEstado = {
    Ganado: "/victoria2.png",
    Empatado: "/empate3.png",
    Perdido: "/derrota2.png"
  };
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <div className='contenedor_general_gris_partido'>
            <div className='contenedor_nombre_partido'>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <span className='estadistica_clave_partido'>{partido.competicion} ({partido.categoria})</span>
                  <span className='estadistica_partido'>{formatDateDDMMYYYY(partido.fecha)} {partido.hora}</span>
                </div>
                <div className='contenedor_resultado_partido'>
                  <img
                      src={'/brumario_escudo_sin_fondo.png'}
                      alt="App Logo"
                      className='img_partido'
                  />
                  <div className='contenedor_rival'><span className='nombre_rival'>{partido.rival}</span></div>
                  <div className='contenedor_resultado_final'>
                      <img
                          src={iconosEstado[partido.resultado as "Ganado" | "Empatado" | "Perdido"]}
                          alt={partido.resultado}
                          className='img_resultado'
                      />
                      <span className='nombre_resultado'>{partido.goles_favor} - {partido.goles_contra}</span>
                  </div>
                </div>
            </div>
            <div className='contenedor_estadistica'>
              <div style={{paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px'}}>
                <span className='metadata_partido'>Ubicacion: {partido.ubicacion}</span>
                <span className='metadata_partido'>Sede: {partido.predio}</span>
                <span className='metadata_partido'>Cancha: {partido.cancha}</span>
                <span className='metadata_partido'>Jornada: {partido.jornada}</span>
              </div>
              <div className='contenedor_general_partido'>
                <div className='contenedor_formacion'>
                  <div className='contenedor_estadistica_nombre'>
                      <img
                          src={'/diego2_sin_fondo.png'}
                          alt="App Logo"
                          width="40"
                          height="50"
                          style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      <span className='nombre_estadistica'>
                          Formación
                      </span>   
                  </div>
                  <span className='estadistica' style={{paddingLeft: 35}}>Esquema Táctico: {partido.esquema_tactico}</span>
                  {partido.titulares.length === 0 ? (
                    <p style={{ fontStyle: "italic", color: "grey", marginLeft: 37 }}>
                        No hay datos disponibles
                      </p>
                  ) : (
                    <table style={{ marginLeft: 15, textAlign: 'left', marginBottom: 15, marginTop: 15 }}>
                      <tbody>
                        {partido.titulares.map((jugador, index) => {
                          const [apellido, nombre] = jugador.split(",").map(s => s.trim());
                          const nombreBackend = jugador; 

                          // Contar goles
                          const goles = partido.golesFavor
                            ? partido.golesFavor.filter(g => g.gol === nombreBackend).length
                            : 0;

                          // Contar asistencias
                          const asistencias = partido.golesFavor
                            ? partido.golesFavor.filter(g => g.asistencia === nombreBackend).length
                            : 0;

                          // Contar amarillas
                          const amarillas = partido.amarillas
                            ? partido.amarillas.filter(a => a === nombreBackend).length
                            : 0;

                          // Contar rojas
                          const rojas = partido.rojas
                            ? partido.rojas.filter(r => r === nombreBackend).length
                            : 0;

                          const entra = partido.reemplazos.some(r => r.entra === nombreBackend);
                          const sale = partido.reemplazos.some(r => r.sale === nombreBackend);

                          // 🔹 Usamos React.ReactNode[] en vez de string[] | JSX.Element[]
                          const partes: React.ReactNode[] = [];

                          if (goles > 0) {
                            partes.push(
                              <>⚽{goles > 1 ? `(${goles})` : ""}</>
                            );
                          }
                          if (asistencias > 0) {
                            partes.push(
                              <>
                                <img
                                  src="/asistencia6.png"
                                  alt="Asistencia"
                                  style={{ width: 18, height: 18, verticalAlign: "middle", marginLeft: 5 }}
                                />
                                {asistencias > 1 ? `(${asistencias})` : ""}
                              </>
                            );
                          }
                          if (amarillas > 0) {
                            partes.push(
                              <>
                                <img
                                  src="/amarilla_sin_fondo2.png"
                                  alt="Amarilla"
                                  style={{ width: 22, height: 20, verticalAlign: "middle", marginLeft: 5 }}
                                />
                                {amarillas > 1 ? `(${amarillas})` : ""}
                              </>
                            );
                          }
                          if (rojas > 0) {
                            partes.push(
                              <>
                                <img
                                  src="/roja_sin_fondo.png"
                                  alt="Roja"
                                  style={{ width: 22, height: 22, verticalAlign: "middle", marginLeft: 5 }}
                                />
                                {rojas > 1 ? `(${rojas})` : ""}
                              </>
                            );
                          }

                          if (sale) {
                            partes.push(
                              <>
                                <img
                                  src="/sale_sin_fondo.png"
                                  alt="Sale"
                                  style={{ width: 7, height: 13, verticalAlign: "middle", marginLeft: 5 }}
                                />
                              </>
                            );  
                          }

                          if (entra) {
                            partes.push(
                              <>
                                <img
                                  src="/entra_sin_fondo.png"
                                  alt="Entra"
                                  style={{ width: 7, height: 13, verticalAlign: "middle", marginLeft: 5 }}
                                />
                              </>
                            );  
                          }

                          return (
                            <tr key={index}>
                              <td className='estadistica' style={{ paddingLeft: 20 }}>
                                <Link to={`/jugador/${jugador}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                                  {nombre} {apellido}
                                </Link>
                                {partes.length > 0 && (
                                  <> {partes.map((p, i) => (
                                    <span key={i}>
                                      {i > 0 ? ", " : ""}{p}
                                    </span>
                                  ))}</>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}

                  {partido.suplentes.length === 0 ? (
                    <p style={{ marginLeft: 37, fontStyle: 'italic', marginRight: 90 }}>
                    </p>
                  ) : (
                    <table style={{ marginLeft: 15, textAlign: 'left', marginBottom: 15, marginTop: 15 }}>
                      <tbody>
                        {partido.suplentes.map((jugador, index) => {
                          const [apellido, nombre] = jugador.split(",").map(s => s.trim());
                          const nombreBackend = jugador; 

                          // Contar goles
                          const goles = partido.golesFavor
                            ? partido.golesFavor.filter(g => g.gol === nombreBackend).length
                            : 0;

                          // Contar asistencias
                          const asistencias = partido.golesFavor
                            ? partido.golesFavor.filter(g => g.asistencia === nombreBackend).length
                            : 0;

                          // Contar amarillas
                          const amarillas = partido.amarillas
                            ? partido.amarillas.filter(a => a === nombreBackend).length
                            : 0;

                          // Contar rojas
                          const rojas = partido.rojas
                            ? partido.rojas.filter(r => r === nombreBackend).length
                            : 0;

                          const entra = partido.reemplazos.some(r => r.entra === nombreBackend);
                          const sale = partido.reemplazos.some(r => r.sale === nombreBackend);

                          // 🔹 Usamos React.ReactNode[] en vez de string[] | JSX.Element[]
                          const partes: React.ReactNode[] = [];

                          if (goles > 0) {
                            partes.push(
                              <>⚽{goles > 1 ? `(${goles})` : ""}</>
                            );
                          }
                          if (asistencias > 0) {
                            partes.push(
                              <>
                                <img
                                  src="/asistencia6.png"
                                  alt="Asistencia"
                                  style={{ width: 18, height: 18, verticalAlign: "middle", marginLeft: 5 }}
                                />
                                {asistencias > 1 ? `(${asistencias})` : ""}
                              </>
                            );
                          }
                          if (amarillas > 0) {
                            partes.push(
                              <>
                                <img
                                  src="/amarilla_sin_fondo2.png"
                                  alt="Amarilla"
                                  style={{ width: 22, height: 20, verticalAlign: "middle", marginLeft: 5 }}
                                />
                                {amarillas > 1 ? `(${amarillas})` : ""}
                              </>
                            );
                          }
                          if (rojas > 0) {
                            partes.push(
                              <>
                                <img
                                  src="/roja_sin_fondo.png"
                                  alt="Roja"
                                  style={{ width: 22, height: 22, verticalAlign: "middle", marginLeft: 5 }}
                                />
                                {rojas > 1 ? `(${rojas})` : ""}
                              </>
                            );
                          }

                          if (entra) {
                            partes.push(
                              <>
                                <img
                                  src="/entra_sin_fondo.png"
                                  alt="Entra"
                                  style={{ width: 7, height: 13, verticalAlign: "middle", marginLeft: 5 }}
                                />
                              </>
                            );  
                          }

                          if (sale) {
                            partes.push(
                              <>
                                <img
                                  src="/sale_sin_fondo.png"
                                  alt="Sale"
                                  style={{ width: 7, height: 13, verticalAlign: "middle", marginLeft: 5 }}
                                />
                              </>
                            );  
                          }

                          return (
                            <tr key={index}>
                              <td className='estadistica' style={{ paddingLeft: 20 }}>
                                <Link to={`/jugador/${jugador}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                                  {nombre} {apellido}
                                </Link>
                                {partes.length > 0 && (
                                  <> {partes.map((p, i) => (
                                    <span key={i}>
                                      {i > 0 ? ", " : ""}{p}
                                    </span>
                                  ))}</>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                  <span className='estadistica' style={{paddingLeft: 35}}>
                    DT: {partido.director_tecnico ? (
                      <Link to={`/jugador/${partido.director_tecnico}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                        {partido.director_tecnico}
                      </Link>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div style={{paddingBottom: 10}}>
                  <div className='contenedor_estadistica_nombre' style={{marginTop: 10}}>
                      <img
                          src={'/goleadors_sin_fondo.png'}
                          alt="App Logo"
                          width="40"
                          height="40"
                          style={{ marginLeft: 10, marginRight: 5, transform: "translateY(2px)" }}
                      />
                      <span className='nombre_estadistica'>
                          Resumen
                      </span>   
                  </div>
                  <div style={{ marginTop: 22, marginLeft: 35 }}>
                  {(() => {
                  // 🔹 Unificamos goles a favor y en contra
                  const eventos = [
                    ...(partido.golesFavor?.map((g) => {
                      const [apellido, nombre] = g.gol.split(",").map((s) => s.trim());
                      const goleador = [nombre, apellido].filter(Boolean).join(" ");
                      const textoGol = g.tipo ? ` (${g.tipo})` : "";
                      let textoAsistencia = "";

                      if (g.asistencia) {
                        const [aApe, aNom] = g.asistencia.split(",").map((s) => s.trim());
                        const asistidor = [aNom, aApe].filter(Boolean).join(" ");
                        textoAsistencia = g.tipoAsistencia
                          ? ` || ${asistidor} (${g.tipoAsistencia})`
                          : ` || ${asistidor}`;
                      }

                      return {
                        texto: `${g.resultadoParcial}: ⚽ ${goleador} ${textoGol}${textoAsistencia}`,
                        parcial: g.resultadoParcial,
                        tipo: "favor" as const,
                        tieneAsistencia: !!g.asistencia,
                        goleador: g.gol,
                        asistidor: g.asistencia
                      };
                    }) || []),

                    ...(partido.golesRecibidos?.map((g) => ({
                      texto: g.tipo
                        ? `${g.resultadoParcial}: Gol rival (${g.tipo})`
                        : `${g.resultadoParcial}: Gol rival`,
                      parcial: g.resultadoParcial,
                      tipo: "contra" as const,
                    })) || []),
                  ];

                  // 🔹 Ordenar cronológicamente por resultado parcial (1-0, 1-1, 2-1...)
                  const parseResultado = (r: string) => {
                    const [favor, contra] = r.split("-").map(Number);
                    return favor + contra;
                  };

                  const eventosOrdenados = eventos.sort(
                    (a, b) => parseResultado(a.parcial) - parseResultado(b.parcial)
                  );

                  // 🔹 Renderizado
                  if (eventosOrdenados.length === 0) {
                    return (
                      <p style={{ fontStyle: "italic", color: "grey" }}>
                        No se registraron goles en este partido
                      </p>
                    );
                  }

                  return (
                    <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
                  {eventosOrdenados.map((ev, i) => (
                    <li
                  key={i}
                  className="estadistica"
                  style={{
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center", // ✅ centra verticalmente imagen y texto
                    gap: 4,
                    flexWrap: "wrap", // permite que todo se vaya a la siguiente línea si no cabe
                    whiteSpace: "normal",
                  }}
                >
                  {ev.tipo === "favor" ? (
                    <>
                      <span style={{ display: "inline-block" }}>
                  <img
                    src="/victoria2.png"
                    alt="Gol a favor"
                    style={{
                      width: 11,
                      height: 11,
                      verticalAlign: "top", // ✅ se alinea al primer renglón
                      marginRight: 4,
                      transform: "translateY(5px)"
                    }}
                  />
                  <span style={{ display: "inline" }}>
                    {ev.goleador === "En contra" ? (
                      <span>{ev.texto.split("||")[0].trim()}</span>
                    ) : (
                      <Link 
                        to={`/jugador/${ev.goleador}`} 
                        style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                      >
                        {ev.texto.split("||")[0].trim()}
                      </Link>
                    )}
                    <Link to={`/jugador/${ev.asistidor}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                      {ev.tieneAsistencia && <> {" || "} 🎯 {ev.texto.split("||")[1].trim()}</>}
                    </Link>
                  </span>
                </span>


                    </>
                  ) : (
                    <>
                      <img
                        src="/derrota2.png"
                        alt="Gol en contra"
                        style={{
                          width: 11,
                          height: 11,
                          marginRight: 2,
                          flexShrink: 0,
                          verticalAlign: "middle",
                          transform: "translateY(1px)"
                        }}
                      />
                      <span style={{ flex: "0 1 auto" }}>{ev.texto}</span>
                    </>
                  )}
                </li>

                  ))}
                </ul>

                  );
                })()}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 25 }}>
                  {partido.reemplazos.map((cambio, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="/cambio4.png"
                        alt="Cambio"
                        width="20"
                        height="20"
                        style={{ marginRight: 5, transform: "translateY(2px)", marginLeft: -4 }}
                      />
                      <span className="estadistica">
                        <Link 
                          to={`/jugador/${encodeURIComponent(cambio.entra)}`} 
                          style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                        >
                          {formatearNombre(cambio.entra)}
                        </Link>
                        {" (Entra) || "}
                        <Link 
                          to={`/jugador/${encodeURIComponent(cambio.sale)}`} 
                          style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                        >
                          {formatearNombre(cambio.sale)}
                        </Link>
                        {" (Sale)"}
                      </span>
                    </div>
                  ))}
                </div>
                </div>
                <div className='contenedor_presencias_sin_jugar'>
                  <div className='contenedor_estadistica_presencias_sin_jugar'>
                        <img
                            src={'/cerveza_sin_fondo.png'}
                            alt="App Logo"
                            width="40"
                            height="40"
                            style={{ marginLeft: 10, marginRight: 5, transform: "translateY(2px)" }}
                        />
                        <span className='nombre_estadistica'>
                            Presencias Sin Jugar
                        </span>   
                  </div>
                  <span className="estadistica" style={{marginLeft: 37}}>
                    {partido.presencia_sin_jugar.length === 0 ? (
                      <p style={{ fontStyle: "italic", color: "grey", marginTop: 0, marginLeft: 30, fontWeight: "normal", fontSize: 16 }}>
                        No hubo presencias sin jugar en este partido
                      </p>
                    ) : (
                      partido.presencia_sin_jugar.map((jugador, i) => {
                        const [apellido, nombre] = jugador.split(",").map((s) => s.trim());
                        const nombreCompleto = `${nombre} ${apellido}`;
                        return (
                          <span key={i}>
                            <Link
                              to={`/jugador/${jugador}`}
                              style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                            >
                              {nombreCompleto}
                            </Link>
                            {i < partido.presencia_sin_jugar.length - 1 && ", "}
                          </span>
                        );
                      })
                    )}
                  </span>
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

function formatearNombre(nombre: string): string {
  const partes = nombre.split(',').map(p => p.trim());
  if (partes.length !== 2) return nombre;
  const [apellido, nombrePropio] = partes;
  return `${nombrePropio} ${apellido}`;
}