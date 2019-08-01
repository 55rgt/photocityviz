<template lang="pug">
  .labels-container
    .component-header Distribution
    .component-body
      .label-list-container
        SunburstComponent
        LabelComponent(v-for="n in 1" :id="'labelDist_' + n" :index="n") // 나중에 바꿔야 함.
        LabelLegendsComponent
</template>

<script>
import LabelComponent from './LabelComponent';
import LabelLegendsComponent from './LabelLegendsComponent';
import SunburstComponent from './SunburstComponent';
export default {
  name: 'LabelsComponent',
  components: { SunburstComponent, LabelLegendsComponent, LabelComponent },
  data() {
    return {
      length: this.$store.getters.getSelectedClusterLength
    }
  },
  created() {
    let that = this;
  },
  methods: {
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"
.labels-container
  width: 100%
  height: $labels-container-height
  background: $md-white
  @include box_shadow
  margin-bottom: $unit-2
  .component-body
    .label-list-container
      width: 100%
      height: 100%
      padding-bottom: $unit-3
      display: flex
      flex-wrap: wrap
</style>
