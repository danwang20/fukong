<template>
  <div class="drainageSystem">
    <div class="drainageSystem_svg">
      <img
        style="position: relative; top: 60px; width: 90%"
        src="../../assets/svg/排水系统.svg"
        alt="111"
      />
    </div>
    <div class="drainageSystem_table">
      <div class="drainageSystem_table_top">
        <section class="drainageSystem_table_top_gzp">
          <Gzp :option="GzpData" :isShow="true" />
        </section>
        <section class="drainageSystem_table_top_table">
          <div class="drainageSystem_table_top_table_title">运行信息</div>
          <section class="drainageSystem_table_top_table_table">
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
      <div class="drainageSystem_table_bottom">
        <div class="drainageSystem_table_bottom_title">运行信息</div>
        <section class="drainageSystem_table_bottom_table">
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
  name: "drainageSystem",
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
          ".drainageSystem_table_top"
        ).attributes;
        let box_clientHeight = box[0].ownerElement.clientHeight - 20;
        this.tableCommonHeight = box_clientHeight;
      });

      this.$nextTick(function () {
        let box = document.querySelector(
          ".drainageSystem_table_bottom"
        ).attributes;
        let box_clientHeight1 = box[0].ownerElement.clientHeight - 20;
        this.tableCommonHeight1 = box_clientHeight1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.drainageSystem {
  width: 100%;
  height: 100%;
  display: flex;
  .drainageSystem_svg {
    flex: 5;
    // border: 1px solid blue;
    text-align: center;
    // background-color: green;
  }
  .drainageSystem_table {
    flex: 4;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    .drainageSystem_table_top {
      flex: 1;
      display: flex;
      .drainageSystem_table_top_gzp {
        flex: 1;
        background-color: red;
      }
      .drainageSystem_table_top_table {
        flex: 2;
        background-color: blue;
        .drainageSystem_table_top_table_title {
          width: 100%;
          height: 20px;
          background-color: blue;
          text-align: center;
          padding: 1px 0px;
        }
      }
    }
    .drainageSystem_table_bottom {
      flex: 1;
      .drainageSystem_table_bottom_title {
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