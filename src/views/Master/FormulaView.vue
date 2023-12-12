<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row cols="6">
              <v-col>
                <h3>Formula</h3>
              </v-col>

              <v-spacer />
              <v-col cols="2">
                <v-btn @click="dialogShow">Add Formula</v-btn>
                <v-dialog
                  v-model="isShowDialog"
                  width="600"
                  persistent
                >
                  <v-card title="Formula">
                    <v-card-text>
                      <v-text-field
                        style="margin-bottom: 5px;"
                        v-model="formula_nm"
                        label="Formula Name"
                        required
                      ></v-text-field>
                      <v-btn @click="addCondition" :disabled="containerFormula.length > 1">Add Formula</v-btn>
                      <v-expansion-panels class="mb-6">
                        <v-expansion-panel
                          v-for="(item, i) in containerFormula"
                          :key="i"
                        >
                          <v-expansion-panel-title expand-icon="mdi-menu-down">
                            Condition {{ i + 1 }}
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <v-select
                              v-model="item.machine_id"
                              :items="MACHINES_DATA"
                              item-title="machine_nm"
                              item-value="machine_id"
                              label="Machine"
                              return-object
                            ></v-select>
                            <v-select
                              v-model="item.param_id"
                              :items="PARAMETERS_DATA"
                              label="Parameter"
                              item-title="dev_name"
                              item-value="dev_name"
                              return-object
                            >
                            <template v-slot:item="{ props, item }">
                              <v-list-item v-bind="props" :subtitle="`${item.raw.dev_name}.${item.raw.group_name}.${item.raw.tag_name}`"></v-list-item>
                            </template>
                          </v-select>
                            <v-select
                              v-model="item.operator_id"
                              :items="OPERATORS_DATA"
                              item-title="operator_desc"
                              item-value="operator_nm"
                              label="Operator"
                              return-object
                            ></v-select>
                            <v-text-field
                              v-model="item.limit_vals"
                              label="Limit"
                              required
                            ></v-text-field>
                          </v-expansion-panel-text>
                          <v-expansion-panel-text>
                            <v-switch v-model="item.isMoreParameters" label="Extra Condition" color="red" inset></v-switch>
                            <v-select
                              v-if="item.isMoreParameters"
                              v-model="item.conjuntion_id"
                              :items="CONJUNCTIONS_DATA"
                              item-title="conjunction_desc"
                              item-value="conjunction_desc"
                              label="Operator Conjunction"
                              return-object
                            ></v-select>
                          </v-expansion-panel-text>
                          <v-expansion-panel-text>
                            <v-switch v-if="!item.isMoreParameters" v-model="item.isAction" label="Actions" color="success" inset></v-switch>
                            <v-select
                              v-if="item.isAction"
                              v-model="item.param_out_id"
                              :items="PARAMETERS_DATA"
                              item-title="tag_name"
                              item-value="client_hdl"
                              label="Parameter to Action"
                              return-object
                            >
                              <template v-slot:item="{ props, item }">
                                <v-list-item v-bind="props" :subtitle="`${item.raw.dev_name}.${item.raw.group_name}.${item.raw.tag_name}`"></v-list-item>
                              </template>
                            </v-select>
                            <v-select
                            v-if="item.isAction"
                              v-model="item.param_out_state"
                              :items="actionStateOpts"
                              item-title="label"
                              item-value="value"
                              label="Action state"
                            ></v-select>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                    <v-card-actions>
                      <v-row>
                        <v-spacer />
                        <v-col cols="3">
                          <v-btn
                            :disabled="containerFormula.length == 0"
                            color="success"
                            @click="actPostFormula"
                          >
                            Submit
                          </v-btn>
                        </v-col>
                        <v-col cols="3">
                          <v-btn
                            color="red"
                            @click="dialogDismiss"
                          >
                            Cancel
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-title>
          <hr>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Formula Name</th>
                  <th>Machine</th>
                  <th>Parameters</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="FORMULAS_DATA?.length > 0">
                <tr v-for="(item, i) in FORMULAS_DATA" :key="i">
                  <td>{{ item.no }}</td>
                  <td>{{ item.formula_nm }}</td>
                  <td>{{ item.machine_nm }}</td>
                  <td>
                    <v-table :hover="true">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Parameter</th>
                          <th>Current Value</th>
                          <th>Operator</th>
                          <th>Limit Value</th>
                          <th>Conjunction</th>
                          <th>Out Params</th>
                          <th>Out State</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="itm in item.children" :key="itm.formula_id">
                          <td style="width: 100px!important">{{ itm.no }}</td>
                          <td style="width: 300px!important">{{ itm.dev_name }}.{{ itm.group_name }}.{{ itm.tag_name }}</td>
                          <td style="width: 300px!important">{{ itm.reg_value }}</td>
                          <td style="width: 300px!important">{{ itm.operator_desc }}</td>
                          <td style="width: 100px!important">{{ itm.limit_vals }}</td>
                          <td>{{ itm.conjunction_desc }}</td>
                          <td>{{ itm.out_devnm }}.{{ itm.out_grpnm }}.{{ itm.out_tag }}</td>
                          <td>
                            <v-btn v-if="itm.param_out_state" color="success" disabled>ON</v-btn>
                            <v-btn v-else-if="!itm.param_out_state && !itm.conjunction_desc" color="red" disabled>OFF</v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </td>
                  <td>
                    <v-switch
                      :model-value="item.is_active"
                      color="success"
                      readonly
                    />
                  </td>
                  <td style="text-align: center;">
                    <v-btn color="success" disabled>
                      <v-icon>mdi-file-edit</v-icon>
                    </v-btn>
                    |
                    <v-btn color="red" disabled>
                      <v-icon>mdi-delete-alert</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <th style="text-align: center;" colspan="7">Tidak Ada Formula</th>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { toast } from 'vue-sonner';
