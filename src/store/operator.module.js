import API from "@/config/api";
import { toast } from "vue-sonner";


export default {
    state: {
        operators: null,
        operatorDetail: null,
    },
    mutations: {
        SET_OPERATOR_DATA(state, payload) {
            state.operators = payload;
        },
        SET_OPERATOR_DETAILS(state, payload) {
            state.operatorDetail = payload;
        },
    },
    getters: {
        OPERATORS_DATA: (state) => {
            return state.operators
        },
        OPERATOR_DETAIL: (state) => {
            return state.operatorDetailq
        }

    },
    actions: {
        async FETCH_OPERATORS({ commit }, id) {
            if (id) {
                await API().get(`/master/operators/view?id=${id}`)
                    .then((res) => {
                        commit("SET_OPERATOR_DETAILS", res.data.data[0]);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            } else {
                await API().get("/master/operators/view")
                    .then((res) => {
                        commit("SET_OPERATOR_DATA", res.data.data);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            }
        },
    }
}