<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="100"
      src="@/assets/toyota-logo-full.png"
    ></v-img>

    <h2 class="text-center">Toyota Compressor Monitoring System</h2>

    <v-card
      class="mx-auto pa-8 mt-8 login-card"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">noreg</div>

      <v-text-field
        density="compact"
        placeholder="Your noreg"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="noreg"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
      ></v-text-field>

      <v-btn
        block
        class="my-5"
        style="box-shadow: none"
        color="black"
        size="large"
        @click="login"
      >
        Login
      </v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    visible: false,
    noreg: null,
    password: null,
  }),
  methods: {
    login() {
      this.$store.dispatch("LOGIN", {
        noreg: this.noreg,
        password: this.password,
      });
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.login-card {
  border: 1px solid #f3f4f6;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
}
</style>
