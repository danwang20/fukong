<template>
  <div class="environmentalMonitoring">
    <div class="environmentalMonitoring_svg">
      <img
        style="position: relative; top: 60px; width: 45%"
        src="../../assets/svg/环境监测.svg"
        alt="111"
      />
    </div>
    <div class="environmentalMonitoring_message">
      <section class="environmentalMonitoring_message_mess1">
        <MessageBox :option="options.option1" />
      </section>
      <section class="environmentalMonitoring_message_mess2">
        <MessageBox :option="options.option2" />
      </section>
      <section class="environmentalMonitoring_message_mess3">
        <MessageBox :option="options.option3" />
      </section>
    </div>
  </div>
</template>

<script>
import Descriptions from "../../components/Descriptions/descriptionsForm.vue";
import descriptionsFormData from "../../components/Descriptions/descriptionsFormConfig";
import MessageBox from "../../components/MessageBox/MessageBox.vue";
export default {
  name: "environmentalMonitoring",
  components: {
    Descriptions,
    MessageBox,
  },
  data() {
    return {
      descriptionData: {
        config11: descriptionsFormData.descriptionsConfig8,
      },
      desTitle: {
        title1: "设备配置",
        title2: "越限信息",
        title3: "异常设备",
      },
      options: {
        option1: {
          title: "设备配置",
          type: "log",
          template: null,
          labelKey: "id",
          valueKey: "sjNr",
        },
        option2: {
          title: "越限信息",
          type: "log",
          template: null,
          labelKey: "id",
          valueKey: "sjNr",
        },
        option3: {
          title: "异常设备",
          type: "log",
          state: "11",
          template: null,
          labelKey: "id",
          valueKey: "sjNr",
        },
      },
    };
  },
};
</script>

<style lang="less" scoped>
.environmentalMonitoring {
  width: 100%;
  height: 100%;
  display: flex;
  .environmentalMonitoring_svg {
    flex: 4;
    // background-color: red;
    text-align: center;
  }
  .environmentalMonitoring_message {
    flex: 1;
    // background-color: green;
    display: flex;
    flex-direction: column;
    .environmentalMonitoring_message_mess1 {
      flex: 1;
    }
    .environmentalMonitoring_message_mess2 {
      flex: 1;
    }
    .environmentalMonitoring_message_mess3 {
      flex: 1;
    }
  }
}
</style>