<template>
  <div class="card" :style="{ boxShadow: `2px 2px 10px -5px ${ant.color}` }">
    <div class="card_header columns">
      <div class="column">
        <div class="title is-5">{{ ant.name }}</div>
      </div>
    </div>
    <div class="card_content">
      <div
        v-for="(stat, i) in displayStats"
        :key="i"
        class="ant-stat columns"
        :class="{ shadow: i % 2 === 0 }"
      >
        <div class="ant-stat_label column is-4 has-text-weight-bold">
          {{ capitalizeFirstLetter(stat) }}:
        </div>
        <div class="ant-stat_value column is-8">
          {{ ant[stat] }}
        </div>
      </div>
    </div>
    <div class="ant-card_footer">
      <WinChanceButton :ant="ant" />
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "@/lib/utils";
import WinChanceButton from "@/components/stats/WinChanceButton";

export default {
  name: "ant-card",

  props: {
    ant: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    WinChanceButton
  },

  computed: {
    // we don't want to display the name or id
    // in the main body of the card
    displayStats() {
      return Object.keys(this.ant).filter(key => !["name", "id"].includes(key));
    }
  },

  methods: {
    capitalizeFirstLetter
  }
};
</script>

<style lang="scss" scoped>
.ant-stat {
  display: flex;
  flex-direction: row;

  &:nth-of-type(2n) {
    background: $alt-row-color;
  }
}
</style>
