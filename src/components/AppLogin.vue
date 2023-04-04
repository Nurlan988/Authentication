<template>
  <div class="tab-content">
    <div id="pills-login" role="tabpanel" aria-labelledby="tab-login">
      <form @submit.prevent="formSubmit">
        <!-- Email input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="loginName">Email or username</label>
          <input
            type="email"
            id="loginName"
            class="form-control"
            :class="{ 'is-invalid': v$.form.email.$error }"
            v-model.trim="form.email"
            @blur="v$.form.email.$touch"
          />
          <div class="form-text text-danger" v-if="v$.form.email.$error">
            Email enter.
          </div>
        </div>
        <!-- Password input -->
        <label class="form-label" for="loginPassword">Password</label>
        <div class="form-outline mb-4">
          <input
            type="password"
            id="loginPassword"
            class="form-control"
            v-model.trim="form.password"
            :class="{ 'is-invalid': v$.form.password.$error }"
            @blur="v$.form.password.$touch"
          />
          <div class="form-text text-danger" v-if="v$.form.password.$error">
            Enter password.
          </div>
        </div>
        <!-- Submit button -->
        <button type="submit" class="btn btn-primary btn-block mb-4">
          Sign in
        </button>
        <div class="text-center">
          <p>
            Not a member?
            <router-link to="/register" tag="a">Register</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useVuelidate(),
      form: {
        email: "",
        password: "",
        checkbox: false,
      },
    };
  },
  methods: {
    async formSubmit() {
      const isFormCurrent = await this.v$.$validate();
      if (!isFormCurrent) return;
      this.$store.dispatch("signIn", { ...this.form }).then((response) => {
        if (this.$store.getters.isAuthentication) {
          this.$router.push({ path: "/" });
        } else {
          this.$router.push({ name: "login" });
        }
      });
    },
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    };
  },
};
</script>

<style scoped></style>
