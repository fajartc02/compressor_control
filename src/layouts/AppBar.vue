<template>
  <div class="navbar d-flex justify-space-between">
    <div class="d-flex align-center">
      <v-app-bar-nav-icon @click="isOpen = !isOpen"></v-app-bar-nav-icon>
      <span class="nav-title ml-1">Compressor monitoring system</span>
    </div>
    <div>
      <v-btn icon class="mr-3" style="box-shadow: none">
        <v-icon>mdi-account-badge</v-icon>
      </v-btn>
    </div>
  </div>

  <!-- <v-navigation-drawer v-model="isOpen">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      title="John Leider"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/" style="text-decoration: none">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Home"
          value="home"
        ></v-list-item>
      </router-link>

      <router-link to="/compressor" style="text-decoration: none">
        <v-list-item
          prepend-icon="mdi-forum"
          title="Compressor"
          value="compressor"
        ></v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer> -->
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: auto;
  padding: 5px;
  background-color: #fff !important;
  border-bottom: 1px solid #eaeaea;
  z-index: 3;
  margin: 0px !important;
}
.nav-title {
  font-weight: 600;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
