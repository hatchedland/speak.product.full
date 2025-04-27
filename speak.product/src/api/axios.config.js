import axios from "axios";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:8080/";

const API = axios.create({
  baseURL,
});

export default API;
