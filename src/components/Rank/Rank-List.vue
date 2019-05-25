<template lang="pug">
  .clusterRanking-list-container
    RankItem(v-for="n in modelList.length" v-bind:class="{ selectedRankItem: selectedRankItem === modelList[n-1].id }" v-bind:modelData="modelList[n-1]")

</template>

<script>
import modelScore from '../../../public/data/ModelScore';
import RankItem from './Rank-Item';
import { EventBus } from '../../utils/event-bus';
export default {
  name: 'Rank-List',
  components: { RankItem },
  data() {
    return {
      modelList: modelScore,
      selectedRankItem: null
    }
  },
  created() {
    let that =  this;
    EventBus.$on('selectRankItem', (id) => {
      that.selectedRankItem = id;
    })
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
.selectedRankItem
  border: 2px solid #8a6c34
  background: #fff3e3
  border-radius: 8px
  &:hover
    background: #ded2c2

</style>
