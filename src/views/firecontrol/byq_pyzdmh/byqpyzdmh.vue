<template>
  <div class="fireAlarm">
    <div class="fireAlarm_left">
      <img
        style="position: relative; top: 60px; width: 90%"
        src="../../../assets/svg/排油注氮灭火001.svg"
        alt="111"
      />
    </div>
    <div class="fireAlarm_center">
      <section class="fireAlarm_center_1">
        <ButtonMessage :item="items.item0" />
      </section>
      <section class="fireAlarm_center_2">
        <ButtonMessage :item="items.item1" />
      </section>
      <section class="fireAlarm_center_3">
        <ButtonMessage :item="items.item2" />
      </section>
      <section class="fireAlarm_center_4">
        <ButtonMessage :item="items.item3" />
      </section>
      <section class="fireAlarm_center_5">
        <ButtonMessage :item="items.item4" />
      </section>
    </div>
    <div class="fireAlarm_right">
      <section class="fireAlarm_right_1">
        <MessageBox :option="options.option1"
        />
      </section>
      <section class="fireAlarm_right_2">
        <MessageBox
          :option="options.option2"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Gzp from "../../../components/Gzp/Gzp.vue";
import ButtonMessage from "../../../components/ButtonMessage/ButtonMessage.vue";
import MessageBox from "../../../components/MessageBox/MessageBox.vue"
import Descriptions from "../../../components/Descriptions/descriptionsForm.vue";
import descriptionsFormData from "../../../components/Descriptions/descriptionsFormConfig";
export default {
  name: "fireAlarm",
  components: {
    Gzp,
    Descriptions,
    ButtonMessage,
    MessageBox,
  },
  data() {
    return {
      items: {
        item0: {resDesc: "火灾报警主机",deviceInfo: []},
        item1: {
          resDesc: "生产综合楼1楼",
          deviceInfo: [
            {
              devTitle: "1号烟感",
            },
            {
              devTitle: "2号烟感",
            },
            {
              devTitle: "3号烟感",
            },
            {
              devTitle: "4号烟感",
            },
            {
              devTitle: "5号烟感",
            },
            {
              devTitle: "6号烟感",
            },
            {
              devTitle: "7号烟感",
            },
            {
              devTitle: "8号烟感",
            },
            {
              devTitle: "9号烟感",
            },
            {
              devTitle: "10号烟感",
            },
            {
              devTitle: "11号烟感",
            },
            {
              devTitle: "12号烟感",
            },
            {
              devTitle: "13号烟感",
            },
            {
              devTitle: "14号烟感",
            },
            {
              devTitle: "15号烟感",
            },
            {
              devTitle: "16号烟感",
            },
            {
              devTitle: "17号烟感",
            },
            {
              devTitle: "18号烟感",
            },
             {
              devTitle: "1号收报",
            },
             {
              devTitle: "2号收报",
            },
             {
              devTitle: "1号声光报警",
            },
             {
              devTitle: "2号声光报警",
            },
          ],
        },
        item2: {
          resDesc: "生产综合楼2楼",
          deviceInfo: [
            {
              devTitle: "19号烟感",
            },
            {
              devTitle: "20号烟感",
            },
            {
              devTitle: "21号烟感",
            },
            {
              devTitle: "22号烟感",
            },
            {
              devTitle: "23号烟感",
            },
            {
              devTitle: "24号烟感",
            },
            {
              devTitle: "25号烟感",
            },
            {
              devTitle: "26号烟感",
            },
            {
              devTitle: "3号手报",
            },
            {
              devTitle: "4号手报",
            },
             {
              devTitle: "3号声光报警器",
            },
            {
              devTitle: "4号声光报警器",
            },
          ],
        },
        item3: {
          resDesc: "220kv配电装置1楼",
          deviceInfo: [
            {
              devTitle: "27号烟感",
            },
            {
              devTitle: "28号烟感",
            },
            {
              devTitle: "29号烟感",
            },
            {
              devTitle: "30号烟感",
            },
            {
              devTitle: "31号烟感",
            },
            {
              devTitle: "32号烟感",
            },
            {
              devTitle: "33号烟感",
            },
            {
              devTitle: "34号烟感",
            },
            {
              devTitle: "35号烟感",
            },
            {
              devTitle: "36号烟感",
            },
            {
              devTitle: "5号手报",
            },
            {
              devTitle: "6号手报",
            },
             {
              devTitle: "5号声光报警器",
            },
            {
              devTitle: "6号声光报警器",
            },
          ],
        },
        item4: {
          resDesc: "220kv配电装置2楼",
          deviceInfo: [
            {
              devTitle: "37号烟感",
            },
            {
              devTitle: "38号烟感",
            },
            {
              devTitle: "39号烟感",
            },
            {
              devTitle: "40号烟感",
            },
            {
              devTitle: "41号烟感",
            },
            {
              devTitle: "42号烟感",
            },
            {
              devTitle: "43号烟感",
            },
            {
              devTitle: "44号烟感",
            },
            {
              devTitle: "7号手报",
            },
            {
              devTitle: "8号手报",
            },
             {
              devTitle: "7号声光报警器",
            },
            {
              devTitle: "8号声光报警器",
            },
          ],
        },
      },
       options: {
        option1: {
          title: "火警信息",
          type: "log",
          template: null,
          labelKey: "updateTime",
          valueKey: "sjNr",
        },
        option2: {
          title: "异常设备",
          type: "log",
          template: null,
          labelKey: "updateTime",
          valueKey: "sjNr",
        },
      },
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

  },
};
</script>

<style lang="less" scoped>
.fireAlarm {
  width: 100%;
  height: 100%;
  display: flex;
  .fireAlarm_left {
    flex: 5;
    // border: 1px blue solid;
    text-align: center;
    // background-color: rgb(7, 22, 155);
  }
  .fireAlarm_center {
    flex: 1;
    border: 1px solid var(--message-box-border);
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    .fireAlarm_center_1 {
      width: 100%;
      height: 50px;
      // background-color: green;
    }
    .fireAlarm_center_2 {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .fireAlarm_center_3 {
      width: 100%;
      // background-color: green;
      display: flex;
      flex-direction: column;
    }
    .fireAlarm_center_4 {
      width: 100%;
      // background-color: orange;
      display: flex;
      flex-direction: column;
    }
    .fireAlarm_center_5 {
      width: 100%;
      // background-color: green;
      display: flex;
      flex-direction: column;
    }
  }
  .fireAlarm_right {
    // width: 300px;
    flex: 2;
    // background-color: pink;
    display: flex;
    flex-direction: column;
    .fireAlarm_right_1 {
      flex: 1;
    }
    .fireAlarm_right_2 {
      flex: 1;
    }
  }
}
</style>