<!--  -->
<template>
  <div class="zmzhl">
    <div class="zmzhl_left">
      <div class="zmzhl_left_top"></div>
      <div class="zmzhl_left_bottom">
        <section class="zmzhl_left_bottom_title">单个装置基本信息</section>
        <div class="zmzhl_left_bottom_message">
          <section class="zmzhl_left_bottom_message_left"></section>
          <section class="zmzhl_left_bottom_message_right"></section>
        </div>
      </div>
    </div>
    <div class="zmzhl_right">
      <section class="zmzhl_right_title">运行信息</section>
      <div
        v-for="(item, index) in tableList"
        :key="index"
        class="zmzhl_right_table"
      >
        <TableCommon
          :id="'table' + index"
          class="zmzhl_right_table_table"
          :columns="item.columns"
          :flexHeight="item.tableCommonHeight"
          :tableMaxWidth="item.tableMaxWidth"
          :showPagination="false"
          :api="item.tableApi"
          :recSpan="item.recSpan"
        />
        <section class="zmzhl_right_table_buttonGroup">
          <span>{{ item.buttonName }}:</span>
          <el-button style="margin-left: 5px" size="mini">全部开启</el-button>
          <el-button size="mini">全部关闭</el-button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from "../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../components/TableCommon/TableCommonConfig";
export default {
  components: {
    TableCommon,
  },
  data() {
    return {
      tableList: [
        {
          buttonName: "生产综合一楼照明",
          columns: TableCommonConfig.tableConfig8,
          tableCommonHeight: 0,
          tableMaxWidth: 800,
          tableApi: "api/zmxt_bgzhl",
          recSpan: [
            {
              spanName: "sbmc",
              spanLabel: "设备名称",
            },
            {
              spanName: "wz",
              spanLabel: "位置",
            },
          ],
        },
        {
          buttonName: "生产综合二楼照明",
          columns: TableCommonConfig.tableConfig8,
          tableCommonHeight: 0,
          tableMaxWidth: 800,
          tableApi: "api/zmxt_bgzhl1",
          recSpan: [
            {
              spanName: "sbmc",
              spanLabel: "设备名称",
            },
            {
              spanName: "wz",
              spanLabel: "位置",
            },
          ],
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.getTableMaxHeight();
    for (let i = 0; i < 1; i++) {
      setTimeout(() => {
        this.getTableMaxHeight();
      }, 100);
    }
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        for (let i = 0; i < this.tableList.length; i++) {
          let box = document.getElementById("table" + i).attributes;
          let box_clientHeight = box[0].ownerElement.clientHeight;
          this.tableList[i].tableCommonHeight = box_clientHeight;
          console.log("table" + i + ":" + box_clientHeight);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.zmzhl {
  width: 100%;
  height: 100%;
  display: flex;
  .zmzhl_left {
    flex: 1;
    display: flex;
    flex-direction: column;
    .zmzhl_left_top {
      flex: 2;
      background-color: red;
    }
    .zmzhl_left_bottom {
      flex: 1;
      background-color: blue;
      display: flex;
      flex-direction: column;
      .zmzhl_left_bottom_title {
        border: 1px solid var(--gzp-default-border);
        background-color: blue;
        text-align: center;
        width: 100%;
        height: 18px;
        margin-top: 1px;
        margin-left: 2px;
        margin-right: 2px;
      }
      .zmzhl_left_bottom_message {
        flex: 1;
        display: flex;
        .zmzhl_left_bottom_message_left {
          flex: 2;
          background-color: rgb(199, 118, 118);
        }
        .zmzhl_left_bottom_message_right {
          flex: 1;
          background-color: rgb(163, 155, 80);
        }
      }
    }
  }
  .zmzhl_right {
    flex: 1;
    background-color: green;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .zmzhl_right_title {
      border: 1px solid var(--gzp-default-border);
      border-top: 0px;
      border-bottom: 0px;
      background-color: blue;
      text-align: center;
      width: 100%;
      height: 18px;
    }
    .zmzhl_right_table {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      .zmzhl_right_table_table {
        flex: 1;
      }
      .zmzhl_right_table_buttonGroup {
        background-color: orange;
        height: 30px;
        padding-top: 1px;
        padding-bottom: 1px;
      }
    }
  }
}
</style>