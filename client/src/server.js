import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const server = axios.create({
  baseURL: BASE_URL,
});

export default server;
