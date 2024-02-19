<template>
  <v-app dark>
    <v-main>
      <TheHeader />
      <br />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";

export default {
  name: "DefaultLayout",
  components: { TheHeader },
};
</script>
