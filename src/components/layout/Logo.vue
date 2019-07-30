<template>
  <div class="logo-container">
    <div class="logo">
      <router-link to="/">ANT RACE INSIDER</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "logo"
};
</script>

<style lang="scss" scoped>
.logo-container {
  text-align: center;
}

.logo {
  display: inline-flex;
  font-family: "SFSportsNightUpright";
  font-size: 24px;
  background: $primary;
  padding: 5px 15px;
  transform: skewX(-15deg);

  a {
    color: white;
  }
}
</style>
