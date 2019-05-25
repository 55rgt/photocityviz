<template lang="pug">
  .clusterRanking-navigator-container
    .component-body
      RankNumber(v-bind:minCluster="rankFilter.min", v-bind:maxCluster="rankFilter.max")
      RankSort(v-bind:sortName="rankFilter.sortByName", v-bind:sortSeq="rankFilter.sortBySequence")

</template>

<script>
import RankNumber from './Rank-Number';
import RankSort from './Rank-Sort';
import {EventBus} from '../../utils/event-bus';
export default {
  name: 'Rank-Navigator',
  components: {RankSort, RankNumber },
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
      sortByName: 'name',
      sortBySequence: 'asc'
    };

    EventBus.$on('updateRankFilter', (key, value) => that.updateRankFilter(key, value));
  },
  mounted() {

  },
  methods: {
    updateRankFilter(key, value) {
      let that = this;
      switch (key) {
        case 'min': that.rankFilter['min'] = Number.parseInt(value);
          break;
        case 'max': that.rankFilter['max'] = Number.parseInt(value);
          break;
        case 'sortByName': that.rankFilter['sortByName'] = value;
          break;
        case 'sortBySequence': that.rankFilter['sortBySequence'] = value;
          break;
        case 'methods':
          break;
        default: console.error('Undefined key interrupt');
      }

      console.log('render');

      EventBus.$emit('updateRankList', that.rankFilter);


      // 그리는 애한테 에밋
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
    padding: 0 0 0 $unit-3

</style>
