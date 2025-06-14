<template>
  <div>
    <v-app-bar class="navbar" style="box-shadow: none">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <h3 class="ml-2">Compressor Control System</h3>
      <v-spacer></v-spacer>
      <div
        class="text-center"
        style="
          padding: auto;
          height: 30px;
          width: 30px;
          background-color: #10b981;
          border-radius: 50%;
        "
      >
        A
      </div>
      <label class="ml-3 mr-3">: Compressor Auto</label>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="bg-blue-darken-4"
      theme="dark"
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg"
          :title="isLoggedIn"
          subtitle="Logged in"
        />
      </template>
      <v-divider />
      <v-list class="mt-2" v-model:opened="isOpen">
        <router-link to="/" style="text-decoration: none">
          <v-list-item
            prepend-icon="mdi-home-variant"
            title="Home"
            class="menu-item"
          />
        </router-link>
        <router-link to="/compressor" style="text-decoration: none">
          <v-list-item
            prepend-icon="mdi-washing-machine"
            title="Compressor"
            class="menu-item"
          />
        </router-link>
        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-cog"
              title="Admin"
              class="menu-item"
            />
          </template>
          <router-link
            v-for="(menu, i) in masterMenu"
            :key="i"
            :to="menu.path"
            style="text-decoration: none"
          >
            <v-list-item :title="menu.title" class="menu-item" />
          </router-link>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      drawer: false,
      showNavigation: true,
      isOpen: ["Master"],
      masterMenu: [
        {
          path: "/master/users",
          title: "Users",
        },
        {
          path: "/master/parameters",
          title: "Parameters",
        },
        {
          path: "/master/formula",
          title: "Formula",
        },
      ],
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
  computed: {
    isLoggedIn: function () {
      return localStorage.getItem("user");
    },
  },
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

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
