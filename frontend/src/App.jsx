import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/variables.scss";
import AppRouter from "./routes/AppRoutes";
import { probarConexion } from "./services/api";

function App() {
  useEffect(() => {
    probarConexion(); // ✅ Comprueba la conexión
  }, []);

  return <AppRouter />;
}

export default App;
