import React, { useState, useMemo, useEffect } from 'react';
import '../styles/jugadores.css'
import '../styles/detalles_jugador.css'
import '../styles/partido.css'
import '../styles/partidos.css'
import { Partido } from '../services/service_utils';
import { useNavigate } from "react-router-dom";

interface PartidosTodosProp {
  partidos: Partido[];
  loading: boolean;
}

export const PartidosTodos: React.FC<PartidosTodosProp> = ({
  partidos,
  loading,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedCategoria, setSelectedCategoria] = useState<string>("");
  const [selectedDT, setSelectedDT] = useState<string>("");
  const [selectedRival, setSelectedRival] = useState<string>("");
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [selectedCompeticion, setSelectedCompeticion] = useState<string>("");
  const navigate = useNavigate();

  const iconosEstado = {
    Ganado: "/victoria2.png",
    Empatado: "/empate3.png",
    Perdido: "/derrota2.png"
  };

  const [pagina, setPagina] = useState(1);
  const partidosPorPagina = 8;

  // 🔹 Años únicos
  const years = useMemo(() => {
    const uniqueYears = new Set(
      partidos.map((p) => new Date(p.fecha).getFullYear().toString())
    );
    return Array.from(uniqueYears).sort((a, b) => Number(b) - Number(a));
  }, [partidos]);

  // 🔹 Categorías únicas
  const categorias = useMemo(() => {
    const uniqueCategorias = new Set(partidos.map((p) => p.categoria));
    return Array.from(uniqueCategorias);
  }, [partidos]);

  // dentro del componente
  const historialRivales = useMemo(() => calcularHistorial(partidos), [partidos]);


  // 🔹 DT únicos
  const directoresTecnicos = useMemo(() => {
    const uniqueDTs = new Set(partidos.map((p) => p.director_tecnico));
    return Array.from(uniqueDTs).filter(Boolean);
  }, [partidos]);

  // 🔹 Rivales únicos (ordenados alfabéticamente)
  const rivales = useMemo(() => {
    const uniqueRivales = new Set(partidos.map((p) => p.rival));
    return Array.from(uniqueRivales)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [partidos]);

  // 🔹 Competiciones
  const competiciones = useMemo(() => {
    const uniqueCompeticiones = new Set<string>()
    for (const partido of partidos) {
      if (partido.competicion === "Amistoso") continue;
      if (!uniqueCompeticiones.has(partido.competicion + partidoAnio(partido.fecha))) {
        uniqueCompeticiones.add(partido.competicion + " (" + partidoAnio(partido.fecha) + ")")
      }
    }
    return Array.from(uniqueCompeticiones)
  }, [partidos]);
  

  // 🔹 Filtrado combinado
  const filteredPartidos = useMemo(() => {
    return partidos.filter((p) => {
      const matchYear = selectedYear
        ? new Date(p.fecha).getFullYear().toString() === selectedYear
        : true;
      const matchCategoria = selectedCategoria
        ? p.categoria === selectedCategoria
        : true;
      const matchDT = selectedDT
        ? p.director_tecnico === selectedDT
        : true;
      const matchRival = selectedRival
        ? p.rival === selectedRival
        : true;
      const matchTipo = selectedTipo
      ? p.tipo_partido === selectedTipo
      : true;
      const matchCompeticion = selectedCompeticion
      ? p.competicion + " (" + partidoAnio(p.fecha) + ")" === selectedCompeticion
      : true;
      return matchYear && matchCategoria && matchDT && matchRival && matchTipo && matchCompeticion;
    });
  }, [partidos, selectedYear, selectedCategoria, selectedDT, selectedRival, selectedTipo, selectedCompeticion]);

  // calcular la cantidad total de páginas
  const totalPaginas = Math.ceil(filteredPartidos.length / partidosPorPagina);

  const handleSiguiente = () => {
    if (pagina < totalPaginas) setPagina(pagina + 1);
  };

  const handleAnterior = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  const partidosOrdenados = [...filteredPartidos].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const inicio = (pagina - 1) * partidosPorPagina;
  const partidosPaginados = partidosOrdenados.slice(inicio, inicio + partidosPorPagina);

  useEffect(() => {
    setPagina(1);
  }, [selectedYear, selectedCategoria, selectedDT, selectedRival, selectedCompeticion]);


  // 🔹 Función para limpiar filtros
  const resetFilters = () => {
    setSelectedYear("");
    setSelectedCategoria("");
    setSelectedDT("");
    setSelectedRival("");
    setSelectedTipo("");
    setSelectedCompeticion("");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className='contenedor_general_gris_partidos'>
            <div className='contenedor_estadistica_partidos'>
              {/* 🔹 Filtros */}
              <div style={{ marginBottom: 20, marginTop: 10, marginLeft: 5, display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {/* Año */}
                <div>
                  <label style={{ marginRight: "10px", fontWeight: "bold" }}>Año:</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px" }}
                  >
                    <option value="">Todos</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Categoría */}
                <div>
                  <label style={{ marginRight: "10px", fontWeight: "bold" }}>Categoría:</label>
                  <select
                    value={selectedCategoria}
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px" }}
                  >
                    <option value="">Todas</option>
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Director Técnico */}
                <div>
                  <label style={{ marginRight: "10px", fontWeight: "bold" }}>DT:</label>
                  <select
                    value={selectedDT}
                    onChange={(e) => setSelectedDT(e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px" }}
                  >
                    <option value="">Todos</option>
                    {directoresTecnicos.map((dt) => (
                      <option key={dt} value={dt}>{dt}</option>
                    ))}
                  </select>
                </div>

                {/* Rival */}
                <div>
                  <label style={{ marginRight: "10px", fontWeight: "bold" }}>Rival:</label>
                  <select
                    className="filtrar_rival"
                    value={selectedRival}
                    onChange={(e) => setSelectedRival(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {rivales.map((rival) => (
                      <option key={rival} value={rival}>{rival}</option>
                    ))}
                  </select>
                </div>
                {/* Tipo de Partido */}
                <div>
                  <label style={{ marginRight: "10px", fontWeight: "bold" }}>
                    Tipo:
                  </label>
                  <select
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px" }}
                  >
                    <option value="">Todos</option>
                    <option value="Oficial">Oficial</option>
                    <option value="Amistoso">Amistoso</option>
                  </select>
                </div>
                {/* Competicion */}
                <div>
                  <label style={{ marginRight: "10px", fontWeight: "bold" }}>
                    Competición:
                  </label>
                  <select
                    value={selectedCompeticion}
                    onChange={(e) => setSelectedCompeticion(e.target.value)}
                    style={{ padding: "5px", borderRadius: "5px" }}
                    className="filtrar_competicion"
                  >
                    <option value="">Todos</option>
                    {competiciones.map((competicion) => (
                      <option key={competicion} value={competicion}>{competicion}</option>
                    ))}
                  </select>
                </div>
                {/* Botón limpiar */}
                <div>
                  <button
                    onClick={resetFilters}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>

              {/* Tabla */}
              <div className='tabla_partidos'>
              <table>
                <tbody>
                  {Array.isArray(partidosPaginados) && partidosPaginados.length > 0 ? (
                    [...partidosPaginados]
                      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                      .map((partido, i) => (
                        <tr key={i}>
                          <td style={{ paddingBottom: 0, height: 50 }}>
                            <div className='contenedor_partido'>
                                <span className="partido" style={{paddingRight: 30, paddingLeft: 10}}>
                                  {formatDateDDMMYYYY(partido.fecha)}
                                </span>
                                <span className="partido" style={{paddingRight: 20, paddingLeft: 0, width: 60}}>
                                  {partido.hora || "-------"}
                                </span>
                                <span 
                                  className="partido_tooltip" 
                                  style={{ paddingRight: 20, paddingLeft: 10, width: 200 }}
                                >
                                  {partido.rival}
                                  <span className="tooltip-text" style={{width: 100}}>
                                    {(() => {
                                      const h = historialRivales[partido.rival];
                                      if (!h) return "Sin historial";
                                      return `${h.G}G - ${h.E}E - ${h.P}P`;
                                    })()}
                                  </span>
                                </span>
                                <div style={{width: 100, paddingRight: 20, paddingLeft: 10}}>
                                  <img
                                    src={iconosEstado[partido.resultado as "Ganado" | "Empatado" | "Perdido"]}
                                    alt={partido.resultado}
                                    style={{width: 15, height: 15, marginRight: 10, verticalAlign: 'middle'}}
                                  />
                                  <span className="partido_tooltip" onClick={() => navigate(`/partidos/${partido.nro}`)}>
                                    {partido.goles_favor} - {partido.goles_contra}
                                    <span className="tooltip-text">
                                      <strong>⚽GOLES:</strong>
                                      <br />
                                      {partido.golesFavor && partido.golesFavor.length > 0
                                        ? (() => {
                                            // contar goles por jugador
                                            const contador: Record<string, number> = {};
                                            partido.golesFavor.forEach(g => {
                                              contador[g.gol] = (contador[g.gol] || 0) + 1;
                                            });
                                            // mostrar en vertical con cantidad si >1
                                            return Object.entries(contador).map(([jugador, cantidad], i) => (
                                              <div key={i}>
                                                {jugador} {cantidad > 1 ? `(${cantidad})` : ""}
                                              </div>
                                            ));
                                          })()
                                        : "Ninguno"}
                                    </span>
                                  </span>
                                </div>
                                <span className="partido" style={{paddingRight: 20, paddingLeft: 10, width: 250}}>
                                  {partido.competicion} ({partido.categoria})
                                </span>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={7} style={{fontWeight: 'bold', textAlign: 'center', padding: '20px', paddingLeft: 350, width: '100%' }}>
                        No hay partidos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          {/* Paginación */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                {/* Columna izquierda */}
                <div style={{ width: '50px', textAlign: 'center' }}>
                  {pagina > 1 && (
                    <button className='boton_cambiar_pagina' onClick={handleAnterior}>
                      {'<'}
                    </button>
                  )}
                </div>

                {/* Columna central */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span className='nro_pagina'>Página {pagina} de {totalPaginas}</span>
                </div>

                {/* Columna derecha */}
                <div style={{ width: '50px', textAlign: 'center' }}>
                  {pagina < totalPaginas && (
                    <button className='boton_cambiar_pagina' onClick={handleSiguiente}>
                      {'>'}
                    </button>
                  )}
                </div>
              </div>
        </>
      )}
    </div>
  );
};

export function formatDateDDMMYYYY(date?: Date | string): string {
  if (!date) return "";
  let d = new Date(date);
  const dia = String(d.getUTCDate()).padStart(2, "0");
  const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
  const anio = d.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

export function partidoAnio(date?: Date | string): string {
  if (!date) return "";
  const d = new Date(date);
  const anio = d.getFullYear();
  return anio.toString();
}

function calcularHistorial(partidos: Partido[]) {
  const historial: Record<string, { G: number; E: number; P: number }> = {};

  partidos.forEach((p) => {
    if (!historial[p.rival]) {
      historial[p.rival] = { G: 0, E: 0, P: 0 };
    }

    if (p.resultado === "Ganado") historial[p.rival].G++;
    else if (p.resultado === "Empatado") historial[p.rival].E++;
    else if (p.resultado === "Perdido") historial[p.rival].P++;
  });

  return historial;
}
