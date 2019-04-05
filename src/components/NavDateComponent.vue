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
    .nav-svg
  // 1. 시간 2. 날짜 3. 도시 4. 색상 5. 카테고리
</template>

<script>
/* eslint-disable no-console */
import _ from 'lodash';
import { mapActions } from 'vuex';
import * as d3 from 'd3';

export default {
  name: 'NavDateComponent',
  data() {
    return {
      svg: null,
      data: null,
      hrStart: this.$store.getters.getHrStart,
      hrEnd: this.$store.getters.getHrEnd,
      dtStart: this.$store.getters.getDtStart,
      dtEnd: this.$store.getters.getDtEnd
    };
  },
  async mounted() {
    let that = this;
    that.svg = d3.select('.nav-body')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '300px')
        .append('g');
    that.data = this.$store.getters.getHourComponentData;
    console.log(that.data);
    // data로 그림을 그리면 됩니다.
    // data가 바뀌면 그림이 달라지는지?
  },
  watch: {
    hrStart: _.debounce(function () {
      this.$store.dispatch('update', { key: 'hrStart', value: Number.parseInt(this.hrStart), type: 'Hour' });
      this.data = this.$store.getters.getHourComponentData;
      console.log(this.data);
    }, 1000),
    hrEnd: _.debounce(function () {
      this.$store.dispatch('update', { key: 'hrEnd', value: Number.parseInt(this.hrEnd), type: 'Hour' });
      this.data = this.$store.getters.getHourComponentData;
      console.log(this.data);
    }, 1000),
    dtStart: _.debounce(function () {
      this.$store.dispatch('update', { key: 'dtStart', value: this.dtStart, type: 'Date' });
      this.data = this.$store.getters.getDateComponentData;
      console.log(this.data);
    }, 1000),
    dtEnd: _.debounce(function () {
      this.$store.dispatch('update', { key: 'dtEnd', value: this.dtEnd, type: 'Date' });
      this.data = this.$store.getters.getDateComponentData;
      console.log(this.data);
    }, 1000),
  },
  methods: {
    ...mapActions(['update'])
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
