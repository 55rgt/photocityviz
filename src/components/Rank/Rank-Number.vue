<template lang="pug">
  .rank-container.cluster-number-container
    .cluster-number-div
      .cluster-number-description min clusters
      input.cluster-number-input(v-model="min" v-on:keyup="triggerChangeNumber('min')")
    .cluster-number-div
      .cluster-number-description max clusters
      input.cluster-number-input(v-model="max")
</template>


<script>
import _ from 'lodash';
import { EventBus } from '../../utils/event-bus';

const DEBOUNCE = 1000;
export default {
  name: 'Rank-Number',
  props: {
    minCluster: Number,
    maxCluster: Number
  },
  watch: {

  },
  computed: {},
  data() {
    return {

    };
  },
  created() {
    let that = this;
    that.min = that.minCluster;
    that.max = that.maxCluster;

  },
  mounted() {
  },
  methods: {
    triggerChangeNumber(type) {
      let that = this;
      console.log(type);
      _.debounce(function () {
        that.changeNumber(type);
      }, DEBOUNCE);
    },
    changeNumber(type) {
      let that = this;
      console.log(that.min);
      // 만약 지금 바

      // type 별로 min or max의 값 바꾸고

    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.cluster-number-container
  @include setHeightAndLineHeight(40px)

  .cluster-number-div
    width: 50%
    height: 100%
    display: flex

    .cluster-number-description
      width: auto
      height: 100%
      margin-right: $unit-3

    .cluster-number-input
      width: 20px
      height: 100%
</style>
