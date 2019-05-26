/* eslint-disable no-console */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

// ranking 쪽에서 이벤트를 주면, 받은 다음에 데이터를 갈아끼우는 것
import totalData from '../../public/data/Total_final_short';
import kmeans_12 from '../../public/data/kmeans_12_tsvd_final';
import ModelScore from '../../public/data/ModelScore';
import TSNE from '../../public/data/TSNE_final'

Vue.use(Vuex);

const COUNTRIES = ['Egypt', 'Macao', 'Mexico', 'Peru', 'Spain', 'Taiwan'];

export const store = new Vuex.Store({
  state: {
    colors: [null, '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000'],
    filters: {
      'hexRadius': 80,
      'sampleProportion': 100,
      'MonthStartA': 1,
      'MonthEndA': 12,
      'MonthStartB': 1,
      'MonthEndB': 12,
      'ShowCountries': COUNTRIES,
      'ShowClusters': [],
      'HighlightCountries': [],
      'HighlightClusters': []
    },
    // clusterMap { "id" : kmeans_12 }
    rawData: totalData,
    selectedCluster: 'kmeans_12', // map으로 바꾸기 + modelScore와 협
    selectedData: kmeans_12, // rank에서 선택된 애 끼우기 (원래는 null)
    modelScore: ModelScore,
    TSNE: TSNE,
    filteredData: null, // selectedData + filters 결과
    // 데이터 필터해서 주는 procedure

  },
  getters: {
    getColors: state => state.colors,
    getFilter: state => state.filters,
    getHexRadius: state => state.filters.hexRadius,
    getSampleProportion: state => state.filters.sampleProportion,
    getMonthStartA: state => state.filters.MonthStartA,
    getMonthEndA: state => state.filters.MonthEndA,
    getMonthStartB: state => state.filters.MonthStartB,
    getMonthEndB: state => state.filters.MonthEndB,
    getShowCountries: state => state.filters.ShowCountries,
    getShowClusters: state => state.filters.ShowClusters,
    getHighlightCountries: state => state.filters.HighlightCountries,
    getHighlightClusters: state => state.filters.HighlightClusters,
    // getRawData: state => state.rawData,
    // getFilteredData: state => state.filteredData
  },
  mutations: {

    updateFilter: function (state, payload) {
      state.filters[payload.key] = payload.value;
      console.log(state.filters);
    },
    updateFilteredData: function (state) {
      console.log(state.filters);
      // 1. Total_final_short에서 필터드데이터를 만든다.
      // 2. TSNEData도 필터드 만들어야함
      // 클러스터데이터는 필터된 거 만들 필요 없음.

    }
  },
  actions: {
    updateFilter: function (context, payload) {
      context.commit('updateFilter', payload);
    },
    updateFilteredData: function(context) {
      console.log('update detected!');
      context.commit('updateFilteredData');
    }
  }
});
