// frontend/src/pages/public/Login.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/predicciones/login_artesano/", {
        correo,
        contrasena,
      });

      console.log("Respuesta login:", res.data);

      // Comprueba que venga el artesano
      if (!res.data || !res.data.artesano) {
        alert("Respuesta inesperada del servidor");
        return;
      }

      // Guarda la sesión en la misma clave que usa el router
      localStorage.setItem("auth", JSON.stringify(res.data.artesano));

      // Redirige al dashboard (replace evita volver atrás con el botón)
      navigate("/private/dashboard", { replace: true });
    } catch (err) {
      console.error("Error login:", err);
      // si axios devuelve respuesta con status, mostrar mensaje
      if (err?.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Correo o contraseña incorrectos o error de red");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;