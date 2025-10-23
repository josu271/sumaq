import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../assets/styles/pages/public/Login.scss";
import logo from "../../assets/images/public/logo.png"; // Opcional: tu logo

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "https://www.neoproyect.com/api/predicciones/login_artesano/",
        { correo, contrasena }
      );

      console.log("Respuesta login:", res.data);

      if (!res.data || !res.data.artesano) {
        setError("Respuesta inesperada del servidor");
        return;
      }

      localStorage.setItem("auth", JSON.stringify(res.data.artesano));
      navigate("/private/dashboard", { replace: true });
    } catch (err) {
      console.error("Error login:", err);
      if (err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Correo o contraseña incorrectos o error de red");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit" className="btn-sumaq">
            Iniciar sesión
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
