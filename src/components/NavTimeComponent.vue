<template lang="pug">
  .nav-body
    .nav-time-manual-controller
    .nav-time-svg-container
    .nav-countries-menu-container
</template>

<script>
import { EventBus } from '../utils/event-bus'

export default {
  name: 'NavTimeComponent',
  created() {
    EventBus.$on("update", () => {
      console.log('update Time!')
    });
  }
};
</script>

<style scoped lang="sass">

.nav-time-manual-controller
  width: 100%
  height: 60px
  border: 1px solid black
.nav-time-svg-container
  width: 100%
  height: 120px
  border: 1px solid black
.nav-countries-menu-container
  width: 100%
  height: 60px
  border: 1px solid black


</style>
