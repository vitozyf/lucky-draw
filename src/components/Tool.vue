<template>
  <div id="tool">
    <el-button @click="startHandler" type="primary" size="mini">{{
      running ? 'Stop' : 'Start'
    }}</el-button>
    <el-button size="mini" @click="showRemoveoptions = true">
      Reset
    </el-button>
    <el-button size="mini" @click="showImport = true">
      Import names
    </el-button>
    <el-button size="mini" @click="showImportphoto = true">
      Import photos
    </el-button>
    <el-dialog
      :append-to-body="true"
      :visible.sync="showSetwat"
      class="setwat-dialog"
      width="400px"
    >
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="Draw prize">
          <el-select v-model="form.category" placeholder="Please select the current prize">
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

        <el-form-item label="Draw method">
          <el-select v-model="form.mode" placeholder="Please select the current draw method">
            <el-option label="Draw 1" :value="1"></el-option>
            <el-option label="Draw 5" :value="5"></el-option>
            <el-option label="Draw all" :value="0"></el-option>
            <el-option label="Custom" :value="99"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Number of participants" v-if="form.mode === 99">
          <el-input
            v-model="form.qty"
            type="number"
            :clearable="true"
            :min="1"
            :max="remain ? remain : 100"
            :step="1"
          ></el-input>
        </el-form-item>

        <el-form-item label="Everyone">
          <el-switch v-model="form.allin"></el-switch>
          <span :style="{ fontSize: '12px' }">
            (Will draw from all of the participants including the previous winners)
          </span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Draw!</el-button>
          <el-button @click="showSetwat = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :append-to-body="true"
      :visible.sync="showImport"
      class="import-dialog"
      width="400px"
    >
      <el-input
        type="textarea"
        :rows="10"
        placeholder="Please enter the number and the name with format (index name)，names will replace the number in the prize draw, example：
1 John Smith
2 Peter Pan
3 David Bowl
				"
        v-model="listStr"
      ></el-input>
      <div class="footer">
        <el-button size="mini" type="primary" @click="transformList"
          >Confirm</el-button
        >
        <el-button size="mini" @click="showImport = false">Cancel</el-button>
      </div>
    </el-dialog>
    <Importphoto
      :visible.sync="showImportphoto"
      @getPhoto="$emit('getPhoto')"
    ></Importphoto>

    <el-dialog
      :visible.sync="showRemoveoptions"
      width="300px"
      class="c-removeoptions"
      :append-to-body="true"
    >
      <el-form ref="form" :model="removeInfo" label-width="80px" size="mini">
        <el-form-item label="重置选项">
          <el-radio-group v-model="removeInfo.type">
            <el-radio border :label="0">Reset all data</el-radio>
            <el-radio border :label="1">Reset draw setting</el-radio>
            <el-radio border :label="2">Reset name lists</el-radio>
            <el-radio border :label="3">Reset photos</el-radio>
            <el-radio border :label="4">Reset draw results</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetConfig">Confirm reset</el-button>
          <el-button @click="showRemoveoptions = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  clearData,
  removeData,
  configField,
  listField,
  resultField,
  conversionCategoryName
} from '@/helper/index';
import Importphoto from './Importphoto';
import { database, DB_STORE_NAME } from '@/helper/db';

export default {
  props: {
    running: Boolean,
    closeRes: Function
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
  components: { Importphoto },
  data() {
    return {
      showSetwat: false,
      showImport: false,
      showImportphoto: false,
      showRemoveoptions: false,
      removeInfo: { type: 0 },
      form: {
        category: '',
        mode: 1,
        qty: 1,
        allin: false
      },
      listStr: ''
    };
  },
  watch: {
    showRemoveoptions(v) {
      if (!v) {
        this.removeInfo.type = 0;
      }
    }
  },
  methods: {
    resetConfig() {
      const type = this.removeInfo.type;
      this.$confirm('This will reet the select data，continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          switch (type) {
            case 0:
              clearData();
              this.$store.commit('setClearStore');
              database.clear(DB_STORE_NAME);
              break;
            case 1:
              removeData(configField);
              this.$store.commit('setClearConfig');
              break;
            case 2:
              removeData(listField);
              this.$store.commit('setClearList');
              break;
            case 3:
              database.clear(DB_STORE_NAME);
              this.$store.commit('setClearPhotos');
              break;
            case 4:
              removeData(resultField);
              this.$store.commit('setClearResult');
              break;
            default:
              break;
          }

          this.closeRes && this.closeRes();

          this.showRemoveoptions = false;
          this.$message({
            type: 'success',
            message: 'Reset success!'
          });

          this.$nextTick(() => {
            this.$emit('resetConfig');
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Canceled'
          });
        });
    },
    onSubmit() {
      if (!this.form.category) {
        return this.$message.error('Please select the current prize');
      }
      if (this.remain <= 0) {
        return this.$message.error("We've ran out of this prize!");
      }
      if (this.form.mode === 99) {
        if (this.form.qty <= 0) {
          return this.$message.error('Number of participants must be entered');
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
      this.$emit('toggle');
      if (!this.running) {
        this.showSetwat = true;
      }
    },
    transformList() {
      const { listStr } = this;
      if (!listStr) {
        this.$message.error('Data not found');
      }
      const list = [];
      const rows = listStr.split('\n');
      if (rows && rows.length > 0) {
        rows.forEach(item => {
          const rowList = item.split(/\t|\s/);
          if (rowList.length >= 2) {
            const key = Number(rowList[0].trim());
            const name = rowList[1].trim();
            key &&
              list.push({
                key,
                name
              });
          }
        });
      }
      this.$store.commit('setList', list);

      this.$message({
        message: 'Save success!',
        type: 'success'
      });
      this.showImport = false;
      this.$nextTick(() => {
        this.$emit('resetConfig');
      });
    }
  }
};
</script>
<style lang="scss">
#tool {
  position: fixed;
  width: 60px;
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
.import-dialog {
  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
.c-removeoptions {
  .el-dialog {
    height: 290px;
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0px;
  }
  .el-radio.is-bordered {
    margin-bottom: 10px;
  }
}
</style>
