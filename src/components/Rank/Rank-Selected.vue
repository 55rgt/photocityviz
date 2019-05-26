<template lang="pug">
  .clusterRanking-selected-container#test(@click="getImages")
    .navigator-header Selected Cluster Information
</template>

<script>
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCTJ3ZEa4vBP3vGvjL_OiFvZuFtoA9th5Q',
  authDomain: 'photocityviz.firebaseapp.com',
  databaseURL: 'https://photocityviz.firebaseio.com',
  projectId: 'photocityviz',
  storageBucket: 'photocityviz.appspot.com',
  messagingSenderId: '64979964954',
  appId: '1:64979964954:web:5dc5cc338f64117b'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();
import * as d3 from 'd3';

export default {
  name: 'Rank-Selected',
  data() {
    return {
      svg: null
    };
  },
  mounted() {
    let that = this;
    that.svg = d3.select('#test')
        .append('svg')
        .attr('width', 240)
        .attr('height', 300);
  },
  methods: {
    async getImages() {
      let that = this;
      console.log('getImages');
      const starsRef = storageRef.child('images/2015-02-17 19.00.23 922303976916561947_Egypt.jpg');
      await starsRef.getDownloadURL().then(function (url) {
        that.svg.append('svg:image')
            .attr('xlink:href', url)
            .attr('width', 100)
            .attr('height', 100)
            .attr('x', 0)
            .attr('y', 0);
        // Insert url into an <img> tag to "download"
        console.log(url);
      }).catch(function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/colors"
@import "../../style/sizes"
.clusterRanking-selected-container
  width: calc(100% - #{$clusterRanking-margin-right} - #{$clusterRanking-list-container-width})
  height: 100%
  border-left: 8px solid #dcdcdc
  padding: 0 $unit-3

  .navigator-header
    width: 100%
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
    @include setHeightAndLineHeight(40px)

</style>
