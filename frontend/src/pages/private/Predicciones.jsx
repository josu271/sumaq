import React, { useEffect, useState } from "react";
import "../../assets/styles/pages/private/Predicciones.scss";

const API_BASE = "http://127.0.0.1:8000/api/predicciones";

export default function Predicciones() {
  const [predictions, setPredictions] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      const res = await fetch(`${API_BASE}/trends/`);
      if (!res.ok) throw new Error("Error al obtener tendencias");
      const data = await res.json();
      setTrends(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrain = async () => {
    setTraining(true);
    setMessage("Entrenando modelo...");
    try {
      const res = await fetch(`${API_BASE}/train/`, { method: "POST" });
      const data = await res.json();
      setMessage(data.message || "Entrenamiento completado ✅");
    } catch {
      setMessage("Error en entrenamiento");
    } finally {
      setTraining(false);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    setMessage("Generando predicciones...");
    try {
      const res = await fetch(`${API_BASE}/predict/?producto_id=1&dias=14`); // ejemplo fijo
      const data = await res.json();
      setPredictions(data.predictions || []);
      setMessage("Predicción generada ✅");
    } catch  {
      setMessage("Error al generar predicción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predicciones-dashboard">
      <h2>📊 Dashboard de Predicciones</h2>

      <div className="actions">
        <button onClick={handlePredict} disabled={loading}>
          {loading ? "Generando..." : "🔮 Generar Predicciones"}
        </button>
        <button onClick={handleTrain} disabled={training}>
          {training ? "Entrenando..." : "⚙️ Entrenar Modelo"}
        </button>
      </div>

      <div className="status">
        <p>{message || "Listo para comenzar"}</p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>Predicciones recientes</h3>
          {predictions.length === 0 ? (
            <p>No hay datos aún</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Demanda</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((p, i) => (
                  <tr key={i}>
                    <td>{p.date}</td>
                    <td>{p.pred.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <h3>Tendencias</h3>
          {trends.length === 0 ? (
            <p>No hay tendencias calculadas</p>
          ) : (
            trends.map((t) => (
              <div key={t.producto_id} className={`trend trend-${t.trend}`}>
                <strong>{t.nombre}</strong>
                <span>
                  {t.trend === "sube"
                    ? "📈 En alza"
                    : t.trend === "baja"
                    ? "📉 En baja"
                    : "➖ Estable"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
