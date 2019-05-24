<template lang="pug">
  .rank-container.cluster-number-container
    .cluster-number-div
      .cluster-number-description Min Clusters:
      input.cluster-number-input(v-model="min" v-on:keyup="triggerChangeNumber('min')")
    .cluster-number-div
      .cluster-number-description Max Clusters:
      input.cluster-number-input(v-model="max" v-on:keyup="triggerChangeNumber('max')")
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
    changeNumber(type) {
      let that = this;
      // Todo: 숫자가 아닐 시, 이전 값으로 바꾸고, 그냥 return
      EventBus.$emit('updateRankFilter', type, type === 'min' ? that.min : that.max);
    },
    triggerChangeNumber: _.debounce(function (type) {
      this.changeNumber(type);
    }, DEBOUNCE),

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
