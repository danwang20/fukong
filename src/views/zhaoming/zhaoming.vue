<template>
  <div class="zhaoming">
    <div class="zhaoming_svg">
      <img
        style="position: relative; top: 60px; width: 45%"
        src="../../assets/svg/照明控制.svg"
        alt="111"
      />
    </div>
    <div class="zhaoming_message">
      <section class="zhaoming_message_mess1">
        <MessageBox :option="options.option1" />
      </section>
      <section class="zhaoming_message_mess2">
        <MessageBox :option="options.option2" />
      </section>
      <section class="zhaoming_message_mess3">
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
  name: "zhaoming",
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
.zhaoming {
  width: 100%;
  height: 100%;
  display: flex;
  .zhaoming_svg {
    flex: 4;
    // background-color: red;
    text-align: center;
  }
  .zhaoming_message {
    flex: 1;
    // background-color: green;
    display: flex;
    flex-direction: column;
    .zhaoming_message_mess1 {
      flex: 1;
    }
    .zhaoming_message_mess2 {
      flex: 1;
    }
    .zhaoming_message_mess3 {
      flex: 1;
    }
  }
}
</style>