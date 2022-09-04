import axios from "axios";

const instance = axios.create({
    baseURL: 'http://ec2-18-206-164-108.compute-1.amazonaws.com:8080',
    timeout: 5000
});

export default instance;
