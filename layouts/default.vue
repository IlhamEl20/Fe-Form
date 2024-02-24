<template>
  <v-app dark>
    <v-main>
      <AlertRight />
      <TheHeader />
      <br />
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import AlertRight from "../components/AlertRight.vue";
import TheHeader from "../components/TheHeader.vue";

export default {
  name: "DefaultLayout",
  components: { TheHeader, AlertRight },
};
</script>
