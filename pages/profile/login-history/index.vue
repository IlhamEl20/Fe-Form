<template>
  <v-row class="frame-content">
    <v-col cols="10" offset="1" md="6" offset-md="3">
      <v-card class="my-3">
        <v-toolbar color="primary" dark>
          Device tempat kamu login !
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
      <div class="text-center">
        <v-icon v-if="loading" class="ml-3 spin-loading">mdi-loading</v-icon>
      </div>
      <div v-if="userAccess.length > 0">
        <v-alert v-if="alert.show" :type="alert.type">
          {{ alert.message }}
        </v-alert>
        <v-card class="my-3" v-for="(item, i) in userAccess" :key="i">
          <v-card-text>
            <p class="mb-0">
              <strong>{{ getDevice(item.userAgent) }}</strong>
            </p>
            <p>
              <small>{{ item.userAgent }}</small>
            </p>
            <div class="d-flex">
              <p class="mb-0">
                {{
                  $dayjs(item.createdAt * 1000).format("DD MMMM YYYY | hh:mm")
                }}
              </p>
              <v-spacer></v-spacer>
              <v-btn small text color="secondary" @click="deleteItem(item)">
                Logout
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-text>
            <h3 class="pt-4">
              Logout dari {{ getDevice(itemDelete.userAgent) }} ?
            </h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue" text @click="deleteConfirm(itemDelete._id)">
              <span v-if="!isDisableDelete"> OK </span>
              <v-progress-circular v-else color="primary" indeterminate>
              </v-progress-circular>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ["authenticated"],
  head: {
    title: "Login History",
  },
  data() {
    return {
      alert: {
        show: false,
        type: "",
        message: "",
      },
      dialogDelete: false,
      itemDelete: false,
      loading: false,
      isDisableDelete: false,
      userAccess: [],
      breadcrumbs: [
        {
          text: "Users",
          disabled: true,
          to: "/users",
        },
      ],
    };
  },
  methods: {
    fetch() {
      this.loading = true;

      this.$axios
        .$get(`/profiles/log-login`)
        .then((response) => {
          this.userAccess = response.userAccess;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    getDevice(userAgent) {
      const agent = this.$uaParser(userAgent);

      if (agent.device.vendor != undefined) {
        return `${agent.os.name} | ${agent.device.vendor} ${agent.device.model} (${agent.device.type})`;
      } else {
        return `${agent.os.name} ${agent.os.version}`;
      }
    },
    deleteConfirm(userAccessId) {
      this.isDisableDelete = true;
      this.$axios
        .$post(`/profiles/remote-logout/${userAccessId}`)
        .then((response) => {
          //process hapus data di data-table
          this.userAccess = this.userAccess.filter(
            (item) => item._id != userAccessId
          );

          let params = {
            message: "LOGOUT_SUCCESS",
            title: this.getDevice(this.itemDelete.userAgent),
          };
          this.showAlert(params);

          this.closeDelete();
          this.isDisableDelete = false;
        })
        .catch((err) => {
          let params = {
            message: "LOGOUT_FAILED",
          };
          this.showAlert(params);
          this.closeDelete();
        });
    },
    deleteItem(item) {
      this.itemDelete = item;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    showAlert(params) {
      if (params.message == "LOGOUT_SUCCESS") {
        let tes = {
          show: true,
          type: "success",
          message: this.$t(params.message, {
            title: params.title,
          }),
        };
        this.$store.commit("alerts/show", tes);
      } else if (params.message == "LOGOUT_FAILED") {
        let tes = {
          show: true,
          type: "error",
          message: this.$t(params.message, {
            title: params.title,
          }),
        };
        this.$store.commit("alerts/show", tes);
      }
    },
  },
  mounted() {
    this.fetch();
    this.showAlert(this.$route.params);
  },
};
</script>
