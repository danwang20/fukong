<template>
  <div class="FireControlSystem">
    <div class="FireControlSystem_svg"></div>
    <div class="FireControlSystem_message">
      <section class="FireControlSystem_message_mess1">
        <MessageBox :option="options.option1" />
      </section>
      <section class="FireControlSystem_message_mess2">
        <MessageBox :option="options.option2" />
      </section>
      <section class="FireControlSystem_message_mess3">
        <MessageBox :option="options.option3" />
      </section>
      <!-- <section class="FireControlSystem_message_mess4">
        <MessageBox :option="options.option4" />
      </section> -->
    </div>
  </div>
</template>

<script>
import Descriptions from "../../components/Descriptions/descriptionsForm.vue";
import descriptionsFormData from "../../components/Descriptions/descriptionsFormConfig";
import MessageBox from "../../components/MessageBox/MessageBox.vue";
export default {
  name: "FireControlSystem",
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
        title1: "运行信息",
        title2: "火警信息",
        title3: "异常设备",
        title3: "消防管理信息",
      },
      options: {
        option1: {
          title: "运行信息",
          type: "log",
          template: null,
          labelKey: "id",
          valueKey: "sjNr",
        },
        option2: {
          title: "火警信息",
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
        option4: {
          title: "消防管理信息",
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
.FireControlSystem {
  width: 100%;
  height: 100%;
  display: flex;
  .FireControlSystem_svg {
    flex: 4;
    background-color: red;
  }
  .FireControlSystem_message {
    flex: 1;
    // background-color: green;
    display: flex;
    flex-direction: column;
    .FireControlSystem_message_mess1 {
      flex: 1;
    }
    .FireControlSystem_message_mess2 {
      flex: 1;
    }
    .FireControlSystem_message_mess3 {
      flex: 1;
    }
    .FireControlSystem_message_mess4 {
      flex: 1;
    }
  }
}
</style>