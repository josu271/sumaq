// frontend/src/layouts/PrivateLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/private/Sidebar";
import "../assets/styles/layouts/PrivateLayout.scss";

const PrivateLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  return (
    <div className="private-layout">
      <Sidebar onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
