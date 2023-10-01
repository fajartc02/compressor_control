<template>
  <div>
    <div class="target">Vue Moveable</div>
    <Moveable
      className="moveable"
      v-bind:target="['.target']"
      v-bind:draggable="true"
      v-bind:scalable="true"
      v-bind:rotatable="true"
      @drag="onDrag"
      @scale="onScale"
      @rotate="onRotate"
    />
  </div>
</template>
  <script>
import Moveable from "vue3-moveable";

export default {
  name: "app",
  components: {
    Moveable,
  },
  methods: {
    onDrag({ target, transform }) {
      target.style.transform = transform;
    },
    onScale({ target, drag }) {
      target.style.transform = drag.transform;
    },
    onRotate({ target, drag }) {
      target.style.transform = drag.transform;
    },
  },
};
</script>

<style>
.description {
  padding: 10px;
}
.root {
  position: relative;
}
.container {
  position: relative;
  margin-top: 50px;
}
.target {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 150px;
  left: 100px;
  line-height: 100px;
  text-align: center;
  background: #ee8;
  color: #333;
  font-weight: bold;
  border: 1px solid #333;
  box-sizing: border-box;
}

.target1 {
  left: 120px;
  top: 120px;
}

.target2 {
  left: 300px;
  top: 140px;
}

.target3 {
  left: 180px;
  top: 250px;
}
</style>