import Vue from 'vue';
import Vuex from 'vuex';
import { setData, resultField } from '@/helper/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      name: '年会抽奖',
      number: 70,
      specialAward: 0,
      firstPrize: 1,
      secondPrize: 5,
      thirdPrize: 8,
      fourthPrize: 10,
      fifthPrize: 20,
      additionalPrize1: 0,
      additionalPrize2: 0,
      additionalPrize3: 0,
      additionalPrize4: 0,
      additionalPrize5: 0
    },
    result: {
      specialAward: [],
      firstPrize: [],
      secondPrize: [],
      thirdPrize: [],
      fourthPrize: [],
      fifthPrize: [],
      additionalPrize1: [],
      additionalPrize2: [],
      additionalPrize3: [],
      additionalPrize4: [],
      additionalPrize5: []
    }
  },
  mutations: {
    setConfig(state, config) {
      state.config = config;
    },
    setResult(state, result = {}) {
      Object.assign(state.result, result);

      setData(resultField, state.result);
    }
  },
  actions: {},
  modules: {}
});
