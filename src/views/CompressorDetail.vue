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
                <button class="button-icon mr-2">
                  <v-icon>mdi-folder-plus</v-icon>
                </button>
              </div>
            </div>

            <div
              v-for="line in plant.linesData"
              :key="line.uuid"
              class="sidebar mt-5"
            >
              <div class="line-heading" style="padding: 4px 10px">
                <div class="d-flex flex-row align-center justify-start">
                  <h4
                    v-if="plant.linesData.length >= 1"
                    style="margin-left: 5px"
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
                    {{ plant.linesData.length }} machine
                  </div>
                </div>
                <v-btn icon="mdi-plus" variant="text" size="small"></v-btn>
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
      compressors: [
        {
          id: 1,
          name: "Compressor 1",
          line: "Line casting 1",
          status: 1,
        },
        {
          id: 2,
          name: "Compressor 2",
          line: "Line casting 1",
          status: 0,
        },
      ],
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
  },
  mounted() {
    this.$store.dispatch("GET_PLANT_BY_ID", this.$route.params.id);
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