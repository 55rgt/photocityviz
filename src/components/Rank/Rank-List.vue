<template lang="pug">
  .clusterRanking-list-container(@click="dod")
    RankItem(v-for="n in modelList.length" v-bind:id=`modelList[n-1].id`, v-bind:modelData="modelList[n-1]")

</template>

<script>
import modelScore from '../../../public/data/ModelScore';
import RankItem from './Rank-Item';
import _ from 'lodash';
export default {
  name: 'Rank-List',
  components: { RankItem },
  data() {
    return {
      modelList: modelScore
    }
  },
  methods: {
    dod() {
      console.log('click');
      this.modelList = _.shuffle(this.modelList);
    }
  }

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
