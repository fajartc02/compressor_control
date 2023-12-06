import API from "@/config/api";
import { toast } from "vue-sonner";

export default {
    state: {
        parameters: null,
        parameterDetail: null,
    },
    mutations: {
        SET_PARAMETER_DATA(state, payload) {
            state.parameters = payload;
        },
        SET_PARAMETER_DETAILS(state, payload) {
            state.parameterDetail = payload;
        },
    },
    getters: {
        PARAMETERS_DATA: (state) => {
            return state.parameters
        },
        PARAMETER_DETAIL: (state) => {
            return state.parameterDetailq
        }

    },
    actions: {
        async FETCH_PARAMETERS({ commit }, id) {
            if (id) {
                await API().get(`/master/parameters/view?id=${id}`)
                    .then((res) => {
                        commit("SET_PARAMETER_DETAILS", res.data.data[0]);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            } else {
                await API().get("/master/parameters/view")
                    .then((res) => {
                        commit("SET_PARAMETER_DATA", res.data.data);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            }
        },
    }
}