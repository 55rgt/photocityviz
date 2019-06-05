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

export const store = new Vuex.Store({
  state: {
    colors: [null, '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000'],
    options: {
      'hexRadius': 60,
      'cohesion': 12,
      'countries': [],
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
    selectedClusterName: "kmeans_12",

    /* rawData: 현재 선택된 클러스터 데이터 + totalData + TSNE 합친 것. */
    rawData: initialData,
    queriedData: initialData,

    labelQuery: {},
    labelCount: countLabel(initialData)

  },
  getters: {
    getLabelCount: state => state.labelCount,
    getCountryFlags: state => state.countryFlags,
    getOption: state => state.options,
    getOptionCountries: state => state.options.countries,
    getOptionStart: state => state.options.start,
    getOptionEnd: state => state.options.end,
    getOptionHexRadius: state => state.options.hexRadius,
    getOptionCohesion: state => state.options.cohesion
  },
  mutations: {
    updateLabelQuery: function (state, payload) {
      state.labelQuery[payload.key] = payload.value;
      console.log(state.labelQuery);
    },
    updateOptions: function (state, payload) {
      state.options[payload.key] = payload.value;
      console.log(state.options);
    }
  },
  actions: {
    updateLabelQuery: function (context, payload) {
      context.commit('updateLabelQuery', payload);
    },
    updateOptions: function (context, payload) {
      context.commit('updateOptions', payload)
    }
  }
});
