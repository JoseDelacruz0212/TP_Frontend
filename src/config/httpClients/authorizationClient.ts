import axios from "axios";
import {API_BASE_URL} from "../app/basic-settings";

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000
});

export default instance;
