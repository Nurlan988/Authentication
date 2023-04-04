<template>
  <div class="tab-content">
    <div id="pills-register" role="tabpanel" aria-labelledby="tab-register">
      <form @submit.prevent="formSignUp">
        <!-- Username input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="registerUsername">Username</label>
          <input
            type="text"
            id="registerUsername"
            class="form-control"
            :class="{ 'is-invalid': v$.register.username.$error }"
            v-model.trim="register.username"
            @blur="v$.register.username.$touch"
          />
          <div class="form-text text-danger" v-if="v$.register.username.$error">
            Enter your username.
          </div>
        </div>
        <!-- Email input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="registerEmail">Email</label>
          <input
            type="email"
            id="registerEmail"
            class="form-control"
            :class="{ 'is-invalid': v$.register.email.$error }"
            v-model.trim="register.email"
            @blur="v$.register.email.$touch"
          />
          <div class="form-text text-danger" v-if="v$.register.email.$error">
            Enter email.
          </div>
        </div>
        <!-- Password input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="registerPassword">Password</label>
          <input
            type="password"
            id="registerPassword"
            class="form-control"
            :class="{ 'is-invalid': v$.register.password.$error }"
            v-model.trim="v$.register.password.$model"
            @blur="v$.register.password.$touch"
          />
          <div v-if="v$.register.password.$error" class="form-text text-danger">
            Enter numbers from 6 to 10.
          </div>
        </div>
        <!-- Repeat Password input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="registerRepeatPassword"
            >Repeat password</label
          >
          <input
            type="password"
            id="registerRepeatPassword"
            class="form-control"
            :class="{ 'is-invalid': v$.register.repassword.$error }"
            v-model.trim="v$.register.repassword.$model"
            @blur="v$.register.repassword.$touch"
          />
          <div
            v-if="v$.register.repassword.$error"
            class="form-text text-danger"
          >
            Password does not match.
          </div>
        </div>
        <!-- Checkbox -->
        <div class="form-check mb-4">
          <div class="d-flex">
            <input
              class="form-check-input me-2"
              type="checkbox"
              id="registerCheck"
              aria-describedby="registerCheckHelpText"
              v-model="register.checkbox"
              @change="v$.register.checkbox.$touch"
            />
            <label class="form-check-label" for="registerCheck">
              I have read and agree to the terms
            </label>
          </div>
          <div v-if="v$.register.checkbox.$error" class="form-text text-danger">
            Read and agree to the terms
          </div>
        </div>
        <!-- Submit button -->
        <button type="submit" class="btn btn-primary btn-block mb-3">
          Sign Up
        </button>
        <!-- Login buttons -->
        <div class="text-center">
          <p>
            Member?
            <router-link to="/login" tag="a">Login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  numeric,
  maxLength,
  minLength,
  sameAs,
} from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useVuelidate(),
      register: {
        username: "",
        email: "",
        password: "",
        repassword: "",
        checkbox: false,
      },
    };
  },
  methods: {
    async formSignUp() {
      const isFormValid = await this.v$.$validate();
      if (!isFormValid) return;
      this.$store.dispatch("signUp", { ...this.register }).then((response) => {
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
      register: {
        email: { required, email },
        username: { required },
        password: {
          required,
          numeric,
          minLength: minLength(6),
          maxLength: maxLength(10),
        },
        repassword: {
          required,
          numeric,
          minLength: minLength(6),
          maxLength: maxLength(10),
          sameAs: sameAs(this.register.password),
        },
        checkbox: {
          checked() {
            return this.register.checkbox == true;
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.form-check-input {
  position: static;
  margin-top: 0;
  margin-right: 5px;
}
</style>
