<template lang="pug">
  .navigator-hexagon-container
    .navigator-header Highlighted Hexagons
    .navigator-photos-list(@click="getImages()")
      .navigator-photo(v-for="datum in data" :style='{backgroundImage: "url(" + datum.url + ")", border: "2px solid" + colors[datum.cluster]}')
</template>

<script>
import M from '../../../public/data/mexico'
import T from '../../../public/data/taiwan'
export default {
  name: 'Navigator-Hexagon',
  data() {
    return {
      colors: this.$store.getters.getColors,
      data: null,
    }
  },
  methods: {

  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.navigator-hexagon-container
  width: 100%
  height: $navigator-hexagon-container-height
  padding: 0 $unit-3 16px
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)
  .navigator-photos-list
    width: 100%
    height: calc(100% - 40px)
    display: flex
    flex-wrap: wrap
    .navigator-photo
      width: 70px
      height: 71px
      box-sizing: content-box
      background-repeat: no-repeat
      opacity: 0.88
      background-size: cover
      border-radius: 4px
.bg

</style>
