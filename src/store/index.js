import { createStore } from "vuex";

import mainModule from "./main.module";
import authModule from "./auth.module";
import userModule from "./user.module";
import machineModule from "./machines.module";
import parameterModule from "./parameter.module";
import operatorModule from "./operator.module";
import conjunctionModule from "./conjunction.module";
import formulaModule from "./formula.module";

export default createStore({
    modules: {
        main: mainModule,
        auth: authModule,
        user: userModule,
        machine: machineModule,
        operator: operatorModule,
        parameter: parameterModule,
        conjunction: conjunctionModule,
        formula: formulaModule
    },
});