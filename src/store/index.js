import { createStore } from "vuex";

import plantModule from "./plant.module";
import authModule from "./auth.module";
import userModule from "./user.module";

export default createStore({
    modules: {
        plant: plantModule,
        auth: authModule,
        user: userModule
    },
});