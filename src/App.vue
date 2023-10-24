<template>
  <div>
    <Toaster position="top-center" closeButton />

    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { Toaster } from "vue-sonner";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    showNavigation: true,
    open: ["Master"],
    masterMenu: [
      {
        path: "/master/users",
        title: "Users",
      },
      {
        path: "/master/parameters",
        title: "Parameters",
      },
    ],
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
  components: { Toaster },
};
</script>

 