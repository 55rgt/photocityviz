<template lang="pug">
  .summary-container
    .component-header Summary
    .component-body
      .summary-item Number of data:
      .summary-item Selected Clusters:
      .summary-item-2 Countries:
      .summary-item Top Colors:
      .summary-item-2 Top Hashtags:
</template>

<script>
import { EventBus } from '../../utils/event-bus';
export default {
  name: 'SummaryComponent',
  data() {
    return {
      summaryData: {
        'number': '',
        'selected': [],
        'countries': [],
        'colors': [],
        'hashtags': []
      }
    }
  },
  created() {
    let that = this;
    EventBus.$on('updateClusterComponent', () => that.update());

  },
  methods: {
    update() {

    }

  }

};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.summary-container
  flex: 1
  .component-body
    padding: 0 0 $unit-3 $unit-3
    .summary-item
      width: 100%
      height: 40px
      box-sizing: border-box
      border: 1px solid black
      padding-left: $unit-2
      font-weight: 500
      line-height: 40px
      @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')
    .summary-item-2
      width: 100%
      height: 80px
      box-sizing: border-box
      border: 1px solid black
      padding-left: $unit-2
      font-weight: 500
      line-height: 80px
      @include setFonts('Roboto', #686868, $unit-3, 'sans-serif')

</style>
