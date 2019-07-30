<template>
  <div class="win-chance-button-container">
    <button
      class="win-chance-button button is-dark"
      @click="clickHandler"
      :class="{ 'is-loading': loading }"
      :disabled="disabled"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "win-chance-button-all",

  props: {
    ants: {
      type: Array,
      default: () => null
    }
  },

  data() {
    return {
      testRun: false
    };
  },

  computed: {
    ...mapGetters(["allAntsFinishedCalculating"]),

    buttonText() {
      let buttonText = "";

      if (!this.allAntsFinishedCalculating) {
        buttonText = "Calculate All Win Chances";
      } else {
        buttonText = "All Calculated";
      }

      return buttonText;
    },

    loading() {
      return (
        [...this.ants].filter(ant => ant["Win Chance"] === "Loading").length >
          0 && this.testRun
      );
    },

    disabled() {
      return this.allAntsFinishedCalculating;
    }
  },

  methods: {
    ...mapActions(["calculateWinChanceForAllAnts"]),

    clickHandler() {
      this.testRun = true;
      this.calculateWinChanceForAllAnts();
    }
  }
};
</script>
