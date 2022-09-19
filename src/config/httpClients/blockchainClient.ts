import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BLOCKCHAIN_BASE_URL,
    timeout: 5000
});

export default instance;
