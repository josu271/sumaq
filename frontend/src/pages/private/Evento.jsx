import React, { useState, useEffect } from "react";
import "../../styles/pages/private/eventos.scss";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({
    EventosNombre: "",
    EventosFecha: "",
    EventosUbicacion: "",
    EventosDescripcion: "",
  });

  // 🔹 Cargar eventos
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/eventos/")
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/eventos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error agregando evento");
      const nuevoEvento = await res.json();
      setEventos([...eventos, nuevoEvento]);
      setForm({ EventosNombre: "", EventosFecha: "", EventosUbicacion: "", EventosDescripcion: "" });
    } catch (err) {
      console.error(err);
      alert("Error agregando evento");
    }
  };

  return (
    <div className="eventos-page">
      <h1>📅 Gestión de Eventos</h1>

      <div className="layout-grid">
        {/* ➕ Formulario */}
        <div className="add-event-section">
          <h2>Agregar Nuevo Evento</h2>
          <form onSubmit={handleSubmit}>
            <label>Nombre del evento</label>
            <input type="text" name="EventosNombre" value={form.EventosNombre} onChange={handleChange} required />

            <label>Fecha</label>
            <input type="date" name="EventosFecha" value={form.EventosFecha} onChange={handleChange} required />

            <label>Ubicación</label>
            <input type="text" name="EventosUbicacion" value={form.EventosUbicacion} onChange={handleChange} required />

            <label>Descripción</label>
            <textarea name="EventosDescripcion" value={form.EventosDescripcion} onChange={handleChange} required />

            <button type="submit" className="btn-agregar">➕ Agregar Evento</button>
          </form>
        </div>

        {/* 📆 Próximos eventos */}
        <div className="lista-eventos">
          <h2>📆 Próximos Eventos</h2>
          {eventos.map(evento => (
            <div key={evento.idEventos} className="event-card">
              <h3>{evento.EventosNombre}</h3>
              <p>📍 {evento.EventosUbicacion} - {new Date(evento.EventosFecha).toLocaleDateString()}</p>
              <p>🧵 {evento.EventosDescripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eventos;
