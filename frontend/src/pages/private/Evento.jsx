import React from "react";
import "../../styles/pages/private/eventos.scss";

const Eventos = () => {
  return (
    <div className="eventos-page">
      <h1>📅 Gestión de Eventos</h1>

      {/* 📌 Filtros */}
      <div className="filtros">
        <select>
          <option value="">Filtrar por mes</option>
          <option value="septiembre">Septiembre</option>
          <option value="octubre">Octubre</option>
          <option value="noviembre">Noviembre</option>
        </select>

        <select>
          <option value="">Categoría</option>
          <option value="feria">Feria Artesanal</option>
          <option value="exposicion">Exposición</option>
          <option value="taller">Taller</option>
        </select>

        <button className="btn-filtrar">Aplicar Filtros</button>
      </div>

      <div className="layout-grid">
        {/* 🗓️ Calendario grande (simulado) */}
        <div className="calendar-section">
          <h2>Calendario de Eventos</h2>
          <div className="calendar">
            {[...Array(30)].map((_, i) => (
              <div className={`day ${i === 4 || i === 14 || i === 20 ? "has-event" : ""}`} key={i}>
                <span className="date">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ➕ Agregar Evento */}
        <div className="add-event-section">
          <h2>Agregar Nuevo Evento</h2>
          <form>
            <label>Nombre del evento</label>
            <input type="text" placeholder="Ej: Feria Artesanal de Primavera" />

            <label>Fecha</label>
            <input type="date" />

            <label>Categoría</label>
            <select>
              <option>Feria Artesanal</option>
              <option>Exposición</option>
              <option>Taller</option>
            </select>

            <label>Descripción</label>
            <textarea placeholder="Detalles del evento..."></textarea>

            <button type="submit" className="btn-agregar">
              ➕ Agregar Evento
            </button>
          </form>
        </div>
      </div>

      {/* 📆 Próximos eventos */}
      <section className="lista-eventos">
        <h2>📆 Próximos Eventos</h2>
        <div className="event-card">
          <h3>Feria Artesanal Huancayo</h3>
          <p>📍 Plaza Constitución - 28 Sep 2025</p>
          <p>🧵 Evento tradicional de exposición de cerámica y textiles Wanka.</p>
        </div>
        <div className="event-card">
          <h3>Expo Andina</h3>
          <p>📍 Centro Cultural - 5 Oct 2025</p>
          <p>🏺 Presentación de innovación y técnicas modernas de artesanía.</p>
        </div>
        <div className="event-card">
          <h3>Taller Textil Ancestral</h3>
          <p>📍 Museo Regional - 12 Oct 2025</p>
          <p>🪶 Taller gratuito sobre tejidos tradicionales con IA aplicada.</p>
        </div>
      </section>
    </div>
  );
};

export default Eventos;
