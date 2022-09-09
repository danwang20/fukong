<template>
  <div class="fireAlarm">
    <div class="c_left">
      <section class="c_left_button">
        <el-button size="mini">3维图切换</el-button>
      </section>
      <section class="c_left_svg">
        <img src="../../../assets/svg/火灾报警网络架构图.svg" alt="111" />
      </section>
    </div>
    <div class="c_center">
      <section class="c_center_1">
        <el-button size="mini" @click="linkMethods1" style="width: 100%"
          >火灾报警主机</el-button
        >
      </section>
      <section class="c_center_2">
        <el-button size="mini" @click="linkMethods2" style="width: 100%"
          >生产综合楼1楼</el-button
        >
        <Gzp :option="GzpData" :isShow="false" />
      </section>
      <section class="c_center_3">
        <el-button size="mini" @click="linkMethods3" style="width: 100%"
          >生产综合楼2楼</el-button
        >
        <Gzp :option="GzpData1" :isShow="false" />
      </section>
      <section class="c_center_4">
        <el-button size="mini" @click="linkMethods4" style="width: 100%"
          >220kv配电装置1楼</el-button
        >
        <Gzp :option="GzpData2" :isShow="false" />
      </section>
      <section class="c_center_5">
        <el-button size="mini" @click="linkMethods5" style="width: 100%"
          >220kv配电装置2楼</el-button
        >
        <Gzp :option="GzpData3" :isShow="false" />
      </section>
    </div>
    <div class="c_right">
      <section class="c_right_1">
        <Descriptions
          :descriptionCigfer="descriptionData.config6"
          :formHeight="formHeight"
          :desTitle="desTitle.title1"
        />
      </section>
      <section class="c_right_2">
        <Descriptions
          :descriptionCigfer="descriptionData.config7"
          :formHeight="formHeight"
          :desTitle="desTitle.title2"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Gzp from "../../../components/Gzp/Gzp.vue";
import Descriptions from "../../../components/Descriptions/descriptionsForm.vue";
import descriptionsFormData from "../../../components/Descriptions/descriptionsFormConfig";
export default {
  name: "fireAlarm",
  components: {
    Gzp,
    Descriptions,
  },
  data() {
    return {
      GzpData: [
        {
          labelKey: "1号烟感正常",
        },
        {
          labelKey: "2号烟感正常",
        },
        {
          labelKey: "3号烟感正常",
        },
        {
          labelKey: "4号烟感正常",
        },
        {
          labelKey: "5号烟感正常",
        },
        {
          labelKey: "6号烟感正常",
        },
        {
          labelKey: "7号烟感正常",
        },
        {
          labelKey: "8号烟感正常",
        },
        {
          labelKey: "9号烟感正常",
        },
        {
          labelKey: "10号烟感正常",
        },
        {
          labelKey: "11号烟感正常",
        },
        {
          labelKey: "12号烟感正常",
        },
        {
          labelKey: "13号烟感正常",
        },
        {
          labelKey: "14号烟感正常",
        },
        {
          labelKey: "15号烟感正常",
        },
        {
          labelKey: "16号烟感正常",
        },
        {
          labelKey: "17号烟感正常",
        },
        {
          labelKey: "18号烟感正常",
        },
        {
          labelKey: "19号烟感正常",
        },
        {
          labelKey: "20号烟感正常",
        },
        {
          labelKey: "21号烟感正常",
        },
        {
          labelKey: "22号烟感正常",
        },
      ],
      GzpData1: [
        {
          labelKey: "1号收报正常",
        },
        {
          labelKey: "2号收报正常",
        },
        {
          labelKey: "3号收报正常",
        },
        {
          labelKey: "4号收报正常",
        },
      ],
      GzpData2: [
        {
          labelKey: "1号声光报警器正常",
        },
        {
          labelKey: "2号声光报警器正常",
        },
        {
          labelKey: "3号声光报警器正常",
        },
        {
          labelKey: "4号声光报警器正常",
        },
      ],
      GzpData3: [
        {
          labelKey: "1号火灾警器正常",
        },
        {
          labelKey: "2号火灾警器正常",
        },
        {
          labelKey: "3号火灾警器正常",
        },
        {
          labelKey: "4号火灾警器正常",
        },
      ],
      descriptionData: {
        config6: descriptionsFormData.descriptionsConfig6,
        config7: descriptionsFormData.descriptionsConfig7,
      },
      desTitle: {
        title1: "火灾信息",
        title2: "异常信息",
      },
      formHeight: 441.5,
    };
  },
  methods: {
    linkMethods1() {
      this.$message({
        message: "火灾报警主机",
        type: "success",
      });
    },
    linkMethods2() {
      this.$message({
        message: "生产综合楼1楼",
        type: "success",
      });
    },
    linkMethods3() {
      this.$message({
        message: "生产综合楼2楼",
        type: "success",
      });
    },
    linkMethods4() {
      this.$message({
        message: "220kv配电装置1楼",
        type: "success",
      });
    },
    linkMethods5() {
      this.$message({
        message: "220kv配电装置2楼",
        type: "success",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fireAlarm {
  width: 100%;
  height: 100%;
  display: flex;
  .c_left {
    flex: 5;
    background-color: blue;
    display: flex;
    flex-direction: column;
    .c_left_button {
      text-align: center;
      height: 30px;
    }
    .c_left_svg {
      flex: 1;
      text-align: center;
      background-color: rgb(0, 110, 255);
    }
  }
  .c_center {
    // width: 440px;
    flex: 3;
    // background-color: yellow;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    // justify-content: space-between;
    .c_center_1 {
      width: 100%;
      height: 28px;
      // background-color: green;
    }
    .c_center_2 {
      width: 100%;
      // background-color: orange;
      display: flex;
      flex-direction: column;
    }
    .c_center_3 {
      width: 100%;
      // background-color: green;
      display: flex;
      flex-direction: column;
    }
    .c_center_4 {
      width: 100%;
      // background-color: orange;
      display: flex;
      flex-direction: column;
    }
    .c_center_5 {
      width: 100%;
      // background-color: green;
      display: flex;
      flex-direction: column;
    }
  }
  .c_right {
    // width: 300px;
    flex: 2;
    // background-color: pink;
    display: flex;
    flex-direction: column;
    .c_right_1 {
      flex: 1;
    }
    .c_right_2 {
      flex: 1;
    }
  }
}
</style>