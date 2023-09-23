<template>
  <v-row style="margin: 5px">
    <v-col v-if="showSidebar" cols="2">
      <div class="sidebar-wrapper">
        <div
          class="d-flex justify-space-between sidebar-wrapper-header align-top ml-2"
        >
          <div>
            <h3 class="plant-name">Plant name</h3>
            <div class="d-flex">
              <div class="plant-badge">2 Lines</div>
              <div class="plant-badge">10 Machines</div>
            </div>
          </div>
          <div>
            <button class="button-icon mr-2">
              <v-icon>mdi-arrow-left-thin</v-icon>
            </button>
            <button class="button-icon mr-2">
              <v-icon>mdi-folder-plus</v-icon>
            </button>
          </div>
        </div>

        <div class="sidebar mt-10">
          <div class="line-heading" style="padding: 3px 15px">
            <div class="d-flex flex-row align-center justify-start">
              <h4>Line casting 1</h4>
              <div
                class="ml-2 rounded-pill pl-2 pr-2"
                style="background-color: #fff3e0; color: #fb8c00"
              >
                2
              </div>
            </div>
            <v-btn icon color="grey">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>

          <!-- COMPORESSROR LIST -->
          <div
            v-for="compressor in compressors"
            :key="compressor.id"
            class="comporessor-wrapper"
          >
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
          <!-- END COMPORESSROR LIST -->
        </div>
      </div>
    </v-col>
    <v-col :cols="[showSidebar ? '10' : '12']">
      <main class="main-area">
        <button class="button-icon mr-2" @click="showSidebar = !showSidebar">
          <v-icon v-if="showSidebar">mdi-unfold-more-vertical</v-icon>
          <v-icon v-else>mdi-unfold-less-vertical</v-icon>
        </button>
        <img src="@/assets/map.jpeg" />
      </main>
    </v-col>

    <!-- drag and drop components -->
    <VueDragResize
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
    </VueDragResize>
  </v-row>
</template>
  
<script>
import VueDragResize from "vue-drag-resize";

export default {
  name: "CompressorView",
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
    };
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
  },
  components: { VueDragResize },
};
</script>

<style scoped>
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
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  background-color: #fafafa;
}

.sidebar {
  background-color: #fff;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.main-area {
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
.main-area > img {
  position: relative;
  width: 100%;
}

.main-area > button {
  position: absolute;
  z-index: 2;
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
  
 