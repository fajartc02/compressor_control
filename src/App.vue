<template>
  <div>
    <Toaster position="top-center" closeButton />

    <v-app>
      <AppBar />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from "@/layouts/AppBar.vue";
import { Toaster } from "vue-sonner";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    showNavigation: true,
  }),
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("/auth/login");
    }
  },
  computed: {
    isLoggedIn: function () {
      return localStorage.getItem("user");
    },
  },
  components: {
    Toaster,
    AppBar
  },
};
</script>

