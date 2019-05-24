<template lang="pug">
  .filter-category-container
    .component-header(@click="getImages") Category
    .component-body#test
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
  name: 'Filter-Category',
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
      const starsRef = storageRef.child('testFolder/2018-03-01 00.15.21 1724784517271320077_BarcelonaSpain_resize.jpg');
      await starsRef.getDownloadURL().then(function (url) {
        that.svg.append('svg:image')
            .attr('xlink:href', url)
            .attr('width', 75)
            .attr('height', 75)
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
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.filter-category-container
  width: 100%
  min-height: calc(100% - #{$filter-hashtag-container-height})

  .component-body
    width: 100%
    height: 300px
</style>
