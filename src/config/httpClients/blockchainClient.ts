import axios from "axios";

const instance = axios.create({
    baseURL: 'http://ec2-44-201-203-190.compute-1.amazonaws.com:8080/api',
    timeout: 5000
});

export default instance;
