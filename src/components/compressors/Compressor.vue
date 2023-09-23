<template>
  <div>
    <div>
      <div
        class="line-list-wrapper overflow-hidden"
        style="border-top: 1px solid #eaeaea"
      >
        <div class="v-list-item v-list-item">
          <div class="v-list-item__icon">
            <v-img
              v-if="machineStatus"
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
              <span>Compressor 2</span>

              <div class="ml-2">
                <div
                  v-if="machineStatus"
                  class="machine-status-label label-running"
                >
                  Running
                </div>
                <div v-else class="machine-status-label label-stop">
                  Stopped
                </div>
              </div>
            </div>
            <div class="v-list-item__subtitle">Line casting 1</div>

            <div class="my-2">
              <button
                class="machine-action-button mr-2"
                @click="machineStatus = !machineStatus"
              >
                <v-icon v-if="machineStatus">mdi-stop</v-icon>
                <v-icon v-else>mdi-play</v-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Compressor",
  data() {
    return {
      is_run: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      machineStatus: true,
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
};
</script>

<style>
</style>