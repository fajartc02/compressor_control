import { toast } from "vue-sonner";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export default {
  state: {
    userData: null,
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    },
  },
  getters: {
    userData: (state) => {
      return state.userData;
    },
  },
  actions: {
    LOGIN(context, payload) {
      axios
        .post(`${baseURL}/login`, payload)
        .then((res) => {
          if (res.data.message == "success login") {
            toast.success("Login success", {
              duration: 500,
            });
            context.commit("setUserData", res.data.data.user);
            localStorage.setItem("user", res.data.data.user.user_nm);
            localStorage.setItem("token", res.data.data.token);
            window.location.href = "/";
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    LOGOUT(context) {
      context.commit("setUserData", null);
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    },
  },
};
