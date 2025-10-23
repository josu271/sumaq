// frontend/src/routes/AppRouter.jsx (o donde tengas AppRouter)
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

/* Páginas públicas */
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Login from "../pages/public/Login";

/* Páginas privadas */
import Dashboard from "../pages/private/Dashboard";
import Inventario from "../pages/private/Inventario";
import Evento from "../pages/private/Evento";
import Perfil from "../pages/private/Perfil";
import Predicciones from "../pages/private/Predicciones";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas privadas: ProtectedRoute controla el acceso y renderiza Outlet (PrivateLayout) */}
        <Route element={<ProtectedRoute />}>
          {/* aquí PrivateLayout actúa como el layout y dentro de él se renderizan las rutas privadas */}
          <Route path="/private" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="eventos" element={<Evento />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="predicciones" element={<Predicciones />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
