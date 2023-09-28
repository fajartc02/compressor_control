import axios from "axios";
const token = localStorage.getItem("token");
const API = (contentType = 'application/x-www-form-urlencoded;charset=utf-8') => {
    return axios.create({
        baseURL: "http://localhost:7000/api/v1",
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": contentType,
        },
    });
}

export default API;
