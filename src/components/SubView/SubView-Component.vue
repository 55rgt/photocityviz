<template lang="pug">
  .subView-container.box-shadow
    .subView-discover-container
      .subView-discover-navigator-container
        .subView-discover-selector-container
          .subView-selector-header(@click="getImages()") Select
          .subView-selector-list-wrapper
            .subView-selector-list
              .subView-selector-item(v-for="image in images" v-bind:class="{ selected: image.name === 'Mexico' || image.name === 'Taiwan' }" :style="'background-image: url(' + image.url + ')'")
        .subView-discover-label-container
      .subView-discover-content-container
        .subView-discover-header-container
        .subView-discover-photo-wrapper
          .subView-discover-photo-container.b-right
            .subView-photo(v-for="image in data1" :style='{backgroundImage: "url(" + image.url + ")", border: "1px solid" + colors[image.border]}').b
          .subView-discover-photo-container
            .subView-photo(v-for="image in data2" :style='{backgroundImage: "url(" + image.url + ")", border: "1px solid" + colors[image.border]}').b
      .subView-discover-content-container
        .subView-discover-header-container
        .subView-discover-photo-wrapper
          .subView-discover-photo-container.b-right
            .subView-photo(v-for="image in data3" :style='{backgroundImage: "url(" + image.url + ")", border: "1px solid" + colors[image.border]}').b
          .subView-discover-photo-container
            .subView-photo(v-for="image in data4" :style='{backgroundImage: "url(" + image.url + ")", border: "1px solid" + colors[image.border]}').b
</template>

<script>
import { EventBus } from '../../utils/event-bus';
import Egypt from '../../assets/flag/Egypt.png';
import Macao from '../../assets/flag/Macao.png';
import Mexico from '../../assets/flag/Mexico.png';
import Peru from '../../assets/flag/Peru.png';
import Spain from '../../assets/flag/Spain.png';
import Taiwan from '../../assets/flag/Taiwan.png';
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
const test = [{ url: Macao, name: 'Egypt', border: 1 },
  { url: Macao, name: 'Macao' , border: 1},
  { url: Mexico, name: 'Mexico', border: 1 },
  { url: Peru, name: 'Peru',border: 1 },
  { url: Spain, name: 'Spain',border: 1 },
  { url: Taiwan, name: 'Taiwan',border: 1 },
  { url: Egypt, name: 'Egypt',border: 1 },
  { url: Macao, name: 'Macao',border: 1 },
  { url: Mexico, name: 'Mexico',border: 1 },
  { url: Peru, name: 'Peru',border: 1 },
  { url: Spain, name: 'Spain',border: 1 },
  { url: Taiwan, name: 'Taiwan',border: 1 },
  { url: Spain, name: 'Spain',border: 1 },
  { url: Taiwan, name: 'Taiwan',border: 1 },
  { url: Macao, name: 'Egypt', border: 1 },
  { url: Macao, name: 'Macao' , border: 1},
  { url: Mexico, name: 'Mexico', border: 1 },
  { url: Peru, name: 'Peru',border: 1 },
  { url: Spain, name: 'Spain',border: 1 },
  { url: Taiwan, name: 'Taiwan',border: 1 },
  { url: Egypt, name: 'Egypt',border: 1 },
  { url: Macao, name: 'Macao',border: 1 }];

export default {
  name: 'SubView-Component',
  data() {
    return {
      colors: this.$store.getters.getColors,
      filteredData: this.$store.getters.getFilteredData,
      images: [
        { url: Egypt, name: 'Egypt' },
        { url: Macao, name: 'Macao' },
        { url: Mexico, name: 'Mexico' },
        { url: Peru, name: 'Peru' },
        { url: Spain, name: 'Spain' },
        { url: Taiwan, name: 'Taiwan' },
      ],
      data1: test,
      data2: test,
      data3: test,
      data4: test,

    };
  },
  created() {
    let that = this;
    EventBus.$on('update', () => {
      that.update();
    });
  },
  methods: {
    async getImages() {
      // let that = this;
      // console.log('getImages');
      const starsRef = storageRef.child('images/2015-02-17 19.00.23 922303976916561947_Egypt.jpg');
      await starsRef.getDownloadURL().then(function (url) {
        // that.svg.append('svg:image')
        //     .attr('xlink:href', url)
        //     .attr('width', 100)
        //     .attr('height', 100)
        //     .attr('x', 0)
        //     .attr('y', 0);
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
      let that = this;
      that.images = [
        { url: Egypt, name: 'Egypt' },
        { url: Egypt, name: 'Macao' },
        { url: Egypt, name: 'Mexico' },
        { url: Egypt, name: 'Peru' },
        { url: Egypt, name: 'Spain' },
        { url: Egypt, name: 'Taiwan' },
      ]
    },
    update() {
      let that = this;
      that.makeDataForSubView();
    },
    makeDataForSubView(){
      let that = this;
      that.filteredData= that.$store.getters.getFilteredData;
      console.log(that.filteredData);
      // 1. filteredData
      /*

      <만들어야 할 데이터 형식>

      1. 위에서 쓸 것 - 각 국가 별 가장 많이 나온 단어 최대 10개
      []


      2. 아래에서 쓸 것
      [{
        "label": "landmark",
        "total": 694,
        "cluster": {
          "1": 445,
          "2": 140,
          "7": 109
        },
        ...
       ]
       3. 라벨과 국기 클릭하면, 사진 업로드


       */
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../style/_colors.sass"
@import "../../style/_sizes.sass"
@import url('https://fonts.googleapis.com/css?family=Roboto')
.subView-container
  width: calc(100% - #{$mainView-container-width} - #{$mainView-margin-right} - #{$navigator-container-width} - #{$mainView-margin-right})
  height: 100%
  background: $md-white
  .subView-header
    width: 100%
    @include setHeightAndLineHeight($subView-header-height)
    padding: 0 $unit-3
    @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
  .subView-summary-container
    width: 100%
    height: $subView-summary-container-height
    padding: 0 $unit-3
  .subView-discover-container
    width: 100%
    height: 100%
    display: flex
    .subView-discover-navigator-container
      width: 200px
      height: 100%
      .subView-discover-selector-container
        width: 100%
        height: 104px
        .subView-selector-header
          width: 100%
          @include setHeightAndLineHeight(40px)
          @include setFonts('Roboto', $md-dark-text-secondary, $unit-4)
          padding: 0 $unit-3
        .subView-selector-list-wrapper
          width: 100%
          height: calc(100% - 40px)
          padding: 0 52px $unit-3 $unit-3
          .subView-selector-list
            display: flex
            flex-wrap: wrap
            .subView-selector-item
              width: calc(100% / 3)
              height: 24px
              border: 1px solid #919191
              border-radius: 4px
              background-repeat: no-repeat
              opacity: 0.3
              background-size: 100% 100%
            .selected
              border: 1px solid #000000
              opacity: 1
      .subView-discover-label-container
        width: 100%
        height: calc(100% - 104px)
    .subView-discover-content-container
      flex: 1
      height: 100%
      .subView-discover-header-container
        width: 100%
        height: 108px
      .subView-discover-photo-wrapper
        width: 100%
        height: calc(100% - 108px)
        display: flex
        .subView-discover-photo-container
          flex: 1
          height: 100%
          display: flex
          flex-wrap: wrap
          padding: 2px
          .subView-photo
            width: 56px
            height: 56px
            margin-right: 2px
            border-radius: 4px
            background-repeat: no-repeat
            background-size: 100% 100%
.b
  border: 1px solid black
.b-right
  border-right: 1px solid #686868


</style>
