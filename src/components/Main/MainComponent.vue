<template lang="pug">
  .main-container
    .component-header Cluster: {{ clusterName }}
      .buttons(v-if="ok")
        .button(v-for="color in selectedClusterLength" @click="updateHex('cluster', color)" :style="{border: `1px solid ${shadeColor(colors[color], -30)}`, background: `${colors[color]}`, opacity: 0.8}")
        font-awesome-icon.reset(@click="updateHex('reset')" :icon="['fas', 'undo']")
    .component-body
      Hex_
      //ClustersComponent
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { EventBus } from '../../utils/event-bus';
import ClustersComponent from './ClustersComponent';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import Hex_ from './Hex_';
library.add(faUndo);
export default {
  name: 'MainComponent',
  components: { Hex_, ClustersComponent, FontAwesomeIcon },
  data() {
    return {
      ok: false,
      colors: this.$store.getters.getColors,
      selectedClusterLength: this.$store.getters.getSelectedClusterLength,
      clusterName: this.$store.getters.getSelectedClusterName
    };
  },
  created( ){
    let that = this;
    EventBus.$on('apply', async () => {
      that.ok = true;
    });
  },
  methods: {
    shadeColor(color, percent) {
      var R = parseInt(color.substring(1, 3), 16);
      var G = parseInt(color.substring(3, 5), 16);
      var B = parseInt(color.substring(5, 7), 16);

      R = parseInt(R * (100 + percent) / 100);
      G = parseInt(G * (100 + percent) / 100);
      B = parseInt(B * (100 + percent) / 100);

      R = (R < 255) ? R : 255;
      G = (G < 255) ? G : 255;
      B = (B < 255) ? B : 255;

      var RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
      var GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
      var BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

      return '#' + RR + GG + BB;
    },
    async updateHex(evt, load) {
      let that = this;
      if(evt === 'cluster') await that.$store.dispatch('updateSelected', { evt, cluster: load });
      else {await that.$store.dispatch('updateSelected', { evt })}
      await EventBus.$emit('updateHex');
      await EventBus.$emit('updateLabelComponent');
      await EventBus.$emit('initClusterComponent');

    }

  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/styles"

.main-container
  flex: 1
  background: $md-white
  @include box_shadow

  .component-header
    position: relative

    .buttons
      position: absolute
      top: 44px
      left: 16px
      width: auto
      height: 24px
      display: flex
      .reset
        width: 24px
        height: 24px
        border-radius: 4px
        box-sizing: border-box
        font-weight: lighter
        color: #ababab
        line-height: 24px
        text-align: center
        font-size: 10px
        margin-left: 6px
        transition: 0.15s
        cursor: pointer
        &:hover
          color: #828282
      .button
        width: 24px
        height: 24px
        border: 1px solid #9c9c9c
        border-radius: 4px
        box-sizing: border-box
        transition: 0.15s
        cursor: pointer
        &:hover
          background: rgba(0, 0, 0, 0.35) !important

.d
</style>
