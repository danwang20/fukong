<template>
  <div class="waterSupplySystem">
    <div class="waterSupplySystem_svg">
       <img
        style="position: relative; top: 60px; width: 80%"
        src="../../assets/svg/给水系统.svg"
        alt="111"
      />
    </div>
    <div class="waterSupplySystem_table">
      <div class="waterSupplySystem_table_top">
        <section class="waterSupplySystem_table_top_gzp">
          <Gzp :option="GzpData" :isShow="true" />
        </section>
        <section class="waterSupplySystem_table_top_table">
          <div class="waterSupplySystem_table_top_table_title">运行信息</div>
          <section class="waterSupplySystem_table_top_table_table">
            <TableCommon
              :columns="columns.tableconfig10"
              :flexHeight="tableCommonHeight"
              :recSpan="recSpan"
              :api="tableApi"
              :showPagination="false"
            />
          </section>
        </section>
      </div>
      <div class="waterSupplySystem_table_bottom">
        <div class="waterSupplySystem_table_bottom_title">运行信息</div>
        <section class="waterSupplySystem_table_bottom_table">
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
import TableCommon from "../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../components/TableCommon/TableCommonConfig";
export default {
  name: "waterSupplySystem",
  components: {
    Gzp,
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
      ],
      columns: {
        tableconfig9: TableCommonConfig.tableConfig9,
        tableconfig10: TableCommonConfig.tableConfig10,
      },
      tableCommonHeight: 0,
      tableCommonHeight1: 1,
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
          ".waterSupplySystem_table_top"
        ).attributes;
        let box_clientHeight = box[0].ownerElement.clientHeight - 20;
        this.tableCommonHeight = box_clientHeight;
      });

      this.$nextTick(function () {
        let box = document.querySelector(
          ".waterSupplySystem_table_bottom"
        ).attributes;
        let box_clientHeight1 = box[0].ownerElement.clientHeight - 20;
        this.tableCommonHeight1 = box_clientHeight1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.waterSupplySystem {
  width: 100%;
  height: 100%;
  display: flex;
  .waterSupplySystem_svg {
    flex: 5;
    border: 1px solid blue;
    // background-color: green;
    text-align: center;
  }
  .waterSupplySystem_table {
    flex: 4;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    .waterSupplySystem_table_top {
      flex: 1;
      display: flex;
      .waterSupplySystem_table_top_gzp {
        flex: 1;
        background-color: red;
      }
      .waterSupplySystem_table_top_table {
        flex: 2;
        background-color: blue;
        .waterSupplySystem_table_top_table_title {
          width: 100%;
          height: 20px;
          background-color: blue;
          text-align: center;
          padding: 1px 0px;
        }
      }
    }
    .waterSupplySystem_table_bottom {
      flex: 1;
      .waterSupplySystem_table_bottom_title {
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