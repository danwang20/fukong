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
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row, scope.column)"
          >{{ curColumnItem.name + 1 }}</el-button
        >
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row, scope.column)"
          >{{ curColumnItem.name + 2 }}</el-button
        >
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
        // imageUrl: undefined,
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
    customId: {
      type: String,
      default: "",
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
    handleEdit(index, row, column) {
      console.log(index, row, column);
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