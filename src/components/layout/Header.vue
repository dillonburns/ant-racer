<template>
  <header class="container-fluid">
    <div class="columns is-hidden-tablet">
      <!-- responsive spacer -->
      <div class="column" />
    </div>
    <div class="columns">
      <div class="column is-narrow">
        <Logo />
      </div>
      <div class="column">
        <nav class="has-text-centered-mobile">
          <router-link to="/">Home</router-link>
          <router-link to="/stats">Stats</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "@/components/layout/Logo";

export default {
  name: "site-header",
  components: {
    Logo
  }
};
</script>

<style scoped lang="scss">
header {
  color: white;
  padding: 0 15px;
  background: #111;
}

nav {
  height: 100%;

  a {
    color: white;
    height: 100%;
    display: inline-block;
    padding: 10px 15px;
    margin-right: 15px;
    transform: skewX(-15deg);
    font-weight: bold;

    &:hover {
      color: $primary;
      background: white;
    }
  }
}
</style>
