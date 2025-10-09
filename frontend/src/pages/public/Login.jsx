import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "true"); // string "true"
    navigate("/private/dashboard");
  };

  return (
    <div className="login-container">
      <h2>Ingreso Artesanos</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Correo" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
