import axios from "axios";
import AuthorizationService from "../../services/AuthorizationService";

const instance = axios.create({
    baseURL: 'http://ec2-18-206-164-108.compute-1.amazonaws.com:8080',
    timeout: 5000
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
            AuthorizationService.signOut();
        }

        return Promise.reject(error?.response?.data?.message || undefined);
    }
);

export default instance;
