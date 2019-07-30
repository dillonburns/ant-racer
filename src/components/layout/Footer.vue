<template>
  <footer class="container-fluid">
    <div class="columns">
      <div class="column has-text-middle">
        Copyright Ant Race Insider {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "site-footer"
};
</script>

<style scoped lang="scss">
footer {
  padding: 15px;
  background: #111;
  color: white;
}
</style>
