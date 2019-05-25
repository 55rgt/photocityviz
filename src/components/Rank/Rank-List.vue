<template lang="pug">
  .clusterRanking-list-container
    RankItem(v-for="n in modelList.length", v-bind:modelData="modelList[n-1]")

</template>

<script>
import modelScore from '../../../public/data/ModelScore';
import RankItem from './Rank-Item';
import _ from 'lodash';
import {EventBus} from '../../utils/event-bus';
export default {
  name: 'Rank-List',
  components: { RankItem },
  data() {
    return {
      modelList: modelScore
    }
  },
  created() {
    let that = this;
    EventBus.$on('updateRankList', filter => that.updateRankList(filter));
  },
  methods: {
    updateRankList(filter) {
      let that = this;
      // min max
      that.modelList = _.orderBy(that.modelList, [filter.sortByName], [filter.sortBySequence]);
      // console.log(that.modelList);
      // console.log('c');
      // 중복, 필터가 적용이 안됨
    },
  },

};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.clusterRanking-list-container
  width: $clusterRanking-list-container-width
  height: 100%
  margin-right: $clusterRanking-margin-right
  overflow-x: scroll
  display: flex
  flex-wrap: wrap

.bad

</style>
