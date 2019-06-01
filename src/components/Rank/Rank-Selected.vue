<template lang="pug">
  .clusterRanking-selected-container#test
    .navigator-header Selected Cluster Information
    .navigator-selected [ k-means_12 ]
    .navigator-content
      .navigator-cluster-container
        .navigator-cluster-title Cluster Dist:
        .navigator-cluster-content-wrapper
          .navigator-cluster-content
            svg(width="100%", height="100%")#nav-cluster
              rect(:width="datum.width", height="100%", :x="datum.x", :fill="color[index + 1]")(v-for="(datum, index) in s").b
      .navigator-cluster-container
        .navigator-cluster-title Number of Clusters: 12
      .navigator-cluster-container
        .navigator-cluster-title Rank Info: Average #1, Calinski #2, Silhouette #1
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Rank-Selected',
  data() {
    return {
      svg: null,
      color: this.$store.getters.getColors,
      s: [ { cluster: 1, width: 29.01087207957437, x: 0 },
        { cluster: 2, width: 13.678001387925052, x: 29.01087207957437 },
        { cluster: 3, width: 21.192458940550544, x: 42.68887346749942 },
        { cluster: 4,
          width: 17.241036317372195,
          x: 63.881332408049964 },
        { cluster: 5, width: 100.79504973398103, x: 81.12236872542216 },
        { cluster: 6, width: 8.257460097154754, x: 181.9174184594032 },
        { cluster: 7,
          width: 23.201943095072867,
          x: 190.17487855655796 },
        { cluster: 8, width: 13.99884339578996, x: 213.37682165163082 },
        { cluster: 9, width: 23.21882951653944, x: 227.37566504742077 },
        { cluster: 10, width: 8.780939162618552, x: 250.5944945639602 },
        { cluster: 11,
          width: 13.407818644459866,
          x: 259.37543372657876 },
        { cluster: '12',
          width: 19.216747628961368,
          x: 272.78325237103866 } ]
    };
  },
  mounted() {
    let that = this;
    console.log(that.color);
    // that.svg = d3.select('#test')
    //     .append('svg')
    //     .attr('width', 240)
    //     .attr('height', 300);
  },
  methods: {
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.clusterRanking-selected-container
  width: calc(100% - #{$clusterRanking-margin-right} - #{$clusterRanking-list-container-width})
  height: 100%
  border-left: 8px solid #dcdcdc
  padding: 0 $unit-3
  position: relative
  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)
    margin-bottom: 6px
  .navigator-selected
    position: absolute
    right: $unit-6
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    top: 10px
  .navigator-content
    width: 100%
    height: calc(100% - 40px)
    .navigator-cluster-container
      width: 100%
      height: 36px
      padding: 0 $unit-3
      display: flex
      @include setFonts('Roboto', #686868, $unit-4)
      .navigator-cluster-title
        font-weight: 500
        line-height: 36px
        margin-right: 18px
      .navigator-cluster-content-wrapper
        flex: 1
        padding: 10px 0
        .navigator-cluster-content
          width: 100%
          height: 100%
.b
  border: 1px solid black
</style>
