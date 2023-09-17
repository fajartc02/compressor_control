<template>
  <v-app>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <h2>Compressor Control System</h2>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        color="indigo text-light"
        absolute
        temporary
        dark
        >
        <v-banner>QCC V1.0.1</v-banner>
        <v-list
          nav
          dense
        >
            <v-list-item-group
            v-model="group"
            color="primary"
            >
            <router-link to="/" style="text-decoration: none;">
              <v-list-item>
                <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item>
            </router-link>
            <v-divider></v-divider>

            <!-- <router-link to="/submission" style="text-decoration: none;">
              <v-list-item>
                <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Submission</v-list-item-title>
              </v-list-item>
            </router-link> -->
            <v-divider></v-divider>
            
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
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false
  }),
};
</script>
