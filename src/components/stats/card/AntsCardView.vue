<template>
  <div class="container-fluid">
    <transition-group class="columns is-multiline" name="cards" tag="div">
      <div v-for="ant in ants" :key="ant.id" class="column is-narrow">
        <AntCard :ant="ant" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import AntCard from "@/components/stats/card/AntCard";

export default {
  name: "ants-card-view",

  components: {
    AntCard
  },

  props: {
    ants: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.cards-move {
  transition: transform 1s $list-anim-timing;
}
</style>
