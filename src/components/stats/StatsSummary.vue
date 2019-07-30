<template>
  <section class="card">
    <div class="card_header columns">
      <div class="column">
        <div class="title is-6">Stat Summary</div>
      </div>
    </div>
    <div class="card_content">
      <div v-if="!allAntsFinishedCalculating">
        Run the full test suite to see result summary
      </div>
      <div v-else>
        <div class="columns is-mobile">
          <div class="column has-text-weight-bold">Ant</div>
          <div class="column has-text-weight-bold is-3">Win %</div>
          <div class="column is-2" />
        </div>
        <div
          v-for="(ant, i) in ants"
          :key="ant.id"
          class="columns is-mobile"
          :style="styleWinner(i, ant.color)"
        >
          <div class="column">
            {{ ant.name }}
          </div>
          <div class="column is-3">
            {{ displayPercentage(ant["Win Chance"]) }}
          </div>
          <div class="column is-2 has-text-centered">
            <div v-if="allAntsFinishedCalculating && i === 0">🏆</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "stats-summary",

  props: {
    ants: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapGetters(["allAntsFinishedCalculating"])
  },

  methods: {
    displayPercentage(n) {
      if (typeof n !== "number") {
        return `Not Yet Calculated`;
      }
      return `${(n * 100).toFixed(4)}%`;
    },
    styleWinner(i, color) {
      return i === 0
        ? {
            color: color,
            fontSize: "20px"
          }
        : {};
    }
  }
};
</script>
