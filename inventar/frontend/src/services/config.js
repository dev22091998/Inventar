import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:5000/api"
  // baseURL: "http://172.16.252.187:5000/api"
   baseURL:'http://172.16.253.180:5000'  //Linux serveri
});

export default API;
