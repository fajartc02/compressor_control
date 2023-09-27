import axios from "axios";
const token = localStorage.getItem("token");
const API = axios.create({
  baseURL: "http://localhost:7000/api/v1",
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type":
      "application/x-www-form-urlencoded;charset=utf-8;multipart/form-data",
  },
});

export default API;
