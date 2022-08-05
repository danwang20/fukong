<template>
  <div>
    <el-table
      :data="curData"
      :border="true"
      :style="{ maxWidth: outWidth + 'px' }"
      :height="tableHeight"
      @cell-dblclick="cellClick"
      :cell-style="cellStyle"
      :span-method="objectSpanMethod"
      class="c-table"
    >
      <template v-for="(column, index) in columns">
        <TableColumns
          :key="index"
          :curColumn="column"
          :customId="'table' + index"
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
    flexHeight: {
      type: Number,
      default: 800,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getTableIsClick() {
      return this.$store.state.tableIsClick;
    },
    getIsHidden() {
      return this.$store.state.isHidden;
    },
    getTableHeight() {
      return this.flexHeight;
    },
  },
  watch: {
    getTableHeight: {
      deep: true,
      handler(val) {
        console.log(val);
        this.tableHeight = val;
      },
    },
    getIsHidden: {
      deep: true,
      handler(val) {
        // console.log(val);
        if (val == true) {
          this.outWidth = document.body.clientWidth - 25;
        } else {
          this.outWidth = document.body.clientWidth - 345;
        }
      },
    },
  },
  data() {
    return {
      curData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          time: "0000",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          time: "0001",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          time: "0002",
        },
        {
          date: "2022-08-05",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          time: "0003456",
        },
      ],
      curPagination: {
        currentPage: 1,
        pageSizes: [5, 20, 50, 100],
        pageSize: 20,
        total: 100,
      },
      tableHeight: 300,
      tableIsClick: false,
      outWidth: document.body.clientWidth - 345,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    cellClick(row, column, event) {
      this.tableIsClick = !this.tableIsClick;
      this.$store.commit("changeTableIsClick", this.tableIsClick);
      console.log(row, column);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1,
          };
        } else if (rowIndex === 5) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex === 8) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else if (rowIndex === 12) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else if (rowIndex === 16) {
          return {
            rowspan: 8,
            colspan: 1,
          };
        } else if (rowIndex === 24) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex);
      if (row.date == "2016-05-01" && column.label == "名字") {
        return "background-color: red !important;";
      }
      if (row.date == "2016-05-02" && column.label == "名字") {
        return "background-color: green !important;";
      }
      if (row.date == "2016-05-03" && column.label == "名字") {
        return "background-color: pink !important;";
      }
      if (row.date == "2016-05-04" && column.label == "名字") {
        return "background-color: orange !important;";
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