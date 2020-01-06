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
      firstPrize: 1
    },
    result: {
      firstPrize: []
    },
    newLottery: [],
    list: [],
    photos: []
  },
  mutations: {
    setClearConfig(state) {
      state.config = {
        name: '年会抽奖',
        number: 70,
        firstPrize: 1
      };
      state.newLottery = [];
    },
    setClearList(state) {
      state.list = [];
    },
    setClearPhotos(state) {
      state.photos = [];
    },
    setClearResult(state) {
      state.result = {
        firstPrize: []
      };
    },
    setClearStore(state) {
      state.config = {
        name: '年会抽奖',
        number: 70,
        firstPrize: 1
      };
      state.result = {
        firstPrize: []
      };
      state.newLottery = [];
      state.list = [];
      state.photos = [];
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
    },
    setPhotos(state, photos) {
      state.photos = photos;
    }
  },
  actions: {},
  modules: {}
});
