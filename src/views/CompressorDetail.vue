<template>
  <v-row style="margin: 3px">
    <v-col cols="12">
      <main
        class="main-area scrollable text-center flex-grow-1 flex-shrink-0 overflow-auto"
      >
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
              <div v-if="plant">
                <div
                  v-for="line in plant.linesData"
                  :key="line.line_id"
                  class="sidebar mt-2"
                >
                  <div class="line-heading" style="padding: 4px 10px">
                    <div class="d-flex flex-row align-center justify-start">
                      <h4 
                        style="margin-left: 5px; font-size: 13px;"
                      >
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
                      <v-btn icon="mdi-delete" variant="text" size="small" @click="deleteLine(line.line_id)"></v-btn>
                      <v-btn icon="mdi-plus" variant="text" size="small" @click="addMachine(line.line_id)"></v-btn>
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
                              v-if="compressor.status !== null"
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
                        <button class="machine-action-button mr-2">
                          <v-icon v-if="compressor.status !== null"
                            >mdi-stop</v-icon
                          >
                          <v-icon v-else>mdi-play</v-icon>
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

        <img src="@/assets/machine-map.png" />
      </main>
    </v-col>

    <!-- dialogs --> 
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
            <input type="text" v-model="machine.machine_nm" class="form-input" />
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
              @click="addMachineAction"
              :loading="isLoading"
            >
              Create Machine
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

    <!-- draggable -->
    <!-- <VueDragResize
        v-for="compressor in compressors"
        :key="compressor.id"
        :isActive="false"
        :w="250"
        :h="110"
        v-on:resizing="resize"
        v-on:dragging="resize"
        class="line-canvas"
      >
        <div class="comporessor-wrapper">
          <div
            class="line-list-wrapper overflow-hidden"
            style="border-top: 1px solid #f1f5f9"
          >
            <div class="v-list-item v-list-item">
              <div class="v-list-item__icon">
                <v-img
                  v-if="compressor.status === 1"
                  width="35"
                  src="@/assets/fanmotion.gif"
                ></v-img>
                <v-img v-else width="35" src="@/assets/fanStop.png"></v-img>
              </div>
  
              <div
                class="v-list-item__content"
                style="margin-left: -15px; padding-bottom: 3px"
              >
                <div class="v-list-item__title d-flex align-center">
                  <span style="font-size: 15px; font-weight: 600"
                    >Compressor 2</span
                  >
  
                  <div class="ml-2">
                    <div
                      v-if="compressor.status === 1"
                      class="machine-status-label label-running"
                    >
                      Running
                    </div>
                    <div v-else class="machine-status-label label-stop">
                      Stopped
                    </div>
                  </div>
                </div>
                <div
                  class="v-list-item__subtitle"
                  style="font-size: 14px; color: #6b7280"
                >
                  Line casting 1
                </div>
  
                <div class="my-1">
                  <button
                    class="machine-action-button mr-2"
                    @click="machineStatus = !machineStatus"
                  >
                    <v-icon v-if="compressor.status === 1">mdi-stop</v-icon>
                    <v-icon v-else>mdi-play</v-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VueDragResize> -->
  </v-row>
</template>
      
  <script>
import VueDragResize from "vue-drag-resize";
import { mapGetters } from "vuex";
import { toast } from "vue-sonner";
import API from "@/config/api";
import axios from 'axios'


export default {
  name: "CompressorDetailView",
  components: {},
  data() {
    return { 
      is_run: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      machineStatus: true,
      showSidebar: true, 
      addLineDialog: false,
      addMachineDialog: false,
      selectedLineID: null,
      line_name: 'name',
      line_sname: 'sname',
      machine: {
        machine_nm: "",
        y_axis: "0",
        x_axis: "0",
      },
      moveable: {
        bounds: { left: 0, right: 780, top: 0, bottom: 400 },
        draggable: true,
        dragArea: true,
        snappable: true,
      },
    };
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    handleDrag({ target, transform }) {
      console.log("onDrag", transform);
      target.style.transform = transform;
    },
    getPlantById(){
      this.$store.dispatch("GET_PLANT_BY_ID", this.$route.params.id); 
    },
    async createLine() {
      if (!this.line_name && !this.line_sname) {
        toast.error("Please fill all the required fields");
      } else {
       const data = {
        plant_id: this.$route.params.id,
        line_nm: this.line_name,
        line_snm: this.line_sname,
       } 

       await this.$store.dispatch("ADD_LINE", data);
       this.getPlantById()
       this.addLineDialog = false
 
      }
    }, 
    deleteLine(id){  
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
    addMachine(id){
      this.addMachineDialog = true;
      this.selectedLineID = id
    },
    addMachineAction(){
      const data = {
        line_id: this.selectedLineID,
        machine_nm: this.machine.machine_nm, 
        x_axis: this.machine.x_axis, 
        y_axis: this.machine.y_axis, 
      }
      
      this.$store.dispatch("ADD_MACHINE", data); 
    }
  },
  mounted() {
    this.getPlantById() 
  },
  computed: {
    ...mapGetters(["plant"]),
  },
};
</script>
    
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
.moveable {
  width: 100px;
  height: 100px;
  background-color: coral;
  z-index: 99999;
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
  /* overflow-x: hidden;
    overflow-y: hidden; */
  border-radius: 10px;
  width: 100%;
  height: 800px;
  --dot-bg: black;
  --dot-color: white;
  --dot-size: 1px;
  --dot-space: 22px;
  background: linear-gradient(
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
    var(--dot-color);
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
</style>