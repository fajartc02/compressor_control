import axios from "axios";
const token = localStorage.getItem("token");
const baseURL = import.meta.env.VITE_API_URL;

const API = (
  contentType = "application/x-www-form-urlencoded;charset=utf-8"
) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
  });
};

export default API;
