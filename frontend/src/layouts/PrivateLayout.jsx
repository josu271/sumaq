import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layouts/privateLayout.scss";

export default function PrivateLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí solo redirigimos sin backend
    navigate("/login");
  };

  return (
    <div className="private-layout">
      {/* 🧭 Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Panel ML</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/dashboard")}>📊 Dashboard</li>
            <li onClick={() => navigate("/inventario")}>📦 Inventario</li>
            <li onClick={() => navigate("/predicciones")}>🤖 Predicciones</li>
            <li onClick={() => navigate("/evento")}>📅 Evento</li>
            <li onClick={() => navigate("/perfil")}>👤 Perfil</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* 📍 Contenido dinámico */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
