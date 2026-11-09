import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || (
    import.meta.env.PROD
        ? "https://carefree-chelsea-store.onrender.com/api"
        : "http://127.0.0.1:8000/api"
);

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        Accept: "application/json",
    },
});

export default api;
