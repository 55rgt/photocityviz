/* eslint-disable no-console */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

// 얘는 나중에 axios 로 유동적으로 바뀌어야 할 듯 하다.
// ranking 쪽에서 이벤트를 주면, 받은 다음에 데이터를 갈아끼우는 것
// import data from '../../public/data/Total_refined_short_10';

Vue.use(Vuex);

// const makeComponentData = function (data, type) {
//   return _.reduce(data, (result, value) => {
//     const delVal = value[type];
//     _.isNil(_.find(result, [type, delVal])) ?
//         result.push({ [type]: delVal, [value.Group]: 1 }) :
//         _.isNil(result[_.findIndex(result, d => d[type] === delVal)][value.Group]) ?
//             result[_.findIndex(result, d => d[type] === delVal)][value.Group] = 1 :
//             result[_.findIndex(result, d => d[type] === delVal)][value.Group] += 1;
//     return result;
//   }, []);
// };

const INITIAL_COUNTRIES = ['Norway', 'Italy', 'Spain'];

export const store = new Vuex.Store({
  state: {
    filterCondition: {
      'hashTag': {},
      'category': {},
      'x': 'PC1',
      'y': 'PC2',
      'hexRadius': 30,
    },
    highlightCondition: {
      'clusters': {},
      'countries': INITIAL_COUNTRIES
    },
    //rawData: data, // 얘는 Axios로 변경이 가능하게끔 해야 함.
    // filteredData: data, // 처음에는 같고 이후에는 변경되어야 함.
  },
  getters: {
    getHashTag: state => state.filterCondition.hashTag,
    getCategory: state => state.filterCondition.category,
    getX: state => state.filterCondition.x,
    getY: state => state.filterCondition.y,
    getHexRadius: state => state.filterCondition.hexRadius,
    getClusters: state => state.highlightCondition.clusters,
    getCountries: state => state.highlightCondition.countries,
    // getRawData: state => state.rawData,
    // getFilteredData: state => state.filteredData
  },
  mutations: {

    // updateFilterOption: function (state, payload) {
    //   state.filterOption[payload.key] = payload.value;
    // },
    // updateFilteredData: function (state) {
    //   const getTime = str => new Date(str).getTime() / 1000;
    //   state.filteredData = _.filter(data, datum =>
    //       datum['Hour'] >= state.filterOption.hrStart &&
    //       datum['Hour'] <= state.filterOption.hrEnd &&
    //       (getTime(state.filterOption.dtStart) - getTime(datum['Date'])) *
    //       (getTime(state.filterOption.dtEnd) - getTime(datum['Date'])) <= 0
    //       // add conditions
    //   );
    //   console.log(state.filteredData);
    // },
    // updateComponentData: function (state, payload) {
    //   if (_.isNil(payload.type)) return;
    //   let delStr = payload.type;
    //   let result = makeComponentData(state.filteredData, delStr);
    //   delStr === 'Hour' ? state.hourComponentData = result : state.dateComponentData = result;
    // }
    updateFilterCondition: function(state, payload) {
      switch (payload.key) {
        case 'x': case 'y':
          state.filterCondition[payload.key] = payload.value;
          break;
        default:
      }
      console.log(state.filterCondition);
    }
  },
  actions: {
    updateFilterCondition: function (context, payload) {
      context.commit('updateFilterCondition', payload)
    }

    // update: function (context, payload) {
    //   context.commit('updateFilterOption', payload);
    //   context.commit('updateFilteredData');
    //   context.commit('updateComponentData', payload);
    // },
  }
});
