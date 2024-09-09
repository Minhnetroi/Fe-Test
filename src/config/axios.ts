import axios from "axios";

const api = axios.create({
    baseURL: "https://66becc1642533c403144129a.mockapi.io/api/",
});

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default api;