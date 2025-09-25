import React from "react";
import "../../styles/pages/private/perfil.scss";

const Perfil = () => {
  return (
    <div className="perfil-page">
      <h1>👤 Mi Perfil</h1>

      <div className="perfil-container">
        {/* 🖼️ Imagen de perfil */}
        <div className="perfil-sidebar">
          <div className="foto-perfil">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Foto de perfil"
            />
            <button className="btn-cambiar-foto">📷 Cambiar Foto</button>
          </div>

          <div className="info-basica">
            <h2>Josué Sulla</h2>
            <p>📧 josue@example.com</p>
            <p>📍 Huancayo, Perú</p>
            <p>🛠️ Artesano y Analista de IA</p>
          </div>
        </div>

        {/* ✏️ Formulario de edición */}
        <div className="perfil-form">
          <h2>Editar Información Personal</h2>
          <form>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" placeholder="Josué Sulla" />
            </div>

            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" placeholder="josue@example.com" />
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <input type="text" placeholder="Huancayo, Perú" />
            </div>

            <div className="form-group">
              <label>Ocupación</label>
              <input type="text" placeholder="Artesano y Analista de IA" />
            </div>

            <button type="submit" className="btn-guardar">
              💾 Guardar Cambios
            </button>
          </form>

          <div className="divider"></div>

          {/* 🔐 Cambiar contraseña */}
          <h2>Cambiar Contraseña</h2>
          <form>
            <div className="form-group">
              <label>Contraseña Actual</label>
              <input type="password" placeholder="********" />
            </div>

            <div className="form-group">
              <label>Nueva Contraseña</label>
              <input type="password" placeholder="********" />
            </div>

            <div className="form-group">
              <label>Confirmar Nueva Contraseña</label>
              <input type="password" placeholder="********" />
            </div>

            <button type="submit" className="btn-actualizar">
              🔒 Actualizar Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
