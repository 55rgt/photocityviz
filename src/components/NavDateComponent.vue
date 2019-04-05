<template lang="pug">
  .nav-body
    .nav-obsolete
      .nav-container
        .nav-time Start
        input.nav-time-input(v-model="hrStart")
        .nav-time End
        input.nav-time-input(v-model="hrEnd")
      .nav-container
        .nav-date Start
        input.nav-date-input(type="date" v-model="dtStart")
        .nav-date End
        input.nav-date-input(type='date' v-model="dtEnd")


  // 1. 시간 2. 날짜 3. 도시 4. 색상 5. 카테고리
</template>

<script>
/* eslint-disable no-console */

import _ from 'lodash';
import {mapActions} from 'vuex';

export default {
  name: 'NavDateComponent',
  data() {
    return {
      hrStart: this.$store.getters.getHrStart,
      hrEnd: this.$store.getters.getHrEnd,
      dtStart: this.$store.getters.getDtStart,
      dtEnd: this.$store.getters.getDtEnd
    }
  },
  watch: {
    hrStart: _.debounce(async function () {
      await this.$store.dispatch('updateFilterOption', {hrStart: this.hrStart});
    }, 1000),
    hrEnd: _.debounce(async function () {
      await this.$store.dispatch('updateFilterOption', {hrEnd: this.hrEnd});
    }, 1000),
    dtStart: _.debounce(async function () {
      await this.$store.dispatch('updateFilterOption', {dtStart: this.dtStart});
    }, 1000),
    dtEnd: _.debounce(async function () {
      await this.$store.dispatch('updateFilterOption', {dtEnd: this.dtEnd});
    }, 1000),
  },
  methods: {
    ...mapActions([
        'updateFilterOption'
    ])
    // _.debounce(function () {
    //   this.addKeyword();
    // }, 100),
  }
};
</script>

<style scoped lang="sass">

.nav-obsolete
  width: 100%
  height: auto
  .nav-container
    width: 100%
    height: 36px
    display: flex
    .nav-time
      width: auto
      height: 100%
      line-height: 36px
      margin-right: 12px
    .nav-time-input
      width: 60px
      height: 100%
      margin-right: 6px
    .nav-date
      width: auto
      height: 100%
      line-height: 36px
      margin-right: 6px
    .nav-date-input
      width: 132px
      height: 100%
      font-size: 10px
.d


</style>
