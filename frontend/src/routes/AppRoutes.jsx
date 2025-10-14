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

const AppRouter = () => {
  // ✅ Detecta si existe cualquier sesión guardada
  const isAuthenticated = !!localStorage.getItem("auth");

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas privadas */}
        <Route
          path="/private/*"
          element={isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />}
        >
          {isAuthenticated && (
            <>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inventario" element={<Inventario />} />
              <Route path="eventos" element={<Evento />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="predicciones" element={<Predicciones />} />
            </>
          )}
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/private/dashboard" : "/"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
