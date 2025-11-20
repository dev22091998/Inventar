import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  //baseURL: "http://localhost:5000/api"
  // baseURL: "http://172.16.252.187:5000/api"
   baseURL:'http://172.16.253.180:5000'  //Linux serveri
=======
  // baseURL: "http://localhost:5000/api"
  // baseURL: "http://172.16.252.187:5000/api"
  // baseURL: "http://172.16.252.187:5000/api"
   baseURL:'https://172.16.253.180:5000'  //Linux serveri
>>>>>>> 59d7271 (Frontend va backend yangilandi, email optional qilindi)
});

export default API;
