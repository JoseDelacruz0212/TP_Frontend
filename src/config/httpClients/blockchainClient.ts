import axios from "axios";

const instance = axios.create({
    baseURL: 'http://ec2-44-203-113-105.compute-1.amazonaws.com:8080/api',
    timeout: 5000
});

export default instance;
