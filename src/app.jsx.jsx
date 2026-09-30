import { useState } from "react";

const TAREAS_FIJAS = [
  { nombre: "🪑 Salón 1", hecho: false },
  { nombre: "🚹 Baño hombres", hecho: false },
  { nombre: "🪑 Salón 2", hecho: false },
  { nombre: "🚺 Baño mujeres", hecho: false },
  { nombre: "🛵 Área de domicilio", hecho: false },
];

const TAREAS_DIA = {
  0: [ // Domingo
    { nombre: "🧯 Extintores", hecho: false },
    { nombre: "📺 TVs", hecho: false },
    { nombre: "🧱 Paredes", hecho: false },
    { nombre: "💡 Lámparas", hecho: false },
  ],
  1: [ // Lunes
    { nombre: "🪟 Vidrios", hecho: false },
    { nombre: "🗑️ Botes de basura", hecho: false },
    { nombre: "🥫 Rellenar catsup, soya y demás", hecho: false },
  ],
  2: [ // Martes
    { nombre: "💺 Bases y sillas", hecho: false },
    { nombre: "❄️ Refrigerador de domicilio", hecho: false },
  ],
  3: [ // Miércoles
    { nombre: "🪞 Mueble salón 1", hecho: false },
    { nombre: "📋 Menús", hecho: false },
    { nombre: "💻 Mueble computadora salón 2", hecho: false },
  ],
  4: [ // Jueves
    { nombre: "🗑️ Botes de basura", hecho: false },
    { nombre: "🌿 Jardineras y plantas", hecho: false },
  ],
  5: [ // Viernes
    { nombre: "🪟 Vidrios", hecho: false },
    { nombre: "🧺 Tapetes y jergas", hecho: false },
    { nombre: "🧴 Lavar soyeras y área de domicilio", hecho: false },
  ],
  6: [ // Sábado
    { nombre: "💺 Bases y sillas", hecho: false },
    { nombre: "📋 Menús", hecho: false },
    { nombre: "🥫 Rellenar catsup, soya y demás", hecho: false },
  ],
};

const DIAS = [
  { num: 1, label: "Lunes",     emoji: "📅", color: "#1a4a6b" },
  { num: 2, label: "Martes",    emoji: "📅", color: "#1a4a6b" },
  { num: 3, label: "Miércoles", emoji: "📅", color: "#1a4a6b" },
  { num: 4, label: "Jueves",    emoji: "📅", color: "#1a4a6b" },
  { num: 5, label: "Viernes",   emoji: "📅", color: "#1a4a6b" },
  { num: 6, label: "Sábado",    emoji: "🌟", color: "#3d6b1a" },
  { num: 0, label: "Domingo",   emoji: "🌅", color: "#6b1a1a" },
];

