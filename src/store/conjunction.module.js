import API from "@/config/api";
import { toast } from "vue-sonner";


export default {
    state: {
        conjunctions: null,
        conjunctionDetail: null,
    },
    mutations: {
        SET_CONJUNCTION_DATA(state, payload) {
            state.conjunctions = payload;
        },
        SET_CONJUNCTION_DETAILS(state, payload) {
            state.conjunctionDetail = payload;
        },
    },
    getters: {
        CONJUNCTIONS_DATA: (state) => {
            return state.conjunctions
        },
        CONJUNCTION_DETAIL: (state) => {
            return state.conjunctionDetail
        }

    },
    actions: {
        async FETCH_CONJUNCTIONS({ commit }, id) {
            if (id) {
                await API().get(`/master/conjunctions/view?id=${id}`)
                    .then((res) => {
                        commit("SET_CONJUNCTION_DETAILS", res.data.data[0]);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            } else {
                await API().get("/master/conjunctions/view")
                    .then((res) => {
                        commit("SET_CONJUNCTION_DATA", res.data.data);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            }
        },
    }
}