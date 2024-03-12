<template>
  <div>
    <v-container fluid class="pa-0">
      <Toolbar />
    </v-container>
    <v-container>
      <v-row>
        <v-col sm="10" md="8" offset-md="2" offset-sm="1">
          <v-card>
            <v-card-text>
              <QuestionTitle />
              <QuestionDescription />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  async asyncData({ params, redirect }) {
    try {
      if (!params.id) {
        throw { message: "FORM_ID_EMPTY" };
      }
      return {
        formId: params.id,
      };
    } catch (error) {
      console.log(error);
      return redirect("/404");
    }
  },
  methods: {
    async fethQuestions() {
      try {
        const response = await this.$store.dispatch(`forms/show`, this.formId);
        if (!response) {
          throw { message: "ERROR" };
        }
        return response;
      } catch (error) {
        if (error.response) {
          this.$nuxt.error({
            statusCode: error.response.status,
            customMessage: error.response.data.message,
          });
        } else {
          this.$store.commit(`alerts/show`, {
            type: "error",
            message: this.$t("SERVER_ERROR"),
          });
        }
      }
    },
  },
  mounted() {
    this.fethQuestions();
  },
};
</script>
