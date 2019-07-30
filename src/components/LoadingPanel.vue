<template>
  <div class="columns">
    <div class="column">
      <div class="ant-panel-container">
        <div class="title is-4 has-text-centered">Fetching Racer Data</div>
        <div class="ant-panel" ref="loading-panel">
          <img
            v-for="n in 10"
            :key="n"
            src="@/assets/img/ant.png"
            class="ant"
            ref="ant"
            alt="a black ant"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading-panel"
};
</script>

<style lang="scss" scoped>
$n-ants: 10;

.ant {
  position: absolute;
  left: 0;
  top: 40%;
  height: 25px;
  width: 25px;
  transform: rotate(90deg);

  @for $i from 0 to $n-ants {
    &:nth-of-type(#{$i + 1}) {
      top: 25px * $i;
      animation: skitter
        #{1000 +
        random(500)}ms
        ease-in
        infinite
        $i *
        random(100) +
        ms;
    }
  }
}

.ant-panel-container {
  position: relative;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    opacity: 0.5;
  }
}

.ant-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

@keyframes skitter {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}
</style>
