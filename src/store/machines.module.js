import API from "@/config/api";
import { toast } from "vue-sonner";


export default {
    state: {
        machines: null,
        machineDetail: null,
    },
    mutations: {
        SET_MACHINE_DATA(state, payload) {
            state.machines = payload;
        },
        SET_MACHINE_DETAILS(state, payload) {
            state.machineDetail = payload;
        },
    },
    getters: {
        MACHINES_DATA: (state) => {
            return state.machines
        },
        MACHINE_DETAIL: (state) => {
            return state.machineDetailq
        }

    },
    actions: {
        async FETCH_MACHINES({ commit }, id) {
            if (id) {
                await API().get(`/master/machines/view?id=${id}`)
                    .then((res) => {
                        commit("SET_MACHINE_DETAILS", res.data.data[0]);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            } else {
                await API().get("/master/machines/view")
                    .then((res) => {
                        commit("SET_MACHINE_DATA", res.data.data);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            }
        },
    }
}