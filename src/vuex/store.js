/* eslint-disable no-console */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import data from '../../public/data/Total_refined_short';

Vue.use(Vuex);

const makeComponentData = function (data, type) {
  return _.reduce(data, (result, value) => {
    const delVal = value[type];
    _.isNil(_.find(result, [type, delVal])) ?
        result.push({ [type]: delVal, [value.Group]: 1 }) :
        _.isNil(result[_.findIndex(result, d => d[type] === delVal)][value.Group]) ?
            result[_.findIndex(result, d => d[type] === delVal)][value.Group] = 1 :
            result[_.findIndex(result, d => d[type] === delVal)][value.Group] += 1;
    return result;
  }, []);
};

export const store = new Vuex.Store({
  state: {
    filteredData: data,
    dateComponentData: makeComponentData(data, 'Date'),
    hourComponentData: makeComponentData(data, 'Hour'),
    filterOption: {
      hrStart: 0,
      hrEnd: 23,
      dtStart: '2018-03-01',
      dtEnd: '2019-02-28'
      // 여기 이제 다른 필터 옵션
    }
  },
  getters: {
    getHourComponentData: state => state.hourComponentData,
    getDateComponentData: state => state.dateComponentData,
    getLength: () => 0,
    getHrStart: state => state.filterOption.hrStart,
    getHrEnd: state => state.filterOption.hrEnd,
    getDtStart: state => state.filterOption.dtStart,
    getDtEnd: state => state.filterOption.dtEnd
  },
  mutations: {
    updateFilterOption: function (state, payload) {
      state.filterOption[payload.key] = payload.value;
    },
    updateFilteredData: function (state) {
      const getTime = str => new Date(str).getTime() / 1000;
      state.filteredData = _.filter(data, datum =>
          datum['Hour'] >= state.filterOption.hrStart &&
          datum['Hour'] <= state.filterOption.hrEnd &&
          (getTime(state.filterOption.dtStart) - getTime(datum['Date'])) *
          (getTime(state.filterOption.dtEnd) - getTime(datum['Date'])) <= 0
          // add conditions
      );
      console.log(state.filteredData);
    },
    updateComponentData: function (state, payload) {
      if (_.isNil(payload.type)) return;
      let delStr = payload.type;
      let result = makeComponentData(state.filteredData, delStr);
      delStr === 'Hour' ? state.hourComponentData = result : state.dateComponentData = result;
    }
  },
  actions: {
    update: function (context, payload) {
      context.commit('updateFilterOption', payload);
      context.commit('updateFilteredData');
      context.commit('updateComponentData', payload);
    },
  }
});
