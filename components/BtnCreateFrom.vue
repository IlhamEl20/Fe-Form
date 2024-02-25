<template>
  <v-btn color="primary" :loading="isLoading" @click="createNewForm">
    New Form
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: "NewFormButton",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async createNewForm() {
      try {
        this.isLoading = true;
        // this.$emit("createNewForm");
        // const forms = await this.$axios.$post("forms");
        const forms = await this.$store.dispatch("forms/store");
        const questions = await this.$store.dispatch(
          `questions/store`,
          forms.form._id
        );
        console.log(forms);
        console.log(questions);
        this.isLoading = false;

        // this.$router.push(`/questions/${forms.form._id}`);
      } catch (error) {
        console.log(error);
        this.$store.commit("alerts/show", {
          type: "error",
          message: "SERVER_ERROR",
          show: true,
        });

        this.isLoading = false;
      }
    },
  },
};
</script>
