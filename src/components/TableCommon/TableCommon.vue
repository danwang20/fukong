<template>
  <div>
    <el-table
      :data="curData"
      :border="true"
      :style="{ width: outWidth + 'px' }"
      :height="tableHeight"
      @cell-dblclick="cellClick"
      class="c-table"
    >
      <template v-for="(column, index) in columns">
        <TableColumns :key="index" :curColumn="column" />
      </template>
    </el-table>
    <el-pagination
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
  },
  watch: {
    flexHeight: {
      deep: true,
      handler(val) {
        console.log(val);
        this.tableHeight = val.tableHeight - val.formHeight - 32;
      },
    },
    getIsHidden: {
      deep: true,
      handler(val) {
        console.log(val);
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
      ],
      curPagination: {
        currentPage: 1,
        pageSizes: [5, 20, 50, 100],
        pageSize: 20,
        total: 100,
      },
      tableHeight: 800,
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
      console.log(row, column.property);
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