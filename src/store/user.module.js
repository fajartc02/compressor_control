import API from "@/config/api";
import { toast } from "vue-sonner";

export default {
    state: {
        users: null,
        userDetail: null
    },
    mutations: {
        setUsersData(state, payload) {
            state.users = payload;
        },
        setUserDetail(state, payload) {
            state.userDetail = payload
        }
    },
    getters: {
        users: (state) => {
            return state.users
        },
        userDetail: (state) => {
            return state.userDetail
        }
    },
    actions: {
        async ADD_USER({ commit }, payload) {
            return API().post(`/master/users/add`, payload)
                .then(() => {
                    // commit("setUsersData", res.data.data);
                    toast.success('Berhasil menambah user');
                    return true
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e.message.includes(400) ? 'Noreg tidak boleh sama' : e.message);
                    return e
                });
        },
        async FETCH_USERS({ commit }, id) {
            if (id) {
                API().get(`/master/users/view?id=${id}`)
                    .then((res) => {
                        commit("setUserDetail", res.data.data[0]);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            } else {
                API().get("/master/users/view")
                    .then((res) => {
                        commit("setUsersData", res.data.data);
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log(e);
                    });
            }
        },
        async EDIT_USER({ commit }, payload) {
            let id = payload.user_id
            delete payload.user_id
            delete payload.no
            console.log(payload);
            return API().put(`/master/users/edit/${id}`, payload)
                .then(() => {
                    // commit("setUsersData", res.data.data);
                    toast.success('Berhasil mengubah data user');
                    return true
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e.message);
                    return false
                });
        },
        async DELETE_USER({ commit }, id) {
            return API().delete(`/master/users/delete/${id}`)
                .then(() => {
                    // commit("setUsersData", res.data.data);
                    toast.success('Berhasil menghapus data user');
                    return true
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e.message);
                    return false
                });
        }
    }
}
