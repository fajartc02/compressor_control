<template>
  <v-app>
    <v-app-bar class="navbar" style="box-shadow: none">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <h3>Compressor Control System</h3>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-account-badge</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary dark>
      <v-banner>Main menu</v-banner>
      <v-list nav dense>
        <v-list-item-group v-model="group" color="light">
          <router-link to="/" style="text-decoration: none">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/compressor" style="text-decoration: none">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Compressor</v-list-item-title>
            </v-list-item>
          </router-link>

          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
  }),
};
</script>

<style scoped>
.navbar {
  background-color: #fff !important;
  border-bottom: 1px solid #eaeaea;
}
</style>
