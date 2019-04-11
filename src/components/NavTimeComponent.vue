<template lang="pug">
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




</style>
