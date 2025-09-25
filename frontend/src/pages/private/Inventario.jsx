import React, { useState } from "react";
import "../../styles/pages/private/inventario.scss";

const Inventario = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="inventario-page">
      <header className="inventario-header">
        <h1>📦 Inventario Artesanal</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          ➕ Agregar Pieza
        </button>
      </header>

      {/* 📊 Tabla de inventario */}
      <div className="table-container">
        <table className="inventario-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>Vasija Wanka</td>
              <td>Cerámica</td>
              <td>25</td>
              <td><span className="status disponible">Disponible</span></td>
              <td>
                <button className="action-btn edit">✏️</button>
                <button className="action-btn delete">🗑️</button>
              </td>
            </tr>
            <tr>
              <td>002</td>
              <td>Escultura Andina</td>
              <td>Escultura</td>
              <td>5</td>
              <td><span className="status bajo">Stock Bajo</span></td>
              <td>
                <button className="action-btn edit">✏️</button>
                <button className="action-btn delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 📥 Modal para agregar pieza */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Nueva Pieza</h2>
            <form>
              <label>Nombre de la pieza</label>
              <input type="text" placeholder="Ej: Vasija ceremonial" />

              <label>Categoría</label>
              <select>
                <option value="">Selecciona</option>
                <option value="ceramica">Cerámica</option>
                <option value="textil">Textil</option>
                <option value="escultura">Escultura</option>
              </select>

              <label>Stock disponible</label>
              <input type="number" min="0" placeholder="Cantidad" />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="save">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;
