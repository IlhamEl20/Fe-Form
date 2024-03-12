<template>
  <v-container class="mt-3">
    <!-- <Toolbar /> -->
    <v-row>
      <v-col cols="12" class="text-right"><BtnCreateFrom /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BtnCreateFrom from "../components/BtnCreateFrom.vue";
import Toolbar from "../components/Toolbar.vue";

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
        const response = await this.$axios.$get("/forms");
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  mounted() {
    this.fetchForms();
  },
  components: { BtnCreateFrom },
};
</script>
