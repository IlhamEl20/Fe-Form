<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar dark color="primary">Register </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              :rules="rules.fullname"
              label="Full Name"
              v-model="form.fullname"
              required
            />
            <v-text-field
              :rules="rules.email"
              label="Email"
              v-model="form.email"
              required
              @keydown="resetEmailExistMessage"
            />
            <v-text-field
              :rules="rules.password"
              label="Password"
              type="password"
              v-model="form.password"
              required
            />
            <v-text-field
              :rules="rules.password_confirmation"
              label="Confirm Password"
              type="password"
              v-model="form.password_confirmation"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onSubmit" :loading="isLoading"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
      <div class="d-flex align-baseline">
        <p>Kamu belum punya akun?</p>
        <v-btn
          plain
          text
          :ripple="false"
          :to="localePath('/login')"
          color="primary"
          class="pl-1"
          >Login</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ["unauthenticated"],
  layout: "auth",
  data() {
    return {
      emailExist: false,
      isLoading: false,
      form: {
        fullname: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      rules: {
        fullname: [
          (v) => !!v || this.$t("FIELD_REQUIRED", { field: "full name" }),
        ],
        email: [
          (v) => !this.emailExist || this.$t("EMAIL_EXIST"),
          (v) => !!v || this.$t("FIELD_REQUIRED", { field: "email" }),
          (v) =>
            /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(v) || this.$t("EMAIL_INVALID"),
        ],
        password: [
          (v) => !!v || this.$t("FIELD_REQUIRED", { field: "password" }),
          (v) =>
            v.length >= 6 ||
            this.$t("FIELD_MIN", { field: "password", min: 6 }),
        ],
        password_confirmation: [
          (v) =>
            !!v || this.$t("FIELD_REQUIRED", { field: "Konfirmasi password" }),
          (v) =>
            v === this.form.password ||
            this.$t("FIELD_CONFIRM", {
              fieldConfirm: "Konfirmasi password",
              field: "password",
            }),
        ],
      },
    };
  },
  methods: {
    resetEmailExistMessage() {
      this.emailExist = false;
    },
    async onSubmit() {
      try {
        if (this.$refs.form.validate()) {
          this.isLoading = true;
          const response = await this.$axios.$post("/register", this.form);
          console.log(response);
          if (response.status == true) {
            this.$router.push({ name: "index___" + this.$i18n.locale });

            //save token
            //save refresh token
            this.$store.commit("auth/setAccessToken", response.accessToken);
            this.$store.commit("auth/setRefreshToken", response.refreshToken);
            this.$store.commit("auth/setFullname", response.fullname);
            alert();
          }
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.data.message === "EMAIL_ALREADY_EXIST") {
          this.emailExist = true;
          this.$refs.form.validate();
        }
        this.isLoading = false;
      }
    },
  },
};
</script>
