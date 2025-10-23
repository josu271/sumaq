import { useEffect, useState } from "react";
import "../../assets/styles/pages/private/Productos.scss";

const API_URL = "https://www.neoproyect.com/api";

const Inventario = () => {
  const artesano = JSON.parse(localStorage.getItem("auth"));
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
    es_general: false,
  });
  const [modoEditar, setModoEditar] = useState(false);

  const fetchProductos = async () => {
    try {
      const res = await fetch(`${API_URL}/productos/${artesano.idArtesano}/`);
      if (!res.ok) throw new Error("No se pudo obtener productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("❌ Error al cargar productos:", err);
    }
  };

  useEffect(() => {
    if (artesano) fetchProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = modoEditar
      ? `${API_URL}/productos/editar/${form.id}/`
      : `${API_URL}/productos/crear/`;

    const method = modoEditar ? "PUT" : "POST";
    const body = { ...form, artesano_id: artesano.idArtesano };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al guardar producto");
      await fetchProductos();
      setForm({
        id: null,
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        stock: "",
        es_general: false,
      });
      setModoEditar(false);
    } catch (err) {
      console.error("❌ Error al guardar:", err);
    }
  };

  const handleEdit = (producto) => {
    setForm(producto);
    setModoEditar(true);
  };

  return (
    <div className="inventario-container">
      <h2>Inventario de {artesano?.nombres}</h2>

      <form className="producto-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="es_general"
            checked={form.es_general}
            onChange={handleChange}
          />
          Es general
        </label>

        <button type="submit">
          {modoEditar ? "Actualizar" : "Agregar"} producto
        </button>
      </form>

      <div className="productos-lista">
        {productos.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          productos.map((p) => (
            <div key={p.id} className="producto-card">
              <h3>{p.nombre}</h3>
              <p><strong>Categoría:</strong> {p.categoria}</p>
              <p><strong>Precio:</strong> S/.{p.precio}</p>
              <p><strong>Stock:</strong> {p.stock}</p>
              <p>{p.descripcion}</p>
              <button onClick={() => handleEdit(p)}>Editar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inventario;
