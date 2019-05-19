<template lang="pug">
  .rank-container.cluster-sort-container
    .cluster-sort-description sortBy
    .cluster-sort-list-container
      .cluster-sort-item(v-for="n in 6" v-bind:class="{ selected: selectedName === itemList[n-1] }" @click="selectSortItem(n)") {{ `${itemList[n - 1]} ${itemList[n - 1] === selectedName ? selectedSeq === 'asc' ? '↑' : '↓' : ''}` }}
</template>

<script>
import { EventBus } from '../../utils/event-bus';
export default {
  name: 'Rank-Sort',
  props: {
    sortName: String,
    sortSeq: String,
  },
  data() {
    return {
      itemList: ['name', 'calinski', 'davis', 's_Dbw', 'SD', 'average'],
      selectedName: null,
      selectedSeq: null
    };
  },
  created() {
    let that = this;
    that.selectedName = that.sortName;
    that.selectedSeq = that.sortSeq;
  },
  methods: {
    selectSortItem(n) {
      let that = this;
      if (that.selectedName === that.itemList[n - 1]) {
        that.selectedSeq === 'asc' ? that.selectedSeq = 'desc' : that.selectedSeq = 'asc';
      } else {
        that.selectedName = that.itemList[n - 1];
        that.selectedSeq = 'asc';
      }
      EventBus.$emit('updateRankFilter', 'sortByName', that.selectedName);
      EventBus.$emit('updateRankFilter', 'sortBySequence', that.selectedSeq);
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.cluster-sort-container
  @include setHeightAndLineHeight(80px)

  .cluster-sort-description
    width: 80px
    height: 100%

  .cluster-sort-list-container
    flex: 1
    display: inline-flex
    flex-wrap: wrap
    padding: $unit-3 0

    .cluster-sort-item
      width: calc(100% / 3)
      @include setHeightAndLineHeight(28px)
      border-radius: 4px
      font-size: 12px
      text-align: center

.selected
  background: black
  color: white


</style>
