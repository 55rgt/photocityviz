<template lang="pug">
  .mainView-option-container
    .mainView-clusterName K-means(10)
    .mainView-coordinate-container
      .mainView-coordinate-setter
        .mainView-coordinate
          .coordinate-state {{ `X: ${x} (${propX}%)` }}
          .coordinate-list-wrapper
            .coordinate-list
              .coordinate-item(v-for="n in 10" v-bind:class="{ selected: x === Object.keys(PCAData)[n-1] }" @click="selectCoordinate('x', n)") {{ Object.keys(PCAData)[n - 1]}}
        .mainView-coordinate
          .coordinate-state {{ `Y: ${y} (${propY}%)` }}
          .coordinate-list-wrapper
            .coordinate-list
              .coordinate-item(v-for="n in 10" v-bind:class="{ selected: y === Object.keys(PCAData)[n-1] }" @click="selectCoordinate('y', n)") {{ Object.keys(PCAData)[n - 1]}}
      .mainView-coordinate-result Total Proportion
        |
        | {{`(${sumProps})%`}}
    .mainView-controller-container
      .controller-ele-container
        .controller-radius-container
          .radius-title
          input.radius-input
        .controller-countries-container
      .controller-ele-container
</template>

<script>
import PCAProportion from '../../../public/data/PCA_proportion_10';
import _ from 'lodash';
import { mapActions } from 'vuex';
import { EventBus } from '../../utils/event-bus'

export default {
  name: 'MainView-Option',
  data() {
    return {
      PCAData: {},
      x: this.$store.getters.getX,
      y: this.$store.getters.getY,
      propX: null,
      propY: null,
    };
  },
  computed:{
    sumProps: function() {
      return Number.parseFloat((this.propX + this.propY).toFixed(3));
    }
  },
  mounted() {
    let that = this;
    that.PCAData = _.reduce(PCAProportion, (r, d) => {
      r[d['_row']] = Number.parseFloat((d['Proportion of Variance'] * 100).toFixed(3));
      return r;
    }, {});
    console.log(that.PCAData);
    that.propX = that.PCAData[that.x];
    that.propY = that.PCAData[that.y];
  },
  methods: {
    ...mapActions(['update']),
    async selectCoordinate(cor, n) {
      let that = this;
      let value = Object.keys(that.PCAData)[n - 1];
      if (value !== that.x && value !== that.y) {
        if (cor === 'x') {
          that.x = value;
          that.propX = that.PCAData[value];
          await that.$store.dispatch('updateFilterCondition', {key: 'x', value: that.x});
        } else {
          that.y = value;
          that.propY = that.PCAData[value];
          await that.$store.dispatch('updateFilterCondition', {key: 'y', value: that.y})
        }
        EventBus.$emit('updateRender');
      }

      // vueX 전달
      //

    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.mainView-option-container
  width: 100%
  height: $mainView-option-container-height
  display: flex

  .mainView-clusterName
    width: 180px
    height: 100%
    @include setHeightAndLineHeight($mainView-option-container-height)
    font-size: $unit-5
    text-align: center
  .mainView-coordinate-container
    width: 540px
    height: 100%
    display: flex
    .mainView-coordinate-setter
      width: 420px
      height: 100%
      .mainView-coordinate
        width: 100%
        height: 50%
        display: flex
        .coordinate-state
          width: 104px
          height: 100%
          line-height: 40px
          margin-right: $unit-1
        .coordinate-list-wrapper
          flex: 1
          padding: $unit-1 0
          .coordinate-list
            width: 100%
            height: 100%
            border: 1px solid #aaaaaa
            display: flex
            .coordinate-item
              flex: 1
              line-height: 32px
              border-radius: $unit-1
              text-align: center
    .mainView-coordinate-result
      width: calc(100% - 400px)
      height: 100%
      text-align: center
      text-wrap: normal
      line-height: 40px
  .mainView-controller-container
    width: calc(100% - 720px)
    height: 100%
    .controller-ele-container
      width: 100%
      height: 50%
      padding: $unit-1 0
      display: flex
      .controller-radius-container
        width: 100px
        height: 100%
        display: flex
        border: 1px solid black
      .controller-countries-container
        width: calc(100% - 100px)
        height: 100%
        border: 1px solid black

.selected
  background: black
  color: white
</style>
