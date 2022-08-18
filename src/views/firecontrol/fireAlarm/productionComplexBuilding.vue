<template>
  <div class="ProductionComplexBuilding">
    <div class="c_left">
      <div class="c_left_top"></div>
      <div class="c_left_bottom"></div>
    </div>
    <div class="c_right">
      <section class="c_title">运行信息</section>
      <section class="c-table">
        <TableCommon
          :columns="columns"
          :tableData="tableData"
          :flexHeight="tableCommonHeight"
          :methods="tableFunction"
          :tableMaxWidth="tableMaxWidth"
          :showPagination="false"
        />
      </section>
    </div>
  </div>
</template>

<script>
import TableCommon from "../../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../../components/TableCommon/TableCommonConfig";
export default {
  components: {
    TableCommon,
  },
  data() {
    return {
      columns: TableCommonConfig.tableConfig3,
      tableData: [
        {
          dz: "安全工作室",
          sbmc: "1号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "安全工作室",
          sbmc: "2号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "蓄电池室",
          sbmc: "3号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "蓄电池室",
          sbmc: "4号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "220kv保护室",
          sbmc: "5号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "220kv保护室",
          sbmc: "6号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "380配电室",
          sbmc: "7号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "380配电室",
          sbmc: "8号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "35kv高压室",
          sbmc: "9号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "35kv高压室",
          sbmc: "10号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "2号接地变电室",
          sbmc: "11号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "2号接地变电室",
          sbmc: "12号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "110kv电缆室",
          sbmc: "13号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "110kv电缆室",
          sbmc: "14号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "2号接地变电室",
          sbmc: "15号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "2号接地变电室",
          sbmc: "16号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "生产1楼综合楼走廊",
          sbmc: "17号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "生产1楼综合楼走廊",
          sbmc: "18号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "生产1楼综合楼走廊",
          sbmc: "19号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "生产1楼综合楼走廊",
          sbmc: "20号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "生产1楼综合楼走廊",
          sbmc: "21号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
        {
          dz: "生产1楼综合楼走廊",
          sbmc: "2号感烟探头",
          sbzt: "XF2_辅",
          dqzt: "XF2_辅",
        },
      ],
      tableCommonHeight: 400,
      tableMaxWidth: 800,
      tableFunction: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 1) {
            if (rowIndex === 0) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 2) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 4) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 6) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 8) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 10) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 12) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 14) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            } else if (rowIndex === 16) {
              return {
                rowspan: 6,
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
      },
    };
  },
  mounted() {
    this.getTableMaxHeight();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.getTableMaxHeight();
      }, 1000);
    }
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(".c_right").attributes;
        // console.log(box);
        let box_clientHeight = box[0].ownerElement.clientHeight;
        this.tableCommonHeight = box_clientHeight - 17;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ProductionComplexBuilding {
  width: 100%;
  height: 100%;
  display: flex;
  .c_left {
    flex: 1;
    display: flex;
    flex-direction: column;
    .c_left_top {
      background-color: red;
      flex: 1;
    }
    .c_left_bottom {
      background-color: blue;
      flex: 1;
    }
  }
  .c_right {
    width: 800px;
    background-color: green;
    .c_title {
      text-align: center;
      border: 1px solid var(--gzp-default-border);
      border-bottom: 0px;
      background-color: #002b7c;
    }
    .c-table {
      width: 100%;
    }
  }
}
</style>