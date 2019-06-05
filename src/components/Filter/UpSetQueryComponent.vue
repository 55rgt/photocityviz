<template lang="pug">
  .upset-query-container
    .upset-query-header Query
    .upset-query-content
      UpSetQueryItemComponent(v-for="n in Object.keys(labelCount)" :labelDatum='getLabelDatum(n)')
</template>

<script>
import UpSetQueryItemComponent from './UpSetQueryItemComponent';
export default {
  name: 'UpSetQueryComponent',
  components: { UpSetQueryItemComponent },
  data() {
    return {
      labelCount: this.$store.getters.getLabelCount
    }
  },
  methods: {
    getLabelDatum(key) {
      let that = this;
      return {
        "key": key,
        "value": that.labelCount[key]
      }
    }
  },
  mounted() {
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.upset-query-container
  width: $upset-query-container-width
  height: 100%
  padding: 0 $unit-2 6px $unit-2
  .upset-query-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight($upset-query-header-height)
  .upset-query-content
    width: 100%
    height: 134px
    display: flex
    flex-wrap: wrap
    padding-left: 14px
    padding-top: 2px
</style>
