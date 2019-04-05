/* eslint-disable no-console */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import data from '../../public/data/Total_refined_short';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    original: data,
    filter: {
      hrStart: 0,
      hrEnd: 23,
      dtStart: '2018-03-01',
      dtEnd: '2019-02-28'
    }
  },
  getters: {
    getLength: () => 0,
    getHrStart: state => state.filter.hrStart,
    getHrEnd: state => state.filter.hrEnd,
    getDtStart: state => state.filter.dtStart,
    getDtEnd: state => state.filter.dtEnd
  },
  //  Vuex 의 데이터, 즉 state 값을 변경하는 로직 (동기적)
  mutations: {
    filter: function (state, payload) {
      // case 별로 처리하여 리턴하는데, filter의 조건을 반영해야 할 부분과 그렇지 않은 부분을 구분
      let delStr = 'Hour';
      let result = _.reduce(data, (result, value) => {
        const delVal = value[delStr];
        _.isNil(_.find(result, [delStr, delVal])) ?
            result.push({ [delStr]: delVal, [value.Group]: 1 }) :
            _.isNil(result[_.findIndex(result, d => d[delStr] === delVal)][value.Group]) ?
                result[_.findIndex(result, d => d[delStr] === delVal)][value.Group] = 1 :
                result[_.findIndex(result, d => d[delStr] === delVal)][value.Group] += 1;
        return result;
      }, []);
      console.log(result);
    }
  },
  actions: {
    updateFilterOption: function (context, payload) {
      for (let key of Object.keys(payload)) {
        this.state.filter[key] = payload[key];
      }
      return context.commit('filter', payload);
    }
  }
});
