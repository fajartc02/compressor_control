import API from "@/config/API";
import { toast } from "vue-sonner";

export default {
  state: {
    plants: [],
    backgroundImage: null,
    plant: null,
    plantDetail: [],
    parameters: [],
    machines: [],
    apiResponse: "init",
  },
  mutations: {
    setApiResponse(state, payload) {
      state.apiResponse = payload;
    },
    setBackgroundImage(state, payload) {
      state.backgroundImage = payload;
    },
    setPlantsData(state, payload) {
      state.plants = payload;
    },
    setMachinesData(state, payload) {
      state.machines = payload;
    },
    setPlantData(state, payload) {
      state.plant = payload;
    },
    setPlantDetailData(state, payload) {
      state.plantDetail = payload;
    },
    setParamsData(state, payload) {
      state.parameters = payload;
    },
  },
  getters: {
    apiResponse: (state) => {
      return state.apiResponse;
    },
    plants: (state) => {
      return state.plants;
    },
    background: (state) => {
      return state.backgroundImage;
    },
    machines: (state) => {
      return state.machines;
    },
    plant: (state) => {
      return state.plant;
    },
    plantDetail: (state) => {
      return state.plantDetail;
    },
    parameters: (state) => {
      return state.parameters;
    },
  },
  actions: {
    FETCH_PLANT(context) {
      API()
        .get("/master/plants/view")
        .then((res) => {
          context.commit("setPlantsData", res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_PLANT_BY_ID(context, payload) {
      API()
        .get(`/master/plants/view?id=${payload}`)
        .then((res) => {
          context.commit("setPlantData", res.data.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_PLANT_DATA(context, payload) {
      API()
        .get(`/master/plants/plantData?plant_id=${payload}`)
        .then((res) => {
          context.commit("setPlantDetailData", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ADD_PLANT(context, payload) {
      API()
        .post("/master/plants/add", payload)
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
      API()
        .delete(`/master/plants/delete/${payload}`)
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

    // LINES ACTION
    ADD_LINE(context, payload) {
      API()
        .post("/master/lines/add", payload)
        .then((res) => {
          if (res.data.message == "success add line") {
            toast.success("Line created", {
              duration: 800,
            });
          }
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
    DELETE_LINE(context, payload) {
      API()
        .delete(`/master/lines/delete/${payload}`)
        .then((res) => {
          if (res.data.message == "success delete line") {
            toast.success("Line deleted", {
              duration: 800,
            });
          }
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },

    // MACHINES ACTION
    GET_MACHINES(context, { plant_id }) {
      API()
        .get(`/master/machines/view?plant_id=${plant_id}`)
        .then((res) => {
          context.commit("setMachinesData", res.data.data);
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
    ADD_MACHINE(context, payload) {
      API()
        .post("/master/machines/add", payload)
        .then((res) => {
          if (res.data.message == "success add machine") {
            toast.success("Machine created", {
              duration: 800,
            });
          }
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
    EDIT_MACHINE(context, { data, id }) {
      API()
        .put(`/master/machines/edit/${id}`, data)
        .then((res) => {
          if (res.data.message == "success update machine") {
            toast.success("Machine updated", {
              duration: 800,
            });
          }
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
    DELETE_MACHINE(context, { id }) {
      API()
        .delete(`/master/machines/delete/${id}`)
        .then((res) => {
          if (res.data.message == "success delete machine") {
            toast.success("Machine deleted", {
              duration: 800,
            });
          }
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
    TURN_ON_MACHINE(context, { machine_id }) {
      API()
        .post(`/iot/compressor/on/${machine_id}`)
        .then((res) => {
          toast.success(res.data.message, {
            duration: 800,
          });
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },
    TURN_OFF_MACHINE(context, { machine_id }) {
      API()
        .post(`/iot/compressor/off/${machine_id}`)
        .then((res) => {
          toast.success(res.data.message, {
            duration: 800,
          });
        })
        .catch((e) => {
          toast.error("Error");
          console.log(e);
        });
    },

    // MACHINE PARAMS
    GET_PARAMS(context, payload) {
      API()
        .get(`/master/parameters/view`)
        .then((res) => {
          context.commit("setParamsData", res.data.data);
          return true;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    },
  },
};
