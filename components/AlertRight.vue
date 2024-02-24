<template>
  <div class="v-alert-right">
    <v-alert
      v-for="(alert, index) in alerts"
      :key="index"
      border="left"
      outlined
      :type="alert.type"
      class="v-bg-white"
    >
      <v-row>
        <v-col class="grow"> {{ alert.message }} </v-col>
        <v-col class="shrink">
          <v-btn icon small :color="alert.type">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alerts: [
        { message: "test alert", type: "error" },
        { message: "test alert2", type: "success" },
      ],
    };
  },
};
</script>

<style scoped>
.v-bg-white {
  background-color: #fff !important;
}
.v-alert-right {
  max-width: 40%;
  position: fixed;
  right: 20px;
  bottom: 10px;
  z-index: 9;
}
@media (max-width: 768px) {
  .v-alert-right {
    max-width: 70%;
  }
}
</style>
