<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("initAuth");
  },
};
</script>
<style></style>
