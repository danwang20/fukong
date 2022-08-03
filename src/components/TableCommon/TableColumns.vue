<template>
  <div>
    <el-table-column
      v-if="curColumnItem.type == 'index'"
      :label="curColumnItem.label"
      type="index"
      width="50"
      fixed="left"
    >
    </el-table-column>
    <el-table-column
      v-if="curColumnItem.type == 'selection'"
      type="selection"
      width="55"
      fixed="left"
    >
    </el-table-column>
    <el-table-column
      v-if="curColumnItem.type == 'prop'"
      :prop="curColumnItem.prop"
      :label="curColumnItem.label"
      :width="curColumnItem.width"
    >
    </el-table-column>
    <el-table-column
      v-if="curColumnItem.type == 'button'"
      :label="curColumnItem.label"
      :width="curColumnItem.width"
      fixed="right"
    >
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{
          curColumnItem.name
        }}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      v-if="curColumnItem.type == 'input'"
      :label="curColumnItem.label"
      :prop="curColumnItem.inputValue"
      :width="curColumnItem.width"
      fixed="right"
    >
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.inputValue"
          placeholder="请输入内容"
          @change="inputChange(scope.$index, scope.row, scope.column)"
          size="mini"
          v-if="isShow"
        ></el-input>
        <span v-else>{{ scope.row.inputValue }}</span>
      </template>
    </el-table-column>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultColumn: {
        type: undefined,
        label: undefined,
        width: undefined,
        inputValue: undefined,
        name: undefined,
      },
      isShow: false,
    };
  },
  props: {
    curColumn: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    getTableIsClick: {
      deep: true,
      handler(val) {
        this.isShow = val;
      },
    },
  },
  computed: {
    curColumnItem() {
      return Object.assign({}, this.defaultColumn, this.curColumn);
    },
    getTableIsClick() {
      return this.$store.state.tableIsClick;
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    inputChange(index, row, column) {
      console.log(index, row, column);
      this.$store.commit("changeTableIsClick", false);
    },
  },
};
</script>

<style scoped>
</style>