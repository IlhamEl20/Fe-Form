<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar dark color="primary">Register </v-toolbar>
        <v-card-text>
          <v-form>
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
          <v-btn color="primary">Register</v-btn>
        </v-card-actions>
      </v-card>
      <div class="d-flex align-baseline">
        <p>Kamu belum punya akun?</p>
        <v-btn
          plain
          text
          :ripple="false"
          to="/login"
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
  layout: "auth",
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      rules: {
        fullname: [(v) => !!v || "full Name is required"],
        email: [
          (v) => !!v || "E-mail is required",
          (v) =>
            /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(v) || "E-mail must be valid",
        ],
        password: [
          (v) => !!v || "password is required",
          (v) => v.length >= 6 || "length must be 6 characters",
        ],
        password_confirmation: [
          (v) => !!v || "password confirmation is required",
          (v) =>
            v === this.form.password ||
            "Password Confimation must be same with password",
        ],
      },
    };
  },
};
</script>
