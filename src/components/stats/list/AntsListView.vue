<template>
  <div class="db-table container-fluid">
    <div class="db-thead container-fluid is-hidden-mobile">
      <div class="db-row columns">
        <div class="column is-3">
          Name
        </div>
        <div class="column is-1">
          Weight
        </div>
        <div class="column is-1">
          Length
        </div>
        <div class="column is-1">
          Color
        </div>
        <div class="column is-2">
          Win Chance
        </div>
        <div class="column has-text-right-tablet">
          Actions
        </div>
      </div>
    </div>
    <div class="db-tbody container-fluid">
      <transition-group name="list-rows" tag="div">
        <div
          v-for="ant in ants"
          :key="ant.id"
          class="db-row columns is-mobile is-multiline"
        >
          <div class="db-thead column is-4-mobile is-hidden-tablet">
            Name
          </div>
          <div
            class="column is-3-tablet is-8-mobile has-text-weight-bold"
            :style="{ color: ant.color }"
          >
            {{ ant.name }}
          </div>
          <div class="db-thead column is-4-mobile is-hidden-tablet">
            Weight
          </div>
          <div class="column is-1-tablet is-8-mobile">
            {{ ant.weight }}
          </div>
          <div class="db-thead column is-4-mobile is-hidden-tablet">
            Length
          </div>
          <div class="column is-1-tablet is-8-mobile">
            {{ ant.length }}
          </div>
          <div class="db-thead column is-4-mobile is-hidden-tablet">
            Color
          </div>
          <div class="column is-1-tablet is-8-mobile">
            {{ ant.color }}
          </div>
          <div class="db-thead column is-4-mobile is-hidden-tablet">
            Win Chance
          </div>
          <div class="column is-2-tablet is-8-mobile">
            {{ ant["Win Chance"] }}
          </div>
          <div class="db-thead column is-4-mobile is-hidden-tablet">
            Actions
          </div>
          <div class="column is-4-tablet is-8-mobile has-text-right-tablet">
            <WinChanceButton :ant="ant" />
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import WinChanceButton from "@/components/stats/WinChanceButton";

export default {
  name: "ants-list-view",

  props: {
    ants: {
      type: Array,
      default: () => []
    }
  },

  components: {
    WinChanceButton
  }
};
</script>

<style lang="scss" scoped>
// I made this table component / style for
// another project  and am reusing it here.
// I think it's an elegant responsive solution
// for tabular data using bulma
.db-table {
  .db-thead,
  .db-tfoot {
    font-weight: bold;
  }

  .db-tfoot {
    margin-top: 25px;
  }

  .db-tbody {
    .db-row {
      &:nth-of-type(2n) {
        background: $alt-row-color;
      }

      &:last-of-type {
        border-bottom: 2px solid $border-color;
      }

      &:first-of-type {
        border-top: 2px solid $border-color;
      }
    }
  }

  .db-row {
    &:not(:last-of-type) {
      border-bottom: 1px solid $border-color;
      padding: 5px 0;
    }
  }

  .db-row > .columns {
    align-items: center;

    .column:first-of-type {
      padding-left: 25px;
    }
    .column:last-of-type {
      padding-right: 25px;
    }
  }
}

.list-rows-move {
  transition: transform 1s $list-anim-timing;
}
</style>
