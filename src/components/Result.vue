<template>
  <el-dialog
    :visible="visible"
    @close="$emit('update:visible', false)"
    width="600px"
    class="c-Result"
    :append-to-body="true"
  >
    <div class="dialog-title" slot="title">
      <span :style="{ fontSize: '18px' }">
        抽奖结果
      </span>
      <span :style="{ fontSize: '14px', color: '#999', marginLeft: '10px' }">
        (点击号码可以删除)
      </span>
    </div>
    <div
      v-for="(item, index) in resultList"
      :key="index"
      class="listrow"
      @click="
        event => {
          deleteRes(event, item);
        }
      "
    >
      <span class="name">
        {{ item.name }}
      </span>
      <span class="value">
        <span v-if="item.value && item.value.length === 0">
          暂未抽奖
        </span>
        <span
          class="card"
          v-for="(data, j) in item.value"
          :key="j"
          :data-res="data"
        >
          {{ data }}
        </span>
      </span>
    </div>
  </el-dialog>
</template>
<script>
import { conversionCategoryName, getDomData } from '@/helper/index';
export default {
  name: 'c-Result',
  props: {
    visible: Boolean
  },
  computed: {
    result: {
      get() {
        return this.$store.state.result;
      },
      set(val) {
        this.$store.commit('setResult', val);
      }
    },
    resultList() {
      const list = [];
      for (const key in this.result) {
        if (this.result.hasOwnProperty(key)) {
          const element = this.result[key];
          let name = conversionCategoryName(key);
          list.push({
            label: key,
            name,
            value: element
          });
        }
      }
      return list;
    }
  },
  methods: {
    deleteRes(event, row) {
      const Index = getDomData(event.target, 'res');
      if (!Index) {
        return;
      }
      this.$confirm('此操作将移除该中奖号码，确认删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (Index) {
            const result = this.result;
            result[row.label] = this.result[row.label].filter(
              item => item !== Number(Index)
            );
            this.result = result;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    }
  }
};
</script>
<style lang="scss">
.c-Result {
  .el-dialog__body {
    max-height: 500px;
    overflow-y: auto;
  }
  .listrow {
    display: flex;
    line-height: 30px;
    .name {
      width: 80px;
      font-weight: bold;
    }
    .value {
      flex: 1;
    }
    .card {
      display: inline-block;
      // width: 40px;
      padding: 0 5px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-radius: 4px;
      border: 1px solid #ccc;
      background-color: #f2f2f2;
      margin-left: 5px;
      margin-bottom: 5px;
      position: relative;
      cursor: pointer;
      &:hover {
        &::before {
          content: '删除';
          width: 100%;
          height: 100%;
          background-color: #ccc;
          position: absolute;
          left: 0;
          top: 0;
          color: red;
        }
      }
    }
  }
}
</style>
