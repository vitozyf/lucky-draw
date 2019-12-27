import Vue from 'vue';
import Vuex from 'vuex';
import { setData, resultField, newLotteryField } from '@/helper/index';

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
      fifthPrize: 20
    },
    result: {
      specialAward: [],
      firstPrize: [],
      secondPrize: [],
      thirdPrize: [],
      fourthPrize: [],
      fifthPrize: []
    },
    newLottery: []
  },
  mutations: {
    setConfig(state, config) {
      state.config = config;
    },
    setResult(state, result = {}) {
      state.result = result;

      setData(resultField, state.result);
    },
    setNewLottery(state, newLottery) {
      if (state.newLottery.find(item => item.name === newLottery.name)) {
        return;
      }
      state.newLottery.push(newLottery);
      setData(newLotteryField, state.newLottery);
    }
  },
  actions: {},
  modules: {}
});
