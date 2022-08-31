<template>
  <div class="fireAlarmHost">
    <div class="fireAlarmHostLeft">
      <div class="fireAlarmHostLeft_top">
        <section class="fireAlarmHostLeft_top_left"></section>
        <section class="fireAlarmHostLeft_top_right">
          <Gzp :option="Gzpdata" :isShow="true"/>
        </section>
      </div>
      <div class="fireAlarmHostLeft_bottom">
        <section class="c-table">
          <TableCommon
            :columns="columns"
            :tableData="tableData"
            :flexHeight="tableCommonHeight"
            :tableMaxWidth="tableMaxWidth"
            :showPagination="false"
            :api="tableApi"
          />
        </section>
      </div>
    </div>
    <div class="fireAlarmHostRight">
      <section class="fireAlarmHostRight_top">
        <Descriptions
          :descriptionCigfer="descriptionData.config4"
          :formHeight="formHeight"
          :desTitle="desTitle.title1"
        />
      </section>
      <section class="fireAlarmHostRight_bottom">
        <Descriptions
          :descriptionCigfer="descriptionData.config5"
          :formHeight="formHeight"
          :desTitle="desTitle.title2"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Gzp from "../../../components/Gzp/Gzp.vue";
import TableCommon from "../../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../../components/TableCommon/TableCommonConfig";
import Descriptions from "../../../components/Descriptions/descriptionsForm.vue";
import descriptionsFormData from "../../../components/Descriptions/descriptionsFormConfig";
import Jsplumb from "../../../components/Jsplumb/jsplumb.vue";
export default {
  components: {
    Gzp,
    TableCommon,
    Descriptions,
    Jsplumb,
  },
  data() {
    return {
      Gzpdata: [
        {
          labelKey: "生产综合楼1楼火灾报警",
        },
        {
          labelKey: "生产综合楼2楼火灾报警",
        },
        {
          labelKey: "生产综合楼3楼火灾报警",
        },
        {
          labelKey: "生产综合楼4楼火灾报警",
        },
        {
          labelKey: "生产综合楼5楼火灾报警",
        },
        {
          labelKey: "生产综合楼6楼火灾报警",
        },
      ],
      tableData: [],
      columns: TableCommonConfig.tableConfig2,
      tableCommonHeight: 441,
      tableMaxWidth: 0,
      descriptionData: {
        config4: descriptionsFormData.descriptionsConfig4,
        config5: descriptionsFormData.descriptionsConfig5,
      },
      formHeight: 441.5,
      desTitle: {
        title1: "基本信息",
        title2: "运行信息",
      },
      tableApi: "api/hzbjzj_zzsm",
    };
  },
  mounted() {
    this.getTableMaxHeight();
    this.getData();
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.getTableMaxHeight();
      }, 0);
    }
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(".fireAlarmHostLeft").attributes;
        let box_clientWidth = box[0].ownerElement.clientWidth;
        // console.log(box_clientWidth);
        this.tableMaxWidth = box_clientWidth;
      });
    },
    getData() {
      let _this = this;
      this.$axios.get("http://localhost:3000/api/qzbwlist").then((res) => {
        console.log(res);
        _this.tableData = res.data.data.list;
        // _this.getSpanData(this.spanTestArr, this.spanTestPosition, "dz");
        console.log(_this.tableData);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fireAlarmHost {
  width: 100%;
  height: 100%;
  display: flex;
  .fireAlarmHostLeft {
    flex: 4;
    // background-color: red;
    display: flex;
    flex-direction: column;
    .fireAlarmHostLeft_top {
      flex: 1;
      display: flex;
      // background-color: blue;
      .fireAlarmHostLeft_top_left {
        flex: 4;
        background-color: pink;
      }
      .fireAlarmHostLeft_top_right {
        // width: 220px;
        flex: 1;
        background-color: yellow;
        display: flex;
      }
    }
    .fireAlarmHostLeft_bottom {
      flex: 1;
      display: flex;
      // background-color: orange;
      .c-table {
        width: 100%;
      }
    }
  }
  .fireAlarmHostRight {
    display: flex;
    flex-direction: column;
    flex: 1;
    // width: 300px;
    // background-color: green;
    .fireAlarmHostRight_top {
      flex: 1;
      background-color: green;
    }
    .fireAlarmHostRight_bottom {
      flex: 1;
      background-color: orange;
    }
  }
}
</style>