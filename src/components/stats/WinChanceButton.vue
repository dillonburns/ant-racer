<template>
  <div class="win-chance-button-container">
    <button
      class="win-chance-button button"
      @click="calculateWinChanceForAnt({ id: ant.id })"
      :class="{ 'is-loading': loading }"
      :disabled="disabled"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "win-chance-button",

  props: {
    ant: {
      type: Object,
      default: () => null
    }
  },

  computed: {
    buttonText() {
      let buttonText = "";

      if (this.ant["Win Chance"] === "Not Yet Calculated") {
        buttonText = "Calculate Win Chance";
      } else if (this.calculated) {
        buttonText = "Calculated";
      }

      return buttonText;
    },

    calculated() {
      return typeof this.ant["Win Chance"] === "number";
    },

    loading() {
      return this.ant["Win Chance"] === "Loading";
    },

    disabled() {
      return this.loading || this.calculated;
    }
  },

  methods: {
    ...mapActions(["calculateWinChanceForAnt"])
  }
};
</script>
