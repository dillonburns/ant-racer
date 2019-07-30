<template>
  <div class="container-fluid">
    <div class="welcome columns">
      <div class="column is-8">
        <div class="title is-3">Welcome to Ant Race Insider</div>
        <div class="subtitle is-5">
          The premeire ant racing statistics platform
        </div>
      </div>
      <div class="column is-4">
        <SummaryPanel />
      </div>
    </div>
  </div>
</template>

<script>
import SummaryPanel from "@/components/home/SummaryPanel";

export default {
  name: "home",

  components: {
    SummaryPanel
  }
};
</script>
