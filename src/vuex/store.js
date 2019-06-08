/* eslint-disable no-console */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import final from '../../public/data/Total_final_short';
import kmeans_12 from '../../public/data/kmeans_12';
import TSNE from '../../public/data/TSNE_final';
import labels from '../../public/data/Labels';

import Egypt from '../assets/flag/Egypt.png';
import Macao from '../assets/flag/Macao.png';
import Mexico from '../assets/flag/Mexico.png';
import Peru from '../assets/flag/Peru.png';
import Spain from '../assets/flag/Spain.png';
import Taiwan from '../assets/flag/Taiwan.png';

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_KEY}`,
  authDomain: 'photocityviz.firebaseapp.com',
  databaseURL: 'https://photocityviz.firebaseio.com',
  projectId: 'photocityviz',
  storageBucket: 'photocityviz.appspot.com',
  messagingSenderId: '64979964954',
  appId: `${process.env.VUE_APP_ID}`
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();

Vue.use(Vuex);

const COUNTRIES = ['Egypt', 'Macao', 'Mexico', 'Peru', 'Spain', 'Taiwan'];


const mergeData = function (final, cluster, TSNE) {
  let res = cluster.map(x => Object.assign(x, final.find(y => y.name === x.name)));
  return TSNE.map(x => Object.assign(x, res.find(y => y.name === x.name)));
};

let initialData = mergeData(final, kmeans_12, TSNE);

const countLabel = function (queriedData) {
  let obj = {};
  _.forEach(labels, label => obj[label] = (_.filter(queriedData, o => o.labels.includes(label))).length);
  return obj;
};

const initLabelQuery = function (labelCount) {
  return _.reduce(Object.keys(labelCount), (result, datum) => {
    result[datum] = 'none';
    return result;
  }, {});
};

export const store = new Vuex.Store({
  state: {
    colors: [null, '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000'],
    options: {
      'hexRadius': 84,
      'cohesion': 12,
      'countries': COUNTRIES,
      'start': 1,
      'end': 12
    },
    countryFlags: [
      { url: Egypt, name: 'Egypt' },
      { url: Macao, name: 'Macao' },
      { url: Mexico, name: 'Mexico' },
      { url: Peru, name: 'Peru' },
      { url: Spain, name: 'Spain' },
      { url: Taiwan, name: 'Taiwan' },
    ],
    selectedClusterData: kmeans_12,
    selectedClusterName: 'k-means(12)',
    selectedClusterLength: 12,

    /* rawData: 현재 선택된 클러스터 데이터 + totalData + TSNE 합친 것. */
    rawData: initialData,
    filteredData: initialData,
    labelCount: countLabel(initialData),
    labelQuery: initLabelQuery(countLabel(initialData)),
    labelSortedList: labels,
    filteredDistribution: [],
    selectedLabels: [],
    selectedData: [],
    galleryIndex: 0,
  },
  getters: {
    getLabelCount: state => state.labelCount,
    getLabelQuery: state => state.labelQuery,
    getCountryFlags: state => state.countryFlags,
    getOption: state => state.options,
    getSelectedClusterName: state => state.selectedClusterName,
    getColors: state => state.colors,
    getFilteredData: state => state.filteredData,
    getFilteredDistribution: state => state.filteredDistribution,
    getMaxLabelCount: state => _.maxBy(_.flatten(state.filteredDistribution), d => d.value).value,
    getSelectedClusterLength: state => state.selectedClusterLength,
    getLabelSortedList: state => state.labelSortedList,
    getSelectedLabels: state => state.selectedLabels
  },
  mutations: {
    updateLabelQuery: function (state, payload) {
      state.labelQuery[payload.key] = payload.value;
    },
    updateOptions: function (state, payload) {
      state.options[payload.key] = payload.value;
      console.log(state.options);
    },
    updateFilteredData: function (state) {
      let option = state.options;
      let labelList = _.reduce(state.labelQuery, (result, value, key) => {
        if (value === 'not') result['not'].push(key);
        if (value === 'must') result['must'].push(key);
        return result;
      }, { 'must': [], 'not': [] });
      state.filteredData = _.map(state.rawData, (datum) => {
        (option.countries.includes(datum.country)
            && _.difference(labelList['must'], datum.labels).length === 0
            && _.intersection(labelList['not'], datum.labels).length === 0
            && datum.month >= option.start
            && datum.month <= option.end) ?
            datum.selected = 'true' : datum.selected = 'false';
        return datum;
      });

    },
    updateFilteredDistribution: function (state) {
      let filtered = _.filter(state.filteredData, datum => datum.selected === 'true');
      state.filteredDistribution = [];
      let labels = _.compact(_.concat(_.invertBy(state.labelQuery)['must'], _.invertBy(state.labelQuery)['maybe']));
      console.log(labels);
      for (let i = 1; i <= state.selectedClusterLength; i++) {
        let r = _.reduce(labels, (result, label) => {
          result.push({
            label,
            value: _.filter(filtered, datum => datum['labels'].includes(label) && datum['clusterGroup'] === i).length
          });
          return result;
        }, []);
        state.filteredDistribution.push(r);
      }

    },
    updateSelectedLabels: function (state, payload) {
      if (_.isNil(payload)) state.selectedLabels = [];
      else {
        if (state.selectedLabels.includes(payload)) state.selectedLabels = _.without(state.selectedLabels, payload);
        else state.selectedLabels.push(payload);
      }
    },
    updateSelectedData: function (state) {
      let labels = state.selectedLabels;
      state.selectedData = _.filter(state.filteredData, datum => labels.includes(datum['clusterGroup']) && datum.selected === 'true');
    },
    getSummaryData: function (state) {
      let selectedData = state.selectedData;

      // selected data로 해야 한다.
      //

    }
  },
  actions: {
    updateLabelQuery: function (context, payload) {
      context.commit('updateLabelQuery', payload);
    },
    updateOptions: function (context, payload) {
      context.commit('updateOptions', payload);
    },
    updateFilteredData: function (context) {
      context.commit('updateFilteredData');
    },
    updateFilteredDistribution: function (context) {
      context.commit('updateFilteredDistribution');
    },
    updateSelectedLabels: function (context, payload) {
      context.commit('updateSelectedLabels', payload);
    },
    updateSelectedData: function (context) {
      context.commit('updateSelectedData');
    },
    getSummaryData: function(context) {
      context.commit('getSummaryData');
    },
    getGalleryData: async function (context, payload) {
      if (payload === 0) {
        context.state.galleryIndex = 0;
        context.state.selectedData = _.shuffle(context.state.selectedData);
      }
      let filtered = _.filter(context.state.selectedData, d => context.state.selectedLabels.includes(d['clusterGroup']));
      let p_idx = context.state.galleryIndex;
      context.state.galleryIndex = Math.min(filtered.length, p_idx + 16);
      let c_idx = context.state.galleryIndex;
      let data = filtered.slice(p_idx, c_idx);
      let infos = _.map(data, d => {
        return {
          name: d['name'],
          cluster: d['clusterGroup'],
          country: d['country']
        };
      });

      let promises = _.map(infos, async info => {
        const ref = storageRef.child(`images/${info.name}`);
        return await ref.getDownloadURL();
      });
      let images = [];
      _.map(await Promise.all(promises), (p, i) => images.push({
        url: p,
        cluster: infos[i].cluster,
        country: infos[i].country
      }));
      console.log(images);
      return images;
    }
  }
});
