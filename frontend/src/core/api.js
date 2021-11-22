import axios from "axios";
import { URL_API } from "./constants";
const api = axios.create({
    baseURL: URL_API
});

export default api;