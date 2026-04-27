import { useState } from "react";

const HORARIOS = {
  lv: {
    label: "Lunes a Viernes",
    emoji: "📅",
    color: "#1a4a6b",
    empleados: [
      {
        num: 1,
        tareas: [
          { nombre: "🪑 Salón 1", nota: null },
          { nombre: "🚹 Baño hombres", nota: null },
          { nombre: "🪟 Vidrios", nota: "martes" },
          { nombre: "🍽️ Periquera", nota: null },
        ],
      },
      {
        num: 2,
        tareas: [
          { nombre: "🪑 Salón 2", nota: null },
          { nombre: "🚺 Baño mujeres", nota: null },
          { nombre: "💺 Base y sillas", nota: "martes" },
          { nombre: "🗑️ Botes de basura", nota: "martes" },
          { nombre: "🧺 Tapetes y jergas", nota: null },
        ],
      },
      {
        num: 3,
        tareas: [
          { nombre: "🛵 Área domicilio", nota: null },
          { nombre: "📦 Mesas domicilio", nota: null },
          { nombre: "💻 Mueble computadora", nota: null },
          { nombre: "🥤 Área de vasos", nota: null },
        ],
      },
    ],
  },
  sabado: {
    label: "Sábado",
    emoji: "🌟",
    color: "#3d6b1a",
    empleados: [
      {
        num: 1,
        tareas: [
          { nombre: "🪑 Salón 1", nota: null },
          { nombre: "🚹 Baño hombres", nota: null },
          { nombre: "🪟 Vidrios", nota: null },
          { nombre: "🍽️ Periquera", nota: null },
        ],
      },
      {
        num: 2,
        tareas: [
          { nombre: "🪑 Salón 2", nota: null },
          { nombre: "🚺 Baño mujeres", nota: null },
          { nombre: "💺 Base y sillas", nota: null },
          { nombre: "🧺 Tapetes y jergas", nota: null },
          { nombre: "🗑️ Botes de basura", nota: null },
        ],
      },
      {
        num: 3,
        tareas: [
          { nombre: "🛵 Área domicilio", nota: null },
          { nombre: "📦 Mesas domicilio", nota: null },
          { nombre: "💻 Mueble computadora", nota: null },
          { nombre: "🥤 Área de vasos", nota: null },
        ],
      },
      {
        num: 4,
        tareas: [
          { nombre: "💡 Lámparas", nota: null },
          { nombre: "📱 Tabletas", nota: null },
          { nombre: "📋 Menús", nota: null },
          { nombre: "🗑️ Botes de basura", nota: null },
        ],
      },
    ],
  },
  domingo: {
    label: "Domingo",
    emoji: "🌅",
    color: "#6b1a1a",
    empleados: [
      {
        num: 1,
        tareas: [
          { nombre: "🪑 Salón 1", nota: null },
          { nombre: "🚹 Baño hombres", nota: null },
          { nombre: "🪟 Vidrios", nota: null },
          { nombre: "🍽️ Periquera", nota: null },
        ],
      },
      {
        num: 2,
        tareas: [
          { nombre: "🪑 Salón 2", nota: null },
          { nombre: "🚺 Baño mujeres", nota: null },
          { nombre: "💺 Base y sillas", nota: null },
          { nombre: "🧺 Tapetes y jergas", nota: null },
        ],
      },
      {
        num: 3,
        tareas: [
          { nombre: "🛵 Área domicilio", nota: null },
          { nombre: "📦 Mesas domicilio", nota: null },
          { nombre: "💻 Mueble computadora", nota: null },
          { nombre: "🥤 Área de vasos", nota: null },
        ],
      },
      {
        num: 4,
        tareas: [
          { nombre: "🌿 Regar jardineras y lavarlas", nota: "dom" },
          { nombre: "🧱 Paredes", nota: "dom" },
          { nombre: "📺 TV", nota: "dom" },
          { nombre: "💡 Lámparas", nota: null },
          { nombre: "📋 Menús", nota: null },
        ],
      },
      {
        num: 5,
        tareas: [
          { nombre: "🧯 Extintores", nota: "dom" },
          { nombre: "🧴 Lavar cubetas y trapeadores", nota: "dom" },
          { nombre: "📱 Tabletas", nota: null },
          { nombre: "🗑️ Botes de basura", nota: null },
        ],
      },
    ],
  },
};

