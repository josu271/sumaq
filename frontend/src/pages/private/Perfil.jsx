import React, { useState, useEffect } from "react";
import "../../assets/styles/pages/private/Perfil.scss";

const Perfil = () => {
  const [artesano, setArtesano] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // ✅ Cargar datos desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setArtesano(parsed);
    }
  }, []);

  // ✅ Manejar cambios en los inputs
  const handleChange = (e) => {
    setArtesano({
      ...artesano,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Guardar cambios (usa idArtesano)
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/artesanos/${artesano.idArtesano}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artesano),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setArtesano(updated);
        localStorage.setItem("auth", JSON.stringify(updated));
        setMensaje("Perfil actualizado correctamente ✅");
        setEditMode(false);
      } else {
        setMensaje("❌ Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      setMensaje("⚠️ Error de conexión con el servidor");
    }
  };

  if (!artesano) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>

      <div className="perfil-card">
        <div className="perfil-info">
          <label>DNI:</label>
          {editMode ? (
            <input
              type="text"
              name="dni"
              value={artesano.dni || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{artesano.dni}</p>
          )}

          <label>Nombres:</label>
          {editMode ? (
            <input
              type="text"
              name="nombres"
              value={artesano.nombres || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{artesano.nombres}</p>
          )}

          <label>Apellidos:</label>
          {editMode ? (
            <input
              type="text"
              name="apellidos"
              value={artesano.apellidos || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{artesano.apellidos}</p>
          )}

          <label>Correo:</label>
          {editMode ? (
            <input
              type="email"
              name="correo"
              value={artesano.correo || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{artesano.correo}</p>
          )}

          <label>Teléfono:</label>
          {editMode ? (
            <input
              type="text"
              name="telefono"
              value={artesano.telefono || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{artesano.telefono || "—"}</p>
          )}

          <label>Asociación:</label>
          {editMode ? (
            <input
              type="text"
              name="asociacion"
              value={artesano.asociacion || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{artesano.asociacion || "—"}</p>
          )}

          <label>Fecha de registro:</label>
          <p>{new Date(artesano.fecha_registro).toLocaleDateString()}</p>
        </div>

        <div className="perfil-actions">
          {editMode ? (
            <>
              <button onClick={handleSave} className="btn-guardar">
                Guardar
              </button>
              <button onClick={() => setEditMode(false)} className="btn-cancelar">
                Cancelar
              </button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="btn-editar">
              Editar Perfil
            </button>
          )}
        </div>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Perfil;
