import API from "@/config/api";
import { toast } from "vue-sonner";


export default {
    state: {
        formulas: null,
        formulaDetail: null,
    },
    mutations: {
        SET_FORMULA_DATA(state, payload) {
            state.formulas = payload;
        },
        SET_FORMULA_DETAILS(state, payload) {
            state.formulaDetail = payload;
        },
    },
    getters: {
        FORMULAS_DATA: (state) => {
            return state.formulas
        },
        FORMULA_DETAIL: (state) => {
            return state.formulaDetailq
        }

    },
    actions: {
        async FETCH_FORMULAS({ commit }, id) {
            if (id) {
                await API().get(`/master/formulas/view?id=${id}`)
                    .then((res) => {
                        commit("SET_FORMULA_DETAILS", res.data.data[0]);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            } else {
                await API().get("/master/formulas/view")
                    .then((res) => {
                        commit("SET_FORMULA_DATA", res.data.data);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            }
        },
        async POST_FORMULA({ commit }, data) {
            try {
                await API().post("/master/formulas/add", data)
                    .then(() => {
                        API().get("/master/formulas/view")
                            .then((res) => {
                                commit("SET_FORMULA_DATA", res.data.data);
                            })
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            } catch (error) {
                toast.error('Error to POST formula')
            }
        }
    }
}