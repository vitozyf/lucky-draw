<template>
  <el-dialog
    :visible="visible"
    :append-to-body="true"
    title="抽奖配置"
    width="400px"
    :lock-scroll="true"
    @close="$emit('update:visible', false)"
    class="c-LotteryConfig"
  >
    <el-form ref="form" :model="form" label-width="100px" size="mini">
      <el-form-item label="抽奖标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="抽奖总人数">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="特等奖人数">
        <el-input v-model="form.specialAward"></el-input>
      </el-form-item>
      <el-form-item label="一等奖人数">
        <el-input v-model="form.firstPrize"></el-input>
      </el-form-item>
      <el-form-item label="二等奖人数">
        <el-input v-model="form.secondPrize"></el-input>
      </el-form-item>
      <el-form-item label="三等奖人数">
        <el-input v-model="form.thirdPrize"></el-input>
      </el-form-item>
      <el-form-item label="四等奖人数">
        <el-input v-model="form.fourthPrize"></el-input>
      </el-form-item>
      <el-form-item label="五等奖人数">
        <el-input v-model="form.fifthPrize"></el-input>
      </el-form-item>
      <el-form-item label="追加奖(1)人数">
        <el-input v-model="form.additionalPrize1"></el-input>
      </el-form-item>
      <el-form-item label="追加奖(2)人数">
        <el-input v-model="form.additionalPrize2"></el-input>
      </el-form-item>
      <el-form-item label="追加奖(3)人数">
        <el-input v-model="form.additionalPrize3"></el-input>
      </el-form-item>
      <el-form-item label="追加奖(4)人数">
        <el-input v-model="form.additionalPrize4"></el-input>
      </el-form-item>
      <el-form-item label="追加奖(5)人数">
        <el-input v-model="form.additionalPrize5"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存配置</el-button>
        <el-button @click="$emit('update:visible', false)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { setData, configField } from '@/helper/index';
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
    }
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
    }
  }
};
</script>
<style lang="scss">
.c-LotteryConfig {
}
</style>
