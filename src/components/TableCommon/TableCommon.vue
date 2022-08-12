<template>
  <div>
    <el-table
      :data="tableData"
      :border="true"
      :style="{ maxWidth: outWidth + 'px' }"
      :height="flexHeight"
      @cell-dblclick="cellClick"
      :cell-style="curMethods.cellStyle"
      :span-method="curMethods.objectSpanMethod"
      class="c-table"
    >
      <template v-for="(column, index) in columns">
        <TableColumns
          :key="index"
          :curColumn="column"
          :customId="'table' + index"
          :methods="column.methods"
        />
      </template>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :current-page="curPagination.currentPage"
      :page-sizes="curPagination.pageSizes"
      :page-size="curPagination.pageSize"
      :total="curPagination.total"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import TableColumns from "./TableColumns.vue";
export default {
  components: {
    TableColumns,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    flexHeight: {
      type: Number,
      default: 800,
    },
    tableMaxWidth: {
      type: Number,
      default: 0,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    methods: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    getTableIsClick() {
      return this.$store.state.tableIsClick;
    },
    getIsHidden() {
      return this.$store.state.isHidden;
    },
    curMethods() {
      return Object.assign({}, this.defaultMethods, this.methods);
    },
    getMaxWidth() {
      return this.tableMaxWidth;
    },
  },
  watch: {
    getIsHidden: {
      deep: true,
      handler(val) {
        console.log(val);
        console.log(this.getMaxWidth);
        if (val == true) {
          this.outWidth = this.getMaxWidth + 345;
        } else {
          this.outWidth = this.getMaxWidth;
        }
      },
    },
  },
  data() {
    return {
      curPagination: {
        currentPage: 1,
        pageSizes: [5, 20, 50, 100],
        pageSize: 20,
        total: 100,
      },
      tableHeight: this.getTableHeight,
      tableIsClick: false,
      outWidth: document.body.clientWidth - 345,
      defaultMethods: {
        cellStyle({ row, column, rowIndex, columnIndex }) {
          // console.log({ row, column, rowIndex, columnIndex });
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          // console.log({ row, column, rowIndex, columnIndex });
        },
        handleEdit(index, row, column) {
          console.log("点击了按钮");
        },
      },
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      if (this.getIsHidden == false) {
        // console.log(this.getMaxWidth);
        this.outWidth = this.getMaxWidth;
      } else {
        this.outWidth = this.getMaxWidth + 345;
        console.log(this.getMaxWidth);
      }
    }, 1000);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    cellClick(row, column, cell, event) {
      if (column.label == "输入框") {
        event.target.innerHTML = "";
        let cellInput = document.createElement("input");
        cellInput.value = "";
        cellInput.setAttribute("type", "text");
        cellInput.style.width = "80%";
        cellInput.style.height = "25px";
        cellInput.style.outlineColor = "white";
        cell.appendChild(cellInput);
        //   聚焦
        cellInput.focus();
        //失焦事件
        cellInput.onblur = function () {
          cell.removeChild(cellInput);
          if (cellInput.value == "undefined") {
            cellInput.value = "";
          }
          event.target.innerHTML = cellInput.value;
          row[column.property] = cellInput.value;
        };
      }
    },
  },
};
</script>

<style scoped>
.c-table {
  height: 100%;
  width: 100%;
}
</style>