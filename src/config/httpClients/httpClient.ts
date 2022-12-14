import axios from "axios";
import AuthorizationService from "../../services/AuthorizationService";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(
    config => {
        const token = AuthorizationService.getAccessToken();

        if (!token) return config;

        config.headers = {
            ...config.headers,
            "Authorization": `Bearer ${token}`
        };

        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (!error || !error.response) return Promise.reject(error);

        if (error.response.status === 401) {
            // AuthorizationService.signOut();
        }

        return Promise.reject(error?.response?.data?.message || undefined);
    }
);

export default instance;
