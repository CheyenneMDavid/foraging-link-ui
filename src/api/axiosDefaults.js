import axios from "axios";

axios.defaults.baseURL = "https://foraging-api-5bc654d11954.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/forma-data";
axios.defaults.withCredentials = true;
