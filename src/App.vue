<template>
  <div id="app">
    <Header />
    <main class="container-fluid">
      <div class="columns">
        <div class="column is-10-desktop is-offset-1-desktop is-12-tablet">
          <router-view />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "app",

  components: {
    Header,
    Footer
  },

  created() {
    this.initializeStore();
  },

  methods: {
    ...mapActions(["initializeStore"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 50px 15px;
  position: relative;
}
</style>
