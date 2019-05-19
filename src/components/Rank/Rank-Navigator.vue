<template lang="pug">
  .clusterRanking-navigator-container
    .component-header Navigator
    .component-body
      RankNumber(v-bind:minCluster="rankFilter.min", v-bind:maxCluster="rankFilter.max")
      RankSort(v-bind:sortName="rankFilter.sortByName", v-bind:sortSeq="rankFilter.sortBySequence")
      RankMethod(v-bind:methods="rankFilter.methods")


</template>

<script>
import RankNumber from './Rank-Number';
import RankSort from './Rank-Sort';
import RankMethod from './Rank-Method';
import {EventBus} from '../../utils/event-bus';
export default {
  name: 'Rank-Navigator',
  components: { RankMethod, RankSort, RankNumber },
  data() {
    return {
      rankFilter: {}
    }
  },
  created() {
    let that = this;
    that.rankFilter = {
      min: 6,
      max: 18,
      sortByName: ['name'],
      sortBySequence: ['asc'],
      methods: ['Kmeans', 'DBSCAN']
    };

    EventBus.$on('updateRankFilter', (key, value) => that.updateRankFilter(key, value));
  },
  mounted() {
    let that = this;

  },
  methods: {
    updateRankFilter(key, value) {
      let that = this;
      console.log('update rank filter');

      switch (key) {
        case 'min':
          that.rankFilter['min'] = Number.parseInt(value);
          break;
        case 'max':
          that.rankFilter['max'] = Number.parseInt(value);
          break;
        case 'sortByName':
          break;
        case 'sortBySequence':
          break;
        case 'methods':
          break;
        default: console.error('Undefined key interrupt');
      }

      // 그리는 애한테 에밋
      console.log(that.rankFilter);

    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.clusterRanking-navigator-container
  width: $clusterRanking-navigator-container-width
  height: 100%
  margin-right: $clusterRanking-margin-right
  padding-bottom: $unit-3
  /deep/ .rank-container
    width: 100%
    @include setFonts('Roboto', $md-dark-text-primary, $unit-4)
    display: flex
    padding: 0 0 0 $unit-5

</style>
