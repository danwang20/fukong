<template>
  <div class="aroundTheSubstation">
    <div class="aroundTheSubstation_flowChart">
      <div class="aroundTheSubstation_flowChart_top">
        <section class="aroundTheSubstation_flowChart_button">
          <el-button size="mini">三维图切换</el-button>
          <el-button size="mini">网络结构图切换</el-button>
        </section>
        <section class="aroundTheSubstation_flowChart_svg"></section>
      </div>

      <!-- <section class="aroundTheSubstation_flowChart_message">
        <section class="aroundTheSubstation_flowChart_message_model">
          <div class="aroundTheSubstation_flowChart_message_model_title">
            单个装置三维
          </div>
        </section>
        <section class="aroundTheSubstation_flowChart_message_message">
          <div class="aroundTheSubstation_flowChart_message_message_title">
            红外对射基本信息
          </div>
        </section>
      </section> -->
    </div>
    <div class="aroundTheSubstation_other">
      <div class="aroundTheSubstation_other_top">
        <section class="aroundTheSubstation_other_top_gzp">
          <Gzp :option="GzpData" :isShow="true" />
        </section>
        <div class="aroundTheSubstation_other_top_message">
          <section class="aroundTheSubstation_other_top_message_des">
            <Descriptions
              :descriptionCigfer="descriptionData.config10"
              :formHeight="formHeight"
              :desTitle="desTitle.title"
              :labelWidth="220"
            />
          </section>
          <section class="aroundTheSubstation_other_top_message_table">
            <TableCommon
              :columns="columns.tableconfig9"
              :flexHeight="tableCommonHeight"
              :recSpan="recSpan"
              :api="tableApi"
              :showPagination="false"
            />
          </section>
          <section class="aroundTheSubstation_other_top_message_button">
            <el-button size="mini">一键布防</el-button>
            <el-button size="mini">一键撤防</el-button>
            <el-button size="mini">告警复位</el-button>
            <el-button size="mini">控制器重启</el-button>
          </section>
        </div>
      </div>
      <div class="aroundTheSubstation_other_bottom">
        <div class="aroundTheSubstation_other_bottom_title">布撤防记录</div>
        <section class="aroundTheSubstation_other_bottom_table">
          <TableCommon
            :columns="columns.tableconfig10"
            :flexHeight="tableCommonHeight1"
            :recSpan="recSpan"
            :api="tableApi"
            :showPagination="false"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Gzp from "../../components/Gzp/Gzp.vue";
import Descriptions from "../../components/Descriptions/descriptionsForm.vue";
import descriptionsFormData from "../../components/Descriptions/descriptionsFormConfig";
import TableCommon from "../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../components/TableCommon/TableCommonConfig";
export default {
  name: "aroundTheSubstation",
  components: {
    Gzp,
    Descriptions,
    TableCommon,
  },
  data() {
    return {
      GzpData: [
        {
          labelKey: "合成信息虚遥感信息1告警",
        },
        {
          labelKey: "电子围栏一区防拆告警",
        },
        {
          labelKey: "电子围栏二区防拆告警",
        },
        {
          labelKey: "电子围栏三区防拆告警",
        },
        {
          labelKey: "电子围栏四区防拆告警",
        },
        {
          labelKey: "电子围栏五区防拆告警",
        },
        {
          labelKey: "电子围栏六区防拆告警",
        },
        {
          labelKey: "电子围栏七区防拆告警",
        },
        {
          labelKey: "电子围栏八区防拆告警",
        },
        {
          labelKey: "电子围栏九区防拆告警",
        },
        {
          labelKey: "红外对射入侵",
        },
        {
          labelKey: "红外对射防拆",
        },
      ],
      descriptionData: {
        config10: descriptionsFormData.descriptionsConfig10,
      },
      formHeight: 0,
      desTitle: {
        title: "运行信息",
      },
      columns: {
        tableconfig9: TableCommonConfig.tableConfig9,
        tableconfig10: TableCommonConfig.tableConfig10,
      },
      tableCommonHeight: 0,
      tableCommonHeight1: 0,
      recSpan: [
        {
          spanName: "zdmc",
          spanLabel: "站点名称",
        },
      ],
      tableApi: "api/qzbwlist",
    };
  },
  mounted() {
    this.getTableMaxHeight();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.getTableMaxHeight();
      }, 100);
    }
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(
          ".aroundTheSubstation_other_top_message_table"
        ).attributes;
        let box_clientHeight = box[0].ownerElement.clientHeight;
        this.tableCommonHeight = box_clientHeight;
      });

      this.$nextTick(function () {
        let box = document.querySelector(
          ".aroundTheSubstation_other_bottom_table"
        ).attributes;
        let box_clientHeight = box[0].ownerElement.clientHeight - 20;
        this.tableCommonHeight1 = box_clientHeight;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.aroundTheSubstation {
  width: 100%;
  height: 100%;
  display: flex;
  .aroundTheSubstation_flowChart {
    flex: 4;
    background-color: red;
    display: flex;
    flex-direction: column;
    .aroundTheSubstation_flowChart_top {
      flex: 2;
      display: flex;
      flex-direction: column;
      .aroundTheSubstation_flowChart_button {
        background-color: blue;
        height: 40px;
        text-align: center;
        padding-top: 6px;
        padding-bottom: 6px;
      }
      .aroundTheSubstation_flowChart_svg {
        flex: 1;
      }
    }
    // .aroundTheSubstation_flowChart_message {
    //   flex: 1;
    //   display: flex;
    //   .aroundTheSubstation_flowChart_message_model {
    //     flex: 2;
    //     background-color: orangered;
    //     .aroundTheSubstation_flowChart_message_model_title {
    //       width: 100%;
    //       height: 20px;
    //       background-color: blue;
    //       text-align: center;
    //       padding: 1px 0px;
    //     }
    //   }
    //   .aroundTheSubstation_flowChart_message_message {
    //     flex: 1;
    //     background-color: orange;
    //     .aroundTheSubstation_flowChart_message_message_title {
    //       width: 100%;
    //       height: 20px;
    //       background-color: blue;
    //       text-align: center;
    //       padding: 1px 0px;
    //     }
    //   }
    // }
  }
  .aroundTheSubstation_other {
    flex: 5;
    background-color: green;
    display: flex;
    flex-direction: column;
    .aroundTheSubstation_other_top {
      flex: 2;
      background-color: rgb(166, 255, 0);
      display: flex;
      .aroundTheSubstation_other_top_gzp {
        flex: 1;
        background-color: pink;
      }
      .aroundTheSubstation_other_top_message {
        flex: 2;
        display: flex;
        flex-direction: column;
        .aroundTheSubstation_other_top_message_des {
          flex: 1;
          background-color: rgb(0, 162, 255);
        }
        .aroundTheSubstation_other_top_message_table {
          flex: 3;
          background-color: rgb(0, 255, 157);
        }
        .aroundTheSubstation_other_top_message_button {
          height: 40px;
          text-align: center;
          padding-top: 6px;
          padding-bottom: 6px;
        }
      }
    }
    .aroundTheSubstation_other_bottom {
      flex: 1;
      background-color: royalblue;
      display: flex;
      flex-direction: column;
      .aroundTheSubstation_other_bottom_title {
        width: 100%;
        height: 20px;
        background-color: blue;
        text-align: center;
        padding: 1px 0px;
      }
    }
  }
}
</style>