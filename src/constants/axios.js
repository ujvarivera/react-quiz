import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    withXSRFToken: true
});

export default axiosInstance;
