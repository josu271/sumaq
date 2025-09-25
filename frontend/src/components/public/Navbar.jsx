import { Link, NavLink } from "react-router-dom";
import "../../styles/components/public/navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">🧵 Artesanía Wanka</Link>
      </div>

      <ul className="navbar__links">
        <li>
          <NavLink to="/" end>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;