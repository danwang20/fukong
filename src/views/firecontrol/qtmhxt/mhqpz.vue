<template>
  <div class="mhqpz">
    <div class="mhqpz_left">
      <div class="mhqpz_left_top">
        <section class="mhqpz_left_top_button">
          <el-button size="mini">三维切换</el-button>
        </section>
        <section class="mhqpz_left_top_model"></section>
      </div>
      <div class="mhqpz_left_bottom">
        <section class="mhqpz_left_bottom_title">单个装置基本信息</section>
        <div class="mhqpz_left_bottom_message">
          <section class="mhqpz_left_bottom_message_left"></section>
          <section class="mhqpz_left_bottom_message_right"></section>
        </div>
      </div>
    </div>
    <div class="mhqpz_right">
      <section class="mhqpz_right_title">灭火器信息</section>
      <section class="mhqpz_right_table">
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
      columns: TableCommonConfig.tableConfig5,
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
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        this.getTableMaxHeight();
      }, 1000);
    }
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(".mhqpz_right").attributes;
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
.mhqpz {
  width: 100%;
  height: 100%;
  display: flex;
  .mhqpz_left {
    flex: 1;
    background-color: red;
    display: flex;
    flex-direction: column;
    .mhqpz_left_top {
      flex: 1;
      display: flex;
      flex-direction: column;
      .mhqpz_left_top_button {
        width: 100%;
        height: 30px;
        text-align: center;
      }
      .mhqpz_left_top_model {
        flex: 1;
        background-color: orange;
      }
    }
    .mhqpz_left_bottom {
      flex: 1;
      display: flex;
      flex-direction: column;
      .mhqpz_left_bottom_title {
        border: 1px solid var(--gzp-default-border);
        background-color: blue;
        text-align: center;
        width: 100%;
        height: 18px;
        margin-top: 1px;
        margin-left: 2px;
        margin-right: 2px;
      }
      .mhqpz_left_bottom_message {
        flex: 1;
        display: flex;
        .mhqpz_left_bottom_message_left {
          flex: 2;
          background-color: rgb(199, 118, 118);
        }
        .mhqpz_left_bottom_message_right {
          flex: 1;
          background-color: rgb(163, 155, 80);
        }
      }
    }
  }
  .mhqpz_right {
    flex: 1;
    background-color: green;
    display: flex;
    flex-direction: column;
    .mhqpz_right_title {
      border: 1px solid var(--gzp-default-border);
      border-bottom: 0px;
      background-color: blue;
      text-align: center;
      width: 100%;
      height: 18px;
    }
    .mhqpz_right_table {
      flex: 1;
    }
  }
}
</style>