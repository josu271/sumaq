import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/pages/private/Eventos.scss";

export default function Evento() {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    idEvento: null,
    nombre: "",
    fecha: "",
    ubicacion: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://127.0.0.1:8000/api/eventos/";

  const obtenerEventos = async () => {
    const res = await axios.get(API_URL);
    setEventos(res.data);
  };

  const obtenerProximos = async () => {
    const res = await axios.get(API_URL + "proximos/");
    setEventos(res.data);
  };

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await axios.put(API_URL + `editar/${formData.idEvento}/`, formData);
    } else {
      await axios.post(API_URL + "crear/", formData);
    }
    setEditando(false);
    setFormData({ idEvento: null, nombre: "", fecha: "", ubicacion: "", descripcion: "" });
    obtenerEventos();
  };

  const editarEvento = (evento) => {
    setEditando(true);
    setFormData(evento);
  };

  const eliminarEvento = async (id) => {
    if (window.confirm("¿Deseas eliminar este evento?")) {
      await axios.delete(API_URL + `eliminar/${id}/`);
      obtenerEventos();
    }
  };

  useEffect(() => {
    obtenerEventos();
  }, []);

  return (
    <div className="evento-container">
      <h2>Gestión de Eventos</h2>

      <form className="evento-form" onSubmit={manejarSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del evento"
          value={formData.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={manejarCambio}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={manejarCambio}
          required
        ></textarea>

        <button type="submit">{editando ? "Actualizar" : "Agregar"}</button>
      </form>

      <div className="acciones">
        <button onClick={obtenerEventos}>Todos</button>
        <button onClick={obtenerProximos}>Próximos eventos</button>
      </div>

      <div className="eventos-lista">
        {eventos.length === 0 ? (
          <p>No hay eventos registrados.</p>
        ) : (
          eventos.map((evento) => (
            <div key={evento.idEvento} className="evento-card">
              <h3>{evento.nombre}</h3>
              <p><strong>Fecha:</strong> {evento.fecha}</p>
              <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
              <p>{evento.descripcion}</p>
              <div className="acciones-card">
                <button onClick={() => editarEvento(evento)}>Editar</button>
                <button onClick={() => eliminarEvento(evento.idEvento)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
