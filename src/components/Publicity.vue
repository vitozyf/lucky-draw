<template>
  <div class="c-Publicity">
    <div class="message">
      <span class="title">
        {{ config.name }}
      </span>
      <span v-html="message"> </span>
    </div>
  </div>
</template>
<script>
import { conversionCategoryName } from '@/helper/index';

export default {
  name: 'Publicity',
  computed: {
    config() {
      return this.$store.state.config;
    },
    result() {
      return this.$store.state.result;
    },
    message() {
      const {
        specialAward,
        additionalPrize1,
        additionalPrize2,
        additionalPrize3
      } = this.config;
      const fields = [
        'firstPrize',
        'secondPrize',
        'thirdPrize',
        'fourthPrize',
        'fifthPrize'
      ];
      if (specialAward > 0) {
        fields.unshift('specialAward');
      }
      if (additionalPrize1 > 0) {
        fields.push('additionalPrize1');
      }
      if (additionalPrize2 > 0) {
        fields.push('additionalPrize2');
      }
      if (additionalPrize3 > 0) {
        fields.push('additionalPrize3');
      }
      const { result } = this;

      let message = '';
      fields.forEach(item => {
        let label = conversionCategoryName(item);
        message += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${label}抽奖结果: ${
          result[item].length > 0 ? result[item].join('、') : '暂未抽取'
        }`;
      });

      return message;
    }
  }
};
</script>
<style lang="scss">
.c-Publicity {
  height: 100%;
  width: 1000px;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .message {
    font-size: 16px;
    color: #fff;
    position: absolute;
    left: 500px;
    animation-name: slowMovingToLeft;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: normal;
    animation-duration: 40s;
    .title {
      color: #ff2200;
    }
  }
}
</style>
