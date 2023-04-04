<template>
  <div class="container-login">
    <ul class="nav nav-pills nav-justified mb-3 menu-list">
      <li class="nav-item">
        <router-link to="/login" class="nav-link" tag="a" active-class="active"
          >Login</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          to="/register"
          class="nav-link"
          tag="a"
          active-class="active"
          >Register</router-link
        >
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script></script>

<style scoped>
.menu-list {
  margin-bottom: 50px !important;
}
.nav-item {
  border: 1px solid #007bff;
  border-radius: 5px;
}
.nav-link {
  cursor: pointer;
}
</style>
