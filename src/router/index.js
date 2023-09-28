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
        path: "/auth/login",
        component: () =>
            import ("@/views/auth/Login.vue"),
    },
    {
        path: "/master/users",
        component: () =>
            import ("@/views/Master/UsersView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
