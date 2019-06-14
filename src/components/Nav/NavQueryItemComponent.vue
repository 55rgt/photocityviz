<template lang="pug">
  .nav-query-item-container
    .query-bigHeader
      .nav-query-item-label(@click="expand") {{ labelMap.key.replace('Transportation', 'Trans.') + ' '}}
        font-awesome-icon.nav-query-icon(:icon="['fas', 'caret-up']" v-if="expandState")
        font-awesome-icon.nav-query-icon(:icon="['fas', 'caret-down']" v-if="!expandState")
      .nav-query-item-radio(v-for="state in query_state")
        div(v-if='state === selected')
          font-awesome-icon.nav-query-icon(:icon="['far', 'dot-circle']")
        div(v-else)
          font-awesome-icon.nav-query-icon(:icon="['far', 'circle']" @click="toggleQuery('big', labelMap.key, state)")
    transition(name='fade')
      .query-detail-list(v-if="expandState")
        .query-detail(v-for="label in Object.keys(labelMap.value)")
          .nav-query-item-label {{ label.replace('Transportation', 'Trans.') }}
          .nav-query-item-radio(v-for="state in query_state")
            div(v-if='state === labelQuery[label]')
              font-awesome-icon.nav-query-icon(:icon="['far', 'dot-circle']")
            div(v-else)
              font-awesome-icon.nav-query-icon(:icon="['far', 'circle']" @click="toggleQuery('small', label, state)")

</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDotCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

library.add(faDotCircle, faCircle, faCaretDown, faCaretUp);
export default {
  name: 'NavQueryItemComponent',
  components: {
    FontAwesomeIcon
  },
  props: {
    labelMap: Object,
  },
  data() {
    return {
      selected: 'none',
      query_state:['none', 'maybe', 'must', 'not'],
      labelQuery: this.$store.getters.getLabelQuery,
      map: this.$props.labelMap,
      expandState: false,
    };
  },
  mounted() {
  },
  methods: {
    async toggleQuery(condition, key, state) {
      let that = this;
      await that.$store.dispatch('updateLabelQuery', { condition, key, value: state });
      if(condition === 'small') that.selected = null;
      else that.selected = state;
      that.labelQuery = that.$store.getters.getLabelQuery;
    },
    expand(){
      this.expandState = !this.expandState;
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/styles"
.nav-query-item-container
  width: 100%
  height: auto
  padding-left: $unit-3
  padding-right: 0
  font-weight: 500
  .query-bigHeader
    width: 100%
    height: 28px
    display: flex
    cursor: pointer
    transition: 0.2s
    @include setFonts('Roboto', #686868, $unit-2, 'sans-serif')
    &:hover
      background: rgba(0, 0, 0, 0.10)
.query-detail-list
  width: 100%
  height: auto
  .query-detail
    width: 100%
    height: 29px
    display: flex
    @include setFonts('Roboto', #686868, $unit-2, 'sans-serif')
    font-weight: 300
.nav-query-item-label
  width: 66px
  height: 100%
  line-height: 28px
  text-align: right
  padding-right: $unit-3
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

.fade-enter-active
  transition: opacity .5s

.fade-leave-active
  transition: opacity .2s

.fade-enter, .fade-leave-to
  opacity: 0

</style>
