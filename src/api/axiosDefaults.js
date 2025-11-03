import axios from "axios";

axios.defaults.baseURL = "https://foraging-api-b287953c9098.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
