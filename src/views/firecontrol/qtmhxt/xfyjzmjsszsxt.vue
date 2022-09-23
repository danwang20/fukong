<template>
  <div class="xfyjzmjsszsxt">
    <div class="xfyjzmjsszsxt_left">
       <img
        style="position: relative; top: 60px; width: 80%"
        src="../../../assets/svg/消防应急照明.svg"
        alt="111"
      />
      <!-- <div class="xfyjzmjsszsxt_left_top">
        <section class="xfyjzmjsszsxt_left_top_button">
          <el-button size="mini">三维切换</el-button>
        </section>
        <section class="xfyjzmjsszsxt_left_top_model"></section>
      </div>
      <div class="xfyjzmjsszsxt_left_bottom">
        <section class="xfyjzmjsszsxt_left_bottom_title">
          单个装置基本信息
        </section>
        <div class="xfyjzmjsszsxt_left_bottom_message">
          <section class="xfyjzmjsszsxt_left_bottom_message_left"></section>
          <section class="xfyjzmjsszsxt_left_bottom_message_right"></section>
        </div>
      </div> -->
    </div>
    <div class="xfyjzmjsszsxt_center">
      <Gzp :option="GzpData" :isShow="true" />
    </div>
    <div class="xfyjzmjsszsxt_right">
      <section class="xfyjzmjsszsxt_right_title">运行信息</section>
      <section class="xfyjzmjsszsxt_right_table">
        <TableCommon
          :columns="columns"
          :flexHeight="tableCommonHeight"
          :tableMaxWidth="tableMaxWidth"
          :showPagination="false"
          :api="tableApi"
          :recSpan="recSpan"
        />
      </section>
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
          labelKey: "主供电源故障",
        },
        {
          labelKey: "备供电源故障",
        },
        {
          labelKey: "生产综合科一楼备电工作",
        },
        {
          labelKey: "生产综合科二楼备电工作",
        },
        {
          labelKey: "220kv配电装置楼一楼系统应急工作状态(备电工作)",
        },
      ],
      columns: TableCommonConfig.tableConfig7,
      tableCommonHeight: 400,
      tableMaxWidth: 1000,
      tableApi: "api/sczhl",
      recSpan: [
        {
          spanName: "dz",
          spanLabel: "地址",
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
        let box = document.querySelector(".xfyjzmjsszsxt_center").attributes;
        // console.log(box);
        let box_clientHeight = box[0].ownerElement.clientHeight;
        console.log(box_clientHeight - 18);
        this.tableCommonHeight = box_clientHeight - 18;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.xfyjzmjsszsxt {
  width: 100%;
  height: 100%;
  display: flex;
  .xfyjzmjsszsxt_left {
    flex: 4;
    text-align: center;
    // background-color: red;
    // display: flex;
    // flex-direction: column;
    .xfyjzmjsszsxt_left_top {
      flex: 1;
      background-color: orange;
      display: flex;
      flex-direction: column;
      .xfyjzmjsszsxt_left_top_button {
        width: 100%;
        height: 30px;
        text-align: center;
      }
      .xfyjzmjsszsxt_left_top_model {
        flex: 1;
        background-color: rgb(148, 102, 16);
      }
    }
    .xfyjzmjsszsxt_left_bottom {
      flex: 1;
      background-color: aqua;
      display: flex;
      flex-direction: column;
      .xfyjzmjsszsxt_left_bottom_title {
        border: 1px solid var(--gzp-default-border);
        background-color: blue;
        text-align: center;
        width: 100%;
        height: 18px;
        margin-top: 1px;
        margin-left: 2px;
        margin-right: 2px;
      }
      .xfyjzmjsszsxt_left_bottom_message {
        flex: 1;
        display: flex;
        .xfyjzmjsszsxt_left_bottom_message_left {
          flex: 2;
          background-color: rgb(199, 118, 118);
        }
        .xfyjzmjsszsxt_left_bottom_message_right {
          flex: 1;
          background-color: rgb(163, 155, 80);
        }
      }
    }
  }
  .xfyjzmjsszsxt_center {
    flex: 1;
    background-color: yellow;
  }
  .xfyjzmjsszsxt_right {
    flex: 4;
    background-color: rgb(0, 255, 42);
    display: flex;
    flex-direction: column;
    .xfyjzmjsszsxt_right_title {
      border: 1px solid var(--gzp-default-border);
      border-bottom: 0px;
      background-color: blue;
      text-align: center;
      width: 100%;
      height: 18px;
    }
    .xfyjzmjsszsxt_right_table {
      flex: 1;
    }
  }
}
</style>