import { toast } from "vue-sonner";
import axios from "axios";

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
        .post("http://localhost:7000/api/v1/login", payload)
        .then((res) => {
          if (res.data.message == "success login") {
            toast.success("Login success", {
              duration: 500,
            });
            context.commit("setUserData", res.data.data);
            localStorage.setItem("token", res.data.data);
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
