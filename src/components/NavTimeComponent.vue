<template lang="pug">
  .nav-body
    .nav-time-wrapper
      .nav-time-container
        .nav-time Start
        input.nav-time-input(v-model="hrStart")
        .nav-time End
        input.nav-time-input(v-model="hrEnd")
</template>

<script>
/* eslint-disable no-console */
import _ from 'lodash';
import { mapActions } from 'vuex';
import * as d3 from 'd3';
import { EventBus } from '../utils/event-bus'

// time 지날 때 progress circle 띄우는 메서드

export default {
  name: 'NavTimeComponent',
  data() {
    return {
      svg: null,
      data: null,
      hrStart: this.$store.getters.getHrStart,
      hrEnd: this.$store.getters.getHrEnd,
      dtStart: this.$store.getters.getDtStart,
      dtEnd: this.$store.getters.getDtEnd,
    };
  },
  async mounted() {
    let that = this;
    that.svg = d3.select('.nav-svg')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .append('g');
    that.data = this.$store.getters.getHourComponentData;
    console.log(that.data);
    // data로 그림을 그리면 됩니다.
    // initial 값으로 max 찾아서 바 최고 높이 정하기
    // data가 바뀌면 그림이 달라지는지?
    // 각 컴포넌트에서 input 값이 바뀌면 얘들을 다른 컴포넌트에 알려 줘야 한다.
  },
  watch: {
    hrStart: _.debounce(function () {
      this.$store.dispatch('update', { key: 'hrStart', value: Number.parseInt(this.hrStart), type: 'Hour' });
      this.data = this.$store.getters.getHourComponentData;
      console.log(this.data);
      EventBus.$emit('update');
    }, 1000),
    hrEnd: _.debounce(function () {
      this.$store.dispatch('update', { key: 'hrEnd', value: Number.parseInt(this.hrEnd), type: 'Hour' });
      this.data = this.$store.getters.getHourComponentData;
      console.log(this.data);
    }, 1000),
    dtStart: _.debounce(function () {
      // Hour => Date 바꾸기
      this.$store.dispatch('update', { key: 'dtStart', value: this.dtStart, type: 'Hour' });
      this.data = this.$store.getters.getDateComponentData;
      console.log(this.data);
    }, 1000),
    dtEnd: _.debounce(function () {
      // Hour => Date 바꾸기
      this.$store.dispatch('update', { key: 'dtEnd', value: this.dtEnd, type: 'Hour' });
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
@import "../style/_colors.sass"
@import "../style/sizes2"
@import url('https://fonts.googleapis.com/css?family=Roboto')

.nav-body
  width: 100%
  padding: $unit-middle $unit-largest !important
  .nav-time-wrapper
    width: 100%
    height: auto
    background: #606060
    color: #ffffff
    border-radius: 4px
    .nav-time-container
      width: 100%
      height: 36px
      display: flex
      padding: 0 $unit-middle
      font-family: 'Roboto', sans-serif
      .nav-time
        width: auto
        height: 100%
        line-height: 36px
        margin-right: 12px
        font-size: $font-size-fourth
      .nav-time-input
        width: 60px
        height: 100%
        margin-right: 6px
        font-size: $font-size-fourth
        outline: none
.nav-svg
  width: 100%
  height: 300px
  border: 1px solid black

.d


</style>
