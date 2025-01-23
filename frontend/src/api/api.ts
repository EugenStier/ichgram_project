import axios from "axios";
const base_url = "http://localhost:5000/api";
export const $api = axios.create({ baseURL: base_url });

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ???
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const socketURL = "http://ichgram:5005";
