import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function probarConexion() {
  try {
    const res = await api.get("/api/prueba/");
    console.log("✅ Conectado con backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error al conectar con backend:", error);
    return null;
  }
}

export default api;