export default function App() {
  const [step, setStep] = useState("dia");
  const [diaNum, setDiaNum] = useState(null);
  const [encargado, setEncargado] = useState("");
  const [tareas, setTareas] = useState([]);

  const diaData = DIAS.find(d => d.num === diaNum);
  const color = diaData?.color || "#1a1a1a";

  const hoy = new Date().getDay();

  function seleccionarDia(num) {
    const fijas = TAREAS_FIJAS.map(t => ({ ...t, hecho: false }));
    const extras = (TAREAS_DIA[num] || []).map(t => ({ ...t, hecho: false }));
    setTareas([...fijas, ...extras]);
    setDiaNum(num);
    setStep("tareas");
  }

  function toggleTarea(i) {
    setTareas(prev => prev.map((t, idx) => idx === i ? { ...t, hecho: !t.hecho } : t));
  }

  function marcarTodo() {
    setTareas(prev => prev.map(t => ({ ...t, hecho: true })));
  }

  const todasMarcadas = tareas.length > 0 && tareas.every(t => t.hecho);
  const completadas = tareas.filter(t => t.hecho).length;
  const pct = tareas.length ? (completadas / tareas.length) * 100 : 0;

  const todoMarcado = todasMarcadas;

  function enviar() {
    const fecha = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });
    const lineas = tareas.map(t => `✅ ${t.nombre}`).join("\n");
    const msg =
      `🧹 *LIMPIEZA NOCTURNA — ROLLI SUSHI*\n` +
      `📅 ${diaData.label} ${fecha}\n` +
      `👤 Encargado: ${encargado || "—"}\n\n` +
      lineas;
    navigator.clipboard.writeText(msg).catch(() => {});
    window.open("https://chat.whatsapp.com/Hoy9Hr9HbiyHqrnb7gUwM9", "_blank");
    setTimeout(() => {
      setStep("dia");
      setDiaNum(null);
      setEncargado("");
      setTareas([]);
    }, 800);
  }

  const fijas = tareas.filter((_, i) => i < TAREAS_FIJAS.length);
  const extras = tareas.filter((_, i) => i >= TAREAS_FIJAS.length);

  const s = {
    app: { minHeight: "100vh", background: "#f5f5f0", fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center" },
    header: { width: "100%", background: "#111", color: "#fff", padding: "18px 20px 14px", textAlign: "center" },
    title: { fontSize: "22px", fontWeight: "bold", letterSpacing: "3px", margin: 0 },
    sub: { fontSize: "11px", color: "#aaa", letterSpacing: "2px", marginTop: "2px" },
    container: { width: "100%", maxWidth: "480px", padding: "20px 16px", flex: 1 },
    stepLabel: { fontSize: "11px", fontWeight: "bold", color: "#aaa", letterSpacing: "2px", textTransform: "uppercase", textAlign: "center", marginBottom: "16px" },
    card: { background: "#fff", borderRadius: "12px", padding: "16px", marginBottom: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e8e8e8" },
    diaBtn: (c, esHoy) => ({
      display: "flex", alignItems: "center", gap: "14px", width: "100%",
      background: esHoy ? c + "15" : "#fff",
      border: `2px solid ${esHoy ? c : "#e0e0e0"}`,
      borderRadius: "12px", padding: "14px 16px", marginBottom: "8px", cursor: "pointer",
    }),
    diaEmoji: { fontSize: "22px", width: "32px", textAlign: "center" },
    diaLabel: (c, esHoy) => ({ fontSize: "16px", fontWeight: esHoy ? "bold" : "normal", color: esHoy ? c : "#333", flex: 1, textAlign: "left" }),
    hoyBadge: (c) => ({ fontSize: "10px", background: c, color: "#fff", padding: "2px 8px", borderRadius: "10px", letterSpacing: "0.5px" }),
    sectionLabel: { fontSize: "10px", fontWeight: "bold", color: "#aaa", letterSpacing: "1.5px", textTransform: "uppercase", padding: "10px 0 6px", marginTop: "4px" },
    tareaRow: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f0f0f0" },
    tareaNombre: { flex: 1, fontSize: "14px", color: "#111" },
    inicialesInput: { border: "none", borderBottom: `2px solid ${color}`, width: "44px", fontSize: "13px", fontWeight: "bold", textAlign: "center", textTransform: "uppercase", outline: "none", background: "transparent", color: "#111", padding: "2px 0" },
    input: { width: "100%", border: "none", borderBottom: "2px solid #ddd", background: "transparent", fontSize: "15px", padding: "6px 0", outline: "none", color: "#111", boxSizing: "border-box" },
    label: { fontSize: "10px", color: "#aaa", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px", display: "block" },
    btn: (c, dis) => ({ width: "100%", background: dis ? "#ccc" : c, color: "#fff", border: "none", borderRadius: "12px", padding: "16px", fontSize: "16px", fontWeight: "bold", cursor: dis ? "not-allowed" : "pointer", letterSpacing: "1px", marginTop: "8px" }),
    btnSec: { width: "100%", background: "transparent", color: "#888", border: "1px solid #ddd", borderRadius: "12px", padding: "12px", fontSize: "14px", cursor: "pointer", marginTop: "8px" },
    backBtn: { background: "none", border: "none", color: "#888", fontSize: "13px", cursor: "pointer", padding: "0 0 16px 0", display: "flex", alignItems: "center", gap: "4px" },
    avisos: { background: "#fffbea", border: "1.5px solid #e0a800", borderRadius: "10px", padding: "12px 14px", marginBottom: "8px" },
    avisosTitle: { fontSize: "11px", fontWeight: "bold", color: "#b07d00", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" },
    avisosText: { fontSize: "12px", color: "#555", lineHeight: "1.9" },
    progressRow: { display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#aaa", marginBottom: "4px" },
    progressBar: { height: "5px", background: "#eee", borderRadius: "3px", overflow: "hidden", marginBottom: "14px" },
    progressFill: (c, pct) => ({ height: "100%", width: `${pct}%`, background: c, borderRadius: "3px", transition: "width 0.3s" }),
  };

  return (
    <div style={s.app}>
      <div style={s.header}>
        <div style={s.title}>ROLLI SUSHI</div>
        <div style={s.sub}>CONTROL DE LIMPIEZA NOCTURNA</div>
      </div>

      <div style={s.container}>

        {/* PASO 1: Seleccionar día */}
        {step === "dia" && (
          <>
            <div style={s.stepLabel}>¿Qué día es hoy?</div>
            {DIAS.map(d => {
              const esHoy = d.num === hoy;
              return (
                <button key={d.num} style={s.diaBtn(d.color, esHoy)} onClick={() => seleccionarDia(d.num)}>
                  <span style={s.diaEmoji}>{d.emoji}</span>
                  <span style={s.diaLabel(d.color, esHoy)}>{d.label}</span>
                  {esHoy && <span style={s.hoyBadge(d.color)}>HOY</span>}
                </button>
              );
            })}
          </>
        )}

        {/* PASO 2: Tareas */}
        {step === "tareas" && diaData && (
          <>
            <button style={s.backBtn} onClick={() => setStep("dia")}>← Regresar</button>

            <div style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", color }}>{diaData.emoji} {diaData.label}</div>
                <div style={{ fontSize: "12px", color: "#aaa" }}>{new Date().toLocaleDateString("es-MX")}</div>
              </div>
              <span style={s.label}>Nombre del encargado</span>
              <input style={s.input} placeholder="Escribe tu nombre..." value={encargado} onChange={e => setEncargado(e.target.value)} />
            </div>

            <div style={s.progressRow}>
              <span>Progreso</span>
              <span style={{ color, fontWeight: "bold" }}>{completadas}/{tareas.length}</span>
            </div>
            <div style={s.progressBar}>
              <div style={s.progressFill(color, pct)} />
            </div>

            {/* BOTÓN ÚNICO: Marcar todo */}
            <button
              onClick={marcarTodo}
              style={{
                width: "100%",
                background: todoMarcado ? color : "#fff",
                color: todoMarcado ? "#fff" : color,
                border: `2px solid ${color}`,
                borderRadius: "10px",
                padding: "11px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "12px",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: "18px" }}>{todoMarcado ? "✅" : "☑️"}</span>
              {todoMarcado ? "Todo marcado" : "Marcar todo"}
            </button>

            <div style={s.card}>
              <div style={s.sectionLabel}>Tareas diarias</div>
              {fijas.map((t, i) => (
                <div key={i} style={s.tareaRow} onClick={() => toggleTarea(i)}>
                  <div style={{ ...s.tareaNombre, color: t.hecho ? "#aaa" : "#111", textDecoration: t.hecho ? "line-through" : "none" }}>{t.nombre}</div>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${t.hecho ? color : "#ddd"}`,
                    background: t.hecho ? color : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px", cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {t.hecho && <span style={{ color: "#fff" }}>✓</span>}
                  </div>
                </div>
              ))}

              {extras.length > 0 && (
                <>
                  <div style={s.sectionLabel}>Tareas del {diaData.label}</div>
                  {extras.map((t, i) => (
                    <div key={i} style={s.tareaRow} onClick={() => toggleTarea(TAREAS_FIJAS.length + i)}>
                      <div style={{ ...s.tareaNombre, color: t.hecho ? "#aaa" : "#111", textDecoration: t.hecho ? "line-through" : "none" }}>{t.nombre}</div>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${t.hecho ? color : "#ddd"}`,
                        background: t.hecho ? color : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "14px", cursor: "pointer", transition: "all 0.15s",
                      }}>
                        {t.hecho && <span style={{ color: "#fff" }}>✓</span>}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div style={s.avisos}>
              <div style={s.avisosTitle}>⚠️ Recordatorios</div>
              <div style={s.avisosText}>
                🚫 No dejar cubetas con agua estancada.<br />
                🔧 Reporta cualquier desperfecto hoy mismo.<br />
                📲 Al enviar, el mensaje se copia solo — solo pégalo en el grupo.
              </div>
            </div>

            <button style={s.btn(color, !todasMarcadas || !encargado.trim())} disabled={!todasMarcadas || !encargado.trim()} onClick={enviar}>
              📲 Enviar al grupo
            </button>
            {(!todasMarcadas || !encargado.trim()) && (
              <div style={{ textAlign: "center", fontSize: "12px", color: "#aaa", marginTop: "8px" }}>
                {!encargado.trim() ? "Escribe el nombre del encargado" : "Marca todo para poder enviar"}
              </div>
            )}
            <button style={s.btnSec} onClick={() => setStep("dia")}>Cancelar</button>
          </>
        )}

      </div>
    </div>
  );
}
