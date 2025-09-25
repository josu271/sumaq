import React from "react";
import "../../styles/pages/private/predicciones.scss";

const Predicciones = () => {
  return (
    <div className="predicciones-page">
      <h1>📊 Análisis y Predicciones</h1>

      {/* 🔮 Cards resumen */}
      <div className="cards-grid">
        <div className="card">
          <h2>📦 Demanda prevista</h2>
          <p className="value">+1,245 piezas</p>
          <span className="trend positive">▲ +12% este mes</span>
        </div>

        <div className="card">
          <h2>🤖 Precisión del modelo</h2>
          <div className="circle-accuracy">
            <span>92%</span>
          </div>
          <p>Alta precisión en predicciones</p>
        </div>

        <div className="card">
          <h2>📅 Próximos eventos</h2>
          <ul>
            <li>🧵 Feria Artesanal Huancayo - 28 Sep</li>
            <li>🏺 Expo Andina - 5 Oct</li>
            <li>🪶 Festival Textil - 12 Oct</li>
          </ul>
        </div>
      </div>

      {/* 📉 Predicción de demanda - próximos 7 días */}
      <section className="prediccion-semana">
        <h2>📉 Predicción de demanda - Próximos 7 días</h2>
        <div className="bar-chart">
          <div className="bar" style={{ height: "80%" }}>
            <span>Lun</span>
          </div>
          <div className="bar" style={{ height: "60%" }}>
            <span>Mar</span>
          </div>
          <div className="bar" style={{ height: "90%" }}>
            <span>Mié</span>
          </div>
          <div className="bar" style={{ height: "70%" }}>
            <span>Jue</span>
          </div>
          <div className="bar" style={{ height: "50%" }}>
            <span>Vie</span>
          </div>
          <div className="bar" style={{ height: "95%" }}>
            <span>Sáb</span>
          </div>
          <div className="bar" style={{ height: "85%" }}>
            <span>Dom</span>
          </div>
        </div>
      </section>

      {/* 🧠 Factores de influencia */}
      <section className="factores">
        <h2>🧠 Factores de Influencia</h2>
        <ul>
          <li>📈 Tendencias estacionales: Alta demanda en festividades locales.</li>
          <li>🌦️ Clima: El clima seco impulsa la compra de cerámica decorativa.</li>
          <li>🎉 Eventos: Ferias y exposiciones aumentan el interés artesanal.</li>
          <li>📢 Campañas: Mayor alcance en redes sociales eleva la demanda.</li>
        </ul>
      </section>
    </div>
  );
};

export default Predicciones;
