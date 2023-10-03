<template>
  <div style="padding: 20px">
    <main class="main-area">
      <div class="main-area-aside d-flex align-start">
        <div class="sidebar-wrapper">
          <div
            class="d-flex justify-space-between sidebar-wrapper-header align-top"
          >
            <div class="d-flex flex-column justify-start pl-1">
              <h2 v-if="plant" class="plant-name">
                <span> {{ plant.plant_nm }} </span>
              </h2>
              <span class="plant-description"> Manage your plant </span>
            </div>
            <div>
              <router-link to="/compressor">
                <button class="button-icon mr-2">
                  <v-icon>mdi-arrow-left-thin</v-icon>
                </button>
              </router-link>
              <button class="button-icon mr-2" @click="addLineDialog = true">
                <v-icon>mdi-folder-plus</v-icon>
              </button>
            </div>
          </div>

          <div v-if="showSidebar">
            <div
              v-if="plant"
              style="max-height: 500px; overflow-y: scroll; margin-top: 10px"
            >
              <div
                v-for="line in plant.linesData"
                :key="line.line_id"
                class="sidebar mt-2"
              >
                <div class="line-heading" style="padding: 4px 10px">
                  <div class="d-flex flex-row align-center justify-start">
                    <h4 style="margin-left: 5px; font-size: 13px">
                      LINE <span> {{ line.line_snm }} </span>
                    </h4>
                    <div
                      class="ml-2 rounded-pill pl-2 pr-2"
                      style="
                        background-color: #fff3e0;
                        color: #fb8c00;
                        font-size: 14px;
                        font-weight: 500;
                      "
                    >
                      {{ line.machines.length }} machine
                    </div>
                  </div>
                  <div>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      @click="deleteLine(line.line_id)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-plus"
                      variant="text"
                      size="small"
                      @click="addMachine(line.line_id)"
                    ></v-btn>
                  </div>
                </div>

                <v-list
                  class="compressor-wrapper"
                  style="padding-top: 0; padding-bottom: 8px"
                >
                  <v-list-item
                    style="
                      padding: 8px 8px;
                      border-top: 1px solid #f1f5f9;
                      text-align: left;
                    "
                    v-for="compressor in line.machines"
                    :title="compressor.machine_nm"
                    :key="compressor.machine_nm"
                    subtitle="compressor"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="transparent">
                        <div>
                          <v-img
                            v-if="+compressor.status"
                            width="35"
                            src="@/assets/fanmotion.gif"
                          ></v-img>
                          <v-img
                            v-else
                            width="35"
                            src="@/assets/fanStop.png"
                          ></v-img>
                        </div>
                      </v-avatar>
                    </template>

                    <template v-slot:append>
                      <button
                        v-if="+compressor.status"
                        class="machine-action-button mr-2"
                        @click="turnOffMachine(compressor.machine_id)"
                      >
                        <v-icon>mdi-stop</v-icon>
                      </button>
                      <button
                        v-else
                        class="machine-action-button mr-2"
                        @click="turnOnMachine(compressor.machine_id)"
                      >
                        <v-icon>mdi-play</v-icon>
                      </button>
                    </template>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </div>
        </div>
        <button
          class="button-icon mr-2 ml-3"
          @click="showSidebar = !showSidebar"
        >
          <v-icon v-if="showSidebar">mdi-unfold-more-vertical</v-icon>
          <v-icon v-else>mdi-unfold-less-vertical</v-icon>
        </button>
      </div>

      <img
        v-if="plant"
        :src="`${baseUrl}/image?path=${plant.background}`"
        alt=""
      />
    </main>

    <!-- add line dialogs -->
    <v-dialog persistent v-model="addLineDialog" width="auto">
      <v-card
        class="mx-auto rounded-lg"
        color="#fff"
        min-width="500"
        variant="flat"
      >
        <v-sheet
          color="#f5f5f5"
          class="py-1 px-5 d-flex justify-space-between align-center"
        >
          <div>
            <h3>Create line</h3>
          </div>
          <v-btn
            @click="addLineDialog = false"
            icon="mdi-close"
            variant="text"
          ></v-btn>
        </v-sheet>

        <div class="w-full mt-5 mb-10 mx-5">
          <div>
            <p class="form-label">Line name</p>
            <input type="text" v-model="line_name" class="form-input" />
          </div>
          <div class="mt-3">
            <p class="form-label">Line sname</p>
            <input type="text" v-model="line_sname" class="form-input" />
          </div>
        </div>

        <v-sheet
          class="py-3 px-5 d-flex justify-space-between align-center"
          style="border-top: 1px solid #f3f4f6"
        >
          <div></div>
          <div>
            <v-btn
              class="text-none text-subtitle-1 rounded-lg float-right"
              color="#5865f2"
              variant="flat"
              @click="createLine"
              :loading="isLoading"
            >
              Create Line
            </v-btn>
            <v-btn
              class="text-none text-subtitle-1 rounded-lg mr-2 float-right"
              color="#f3f4f6"
              variant="flat"
              @click="addLineDialog = false"
            >
              Cancel
            </v-btn>
          </div>
        </v-sheet>
      </v-card>
    </v-dialog>

    <!-- add machine dialog -->
    <v-dialog persistent v-model="addMachineDialog" width="auto">
      <v-card
        class="mx-auto rounded-lg"
        color="#fff"
        min-width="500"
        variant="flat"
      >
        <v-sheet
          color="#f5f5f5"
          class="py-1 px-5 d-flex justify-space-between align-center"
        >
          <div>
            <h3>Create machine</h3>
          </div>
          <v-btn
            @click="addMachineDialog = false"
            icon="mdi-close"
            variant="text"
          ></v-btn>
        </v-sheet>

        <div class="w-full mt-5 mb-10 mx-5">
          <div>
            <p class="form-label">Machine name</p>
            <input
              type="text"
              v-model="machine.machine_nm"
              class="form-input"
            />
          </div>

          <!-- <Multiselect v-model="value" :options="options" /> -->
          <div class="mt-3">
            <p class="form-label">Select parameters</p>
            <Multiselect
              v-model="paramsValue"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :options="options"
            />
          </div>
        </div>

        <v-sheet
          class="py-3 px-5 d-flex justify-space-between align-center"
          style="border-top: 1px solid #f3f4f6"
        >
          <div></div>
          <div>
            <v-btn
              class="text-none text-subtitle-1 rounded-lg float-right"
              color="#5865f2"
              variant="flat"
              @click="setMachinePosition"
              :loading="isLoading"
            >
              Set machine position
            </v-btn>
            <v-btn
              class="text-none text-subtitle-1 rounded-lg mr-2 float-right"
              color="#f3f4f6"
              variant="flat"
              @click="addMachineDialog = false"
            >
              Cancel
            </v-btn>
          </div>
        </v-sheet>
      </v-card>
    </v-dialog>

    <!-- set machine position -->
    <VueDragResize
      v-if="isMachineReadyToSetThePosition"
      class="draggable"
      :isActive="false"
      :isResizable="false"
      :isDraggable="true"
      :w="300"
      :h="55"
      :x="800"
      :y="400"
      v-on:resizing="resize"
      v-on:dragging="resize"
      style="cursor: move"
    >
      <div class="machine-card-list">
        <div class="d-flex justify-space-between align-center pa-1">
          <div class="d-flex align-center">
            <div class="machine-status mx-2">
              <v-avatar color="transparent">
                <div>
                  <v-img width="35" src="@/assets/fanStop.png"></v-img>
                </div>
              </v-avatar>
            </div>
            <div class="machine-description mt-1">
              <h2>name</h2>
              <span>Line nya</span>
            </div>
          </div>
          <div class="machine-action">
            <button
              class="machine-action-button mr-2"
              @click="addMachineAction"
            >
              Save machine
            </button>
          </div>
        </div>
        <div class="mx-4"></div>
      </div>
    </VueDragResize>

    <!-- map the machines -->
    <div v-if="machines">
      <VueDragResize
        v-for="machine in machines"
        :key="machine.machine_nm"
        class="draggable"
        :isActive="false"
        :isResizable="false"
        :isDraggable="selectedEditableMachine == machine.machine_id"
        :w="300"
        :h="55"
        :x="machine.x_axis"
        :y="machine.y_axis"
        v-on:resizing="resize"
        v-on:dragging="resize"
      >
        <div
          class="machine-card-list"
          :style="`${
            +machine.reg_value
              ? 'border: 3px solid #10b981'
              : 'border: 3px solid #ef4444'
          }`"
        >
          <div class="d-flex justify-space-between align-center pa-1">
            <div class="d-flex align-center">
              <div class="machine-status mx-2">
                <v-avatar color="transparent">
                  <div>
                    <v-img
                      v-if="+machine.reg_value"
                      width="35"
                      src="@/assets/fanmotion.gif"
                    ></v-img>
                    <v-img v-else width="35" src="@/assets/fanStop.png"></v-img>
                  </div>
                </v-avatar>
              </div>
              <div class="machine-description mt-1">
                <h2>{{ machine.machine_nm }}</h2>
                <span>Line {{ machine.line_nm }}</span>
              </div>
            </div>
            <div class="machine-action d-flex">
              <div class="edit-mode d-flex">
                <button
                  v-if="selectedEditableMachine != machine.machine_id"
                  class="machine-action-button mr-2"
                  @click="
                    () => {
                      selectedEditableMachine = machine.machine_id;
                      selectedLineID = machine.line_id;
                    }
                  "
                >
                  <v-icon>mdi-cog-sync</v-icon>
                </button>
                <button
                  v-if="selectedEditableMachine == machine.machine_id"
                  class="machine-action-button mr-2"
                  @click="editMachine"
                >
                  <v-icon>mdi-check</v-icon>
                </button>
                <button
                  v-if="selectedEditableMachine == machine.machine_id"
                  @click="deleteMachine(machine.machine_id)"
                  class="machine-action-button mr-2"
                >
                  <v-icon>mdi-delete</v-icon>
                </button>
              </div>
              <div
                v-if="selectedEditableMachine != machine.machine_id"
                class="view-mode"
              >
                <button
                  v-if="+machine.reg_value"
                  class="machine-action-button mr-2"
                  @click="turnOffMachine(machine.machine_id)"
                >
                  <v-icon>mdi-stop</v-icon>
                </button>
                <button
                  v-else
                  class="machine-action-button mr-2"
                  @click="turnOnMachine(machine.machine_id)"
                >
                  <v-icon>mdi-play</v-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="mx-4"></div>
        </div>
      </VueDragResize>
    </div>
  </div>
</template>
      
  <script>
import { mapGetters } from "vuex";
import { toast } from "vue-sonner";
import Multiselect from "@vueform/multiselect";
import VueDragResize from "vue3-drag-resize";

export default {
  name: "CompressorDetailView",
  components: {
    Multiselect,
    VueDragResize,
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_API_URL,
      moveable: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      plantBackground: null,
      selectedEditableMachine: null,
      is_run: false,
      machineStatus: true,
      showSidebar: true,
      addLineDialog: false,
      addMachineDialog: false,
      selectedLineID: null,
      line_name: "",
      line_sname: "",
      machine: {
        machine_nm: "",
        y_axis: 0,
        x_axis: 0,
      },
      tempMachine: {
        machine_nm: "",
        y_axis: 0,
        x_axis: 0,
      },
      isMachineReadyToSetThePosition: false,
      paramsValue: null,
      options: null,
    };
  },
  methods: {
    resize(newRect) {
      this.moveable.width = newRect.width;
      this.moveable.height = newRect.height;
      this.moveable.top = newRect.top;
      this.moveable.left = newRect.left;
    },
    getPlantById() {
      this.$store.dispatch("GET_PLANT_BY_ID", this.$route.params.id);
    },
    getParams() {
      const res = this.$store.dispatch("GET_PARAMS");
      if (res) {
        this.mapParamsDataToSelectOptionValue();
      } else {
        console.log("Error get parameters data");
      }
    },
    createLine() {
      if (!this.line_name && !this.line_sname) {
        toast.error("Please fill all the required fields");
      } else {
        const data = {
          plant_id: this.$route.params.id,
          line_nm: this.line_name,
          line_snm: this.line_sname,
        };

        this.$store.dispatch("ADD_LINE", data);
        this.getPlantById();
        this.addLineDialog = false;
        this.line_name = "";
        this.line_sname = "";
      }
    },
    deleteLine(id) {
      toast("Are you sure to delete this line?", {
        action: {
          label: "Sure",
          onClick: () => {
            this.$store.dispatch("DELETE_LINE", id);
            this.getPlantById();
          },
        },
      });
    },
    getMachines() {
      this.$store.dispatch("GET_MACHINES", { plant_id: this.$route.params.id });
    },
    addMachine(id) {
      this.addMachineDialog = true;
      this.selectedLineID = id;
      this.mapParamsDataToSelectOptionValue();
    },
    setMachinePosition() {
      // tempMachine: {
      //   machine_nm: "",
      //   y_axis: 0,
      //   x_axis: 0,
      // },

      this.isMachineReadyToSetThePosition = true;
      this.addMachineDialog = false;
    },
    async addMachineAction() {
      const data = {
        line_id: this.selectedLineID,
        machine_nm: this.machine.machine_nm,
        x_axis: this.moveable.left,
        y_axis: this.moveable.top,
        param_ids: this.paramsValue,
      };

      this.$store.dispatch("ADD_MACHINE", data);

      setTimeout(() => {
        this.getMachines();
        this.getPlantById();
        this.addMachineDialog = false;
        this.isMachineReadyToSetThePosition = false;
      }, 1000);
    },
    editMachine() {
      const data = {
        line_id: this.selectedLineID,
        // machine_nm: this.machine.machine_nm,
        x_axis: this.moveable.left,
        y_axis: this.moveable.top,
        // param_ids: this.paramsValue,
      };

      this.$store.dispatch("EDIT_MACHINE", {
        id: this.selectedEditableMachine,
        data: data,
      });
      this.getPlantById();
      this.getMachines();
      this.selectedEditableMachine = null;
    },
    deleteMachine(id) {
      toast("Are you sure to delete this machine?", {
        action: {
          label: "Sure",
          onClick: () => {
            this.$store.dispatch("DELETE_MACHINE", { id: id });
            setTimeout(() => {
              this.getMachines();
              this.getPlantById();
            }, 1000);
          },
        },
      });
    },
    turnOnMachine(machine_id) {
      this.$store.dispatch("TURN_ON_MACHINE", { machine_id: machine_id });
      setTimeout(() => {
        this.getMachines();
        this.getPlantById();
      }, 1000);
    },
    turnOffMachine(machine_id) {
      this.$store.dispatch("TURN_OFF_MACHINE", { machine_id: machine_id });
      setTimeout(() => {
        this.getMachines();
        this.getPlantById();
      }, 1000);
    },

    async mapParamsDataToSelectOptionValue() {
      var tempOptions = [];
      await this.parameters.map((i) => {
        var opt = { value: i.client_hdl, label: i.dev_name };
        tempOptions.push(opt);
      });

      this.options = tempOptions;
    },
    handleCreateParams: async (option, select$) => {
      // Async request (eg. for validating)
      // await new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve();
      //   }, 1000);
      // });
      // Modifying option label
      // option.label = option.label + " - confirmed";
      // return option;
    },
  },
  mounted() {
    this.getPlantById();
    this.getParams();
    this.getMachines();
  },
  computed: {
    ...mapGetters(["plant", "parameters", "machines"]),
  },
};
</script>


<style src="@vueform/multiselect/themes/default.css"></style>    
  <style scoped>
.plant-name {
  font-size: 18px;
  text-align: left;
}
.plant-description {
  font-size: 14px;
  margin-top: -4px;
  color: #6b7280;
  text-align: left;
}

/* plant */
.plant-info {
  font-size: 14px;
}
.plant-badge {
  background-color: #dbeafe;
  color: #3b82f6;
  font-size: 12px;
  margin-right: 5px;
  border-radius: 6px;
  padding: 0px 7px;
  font-weight: 600;
}

.sidebar-wrapper {
  width: 330px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 10px;
  background-color: #fafafa;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.sidebar {
  background-color: #fff;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* MAIN AREA */
.main-area {
  border-radius: 10px;
  border: 1px solid #f3f4f6;
  width: 1700px;
  height: 1000px;
  --dot-bg: black;
  --dot-color: white;
  --dot-size: 1px;
  --dot-space: 22px;
  /* background: linear-gradient(
        90deg,
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    linear-gradient(
        var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center / var(--dot-space) var(--dot-space),
    var(--dot-color); */
  /* background-image: url("../assets/machine-map.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  /* background-attachment: fixed; */
}
.main-area > img {
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
}

.main-area > .main-area-aside {
  position: absolute;
  z-index: 2;
  margin: 10px;
}

.button-icon {
  border-radius: 8px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.line-list-wrapper:hover {
  background-color: #fff;
  cursor: default;
}

.line-heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.pill {
  background-color: saddlebrown;
  width: auto;
}

.machine-status-label {
  font-weight: bold;
}

.line-canvas {
  background-color: #fff;
  border: 2px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.line-canvas:hover {
  cursor: pointer;
}

/* machines */

.machine-card-list {
  background-color: #fff;
  max-width: 300px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  border-radius: 8px;
}

.machine-description > h2 {
  font-size: 14px;
  margin-top: 5px;
  line-height: 10px;
  color: #1f2937;
  font-weight: 500;
}
.machine-description > span {
  font-size: 12.5px;
  color: #9ca3af;
  font-weight: normal;
}

.machine-status-label {
  padding: 4px 7px;
  border-radius: 5px;
  font-size: 12px;
  text-transform: uppercase;
}
.label-stop {
  background-color: #fee2e2;
  color: #dc2626;
}
.label-running {
  background-color: #dcfce7;
  color: #16a34a;
}
.machine-action-button {
  border-radius: 8px;
  padding: 5px;
  background-color: #f7f8f8;
  border: 1px solid #e5e5e5;
}

/* draggable */
.draggable {
  padding: 0px 4px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}
</style>