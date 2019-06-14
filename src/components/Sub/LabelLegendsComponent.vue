<template lang="pug">
  .legends-container
    LabelLegendComponent(v-for="n in length" :id="'legend_' + n" :index="n") // 나중에 바꿔야 함.
</template>

<script>
import LabelLegendComponent from './LabelLegendComponent';
export default {
  name: 'LabelLegendsComponent',
  components: { LabelLegendComponent },
  data() {
    return {
      length: this.$store.getters.getSelectedClusterLength
    }
  },
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.legends-container
  width: calc(100% - 324px)
  height: 100%
  padding: $unit-1 0 $unit-1 $unit-2
  display: flex
  flex-wrap: wrap
  overflow-y: scroll
  font-weight: 500
  @include setFonts('Roboto', #686868, $unit-2, 'sans-serif')
.legends-container::-webkit-scrollbar
  display: none
  width: 0
  background: transparent
</style>
