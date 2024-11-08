import axios from "axios";

axios.defaults.baseURL = "https://foraging-api-5bc654d11954.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
