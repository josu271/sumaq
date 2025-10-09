import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/private/Sidebar";

import "../assets/styles/layouts/PrivateLayout.scss";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    if (!auth) navigate("/login");
  }, [auth, navigate]);

  return (
    <div className="private-layout">
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">
          <Outlet /> {/* Aquí se renderizan Dashboard, Productos, Eventos */}
        </main>
      </div>

    </div>
  );
};

export default PrivateLayout;
