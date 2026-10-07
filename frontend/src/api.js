import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://student-management-system-production-4acf.up.railway.app/api",
});

export default api;