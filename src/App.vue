<template>
  <div id="root">
    <header>
      <Publicity v-show="!running" />
      <el-button class="res" type="text" @click="showResult = true">
        抽奖结果
      </el-button>
      <el-button class="con" type="text" @click="showConfig = true">
        抽奖配置
      </el-button>
    </header>
    <div id="main" :class="{ mask: showRes }"></div>
    <div id="tags">
      <ul v-for="item in datas" :key="item.key">
        <li>
          <a href="javascript:void(0);" :style="style(item)">
            {{ item.key }}
          </a>
        </li>
      </ul>
    </div>
    <div id="resbox" v-show="showRes">
      <p @click="showRes = false">{{ categoryName }}抽奖结果：</p>
      <span
        v-for="item in resArr"
        :key="item"
        class="itemres"
        @click="showRes = false"
      >
        {{ item }}
      </span>
    </div>

    <LotteryConfig :visible.sync="showConfig" @resetconfig="reloadTagCanvas" />
    <Tool @toggle="toggle" :running="running" />
    <Result :visible.sync="showResult"></Result>
  </div>
</template>
<script>
import LotteryConfig from '@/components/LotteryConfig';
import Publicity from '@/components/Publicity';
import Tool from '@/components/Tool';
import {
  getData,
  configField,
  resultField,
  conversionCategoryName
} from '@/helper/index';
import { luckydrawHandler } from '@/helper/algorithm';
import Result from '@/components/Result';
export default {
  name: 'App',

  components: { LotteryConfig, Publicity, Tool, Result },

  computed: {
    config: {
      get() {
        return this.$store.state.config;
      }
    },
    result: {
      get() {
        return this.$store.state.result;
      },
      set(val) {
        this.$store.commit('setResult', val);
      }
    },
    allresult() {
      let allresult = [];
      for (const key in this.result) {
        if (this.result.hasOwnProperty(key)) {
          const element = this.result[key];
          allresult = allresult.concat(element);
        }
      }
      return allresult;
    },
    datas() {
      const datas = [];
      for (let index = 0; index < this.config.number; index++) {
        datas.push({
          key: index + 1
        });
      }
      return datas;
    },
    categoryName() {
      return conversionCategoryName(this.category);
    }
  },
  created() {
    const data = getData(configField);
    if (data) {
      this.$store.commit('setConfig', Object.assign({}, data));
    }
    const result = getData(resultField);
    if (result) {
      this.$store.commit('setResult', result);
    }
  },

  data() {
    return {
      running: false,
      showRes: false,
      showConfig: false,
      showResult: false,
      resArr: [],
      category: ''
    };
  },
  mounted() {
    this.startTagCanvas();
  },
  methods: {
    style(item) {
      const style = { color: '#fff' };
      if (this.allresult.includes(item.key)) {
        style.color = 'yellow';
      }
      return style;
    },
    speed() {
      return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
    },
    createCanvas() {
      const canvas = document.createElement('canvas');
      canvas.width = document.body.offsetWidth;
      canvas.height = document.body.offsetHeight;
      canvas.id = 'rootcanvas';
      this.$el.querySelector('#main').appendChild(canvas);
    },
    startTagCanvas() {
      this.createCanvas();
      const { speed } = this;
      window.TagCanvas.Start('rootcanvas', 'tags', {
        textColour: null,
        initial: speed(),
        dragControl: 1,
        textHeight: 20,
        noSelect: true,
        lock: 'xy'
      });
    },
    reloadTagCanvas() {
      window.TagCanvas.Reload('rootcanvas');
    },
    toggle(form) {
      const { speed, config } = this;
      if (this.running) {
        window.TagCanvas.SetSpeed('rootcanvas', speed());
        this.reloadTagCanvas();
        setTimeout(() => {
          this.showRes = true;
        }, 300);
      } else {
        this.showRes = false;
        const { number } = config;
        const { category, mode, qty, remain, allin } = form;
        let num = 1;
        if (mode === 1 || mode === 5) {
          num = mode;
        } else if (mode === 0) {
          num = remain;
        } else if (mode === 99) {
          num = qty;
        }
        const resArr = luckydrawHandler(
          number,
          allin ? [] : this.allresult,
          num
        );
        this.resArr = resArr;
        this.category = category;
        const oldRes = this.result[category] || [];
        this.result = {
          [category]: oldRes.concat(resArr)
        };
        window.TagCanvas.SetSpeed('rootcanvas', [5, 1]);
      }
      this.running = !this.running;
    }
  }
};
</script>
<style lang="scss">
#root {
  height: 100%;
  position: relative;
  background-image: url('./assets/bg.jpg');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #121936;
  .mask {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }
  header {
    height: 50px;
    line-height: 50px;
    position: relative;
    .el-button {
      position: absolute;
      top: 17px;
      padding: 0;
      &.con {
        right: 20px;
      }
      &.res {
        right: 100px;
      }
    }
  }
}
#main {
  height: 100%;
}

#resbox {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 1000px;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  p {
    color: red;
    font-size: 50px;
    line-height: 120px;
  }
  .itemres {
    background: #fff;
    display: inline-block;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    border: 1px solid #ccc;
    line-height: 160px;
    font-size: 100px;
    font-weight: bold;
    margin-right: 20px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>
