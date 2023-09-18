<template>
  <v-row style="margin: 5px">
    <v-col cols="2">
      <div class="sidebar">
        <div class="line-heading" style="padding: 8px 15px">
          <div class="d-flex flex-row align-center justify-start">
            <h4>Lines</h4>
            <div
              class="ml-2 rounded-pill pl-2 pr-2"
              style="background-color: #fff3e0; color: #fb8c00"
            >
              1
            </div>
          </div>
          <v-btn icon color="grey">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div>
          <div>
            <div class="line-list-wrapper overflow-hidden v-sheet theme--light">
              <div class="v-list-item v-list-item--link theme--light">
                <div class="v-list-item__icon">
                  <v-icon>mdi-folder-arrow-up</v-icon>
                </div>

                <div class="v-list-item__content" style="margin-left: -10px">
                  <div class="v-list-item__title">Line Casting 1</div>
                  <div class="v-list-item__subtitle">4 Sept 23</div>
                  <div class="mt-1">
                    <v-chip small> 2 compressors </v-chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- compressor markers component -->
      <div class="sidebar">
        <div class="line-heading" style="padding: 8px 15px">
          <div class="d-flex flex-row align-center justify-start">
            <h4>Compressors</h4>
            <div
              class="ml-2 rounded-pill pl-2 pr-2"
              style="background-color: #fff3e0; color: #fb8c00"
            >
              2
            </div>
          </div>
          <v-btn icon color="grey">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <div>
          <div>
            <div class="line-list-wrapper overflow-hidden v-sheet theme--light">
              <div class="v-list-item v-list-item--link theme--light">
                <div class="v-list-item__icon">
                  <v-img width="35" src="@/assets/fanmotion.gif"></v-img>
                </div>

                <div class="v-list-item__content" style="margin-left: -10px">
                  <div class="v-list-item__title">Compressor 1</div>
                  <div class="v-list-item__subtitle">Line casting 1</div>
                  <div class="mt-1">
                    <v-chip small color="primary" text-color="white">
                      Running</v-chip
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="line-list-wrapper overflow-hidden v-sheet theme--light"
              style="border-top: 1px solid #eaeaea"
            >
              <div class="v-list-item v-list-item--link theme--light">
                <div class="v-list-item__icon">
                  <v-img width="35" src="@/assets/fanStop.png"></v-img>
                </div>

                <div class="v-list-item__content" style="margin-left: -10px">
                  <div class="v-list-item__title">Compressor 2</div>
                  <div class="v-list-item__subtitle">Line casting 1</div>
                  <div class="mt-1">
                    <v-chip small color="red" text-color="white"> Stop</v-chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="10">
      <main class="main-area">
        <v-img src="@/assets/map.jpeg"></v-img>
      </main>
    </v-col>

    <!-- drag and drop components -->
    <VueDragResize
      :isActive="false"
      :w="200"
      :h="80"
      v-on:resizing="resize"
      v-on:dragging="resize"
      class="line-canvas"
    >
      <div
        class="line-list-wrapper overflow-hidden v-sheet theme--light rounded-xl"
      >
        <div class="v-list-item v-list-item--link theme--light">
          <div class="v-list-item__icon">
            <v-icon>mdi-folder-arrow-up</v-icon>
          </div>

          <div class="v-list-item__content" style="margin-left: -10px">
            <div class="v-list-item__title">Line Casting 1</div>
            <div class="mt-1">
              <v-chip small> 2 compressors </v-chip>
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
ul,
li {
  text-decoration: none;
}
.sidebar {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-top: 10px;
}

.main-area {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
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
</style>
  
 