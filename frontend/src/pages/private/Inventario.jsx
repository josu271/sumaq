import React, { useEffect, useState } from "react";
import "../../styles/pages/private/inventario.scss";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const [formData, setFormData] = useState({
    ProductosNombre: "",
    ProductosDescripcion: "",
    ProductosCategoria: "",
    ProductosPrecio: "",
    ProductosStock: "",
  });

  // Cargar productos
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/models/productos/")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  // Manejar cambios en formulario
  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Guardar producto
  const handleSubmit = async e => {
    e.preventDefault();
    const url = editingProducto
      ? `http://127.0.0.1:8000/api/models/productos/${editingProducto.idProductos}/`
      : "http://127.0.0.1:8000/api/models/productos/";
    const method = editingProducto ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al guardar producto");

      // Refrescar productos
      const data = await fetch("http://127.0.0.1:8000/api/models/productos/").then(r => r.json());
      setProductos(data);

      setFormData({
        ProductosNombre: "",
        ProductosDescripcion: "",
        ProductosCategoria: "",
        ProductosPrecio: "",
        ProductosStock: "",
      });
      setEditingProducto(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Editar producto
  const handleEdit = producto => {
    setEditingProducto(producto);
    setFormData(producto);
    setShowModal(true);
  };

  // Eliminar producto
  const handleDelete = async id => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/models/productos/${id}/`, { method: "DELETE" });
      setProductos(productos.filter(p => p.idProductos !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="inventario-page">
      <header className="inventario-header">
        <h1>📦 Inventario Artesanal</h1>
        <button
  className="add-btn"
  onClick={() => {
    setEditingProducto(null);
    setFormData({
      ProductosNombre: "",
      ProductosDescripcion: "",
      ProductosCategoria: "",
      ProductosPrecio: "",
      ProductosStock: "",
    });
    setShowModal(true);
  }}
>
  ➕ Agregar Pieza
</button>
      </header>

      <div className="table-container">
        <table className="inventario-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.idProductos}>
                <td>{p.idProductos}</td>
                <td>{p.ProductosNombre}</td>
                <td>{p.ProductosCategoria}</td>
                <td>S/. {p.ProductosPrecio}</td>
                <td>{p.ProductosStock}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEdit(p)}>✏️</button>
                  <button className="action-btn delete" onClick={() => handleDelete(p.idProductos)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={e => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal">
            <h2>{editingProducto ? "Editar Producto" : "Agregar Nueva Pieza"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Nombre</label>
              <input type="text" name="ProductosNombre" value={formData.ProductosNombre} onChange={handleChange} required />

              <label>Descripción</label>
              <input type="text" name="ProductosDescripcion" value={formData.ProductosDescripcion} onChange={handleChange} required />

              <label>Categoría</label>
              <select name="ProductosCategoria" value={formData.ProductosCategoria} onChange={handleChange} required>
                <option value="">Selecciona</option>
                <option value="Cerámica">Cerámica</option>
                <option value="Textil">Textil</option>
                <option value="Escultura">Escultura</option>
                <option value="Joyería">Joyería</option>
              </select>

              <label>Precio</label>
              <input type="number" step="0.01" name="ProductosPrecio" value={formData.ProductosPrecio} onChange={handleChange} required />

              <label>Stock</label>
              <input type="number" name="ProductosStock" value={formData.ProductosStock} onChange={handleChange} required />

              <div className="modal-actions">
                <button type="button" className="cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="save">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Estilos inline para asegurar visualización */}
      <style>{`
        .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;  // antes era 100%
  height: 100vh; // antes era 100%
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
}

        .modal {
  display: block !important;
  width: 400px;
  max-width: 90%;
  min-height: 300px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
}
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 15px;
        }
        .cancel {
          background: #ccc;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
        }
        .save {
          background: #4caf50;
          border: none;
          color: white;
          padding: 8px 12px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Inventario;
