<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6"> </v-col>
  </v-row>
</template>

<script>
export default {
  // layout: "auth",
  middleware: ["authenticated"],

  head() {
    return {
      title: "Home",
    };
  },
  methods: {
    async fetchForms() {
      try {
        const response = await this.$axios.get("/forms");
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  mounted() {
    this.fetchForms();
  },
};
</script>
