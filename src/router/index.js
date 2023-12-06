import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        component: () =>
            import ("@/views/Home.vue"),
    },
    {
        path: "/compressor",
        component: () =>
            import ("@/views/Compressor.vue"),
    },
    {
        path: "/compressor/:id",
        component: () =>
            import ("@/views/CompressorDetail.vue"),
    },
    {
        path: "/master/users",
        component: () =>
            import ("@/views/Master/UsersView.vue"),
    },
    {
        path: "/master/parameters",
        component: () =>
            import ("@/views/Master/ParametersView.vue"),
    },
    {
        path: "/master/formula",
        component: () =>
            import ("@/views/Master/FormulaView.vue"),
    },
    {
        path: "/auth/login",
        component: () =>
            import ("@/views/auth/Login.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;