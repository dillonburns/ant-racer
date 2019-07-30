<template>
  <div>
    <div class="title">Competing Ants Stats</div>
    <div class="subtitle">
      Calculate competing ants win percentrages for the upcoming race
    </div>

    <div v-if="ants.length === 0 || showOffLoadingAnimation">
      <div v-for="n in 5" :key="n" class="columns is-hidden-mobile">
        <!-- responsive spacer using bulma-->
        <div class="column" />
      </div>
      <LoadingPanel />
    </div>

    <div v-else class="stats">
      <div class="stats_header columns">
        <div class="stats_controls column  has-text-right ">
          <a
            class="button"
            @click="selectDisplayMode(0)"
            :disabled="isSelected(0)"
            ><span class="is-hidden-mobile">List View </span> &#9776;</a
          >
          <a
            class="button"
            @click="selectDisplayMode(1)"
            :disabled="isSelected(1)"
            ><span class="is-hidden-mobile">Card View </span> &#9871;</a
          >
          <a
            class="button"
            @click="selectDisplayMode(-1)"
            :disabled="isSelected(-1)"
            ><span class="is-hidden-mobile">Hide </span> &#128065;</a
          >
        </div>
      </div>

      <div class="stats_view">
        <component :is="statsViewComponent" :ants="getSortedAntsData" />
      </div>

      <hr />

      <div class="stats_footer">
        <div class="columns">
          <div class="column is-5-desktop">
            <StatsSummary :ants="getSortedAntsData" />
          </div>
          <div class="column is-6 is-offset-1-desktop">
            <div class="has-text-right">
              <WinChanceButtonAll :ants="ants" />
            </div>
            <div v-if="allAntsFinishedCalculating">
              <article class="post-test-message message">
                <div class="message-body">
                  <span
                    class="has-text-weight-bold"
                    v-html="getSortedAntsData[0].name"
                  />
                  looks like a winner. Log back in tomorrow to calculate win
                  percentages for the next race
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import LoadingPanel from "@/components/LoadingPanel";
import StatsSummary from "@/components/stats/StatsSummary";
import AntsCardView from "@/components/stats/card/AntsCardView";
import AntsListView from "@/components/stats/list/AntsListView";
import WinChanceButtonAll from "@/components/stats/WinChanceButtonAll";

export default {
  name: "stats",

  components: {
    AntsCardView,
    AntsListView,
    StatsSummary,
    LoadingPanel,
    WinChanceButtonAll
  },

  computed: {
    ...mapState(["ants"]),
    ...mapGetters(["getSortedAntsData", "allAntsFinishedCalculating"]),

    statsViewComponent() {
      return this.displayOptions[this.selectedDisplayMode];
    }
  },

  data() {
    return {
      displayOptions: [AntsListView, AntsCardView],
      selectedDisplayMode: 0,
      showOffLoadingAnimation: true
    };
  },

  mounted() {
    // :P
    setTimeout(() => {
      this.showOffLoadingAnimation = false;
    }, 1000);
  },

  methods: {
    selectDisplayMode(n) {
      this.selectedDisplayMode = n;
    },

    isSelected(n) {
      return this.selectedDisplayMode === n;
    }
  }
};
</script>

<style scoped lang="scss">
.stats_controls {
  .button {
    margin-left: 15px;

    span {
      margin-right: 5px;
    }

    &:first-of-type {
      margin-left: 0;
    }
  }
}

.post-test-message {
  margin-top: 15px;
}

.stats_footer {
  margin-top: 30px;
}
</style>
