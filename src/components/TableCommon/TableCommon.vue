<template>
  <div>
    <el-table
      :data="tableDatas"
      :border="true"
      :max-height="flexHeight"
      :height="flexHeight"
      @cell-dblclick="cellClick"
      :cell-style="curMethods.cellStyle"
      :span-method="objectSpanMethod"
      :header-cell-style="headerStyle"
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
    recSpan: {
      type: Array,
      default: () => [{ spanName: "", spanLabel: "" }],
    },
    api: {
      type: String,
      default: "",
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
    getRowSpan() {
      return Object.assign([], this.defaultRecSpan, this.recSpan);
    },
  },
  watch: {
    getIsHidden: {
      deep: true,
      handler(val) {
        console.log(val);
        console.log(this.getMaxWidth);
        if (val == true) {
          // this.outWidth = this.getMaxWidth + 345;
          this.outWidth = this.getMaxWidth;
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
          console.log("???????????????");
        },
      },
      defaultRecSpan: [],
      tableDatas: [],
      allSpan: [],
      labelSpanArr: [
        {
          labelName: "?????????",
        },
        {
          labelName: "?????????1",
        },
        {
          labelName: "?????????",
        },
      ],
    };
  },
  created() {
    console.log(this.getRowSpan);
    this.getData();
    console.log("111111", this.api);
  },
  mounted() {
    setTimeout(() => {
      if (this.getIsHidden == false) {
        // console.log(this.getMaxWidth);
        this.outWidth = this.getMaxWidth;
      } else {
        this.outWidth = this.getMaxWidth + 345;
        // console.log(this.getMaxWidth);
      }
    }, 1000);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`?????? ${val} ???`);
    },
    handleCurrentChange(val) {
      console.log(`?????????: ${val}`);
    },
    cellClick(row, column, cell, event) {
      if (column.label == "?????????") {
        event.target.innerHTML = "";
        let cellInput = document.createElement("input");
        cellInput.value = "";
        cellInput.setAttribute("type", "text");
        cellInput.style.width = "80%";
        cellInput.style.height = "25px";
        cellInput.style.outlineColor = "white";
        cell.appendChild(cellInput);
        //   ??????
        cellInput.focus();
        //????????????
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
    getData() {
      let _this = this;
      let api = "http://localhost:3000/" + this.api;
      this.$axios.get(api).then((res) => {
        console.log(res);
        _this.tableDatas = res.data.data.list;
        for (let i = 0; i < _this.getRowSpan.length; i++) {
          let arr = [];
          let columnSpan = _this.getSpanData(arr, _this.getRowSpan[i].spanName);
          let hebing = {
            label: _this.getRowSpan[i].spanLabel,
            column: columnSpan,
          };
          _this.allSpan.push(hebing);
        }
        -_this.allSpan.push({
          label: "?????????2",
          column: _this.allSpan[0].column,
        });
        console.log(_this.allSpan);
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.allSpan.length; i++) {
        if (column.label === this.allSpan[i].label) {
          const _row = this.allSpan[i].column[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      }
    },
    getSpanData(spanArr, spanName) {
      let position = 0;
      this.tableDatas.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
        } else {
          if (
            this.tableDatas[index][spanName] ===
            this.tableDatas[index - 1][spanName]
          ) {
            spanArr[position] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      });
      return spanArr;
      console.log(spanArr);
    },
    headerStyle({ row, colunm, rowIndex, columnIndex }) {
      // console.log(row, colunm, rowIndex, columnIndex);
      //  row[7].colspan = 3
      //  row[8].colspan = 0
      //  row[9].colspan = 0
      // if (columnIndex == 7) {
      //   row[7].colspan = 3
      // }
      // if (columnIndex == 8) {
      //   return { display: "none" };
      // }
      // if (columnIndex == 9) {
      //   return { display: "none" };
      // }
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