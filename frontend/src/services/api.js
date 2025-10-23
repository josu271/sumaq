import axios from "axios";

// src/services/Api.js
export const API_URL = "https://www.neoproyect.com/api";


const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function probarConexion() {
  try {
    const res = await api.get("/prueba/");
    console.log("✅ Conectado con backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error al conectar con backend:", error);
    return null;
  }
}

export default api;
