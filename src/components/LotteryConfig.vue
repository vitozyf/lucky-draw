<template>
  <el-dialog
    :visible="visible"
    :append-to-body="true"
    width="400px"
    :lock-scroll="true"
    @close="$emit('update:visible', false)"
    class="c-LotteryConfig"
  >
    <div class="c-LotteryConfigtitle" slot="title">
      <span :style="{ fontSize: '16px', marginRight: '20px' }">
        抽奖配置
      </span>
      <el-button size="mini" @click="addLottery">增加奖项</el-button>
      <el-button size="mini" type="primary" @click="onSubmit"
        >保存配置</el-button
      >
      <el-button size="mini" @click="$emit('update:visible', false)"
        >取消</el-button
      >
    </div>
    <el-form ref="form" :model="form" label-width="100px" size="mini">
      <el-form-item label="抽奖标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="抽奖总人数">
        <el-input type="number" v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="特等奖人数">
        <el-input type="number" v-model="form.specialAward"></el-input>
      </el-form-item>
      <el-form-item label="一等奖人数">
        <el-input type="number" v-model="form.firstPrize"></el-input>
      </el-form-item>
      <el-form-item label="二等奖人数">
        <el-input type="number" v-model="form.secondPrize"></el-input>
      </el-form-item>
      <el-form-item label="三等奖人数">
        <el-input type="number" v-model="form.thirdPrize"></el-input>
      </el-form-item>
      <el-form-item label="四等奖人数">
        <el-input type="number" v-model="form.fourthPrize"></el-input>
      </el-form-item>
      <el-form-item label="五等奖人数">
        <el-input type="number" v-model="form.fifthPrize"></el-input>
      </el-form-item>

      <el-form-item
        :label="newitem.name"
        v-for="newitem in storeNewLottery"
        :key="newitem.key"
      >
        <el-input
          type="number"
          v-model="form[newitem.key]"
          @change="
            val => {
              form[newitem.key] = Number(val);
            }
          "
        ></el-input>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="showAddLottery"
      :append-to-body="true"
      width="300px"
      class="dialog-showAddLottery"
    >
      <div class="add-title" slot="title">增加奖项</div>
      <el-form ref="newLottery" :model="newLottery" size="mini">
        <el-form-item label="奖项名称">
          <el-input v-model="newLottery.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addHandler">增加奖项</el-button>
          <el-button @click="showAddLottery = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>
<script>
import { setData, configField } from '@/helper/index';
import { randomNum } from '@/helper/algorithm';
export default {
  name: 'LotteryConfig',
  props: {
    visible: Boolean
  },
  computed: {
    form: {
      get() {
        return this.$store.state.config;
      },
      set(val) {
        this.$store.commit('setConfig', val);
      }
    },
    storeNewLottery() {
      return this.$store.state.newLottery;
    }
  },
  data() {
    return {
      showAddLottery: false,
      newLottery: { name: '' }
    };
  },
  methods: {
    onSubmit() {
      setData(configField, this.form);
      this.$emit('update:visible', false);
      this.$emit('resetconfig');
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    },
    addLottery() {
      this.showAddLottery = true;
    },
    randomField() {
      const str = 'abcdefghijklmnopqrstuvwxyz';
      let fieldStr = '';
      for (let index = 0; index < 10; index++) {
        fieldStr += str.split('')[randomNum(1, 27) - 1];
      }
      return `${fieldStr}${Date.now()}`;
    },
    addHandler() {
      const field = this.randomField();
      const data = {
        key: field,
        name: this.newLottery.name
      };
      this.$store.commit('setNewLottery', data);

      this.showAddLottery = false;
    }
  }
};
</script>
<style lang="scss">
.c-LotteryConfig {
  .el-dialog__body {
    height: 340px;
    overflow-y: auto;
  }
}
.dialog-showAddLottery {
  .el-dialog {
    height: 186px;
  }
}
</style>
