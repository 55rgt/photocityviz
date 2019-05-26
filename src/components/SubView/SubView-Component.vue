<template lang="pug">
  .subView-container.box-shadow
    .subView-header Filtered Information
    .subView-summary-container s
    .subView-discover-container
      .subView-discover-navigator-container
        .subView-discover-selector-container
          .subView-selector-header Select
          .subView-selector-list-wrapper
            .subView-selector-list
              .subView-selector-item(v-for="image in images" :style="'background-image: url(' + image.url + ')'")
        .subView-discover-label-container.b
      .subView-discover-content-container
        .subView-discover-header-container.b
        .subView-discover-photo-wrapper
          .subView-discover-photo-container.b
          .subView-discover-photo-container.b
      .subView-discover-content-container
        .subView-discover-header-container.b
        .subView-discover-photo-wrapper
          .subView-discover-photo-container.b
          .subView-discover-photo-container.b
</template>

<script>
import { EventBus } from '../../utils/event-bus';
import Egypt from '../../assets/flag/Egypt.png';
import Macao from '../../assets/flag/Macao.png';
import Mexico from '../../assets/flag/Mexico.png';
import Peru from '../../assets/flag/Peru.png';
import Spain from '../../assets/flag/Spain.png';
import Taiwan from '../../assets/flag/Taiwan.png';

export default {
  name: 'SubView-Component',
  data() {
    return {
      filteredData: this.$store.getters.getFilteredData,
      images: [
        { url: Egypt, name: 'Egypt' },
        { url: Macao, name: 'Macao' },
        { url: Mexico, name: 'Mexico' },
        { url: Peru, name: 'Peru' },
        { url: Spain, name: 'Spain' },
        { url: Taiwan, name: 'Taiwan' },
      ],
    };
  },
  created() {
    let that = this;
    EventBus.$on('update', () => {
      that.update();
    });
  },
  methods: {
    update() {
      let that = this;
      that.makeDataForSubView();
    },
    makeDataForSubView(){
      let that = this;
      that.filteredData= that.$store.getters.getFilteredData;
      console.log(that.filteredData);
      /*

      <만들어야 할 데이터 형식>

      1. 위에서 쓸 것 - 각 국가 별 가장 많이 나온 단어 최대 10개
      []


      2. 아래에서 쓸 것
      [{
        "label": "landmark",
        "total": 694,
        "cluster": {
          "1": 445,
          "2": 140,
          "7": 109
        },
        ...
       ]
       3. 라벨과 국기 클릭하면, 사진 업로드


       */
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.subView-container
  width: calc(100% - #{$mainView-container-width} - #{$mainView-margin-right} - #{$navigator-container-width} - #{$mainView-margin-right})
  height: 100%
  background: $md-white
  .subView-header
    width: 100%
    @include setHeightAndLineHeight($subView-header-height)
    padding: 0 $unit-3
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
  .subView-summary-container
    width: 100%
    height: $subView-summary-container-height
    padding: 0 $unit-3
  .subView-discover-container
    width: 100%
    height: calc(100% - #{$subView-header-height} - #{$subView-summary-container-height})
    display: flex
    .subView-discover-navigator-container
      width: 200px
      height: 100%
      .subView-discover-selector-container
        width: 100%
        height: 104px
        .subView-selector-header
          width: 100%
          @include setHeightAndLineHeight(40px)
          @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
          padding: 0 $unit-3
        .subView-selector-list-wrapper
          width: 100%
          height: calc(100% - 40px)
          padding: 0 52px $unit-3 $unit-3
          .subView-selector-list
            display: flex
            flex-wrap: wrap
            .subView-selector-item
              width: calc(100% / 3)
              height: 24px
              border: 1px solid #919191
              border-radius: 4px
              background-repeat: no-repeat
              opacity: 0.3
              background-size: 100% 100%
      .subView-discover-label-container
        width: 100%
        height: calc(100% - 104px)
    .subView-discover-content-container
      flex: 1
      height: 100%
      .subView-discover-header-container
        width: 100%
        height: 104px
      .subView-discover-photo-wrapper
        width: 100%
        height: calc(100% - 104px)
        display: flex
        .subView-discover-photo-container
          flex: 1
.b
  border: 1px solid black

</style>