import { mapGetters } from 'vuex'

export default {
  name: 'FormulaView',
  data() {
    return {
      actionStateOpts: [
        {
          label: 'ON',
          value: 1
        },
        {
          label: 'OFF',
          value: 0
        }
      ],
      formulaDesc: '',
      isShowDialog: false,
      form: {
        machine_id: null,
        param_id: null,
        operator_id: null,
        limit_vals: 0,
        conjuntion_id: null,
        param_out_id: null,
        isMoreParameters: true,
        isAction: false,
        param_out_state: null
      },
      containerFormula: [],
      headers: [],
      machines: [],
      formula_nm: null,
    }
  },
  computed: {
    ...mapGetters([
      'MACHINES_DATA',
      'PARAMETERS_DATA',
      'OPERATORS_DATA',
      'CONJUNCTIONS_DATA',
      'FORMULAS_DATA'
    ])
  },
  watch: {
    isMoreParameters: function() {
      if(this.isMoreParameters) {
        if(this.containerFormula.length > 1) {
          this.containerFormula.splice(0,1)
        }
      }
    }
  },
  async mounted() {
    await this.actGetFormulas()
    await this.actGetMachines()
    await this.actGetParameters()
    await this.actGetOperator()
    await this.actGetConjunctions()
  },
  methods: {
    async actGetMachines() {
      try {
        await this.$store.dispatch('FETCH_MACHINES')
      } catch (error) {
        toast.error('Failed to fetch machines')
      }
    },
    async actGetOperator() {
      try {
        await this.$store.dispatch('FETCH_OPERATORS')
      } catch (error) {
        toast.error('Failed to fetch operators')
      }
    },
    async actGetParameters() {
      try {
        this.$store.dispatch('FETCH_PARAMETERS')
      } catch (error) {
        toast.error('Failed to get parameters')
      }
    },
    async actGetConjunctions() {
      try {
        this.$store.dispatch('FETCH_CONJUNCTIONS')
      } catch (error) {
        toast.error('Failed to get conjunctions')
      }
    },
    async actGetFormulas() {
      try {
        this.$store.dispatch('FETCH_FORMULAS')
      } catch (error) {
        toast.error('Failed to get formulas')
      }
    },
    async actPostFormula() {
      try {
        await this.$store.dispatch('POST_FORMULA', {containerFormulas: this.containerFormula, formula_nm: this.formula_nm})
        await this.dialogDismiss()
        toast.success('Success to add formula')
      } catch (error) {
        toast.error('Failed to post formulas')
      }
    },
    addCondition() {
      this.form = {
        machine_id: null,
        param_id: null,
        operator_id: null,
        limit_vals: 0,
        conjuntion_id: null,
        param_out_id: null,
        isMoreParameters: true,
        isAction: false,
        param_out_state: null
      }
      this.containerFormula.push(this.form)
    },
    async dialogShow() {
      this.isShowDialog = true
    },
    async dialogDismiss() {
      this.formula_nm = null
      this.form = {
        machine_id: null,
        param_id: null,
        operator_id: null,
        limit_vals: 0,
        conjuntion_id: null,
        param_out_id: null,
        isMoreParameters: true,
        isAction: false,
        param_out_state: null
      }
      this.containerFormula = []
      this.isShowDialog = false
    }
  },
}
</script>

<style scoped>
th, tr, td {
  border: 1px solid black;
}
</style>
