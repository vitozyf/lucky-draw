<template>
  <div id="tool">
    <el-button @click="startHandler" size="mini">{{
      running ? '停止' : '开始'
    }}</el-button>
    <el-button size="mini" @click="resetConfig">
      重置
    </el-button>
    <el-dialog
      :append-to-body="true"
      :visible.sync="showSetwat"
      class="setwat-dialog"
      width="400px"
    >
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="抽取奖项">
          <el-select v-model="form.category" placeholder="请选取本次抽取的奖项">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in categorys"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " v-if="form.category">
          <span>
            共&nbsp;
            <span class="colorred">{{ config[form.category] }}</span>
            &nbsp;名
          </span>
          <span :style="{ marginLeft: '20px' }">
            剩余&nbsp;
            <span class="colorred">{{ remain }}</span>
            &nbsp;名
          </span>
        </el-form-item>

        <el-form-item label="抽取方式">
          <el-select v-model="form.mode" placeholder="请选取本次抽取方式">
            <el-option label="抽1人" :value="1"></el-option>
            <el-option label="抽5人" :value="5"></el-option>
            <el-option label="一次抽取完" :value="0"></el-option>
            <el-option label="自定义" :value="99"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抽取人数" v-if="form.mode === 99">
          <el-input
            v-model="form.qty"
            type="number"
            :clearable="true"
            :min="1"
            :max="remain ? remain : 100"
            :step="1"
          ></el-input>
        </el-form-item>

        <el-form-item label="全员参与">
          <el-switch v-model="form.allin"></el-switch>
          <span :style="{ fontSize: '12px' }">
            (开启后将在全体成员[无论有无中奖]中抽奖)
          </span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即抽奖</el-button>
          <el-button @click="showSetwat = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { clearData, conversionCategoryName } from '@/helper/index';

export default {
  props: {
    running: Boolean
  },
  computed: {
    config: {
      get() {
        return this.$store.state.config;
      }
    },
    remain() {
      return (
        this.config[this.form.category] -
        (this.result[this.form.category]
          ? this.result[this.form.category].length
          : 0)
      );
    },
    result() {
      return this.$store.state.result;
    },
    categorys() {
      const options = [];
      for (const key in this.config) {
        if (this.config.hasOwnProperty(key)) {
          const item = this.config[key];
          if (item > 0) {
            let name = conversionCategoryName(key);
            name &&
              options.push({
                label: name,
                value: key
              });
          }
        }
      }
      return options;
    }
  },
  data() {
    return {
      showSetwat: false,
      form: {
        category: '',
        mode: 1,
        qty: 1,
        allin: false
      }
    };
  },
  methods: {
    resetConfig() {
      this.$confirm('此操作将重置所有数据，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          clearData();
          this.$store.commit('setClearStore');
          this.$emit('resetConfig');
          this.$message({
            type: 'success',
            message: '重置成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    onSubmit() {
      if (!this.form.category) {
        return this.$message.error('请选择本次抽取的奖项');
      }
      if (this.remain <= 0) {
        return this.$message.error('该奖项剩余人数不足');
      }
      if (this.form.mode === 99) {
        if (this.form.qty <= 0) {
          return this.$message.error('必须输入本次抽取人数');
        }
        if (this.form.qty > this.remain) {
          return this.$message.error('本次抽奖人数已超过本奖项的剩余人数');
        }
      }
      if (this.form.mode === 1 || this.form.mode === 5) {
        if (this.form.mode > this.remain) {
          return this.$message.error('本次抽奖人数已超过本奖项的剩余人数');
        }
      }
      this.showSetwat = false;
      this.$emit(
        'toggle',
        Object.assign({}, this.form, { remain: this.remain })
      );
    },
    startHandler() {
      if (this.running) {
        this.$emit('toggle');
      } else {
        this.showSetwat = true;
      }
    }
  }
};
</script>
<style lang="scss">
#tool {
  position: fixed;
  width: 60px;
  height: 500px;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .el-button + .el-button {
    margin-top: 20px;
    margin-left: 0px;
  }
}
.setwat-dialog {
  .colorred {
    color: red;
    font-weight: bold;
  }
}
</style>
