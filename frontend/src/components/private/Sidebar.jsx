import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../../assets/styles/components/private/Sidebar.scss";

const Sidebar = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <h3>Sumaq</h3>
        <button onClick={() => setCollapsed(!collapsed)} style={{marginTop:"10px"}}>
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/private/dashboard">Dashboard</NavLink>
        <NavLink to="/private/eventos">Eventos</NavLink>
        <NavLink to="/private/inventario">Inventario</NavLink>
        <NavLink to="/private/perfil">Perfil</NavLink>
        <NavLink to="/private/predicciones">Predicciones</NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={onLogout}>Cerrar sesión</button>
      </div>
    </aside>
  );
};

export default Sidebar;
