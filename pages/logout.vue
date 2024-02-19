<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-card-text class="d-flex align-center">
          <h2>Logout</h2>
          <!-- <v-icon class="ml-3">mdi-loading</v-icon> -->
          <v-progress-circular indeterminate class="ml-3" color="primary" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import * as Cookies from "js-cookie";
export default {
  middleware: ["authenticated"],
  layout: "auth",
  mounted() {
    setTimeout(() => {
      this.$store.commit("auth/logout");
      this.$router.push({ name: "login___" + this.$i18n.locale });
    }, 1500);
    // Cookies.remove("vuex");
    // window.location.reload();
  },
};
</script>
