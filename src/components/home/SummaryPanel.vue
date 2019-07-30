<template>
  <div class="card">
    <div class="card_header columns">
      <div class="column">
        <div class="title is-5">Ants Competing Today</div>
      </div>
    </div>
    <div class="card_content">
      <LoadingPanel v-if="ants.length === 0" />
      <div v-else>
        <div v-for="(ant, i) in ants" :key="i">
          <div class="columns">
            <div class="column">{{ ant.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoadingPanel from "@/components/LoadingPanel";

export default {
  name: "summary-panel",

  components: {
    LoadingPanel
  },

  computed: {
    ...mapState(["ants"])
  }
};
</script>
