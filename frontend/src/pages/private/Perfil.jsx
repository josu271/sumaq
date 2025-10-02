import React, { useState, useEffect } from "react";
import "../../styles/pages/private/perfil.scss";

const Perfil = () => {
  const [user, setUser] = useState({
    nombre: "",
    correo: "",
    ubicacion: "",
    ocupacion: "",
  });

  const [passwords, setPasswords] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  // 🔹 Cargar datos del usuario al iniciar
  useEffect(() => {
    // Aquí deberías obtener el correo del usuario desde el login / localStorage / contexto
    const correo = "josue@example.com";
    fetch(`http://127.0.0.1:8000/api/artesano/${correo}/`) // Endpoint backend para traer datos
      .then(res => res.json())
      .then(data => {
        setUser({
          nombre: data.ArtesanosNombres + " " + data.ArtesanosApellidos,
          correo: data.ArtesanosCorreo,
          ubicacion: data.ArtesanosUbicacion || "",
          ocupacion: data.ArtesanosOcupacion || "",
        });
      })
      .catch(err => console.error(err));
  }, []);

  // 🔹 Manejar cambios en el formulario de info
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  // 🔹 Guardar cambios de perfil
  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/artesano/${user.correo}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Error actualizando perfil");
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar perfil");
    }
  };

  // 🔹 Manejar cambios de contraseña
  const handlePasswordsChange = (e) => {
    setPasswords({...passwords, [e.target.name]: e.target.value});
  };

  // 🔹 Cambiar contraseña
  const handleCambiarContrasena = async (e) => {
    e.preventDefault();
    if (passwords.nueva !== passwords.confirmar) {
      alert("La nueva contraseña y la confirmación no coinciden");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cambiar-contrasena/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: user.correo,
          actual: passwords.actual,
          nueva: passwords.nueva,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Contraseña cambiada correctamente");
        setPasswords({ actual: "", nueva: "", confirmar: "" });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error cambiando contraseña");
    }
  };

  return (
    <div className="perfil-page">
      <h1>👤 Mi Perfil</h1>
      <div className="perfil-container">
        <div className="perfil-sidebar">
          <div className="foto-perfil">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Foto de perfil"
            />
            <button className="btn-cambiar-foto">📷 Cambiar Foto</button>
          </div>
          <div className="info-basica">
            <h2>{user.nombre}</h2>
            <p>📧 {user.correo}</p>
            <p>📍 {user.ubicacion}</p>
            <p>🛠️ {user.ocupacion}</p>
          </div>
        </div>

        <div className="perfil-form">
          <h2>Editar Información Personal</h2>
          <form onSubmit={handleGuardar}>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" name="nombre" value={user.nombre} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" name="correo" value={user.correo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Ubicación</label>
              <input type="text" name="ubicacion" value={user.ubicacion} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Ocupación</label>
              <input type="text" name="ocupacion" value={user.ocupacion} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-guardar">💾 Guardar Cambios</button>
          </form>

          <div className="divider"></div>

          <h2>Cambiar Contraseña</h2>
          <form onSubmit={handleCambiarContrasena}>
            <div className="form-group">
              <label>Contraseña Actual</label>
              <input type="password" name="actual" value={passwords.actual} onChange={handlePasswordsChange} />
            </div>
            <div className="form-group">
              <label>Nueva Contraseña</label>
              <input type="password" name="nueva" value={passwords.nueva} onChange={handlePasswordsChange} />
            </div>
            <div className="form-group">
              <label>Confirmar Nueva Contraseña</label>
              <input type="password" name="confirmar" value={passwords.confirmar} onChange={handlePasswordsChange} />
            </div>
            <button type="submit" className="btn-actualizar">🔒 Actualizar Contraseña</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
