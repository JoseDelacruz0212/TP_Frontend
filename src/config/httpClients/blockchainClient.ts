import axios from "axios";
import {BLOCKCHAIN_BASE_URL} from "../app/basic-settings";

const instance = axios.create({
    baseURL: BLOCKCHAIN_BASE_URL,
    timeout: 5000
});

export default instance;
