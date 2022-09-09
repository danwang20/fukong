<template>
  <div class="safetyPrecautions">
    <div class="safetyPrecautions_flowChart">
      <section class="safetyPrecautions_flowChart_button">
        <el-button size="mini">三维图切换</el-button>
      </section>
      <section class="safetyPrecautions_flowChart_svg"></section>
    </div>
    <div class="safetyPrecautions_message">
      <section class="safetyPrecautions_message_1">
        <section class="safetyPrecautions_message_1_top">
          <Descriptions
            :descriptionCigfer="descriptionData.config8"
            :formHeight="formHeight"
            :desTitle="desTitle.title1"
          />
        </section>
        <section class="safetyPrecautions_message_1_bottom">
          <Descriptions
            :descriptionCigfer="descriptionData.config9"
            :formHeight="formHeight"
            :desTitle="desTitle.title2"
          />
        </section>
      </section>
      <section class="safetyPrecautions_message_2">
        <Descriptions
          :descriptionCigfer="descriptionData.config10"
          :formHeight="formHeight"
          :desTitle="desTitle.title3"
        />
      </section>
      <section class="safetyPrecautions_message_3">
        <Descriptions
          :descriptionCigfer="descriptionData.config11"
          :formHeight="formHeight"
          :desTitle="desTitle.title4"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Descriptions from "../../components/Descriptions/descriptionsForm.vue";
import descriptionsFormData from "../../components/Descriptions/descriptionsFormConfig";
export default {
  name: "safetyPrecautions",
  components: {
    Descriptions,
  },
  data() {
    return {
      descriptionData: {
        config8: descriptionsFormData.descriptionsConfig8,
        config9: descriptionsFormData.descriptionsConfig9,
        config10: [],
        config11: [],
      },
      formHeight: 0,
      desTitle: {
        title1: "设备配置",
        title2: "",
        title3: "入侵信息",
        title4: "异常设备",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.safetyPrecautions {
  width: 100%;
  height: 100%;
  display: flex;
  .safetyPrecautions_flowChart {
    flex: 3;
    display: flex;
    flex-direction: column;
    .safetyPrecautions_flowChart_button {
      height: 40px;
      background-color: blue;
      text-align: center;
      padding-top: 6px;
      padding-bottom: 6px;
    }
    .safetyPrecautions_flowChart_svg {
      flex: 1;
      background-color: red;
    }
  }
  .safetyPrecautions_message {
    flex: 1;
    background-color: green;
    display: flex;
    flex-direction: column;
    .safetyPrecautions_message_1 {
      flex: 2;
      background-color: orange;
      display: flex;
      flex-direction: column;
      .safetyPrecautions_message_1_top {
        flex: 1;
        border: 1px solid var(--message-box-border);
        border-bottom: 0px;
      }
      .safetyPrecautions_message_1_bottom {
        flex: 1;
        border: 1px solid var(--message-box-border);
        border-top: 0px;
        border-bottom: 0px;
      }
    }
    .safetyPrecautions_message_2 {
      flex: 1;
      background-color: orangered;
      border: 1px solid var(--message-box-border);
      border-top: 0px;
      border-bottom: 0px;
    }
    .safetyPrecautions_message_3 {
      flex: 1;
      background-color: orchid;
      border-top: 0px;
      border: 1px solid var(--message-box-border);
    }
  }
}
</style>