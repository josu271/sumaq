import { Outlet } from "react-router-dom";
import NavbarPublic from "../components/public/Navbar";
import FooterPublic from "../components/public/Footer";
import "../assets/styles/layouts/PublicLayout.scss";

const PublicLayout = () => {
  return (
    <>
      <NavbarPublic />
      <main className="public-layout">
        <Outlet /> {/* Aquí se renderizan Home, About, Login */}
      </main>
      <FooterPublic />
    </>
  );
};

export default PublicLayout;
