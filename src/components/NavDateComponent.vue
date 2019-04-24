<template lang="pug">
  .nav-element-date
    vc-date-picker(mode='range' v-model='dateRange' :min-date='new Date(2018, 2, 1)'
      :max-date='new Date(2019, 1, 28)' color="red" highlight="red" is-dark=true :input-debounce=debounceSec).nav-date-container
</template>
<script>
/* eslint-disable no-console */

import _ from 'lodash';
import { EventBus } from '../utils/event-bus';

export default {
  name: 'NavDateComponent',
  data() {
    return {
      debounceSec: 2000,
      dateRange: {
        start: new Date(2018, 2, 1), // March 1th, 2018
        end: new Date(2019, 1, 28)    // Feb 28th, 2019
      },
    };
  },
  mounted() {

  },
  created() {
    EventBus.$on('update', () => console.log('update Time!'));
  },
  watch: {
    dateRange: _.debounce(function () {
    }, 1000)
  },
  methods: {

  }
};
</script>

<style scoped lang="sass">
@import "../style/_colors.sass"
@import "../style/sizes2"
.nav-element-date
  width: 100%
  height: 54px
  padding: $unit-small $unit-largest
  border: 1px solid #ffffff
  border-radius: 8px
  .nav-date-container
    width: 100%
    height: 100%
    font-size: 16px
    /deep/ input
      text-align: center
      width: 100%
      height: 100%
      background: #606060
      color: #ffffff
      border-radius: 4px
      outline: none

</style>
