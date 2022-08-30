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
import TableCommon from "../../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../../components/TableCommon/TableCommonConfig";
export default {
  components: {
    TableCommon,
  },
  data() {
    return {
      columns: TableCommonConfig.tableConfig3,
      tableCommonHeight: 400,
      tableMaxWidth: 800,
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
    // width: 800px;
    flex: 1;
    // background-color: green;
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