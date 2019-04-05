/* eslint-disable no-console */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import data from '../../public/data/Total_refined_sample';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filteredData: data,
    dateComponentData: null,
    hourComponentData: null,
    filterOption: {
      hrStart: 0,
      hrEnd: 23,
      dtStart: '2018-03-01',
      dtEnd: '2019-02-28'
      // 여기 이제 다른 필터 옵션
    }
  },
  getters: {
    getDateData: () => 0,
    getLength: () => 0,
    getHrStart: state => state.filterOption.hrStart,
    getHrEnd: state => state.filterOption.hrEnd,
    getDtStart: state => state.filterOption.dtStart,
    getDtEnd: state => state.filterOption.dtEnd
  },
  mutations: {
    updateFilterOption: function (state, payload) {
      console.log('Update Filter Option');
      state.filterOption[payload.key] = payload.value;
    },
    updateFilteredData: function (state) {
      console.log('Update Filter Data');
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
      if(_.isNil(payload.type)) return;
      console.log('Update Component Data');
      let delStr = payload.type;
      let result = _.reduce(state.filteredData, (result, value) => {
        const delVal = value[delStr];
        _.isNil(_.find(result, [delStr, delVal])) ?
            result.push({ [delStr]: delVal, [value.Group]: 1 }) :
            _.isNil(result[_.findIndex(result, d => d[delStr] === delVal)][value.Group]) ?
                result[_.findIndex(result, d => d[delStr] === delVal)][value.Group] = 1 :
                result[_.findIndex(result, d => d[delStr] === delVal)][value.Group] += 1;
        return result;
      }, []);
      console.log(result);
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
