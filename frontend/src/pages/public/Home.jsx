import "../../styles/pages/public/home.scss";
import React from "react";
import Ceramica from "../../img/public/ceramica-cultura-huanca.jpg";

const Home = () => {
  return (
    <div className="home-page">
      {/* 🟣 Sección Hero */}
      <header className="hero-section text-center text-light d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">
            Machine Learning y Artesanía Wanka
          </h1>
          <p className="lead">
            Innovación tecnológica al servicio del arte ancestral en Huancayo.
          </p>
          <a href="/login" className="btn btn-warning btn-lg mt-4 shadow-lg">
            Inicia Sesión
          </a>
        </div>
      </header>

      {/* 🟢 Sección Imagen + Texto */}
      <section className="info-section container my-5 py-5">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={Ceramica}
              alt="Artesanía Wanka"
              className="img-fluid rounded shadow-lg main-image"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-4 text-primary">
              Preservando la Cultura con Inteligencia Artificial
            </h2>
            <p className="fs-5">
              En Huancayo, la <strong>artesanía Wanka</strong> representa siglos de
              tradición, identidad y creatividad. Con el apoyo del{" "}
              <strong>Machine Learning</strong>, es posible analizar patrones,
              predecir tendencias y mejorar la producción sin perder el valor
              cultural.
            </p>
            <p className="fs-5">
              Gracias a la inteligencia artificial, se pueden identificar los diseños
              más valorados por el mercado, optimizar el uso de materiales y apoyar a
              los artesanos locales a difundir su arte a nivel global.
            </p>
          </div>
        </div>
      </section>

      {/* 🔶 Beneficios */}
      <section className="benefits-section py-5 text-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-5 display-5">Beneficios del Machine Learning</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="benefit-card p-4 rounded shadow-lg">
                <h4 className="mb-3">📈 Mejora en la Producción</h4>
                <p>
                  Automatiza procesos y sugiere técnicas eficientes sin perder la
                  esencia artesanal.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-card p-4 rounded shadow-lg">
                <h4 className="mb-3">🌍 Mayor Alcance</h4>
                <p>
                  Permite llegar a nuevos mercados internacionales gracias al análisis
                  predictivo.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-card p-4 rounded shadow-lg">
                <h4 className="mb-3">🤝 Apoyo a Artesanos</h4>
                <p>
                  Herramientas de IA ayudan a los artesanos a modernizarse sin perder
                  su herencia cultural.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⚫ Footer */}
      <footer className="text-center py-4 bg-dark text-light">
        <p className="mb-0">
          © 2025 Artesanía Wanka - Innovación desde Huancayo 🇵🇪
        </p>
      </footer>
    </div>
  );
};

export default Home;
