import API from "@/config/api";
import { toast } from "vue-sonner";

export default {
  state: {
    plants: [],
    plant: null,
    plantDetail: [],
  },
  mutations: {
    setPlantsData(state, payload) {
      state.plants = payload;
    },
    setPlantData(state, payload) {
      state.plant = payload;
    },
    setPlantDetailData(state, payload) {
      state.plantDetail = payload;
    },
  },
  getters: {
    plants: (state) => {
      return state.plants;
    },
    plant: (state) => {
      return state.plant;
    },
    plantDetail: (state) => {
      return state.plantDetail;
    },
  },
  actions: {
    FETCH_PLANT(context) {
      API.get("/master/plants/view")
        .then((res) => {
          context.commit("setPlantsData", res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_PLANT_BY_ID(context, payload) {
      API.get(`/master/plants/view?id=${payload}`)
        .then((res) => {
          context.commit("setPlantData", res.data.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_PLANT_DATA(context, payload) {
      API.get(`/master/plants/plantData?plant_id=${payload}`)
        .then((res) => {
          context.commit("setPlantDetailData", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ADD_PLANT(context, payload) {
      API.post("/master/plants/add", payload)
        .then((res) => {
          if (res.data.message == "success add plant") {
            toast.success("Plant created", {
              duration: 800,
            });
            context.dispatch("FETCH_PLANT");
          }
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
    DELETE_PLANT(context, payload) {
      API.delete(`/master/plants/delete/${payload}`)
        .then((res) => {
          if (res.data.message == "success delete plant") {
            toast.success("Plant deleted", {
              duration: 800,
            });
            context.dispatch("FETCH_PLANT");
          }
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
  },
};