export default function App() {
  const [step, setStep] = useState("horario"); // horario | empleado | checklist | done
  const [horario, setHorario] = useState(null);
  const [empNum, setEmpNum] = useState(null);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(() => {
    const hoy = new Date();
    return hoy.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });
  });
  const [tareas, setTareas] = useState([]);

  const horarioData = horario ? HORARIOS[horario] : null;
  const empleadoData = horarioData && empNum !== null
    ? horarioData.empleados.find(e => e.num === empNum)
    : null;

  function seleccionarHorario(h) {
    setHorario(h);
    setStep("empleado");
  }

  function seleccionarEmpleado(num) {
    setEmpNum(num);
    const emp = HORARIOS[horario].empleados.find(e => e.num === num);
    setTareas(emp.tareas.map(t => ({ ...t, listo: false })));
    setStep("checklist");
  }

  function toggleTarea(i) {
    setTareas(prev => prev.map((t, idx) =>
      idx === i ? { ...t, listo: !t.listo } : t
    ));
  }

  const completadas = tareas.filter(t => t.listo).length;
  const total = tareas.length;
  const todasListas = completadas === total && total > 0;

  function enviarWhatsApp() {
    const lineas = tareas.map(t =>
      `${t.listo ? "✅" : "⬜"} ${t.nombre}`
    ).join("\n");

    const msg =
      `🧹 *LIMPIEZA COMPLETADA — ROLLI SUSHI*\n` +
      `📅 ${horarioData.label} ${fecha}\n` +
      `👤 Empleado ${empNum}: ${nombre || "Sin nombre"}\n\n` +
      lineas;

    navigator.clipboard.writeText(msg).catch(() => {});
    window.open("https://chat.whatsapp.com/Hoy9Hr9HbiyHqrnb7gUwM9", "_blank");
    setTimeout(() => reiniciar(), 800);
  }

  function reiniciar() {
    setStep("horario");
    setHorario(null);
    setEmpNum(null);
    setNombre("");
    setTareas([]);
  }

  const styles = {
    app: {
      minHeight: "100vh",
      background: "#f5f5f0",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: "100%",
      background: "#111",
      color: "#fff",
      padding: "18px 20px 14px",
      textAlign: "center",
    },
    headerTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      letterSpacing: "3px",
      margin: 0,
    },
    headerSub: {
      fontSize: "11px",
      color: "#aaa",
      letterSpacing: "2px",
      marginTop: "2px",
    },
    container: {
      width: "100%",
      maxWidth: "480px",
      padding: "20px 16px",
      flex: 1,
    },
    stepTitle: {
      fontSize: "13px",
      fontWeight: "bold",
      color: "#888",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "16px",
      textAlign: "center",
    },
    card: {
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      border: "1px solid #e8e8e8",
    },
    horarioBtn: (color) => ({
      display: "flex",
      alignItems: "center",
      gap: "14px",
      width: "100%",
      background: "#fff",
      border: `2px solid ${color}`,
      borderRadius: "12px",
      padding: "16px 18px",
      marginBottom: "10px",
      cursor: "pointer",
      transition: "all 0.15s",
    }),
    horarioEmoji: {
      fontSize: "28px",
    },
    horarioLabel: (color) => ({
      fontSize: "17px",
      fontWeight: "bold",
      color: color,
      letterSpacing: "0.5px",
    }),
    empGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
    },
    empBtn: (color, selected) => ({
      background: selected ? color : "#fff",
      color: selected ? "#fff" : color,
      border: `2px solid ${color}`,
      borderRadius: "10px",
      padding: "14px",
      textAlign: "center",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "15px",
      transition: "all 0.15s",
    }),
    input: {
      width: "100%",
      border: "none",
      borderBottom: "2px solid #ddd",
      background: "transparent",
      fontSize: "16px",
      padding: "8px 0",
      outline: "none",
      fontFamily: "Georgia, serif",
      color: "#111",
      boxSizing: "border-box",
    },
    label: {
      fontSize: "11px",
      color: "#999",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginBottom: "6px",
      display: "block",
    },
    progressBar: (color, pct) => ({
      height: "6px",
      background: "#eee",
      borderRadius: "3px",
      overflow: "hidden",
      marginBottom: "16px",
    }),
    progressFill: (color, pct) => ({
      height: "100%",
      width: `${pct}%`,
      background: color,
      borderRadius: "3px",
      transition: "width 0.3s ease",
    }),
    tareaRow: (listo, color) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 0",
      borderBottom: "1px solid #f0f0f0",
      opacity: listo ? 0.5 : 1,
      transition: "opacity 0.2s",
    }),
    checkbox: (listo, color) => ({
      width: "26px",
      height: "26px",
      borderRadius: "50%",
      border: `2px solid ${listo ? color : "#ccc"}`,
      background: listo ? color : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
      transition: "all 0.15s",
      fontSize: "13px",
      color: "#fff",
    }),
    tareaNombre: (listo) => ({
      flex: 1,
      fontSize: "15px",
      color: "#111",
      textDecoration: listo ? "line-through" : "none",
    }),
    notaBadge: {
      fontSize: "9px",
      color: "#999",
      background: "#f0f0f0",
      padding: "2px 6px",
      borderRadius: "10px",
      letterSpacing: "0.5px",
    },
    horaInput: {
      border: "none",
      borderBottom: "1px solid #ddd",
      width: "52px",
      fontSize: "13px",
      textAlign: "center",
      outline: "none",
      background: "transparent",
      fontFamily: "Georgia, serif",
      color: "#555",
      flexShrink: 0,
    },
    btn: (color, disabled) => ({
      width: "100%",
      background: disabled ? "#ccc" : color,
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: disabled ? "not-allowed" : "pointer",
      letterSpacing: "1px",
      marginTop: "8px",
      fontFamily: "Georgia, serif",
    }),
    btnSecondary: {
      width: "100%",
      background: "transparent",
      color: "#888",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "12px",
      fontSize: "14px",
      cursor: "pointer",
      marginTop: "8px",
      fontFamily: "Georgia, serif",
    },
    backBtn: {
      background: "none",
      border: "none",
      color: "#888",
      fontSize: "13px",
      cursor: "pointer",
      padding: "0 0 16px 0",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontFamily: "Georgia, serif",
    },
    successIcon: {
      fontSize: "60px",
      textAlign: "center",
      margin: "20px 0 10px",
    },
    successTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#111",
      marginBottom: "6px",
    },
    successSub: {
      fontSize: "14px",
      color: "#888",
      textAlign: "center",
      marginBottom: "24px",
    },
  };

  const color = horarioData?.color || "#111";

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>ROLLI SUSHI</div>
        <div style={styles.headerSub}>CONTROL DE LIMPIEZA</div>
      </div>

      <div style={styles.container}>

        {/* PASO 1: Seleccionar horario */}
        {step === "horario" && (
          <>
            <div style={styles.stepTitle}>¿Qué día es hoy?</div>
            {Object.entries(HORARIOS).map(([key, h]) => (
              <button
                key={key}
                style={styles.horarioBtn(h.color)}
                onClick={() => seleccionarHorario(key)}
                onMouseEnter={e => e.currentTarget.style.background = h.color + "10"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                <span style={styles.horarioEmoji}>{h.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={styles.horarioLabel(h.color)}>{h.label}</div>
                  <div style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>
                    {h.empleados.length} empleados
                  </div>
                </div>
              </button>
            ))}
          </>
        )}

        {/* PASO 2: Seleccionar empleado */}
        {step === "empleado" && horarioData && (
          <>
            <button style={styles.backBtn} onClick={() => setStep("horario")}>
              ← Regresar
            </button>
            <div style={styles.stepTitle}>¿Qué número eres?</div>
            <div style={{ ...styles.card, marginBottom: "16px" }}>
              <span style={{ ...styles.label }}>Horario seleccionado</span>
              <div style={{ fontSize: "17px", fontWeight: "bold", color }}>
                {horarioData.emoji} {horarioData.label}
              </div>
            </div>
            <div style={styles.empGrid}>
              {horarioData.empleados.map(e => (
                <button
                  key={e.num}
                  style={styles.empBtn(color, false)}
                  onClick={() => seleccionarEmpleado(e.num)}
                >
                  Empleado {e.num}
                  <div style={{ fontSize: "11px", fontWeight: "normal", marginTop: "4px", color: "#888" }}>
                    {e.tareas.length} tareas
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* PASO 3: Checklist */}
        {step === "checklist" && empleadoData && (
          <>
            <button style={styles.backBtn} onClick={() => setStep("empleado")}>
              ← Regresar
            </button>

            {/* Info */}
            <div style={styles.card}>
              <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                <div style={{ flex: 1 }}>
                  <span style={styles.label}>Tu nombre</span>
                  <input
                    style={styles.input}
                    placeholder="Escribe tu nombre..."
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                  />
                </div>
                <div style={{ width: "100px" }}>
                  <span style={styles.label}>Fecha</span>
                  <input
                    style={styles.input}
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "#aaa", textAlign: "right" }}>
                {horarioData.emoji} {horarioData.label} · Empleado {empNum}
              </div>
            </div>

            {/* Progreso */}
            <div style={{ marginBottom: "4px", display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888" }}>
              <span>Progreso</span>
              <span style={{ color, fontWeight: "bold" }}>{completadas}/{total}</span>
            </div>
            <div style={styles.progressBar(color, (completadas/total)*100)}>
              <div style={styles.progressFill(color, (completadas/total)*100)} />
            </div>

            {/* Tareas */}
            <div style={styles.card}>
              {tareas.map((t, i) => (
                <div key={i} style={styles.tareaRow(t.listo, color)}>
                  <div
                    style={styles.checkbox(t.listo, color)}
                    onClick={() => toggleTarea(i)}
                  >
                    {t.listo && "✓"}
                  </div>
                  <div style={styles.tareaNombre(t.listo)}>
                    {t.nombre}
                    {t.nota && (
                      <span style={{ ...styles.notaBadge, marginLeft: "6px" }}>{t.nota}</span>
                    )}
                  </div>

                </div>
              ))}
            </div>

            {/* Recordatorios */}
            <div style={{
              background: "#fffbea",
              border: "1.5px solid #e0a800",
              borderRadius: "10px",
              padding: "12px 14px",
              marginBottom: "4px",
            }}>
              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#b07d00", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                ⚠️ Recordatorios
              </div>
              <div style={{ fontSize: "12px", color: "#555", lineHeight: "1.8" }}>
                🚫 No dejar cubetas con agua estancada al terminar.<br/>
                🔧 Reporta cualquier desperfecto al encargado hoy mismo.<br/>
                📲 Al enviar, el mensaje se copia solo — solo pégalo en el grupo.
              </div>
            </div>

            <button
              style={styles.btn(color, !todasListas)}
              disabled={!todasListas}
              onClick={enviarWhatsApp}
            >
              📲 Enviar al grupo
            </button>
            {!todasListas && (
              <div style={{ textAlign: "center", fontSize: "12px", color: "#aaa", marginTop: "8px" }}>
                Marca todas las tareas para poder enviar
              </div>
            )}
            <button style={styles.btnSecondary} onClick={reiniciar}>
              Reiniciar
            </button>
          </>
        )}

      </div>
    </div>
  );
}
