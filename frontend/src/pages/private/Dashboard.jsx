import { useEffect, useState } from "react";
import "../../assets/styles/pages/private/Dashboard.scss";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://www.neoproyect.com/api/artesanos/dashboard/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="dashboard-loading">Cargando...</div>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Panel General</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Artesanos</h3>
          <p>{data.total_artesanos}</p>
        </div>
        <div className="card">
          <h3>Eventos</h3>
          <p>{data.total_eventos}</p>
        </div>
        <div className="card">
          <h3>Productos</h3>
          <p>{data.total_productos}</p>
        </div>
        <div className="card">
          <h3>Ventas Totales</h3>
          <p>S/ {data.total_ventas}</p>
        </div>
        <div className="card">
          <h3>Cantidad Vendida</h3>
          <p>{data.cantidad_total}</p>
        </div>
      </div>

      <div className="dashboard-table">
        <h2>Últimas Ventas</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total (S/)</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {data.ultimas_ventas.map((venta) => (
              <tr key={venta.idVenta}>
                <td>{venta.idVenta}</td>
                <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                <td>{venta.total}</td>
                <td>{venta.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
