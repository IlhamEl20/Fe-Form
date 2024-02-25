<template>
  <div class="v-alert-right">
    <v-alert
      v-for="(alert, index) in alerts"
      :key="index"
      border="left"
      v-model="alert.show"
      outlined
      :type="alert.type"
      class="v-bg-white"
    >
      <v-row>
        <v-col class="grow"> {{ alert.message }} </v-col>
        <v-col class="shrink">
          <v-btn icon small :color="alert.type" @click="oncClose(index)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    oncClose(index) {
      // this.alerts.splice(index, 1);
      // this.alerts[index].show = false;
      this.$store.commit("alerts/close", index);
    },
  },
  computed: {
    ...mapState("alerts", ["alerts"]),
  },
  // mounted() {
  //   let tes = {
  //     show: true,
  //     type: "success",
  //     message: "This is a success message",
  //   };
  //   this.$store.commit("alerts/show", tes);
  // },
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
