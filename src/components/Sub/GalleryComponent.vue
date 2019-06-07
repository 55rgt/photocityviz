<template lang="pug">
  .gallery-container
    .component-header Gallery
    .component-body
      .gallery-item-list
        .gallery-item(v-for="datum in galleryData" :style='{backgroundImage: "url(" + datum.url + ")", border: "2px solid" + colors[datum.cluster]}')
          .test {{ datum }}
</template>

<script>
import { EventBus } from '../../utils/event-bus';

export default {
  name: 'GalleryComponent',
  data() {
    return {
      colors: this.$store.getters.getColors,
      galleryData: [] // {url: , cluster: }
    };
  },
  created() {
    let that = this;
    EventBus.$on('updateClusterComponent', () => that.get());
  },
  methods: {
    async get() {
      let that = this;
      that.galleryData = await that.$store.dispatch('getGalleryData', 0);
    }

  },
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.gallery-container
  width: $gallery-container-width
  height: 100%

  .component-body
    .gallery-item-list
      width: 100%
      height: 100%
      display: flex
      flex-wrap: wrap
      padding-bottom: $unit-3
      .gallery-item
        width: 139px
        height: 139px
        box-sizing: border-box
        -webkit-box-sizing: border-box
        background-repeat: no-repeat
        opacity: 0.88
        background-size: cover
        border-radius: 4px
.b


</style>
