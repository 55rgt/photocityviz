<template lang="pug">
  .nav-query-item
    .nav-query-item-label {{ labelMap.key }}
    .nav-query-item-radio(v-for="state in query_state")
      div(v-if='state === selected')
        font-awesome-icon.nav-query-icon(:icon="['far', 'dot-circle']")
      div(v-else)
        font-awesome-icon.nav-query-icon(:icon="['far', 'circle']" @click="toggleQuery(state)")


</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDotCircle, faCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faDotCircle, faCircle);
export default {
  name: 'NavQueryItemComponent',
  components: {
    FontAwesomeIcon
  },
  props: {
    labelMap: Object,
    selectedState: String,
  },
  data() {
    return {
      query_state:['none', 'maybe', 'must', 'not'],
      selected: this.$props.selectedState,
      map: this.$props.labelMap
    };
  },
  mounted() {
  },
  methods: {
    async toggleQuery(state) {
      let that = this;
      that.selected = state;
      await that.$store.dispatch('updateLabelQuery', { key: that.map.key, value: state });
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.nav-query-item
  width: 100%
  height: 28px
  padding-left: $unit-3
  padding-right: 0
  display: flex
  font-weight: 500
  .nav-query-item-label
    width: 66px
    height: 100%
    line-height: 28px
    text-align: right
    padding-right: $unit-3
    @include setFonts('Roboto', #686868, $unit-2, 'sans-serif')
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
  .nav-query-item-radio
    width: 44px
    height: 100%
    line-height: 28px
    text-align: center
    @include setFonts('Roboto', #686868, $unit-2, 'sans-serif')
    .nav-query-icon
      cursor: pointer

</style>
