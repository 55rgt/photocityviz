<template lang="pug">
  .gallery-container
    .component-header Gallery
    .component-body
      .gallery-item-list
        .gallery-item-wrapper(v-for="datum in galleryData")
          .gallery-item(:style='{backgroundImage: "url(" + datum.url + ")", border: "2px solid" + colors[datum.cluster]}')
            .gallery-country(:style='{backgroundImage: "url(" + getURL(datum) + ")", border: "1px solid #000000"}')
</template>

<script>
import { EventBus } from '../../utils/event-bus';
import _ from 'lodash';

export default {
  name: 'GalleryComponent',
  data() {
    return {
      colors: this.$store.getters.getColors,
      galleryData: [],
      flags: this.$store.getters.getCountryFlags
    };
  },
  created() {
    let that = this;
    EventBus.$on('initClusterComponent', () => {
      that.galleryData = []
    });
    EventBus.$on('updateClusterComponent', () => {
      that.galleryData = [];
      that.get()
    });
    EventBus.$on('apply', () => that.galleryData = []);
  },
  methods: {
    async get() {
      let that = this;
      that.galleryData = await that.$store.dispatch('getGalleryData', 0);
    },
    getURL(datum) {
      return _.find(this.flags, f => f.name === datum.country).url;
    },
  },
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.gallery-container
  width: 100%
  height: calc(100% - 288px)
  .component-body
    .gallery-item-list
      width: 100%
      height: 100%
      display: flex
      flex-wrap: wrap
      padding-bottom: $unit-3
      overflow: scroll
      .gallery-item-wrapper
        width: 139px
        height: 137px
        padding: 2px 2px 4px 2px
        .gallery-item
          width: 100%
          height: 100%
          box-sizing: border-box
          -webkit-box-sizing: border-box
          background-repeat: no-repeat
          opacity: 0.8
          background-size: cover
          border-radius: 4px
          position: relative
          transition: opacity 0.2s
          cursor: pointer
          &:hover
            opacity: 1
          .gallery-country
            width: 40px
            height: 24px
            position: absolute
            bottom: 8px
            right: 8px
            opacity:
            background-repeat: no-repeat
            background-size: cover
            border-radius: 4px
            box-sizing: content-box
    .gallery-item-list::-webkit-scrollbar
      display: none
      width: 0
      background: transparent
.b


</style>
