<template>
  <div style="padding: 20px">
    <main class="main-area">
      <div class="main-area-aside d-flex align-start">
        <div class="sidebar-wrapper">
          <div
            class="d-flex justify-space-between sidebar-wrapper-header align-top"
          >
            <div class="d-flex flex-column justify-start pl-1">
              <h2 v-if="plants.length >= 1" class="plant-name">
                <span> {{ plants[plantIndexPosition].plant_nm }} </span>
              </h2>
              <span class="plant-description" style="font-size: 13px">
                Use navigation to select plant
              </span>
            </div>
            <div>
              <button
                :disabled="plantIndexPosition == 0"
                class="button-icon mr-2"
                @click="
                  setPlantIndexPosition('prev', plants[plantIndexPosition].uuid)
                "
              >
                <v-icon>mdi-arrow-left-thin</v-icon>
              </button>
              <button
                :disabled="plantIndexPosition == plants.length - 1"
                class="button-icon mr-2"
                @click="
                  setPlantIndexPosition('next', plants[plantIndexPosition].uuid)
                "
              >
                <v-icon>mdi-arrow-right-thin</v-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <img
        v-if="plants.length >= 1"
        :src="`${baseUrl}/image?path=${plants[plantIndexPosition].background}`"
        alt=""
      />
    </main>

    <!-- map the machines -->
    <div v-if="machines.length >= 1">
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
  name: "Home",
  components: {
    Multiselect,
    VueDragResize,
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_API_URL,
      plantIndexPosition: 0,
      selectedPlantId: null,
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
    getMachines(plant_id) {
      this.$store.dispatch("GET_MACHINES", { plant_id: plant_id });
    },
    initPlantData() {
      this.selectedPlantId = this.plants[this.plantIndexPosition].uuid; // set initial default plant id
      this.getMachines(this.plants[this.plantIndexPosition].uuid); // get machines data with first plant
    },
    setPlantIndexPosition(type, plant_id) {
      this.selectedPlantId = plant_id;
      if (type == "prev") {
        this.plantIndexPosition = this.plantIndexPosition - 1;
        this.getMachines(plant_id);
      }
      if (type == "next") {
        this.plantIndexPosition = this.plantIndexPosition + 1;
        this.getMachines(plant_id);
      }
    },
    turnOnMachine(machine_id) {
      this.$store.dispatch("TURN_ON_MACHINE", { machine_id: machine_id });
      setTimeout(() => {
        this.getMachines(this.selectedPlantId);
      }, 1000);
    },
    turnOffMachine(machine_id) {
      this.$store.dispatch("TURN_OFF_MACHINE", { machine_id: machine_id });
      setTimeout(() => {
        this.getMachines(this.selectedPlantId);
      }, 1000);
    },
  },
  watch: {
    plants(oldValue, newValue) {
      this.initPlantData();
    },
    plantIndexPosition() {
      this.initPlantData();
    },
  },
  mounted() {
    this.$store.dispatch("FETCH_PLANT");
  },
  computed: {
    ...mapGetters(["plant", "plants", "machines"]),
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