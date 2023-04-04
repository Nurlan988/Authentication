<template>
  <div class="container-home">
    <!-- <h1>{{ $store.state.username }}</h1> -->
    <h1>Username</h1>
    <nav class="my-5">
      <ul class="nav nav-pills nav-justified row">
        <li class="nav-item col-3">
          <router-link to="/" class="nav-link" tag="a" active-class="active"
            >Home</router-link
          >
        </li>
        <li class="nav-item col-3">
          <router-link
            to="/about"
            class="nav-link"
            tag="a"
            active-class="active"
            >About</router-link
          >
        </li>
        <div class="offset-6 col-3 d-flex justify-content-end">
          <button class="btn btn-danger" @click.prevent="logout">Logout</button>
        </div>
      </ul>
      <hr />
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>
