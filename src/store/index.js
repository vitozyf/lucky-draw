import Vue from 'vue';
import Vuex from 'vuex';
import {
  setData,
  resultField,
  newLotteryField,
  listField
} from '@/helper/index';

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
    newLottery: [],
    list: []
  },
  mutations: {
    setClearStore(state) {
      state.config = {
        name: '年会抽奖',
        number: 70,
        specialAward: 0,
        firstPrize: 1,
        secondPrize: 5,
        thirdPrize: 8,
        fourthPrize: 10,
        fifthPrize: 20
      };
      state.result = {
        specialAward: [],
        firstPrize: [],
        secondPrize: [],
        thirdPrize: [],
        fourthPrize: [],
        fifthPrize: []
      };
      state.newLottery = [];
      state.list = [];
    },
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
    },
    setList(state, list) {
      const arr = state.list;
      list.forEach(item => {
        const arrIndex = arr.findIndex(data => data.key === item.key);
        if (arrIndex > -1) {
          arr[arrIndex].name = item.name;
        } else {
          arr.push(item);
        }
      });
      state.list = arr;

      setData(listField, arr);
    }
  },
  actions: {},
  modules: {}
});
