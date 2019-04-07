<template lang="pug">
  .nav-body
    .nav-time-manual-controller
    .nav-time-svg-container#chart
    .nav-countries-menu-container
</template>

<script>
/* eslint-disable no-console */

import { EventBus } from '../utils/event-bus';
import * as d3 from 'd3';

export default {
  name: 'NavTimeComponent',
  data() {
    return {
    };
  },
  mounted() {

  },
  created() {
    EventBus.$on('update', () => console.log('update Time!'));
  },
  methods: {

  }
};
</script>

<style scoped lang="sass">

.nav-time-manual-controller
  width: 100%
  height: 60px

.nav-time-svg-container
  width: 100%
  height: 320px
  border: 1px solid black

.nav-countries-menu-container
  width: 100%
  height: 60px


</style>
