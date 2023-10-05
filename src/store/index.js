import { createStore } from "vuex";

import mainModule from "./main.module";
import authModule from "./auth.module";
import userModule from "./user.module";

export default createStore({
  modules: {
    main: mainModule,
    auth: authModule,
    user: userModule,
  },
});
