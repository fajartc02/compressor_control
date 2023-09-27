<template>
  <Toaster position="top-center" />

  <v-app>
    <div>
      <v-app-bar class="navbar" style="box-shadow: none">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <h3 class="ml-2">Compressor Control System</h3>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-account-badge</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        class="bg-deep-purple"
        theme="dark"
      >
        <template v-slot:prepend>
          <v-list-item
            class="my-2"
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            title="Jane Smith"
            subtitle="Logged in"
          ></v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list class="mt-2">
          <router-link to="/" style="text-decoration: none">
            <v-list-item
              prepend-icon="mdi-home-variant"
              title="Home"
              class="menu-item"
            ></v-list-item>
          </router-link>
          <router-link to="/compressor" style="text-decoration: none">
            <v-list-item
              prepend-icon="mdi-washing-machine"
              title="Compressor"
              class="menu-item"
            ></v-list-item>
          </router-link>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout"> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { Toaster } from "vue-sonner";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    showNavigation: true,
  }),
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
  mounted() {
    // if (!this.isLoggedIn) {
    //   this.$router.push("/auth/login");
    // }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.userData;
    },
  },
  components: { Toaster },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: auto;
  padding: 0px;
  background-color: #fff !important;
  border-bottom: 1px solid #eaeaea;
  z-index: 3;
  margin: 0px !important;
}
.nav-title {
  font-weight: 600;
}

.menu-item {
  color: #fff;
  border-radius: 10px;
  margin: 0px 10px;
}
.menu-item:hover {
  color: #fff;
  background-color: #000;
}
</style>
 