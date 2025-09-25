import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";

import Dashboard from "../pages/private/Dashboard";
import Inventario from "../pages/private/Inventario";
import Predicciones from "../pages/private/Predicciones";
import Evento from "../pages/private/Evento";
import Perfil from "../pages/private/Perfil";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🌐 Público */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* 🔒 Privado */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/predicciones" element={<Predicciones />} />
        <Route path="/evento" element={<Evento />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
}
