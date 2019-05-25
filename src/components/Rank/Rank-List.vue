<template lang="pug">
  .clusterRanking-list-container
    RankItem(v-for="n in modelList.length", v-bind:modelData="modelList[n-1]")

</template>

<script>
import modelScore from '../../../public/data/ModelScore';
import RankItem from './Rank-Item';
export default {
  name: 'Rank-List',
  components: { RankItem },
  data() {
    return {
      modelList: modelScore
    }
  },
  created() {
  },
  methods: {

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
