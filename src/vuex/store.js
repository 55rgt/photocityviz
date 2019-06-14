/* eslint-disable no-console,no-case-declarations */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import final from '../../public/data/Total_final_short_';
import kmeans_12 from '../../public/data/kmeans_12';
import TSNE from '../../public/data/TSNE_final';
import labels from '../../public/data/Labels';
import colorPalette from '../../public/data/colorPalette';
import RawLabel from '../../public/data/RawLabel';

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
const MAX_VALUE = 10;

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
      'cohesion': 11,
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

    rawLabel: RawLabel,

    /* rawData: 현재 선택된 클러스터 데이터 + totalData + TSNE 합친 것. */
    rawData: initialData,
    filteredData: initialData,
    labelCount: countLabel(initialData),
    labelQuery: initLabelQuery(countLabel(initialData)),
    labelSortedList: labels,
    selectedDistribution: [],
    selectedLabels: [],
    galleryIndex: 0,
    selectedData: [],
    maxLabelCount: 0,
    summaryData: {},
    colorPalette: colorPalette
  },
  getters: {
    getRawLabel: state => state.rawLabel,
    getLabelCount: state => state.labelCount,
    getLabelQuery: state => state.labelQuery,
    getCountryFlags: state => state.countryFlags,
    getOption: state => state.options,
    getSelectedClusterName: state => state.selectedClusterName,
    getColors: state => state.colors,
    getFilteredData: state => state.filteredData,
    getSelectedDistribution: state => state.selectedDistribution,
    getMaxLabelCount: state => state.maxLabelCount,
    getSelectedClusterLength: state => state.selectedClusterLength,
    getLabelSortedList: state => state.labelSortedList,
    getSelectedLabels: state => state.selectedLabels,
    getSelectedData: state => state.selectedData,
    getSummaryData: state => state.summaryData,
    getColorPalette: state => state.colorPalette
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
      state.filteredData = _.filter(state.rawData, (datum) => {
        return option.countries.includes(datum.country)
            && _.difference(labelList['must'], datum.labels).length === 0
            && _.intersection(labelList['not'], datum.labels).length === 0
            && datum.month >= option.start
            && datum.month <= option.end;
      });

    },
    updateSelectedDistribution: function (state) {
      state.selectedDistribution = [];
      console.log(state.labelQuery);
      let labels = _.compact(_.concat(_.invertBy(state.labelQuery)['must'], _.invertBy(state.labelQuery)['maybe']));
      console.log(state.selectedData);
      for (let i = 1; i <= state.selectedClusterLength; i++) {
        let r = _.reduce(labels, (result, label) => {
          result.push({
            label,
            value: _.filter(state.selectedData, datum => datum['labels'].includes(label) && datum['clusterGroup'] === i && datum.selected).length
          });
          return result;
        }, []);
        state.selectedDistribution.push(r);
      }
      state.maxLabelCount = _.maxBy(_.flatten(state.selectedDistribution), d => d.value).value;
      state.selectedDistribution = _.reduce(state.selectedDistribution, (result, datum, index) => {
        result.push({
          cluster: index + 1,
          dist: datum
        });
        return result;
      }, []);
      state.selectedDistribution = state.selectedDistribution.sort((a, b) => _.sumBy(b.dist, e => e.value) - _.sumBy(a.dist, e => e.value));
      console.log(state.selectedDistribution);
      console.log(state.maxLabelCount);
    },
    updateSelectedLabels: function (state, payload) {
      if (_.isNil(payload)) state.selectedLabels = [];
      else {
        if (state.selectedLabels.includes(payload)) state.selectedLabels = _.without(state.selectedLabels, payload);
        else state.selectedLabels.push(payload);
      }
    },
    updateSelectedData: function (state, payload) {
      if (_.isNil(payload)) {
        state.selectedData = _.map(state.filteredData, (datum) => {
          datum.selected = false;
          return datum;
        });
      } else {
        switch (payload.evt) {
          case 'click':
          case 'drag':
            state.selectedData = _.map(state.selectedData, (datum) => {
              if (payload.data.includes(datum['name'])) {
                datum.selected = payload.newState;
              }
              return datum;
            });
            break;
          case 'cluster':
            let n = _.filter(state.selectedData, d => d['clusterGroup'] === payload.cluster && !d.selected);
            let newState = n.length !== 0;
            state.selectedData = _.map(state.selectedData, (d) => {
              if (d['clusterGroup'] === payload.cluster) d.selected = newState;
              return d;
            });
            break;
          case 'reset':
            state.selectedData = _.map(state.filteredData, (datum) => {
              datum.selected = false;
              return datum;
            });
            break;
          default:
            break;
        }
      }
    },
    getSummaryData: function (state) {
      let dt = _.filter(state.selectedData, d => state.selectedLabels.includes(d['clusterGroup']) && d.selected);

      let colors = _.chain(dt)
          .map(d => d.color)
          .reduce((r, data) => {
            _.forEach(data, (value, key) => _.isNil(r[key]) ? r[key] = value : r[key] += value);
            return r;
          }, {})
          .map((value, key) => ({ key, value }))
          .orderBy(['value'], ['desc'])
          .map(d => d['key'])
          .slice(0, MAX_VALUE * 2)
          .value();


      let labels = _(dt)
          .map(d => d.labels)
          .flatten()
          .groupBy()
          .values()
          .map(d => ({ label: d[0], count: d.length }))
          .orderBy('count', 'desc')
          .map(d => d.label)
          .slice(0, MAX_VALUE)
          .value();
      let hashTags = _(dt)
          .map(d => d['hashTags'])
          .flatten()
          .groupBy()
          .values()
          .map(d => ({ hashTag: d[0], count: d.length }))
          .orderBy('count', 'desc')
          .map(d => d.hashTag)
          .slice(0, MAX_VALUE)
          .value();

      state.summaryData = {
        selectedClusters: state.selectedLabels,
        length: dt.length,
        colors,
        labels,
        hashTags,
      };
      // console.log(state.summaryData);
      return state.summaryData;

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
    updateSelectedDistribution: function (context) {
      context.commit('updateSelectedDistribution');
    },
    updateSelectedLabels: function (context, payload) {
      context.commit('updateSelectedLabels', payload);
    },
    updateSelectedData: function (context) {
      context.commit('updateSelectedData');
    },
    updateSelected: async function (context, payload) {
      console.log('data');
      await context.commit('updateSelectedData', payload);
      console.log('dist');
      await context.commit('updateSelectedDistribution');
      console.log('labels');
      await context.commit('updateSelectedLabels');
    },
    getSummaryData: function (context) {
      context.commit('getSummaryData');
    },
    getGalleryData: async function (context, payload) {
      if (payload === 0) {
        context.state.galleryIndex = 0;
        context.state.selectedData = _.shuffle(context.state.selectedData);
      }
      let filtered = _.filter(context.state.selectedData, d => context.state.selectedLabels.includes(d['clusterGroup']) && d.selected);
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
      return images;
    }
  }
});
