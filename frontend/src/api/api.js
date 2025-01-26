"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketURL = exports.$api = void 0;
const axios_1 = __importDefault(require("axios"));
const base_url = "http://localhost:5000/api";
exports.$api = axios_1.default.create({ baseURL: base_url });
exports.$api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // ???
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});
exports.socketURL = "http://ichgram:5005";
