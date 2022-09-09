<template>
  <div class="ProductionComplexBuilding">
    <div class="c_left">
      <div class="c_left_top"></div>
      <div class="c_left_bottom">
        <section class="c_right_bottom_title">单个装置基本信息</section>
        <div class="c_left_bottom_bottom">
          <section class="c_left_bottom_bottom_left"></section>
          <section class="c_left_bottom_bottom_right"></section>
        </div>
      </div>
    </div>
    <div class="c_right">
      <div class="c_right_top">
        <div class="c_right_top_left">
          <Gzp :option="gzpData" :isShow="true" />
        </div>
        <div class="c_right_top_right">
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
      <div class="c_right_bottom">
        <section class="c_right_bottom_title">操作流程图</section>
        <div class="jsplumb">
          <Jsplumb v-if="refresh" />
        </div>
        <div class="c_right_bottom_bottle">
          <section class="c_right_bottom_title">操作区域</section>
          <div class="c_right_bottom_button">
            <el-button size="mini" @click="sdqdMethods" style="width: 100px"
              >手动启动</el-button
            >
            <el-button size="mini" @click="sdtzMethods" style="width: 100px"
              >手动停止</el-button
            >
            <el-button size="mini" @click="jjtzMethods" style="width: 100px"
              >紧急停止</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from "../../../components/TableCommon/TableCommon.vue";
import TableCommonConfig from "../../../components/TableCommon/TableCommonConfig";
import Jsplumb from "../../../components/Jsplumb/jsplumb.vue";
import Gzp from "../../../components/Gzp/Gzp.vue";
export default {
  components: {
    TableCommon,
    Jsplumb,
    Gzp,
  },
  data() {
    return {
      columns: TableCommonConfig.tableConfig4,
      tableCommonHeight: 400,
      tableMaxWidth: 800,
      tableApi: "api/sczhl",
      recSpan: [
        {
          spanName: "dz",
          spanLabel: "地址",
        },
      ],
      refresh: true,
      gzpData: [
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
        {
          labelKey: "火灾报警器1报警",
        },
      ],
    };
  },
  computed: {
    getIsHidden() {
      return this.$store.state.isHidden;
    },
  },
  watch: {
    getIsHidden: {
      deep: true,
      handler(val) {
        console.log(val);
        // alert('刷新')
        this.refresh = false;
        // this.refresh = true;
        // this.$nextTick(function () {
        //   this.refresh = true;
        // });
        setTimeout(() => {
          this.refresh = true;
        }, 100);
      },
    },
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
        let box = document.querySelector(".c_left_top").attributes;
        // console.log(box);
        let box_clientHeight = box[0].ownerElement.clientHeight;
        console.log(box_clientHeight - 17);
        this.tableCommonHeight = box_clientHeight - 17;
      });
    },
    sdqdMethods() {
      alert("手动启动");
    },
    sdtzMethods() {
      alert("手动停止");
    },
    jjtzMethods() {
      alert("紧急停止");
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
    flex: 4;
    display: flex;
    flex-direction: column;
    .c_left_top {
      background-color: red;
      flex: 5;
    }
    .c_left_bottom {
      background-color: blue;
      flex: 4;
      display: flex;
      flex-direction: column;
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
      .c_left_bottom_bottom {
        flex: 1;
        display: flex;
        .c_left_bottom_bottom_left {
          flex: 1;
          background-color: yellow;
        }
        .c_left_bottom_bottom_right {
          flex: 1;
          background-color: rgb(11, 202, 27);
        }
      }
    }
  }
  .c_right {
    // width: 800px;
    flex: 5;
    display: flex;
    flex-direction: column;
    // background-color: green;
    .c_right_top {
      flex: 5;
      display: flex;
      .c_right_top_left {
        flex: 4;
        background-color: orange;
      }
      .c_right_top_right {
        flex: 5;
        .c_title {
          text-align: center;
          border: 1px solid var(--gzp-default-border);
          border-bottom: 0px;
          background-color: blue;
        }
        .c-table {
          width: 100%;
        }
      }
    }
    .c_right_bottom {
      flex: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid var(--gzp-default-border);
      border-top: 0px;
      .c_right_bottom_title {
        border: 1px solid var(--gzp-default-border);
        background-color: blue;
        text-align: center;
        height: 18px;
        margin-top: 1px;
        margin-left: 2px;
        margin-right: 2px;
      }
      .Jsplumb {
        flex: 1;
      }
      .c_right_bottom_button {
        // border: 1px solid var(--gzp-default-border);
        height: 30px;
        // flex: 1;
        padding-top: 3px;
        padding-bottom: 3px;
        display: flex;
        justify-content: center;
        button {
          padding-bottom: 3px;
          padding-top: 3px;
        }
      }
    }
  }
}
</style>