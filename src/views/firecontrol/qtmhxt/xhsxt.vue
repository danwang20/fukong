<template>
  <div class="xhsxt">
    <div class="xhsxt_left">
      <div class="xhsxt_left_top">
        <section class="xhsxt_left_top_button">
          <el-button size="mini">三维切换</el-button>
        </section>
        <section class="xhsxt_left_top_model"></section>
      </div>
      <div class="xhsxt_left_bottom">
        <section class="c_right_bottom_title">单个装置基本信息</section>
        <div class="c_right_bottom_message">
          <section class="c_right_bottom_message_left"></section>
          <section class="c_right_bottom_message_right"></section>
        </div>
      </div>
    </div>
    <div class="xhsxt_right">
      <div class="xhsxt_right_top">
        <section class="xhsxt_right_top_gzp">
          <Gzp :option="GzpData" :isShow="true" />
        </section>
        <section class="xhsxt_right_top_yxxx">
          <section class="xhsxt_right_top_yxxx_title">运行信息</section>
          <section class="xhsxt_right_top_yxxx_table">
            <TableCommon
              :columns="columns"
              :flexHeight="tableCommonHeight"
              :tableMaxWidth="tableMaxWidth"
              :showPagination="false"
              :api="tableApi"
              :recSpan="recSpan"
            />
          </section>
        </section>
      </div>
      <div class="xhsxt_right_bottom">
        <section class="xhsxt_right_bottom_title">消火栓信息</section>
        <section class="xhsxt_right_bottom_table">
          <TableCommon
            :columns="columns1"
            :flexHeight="tableCommonHeight1"
            :tableMaxWidth="tableMaxWidth1"
            :showPagination="false"
            :api="tableApi1"
            :recSpan="recSpan"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Gzp from "../../../components/Gzp/Gzp.vue";
import TableCommon from "../../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../../components/TableCommon/TableCommonConfig";
export default {
  components: {
    Gzp,
    TableCommon,
  },
  data() {
    return {
      GzpData: [
        {
          labelKey: "管网压力异常",
        },
        {
          labelKey: "消防水池水位异常",
        },
      ],
      columns: TableCommonConfig.tableConfig5,
      columns1: TableCommonConfig.tableConfig6,
      tableCommonHeight: 400,
      tableCommonHeight1: 400,
      tableMaxWidth: 800,
      tableMaxWidth1: 1000,
      tableApi: "api/xfsxt_yxxx",
      tableApi1: "api/xhsxt_xhsxx",
      recSpan: [
        {
          spanName: "sbmc",
          spanLabel: "设备名称",
        },
      ],
    };
  },
  mounted() {
    this.getTableMaxHeight();
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.getTableMaxHeight();
      }, 1000);
    }
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(".xhsxt_left_top").attributes;
        let box1 = document.querySelector(".xhsxt_left_bottom").attributes;
        // console.log(box);
        let box_clientHeight = box[0].ownerElement.clientHeight;
        console.log(box_clientHeight - 18);
        this.tableCommonHeight = box_clientHeight - 18;
        let box_clientHeight1 = box1[0].ownerElement.clientHeight;
        console.log(box_clientHeight1 - 18);
        this.tableCommonHeight1 = box_clientHeight1 - 18;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.xhsxt {
  width: 100%;
  height: 100%;
  display: flex;
  .xhsxt_left {
    flex: 1;
    display: flex;
    flex-direction: column;
    .xhsxt_left_top {
      flex: 1;
      background-color: red;
      display: flex;
      flex-direction: column;
      .xhsxt_left_top_button {
        width: 100%;
        height: 30px;
        text-align: center;
      }
      .xhsxt_left_top_model {
        flex: 1;
        background-color: orange;
      }
    }
    .xhsxt_left_bottom {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: rgb(57, 100, 180);
      .c_right_bottom_title {
        border: 1px solid var(--gzp-default-border);
        background-color: blue;
        text-align: center;
        width: 100%;
        height: 18px;
        margin-top: 1px;
        margin-left: 2px;
        margin-right: 2px;
      }
      .c_right_bottom_message {
        flex: 1;
        display: flex;
        .c_right_bottom_message_left {
          flex: 2;
          background-color: rgb(199, 118, 118);
        }
        .c_right_bottom_message_right {
          flex: 1;
          background-color: rgb(163, 155, 80);
        }
      }
    }
  }
  .xhsxt_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .xhsxt_right_top {
      flex: 1;
      display: flex;
      .xhsxt_right_top_gzp {
        flex: 1;
        background-color: green;
      }
      .xhsxt_right_top_yxxx {
        flex: 2;
        display: flex;
        flex-direction: column;
        .xhsxt_right_top_yxxx_title {
          border: 1px solid var(--gzp-default-border);
          border-bottom: 0px;
          background-color: blue;
          text-align: center;
          width: 100%;
          height: 18px;
        }
        .xhsxt_right_top_yxxx_table {
          flex: 1;
          width: 100%;
          background-color: rgb(13, 0, 128);
        }
      }
    }
    .xhsxt_right_bottom {
      flex: 1;
      background-color: rgb(0, 128, 128);
      display: flex;
      flex-direction: column;
      .xhsxt_right_bottom_title {
        border: 1px solid var(--gzp-default-border);
        border-top: 0px;
        border-bottom: 0px;
        background-color: blue;
        text-align: center;
        width: 100%;
        height: 18px;
      }
      .xhsxt_right_bottom_table {
        flex: 1;
        width: 100%;
        // background-color: rgb(13, 0, 128);
      }
    }
  }
}
</style>