import axios from "axios";

const instance = axios.create({
    baseURL: 'http://ec2-35-174-165-153.compute-1.amazonaws.com:8080',
    timeout: 5000
});

export default instance;
