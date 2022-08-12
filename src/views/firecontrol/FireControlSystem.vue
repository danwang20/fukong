<template>
  <section class="c-fireControl">
    <div class="c-fireControl-left">
      <div class="c-fireControl-left-top">
        <Gzp :option="GapData" />
      </div>
      <div class="c-fireControl-left-bottom">
        <div class="c-fireControl-left-bottom-left">
          <el-select
            v-model="selectValue"
            @change="selectChange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="c-fireControl-left-bottom-right">
          <div class="showList">
            <section class="showListTop">
              <div class="showListTopLeft">
                <span class="showListTopLeftSpan">关</span>
              </div>
              <div class="showListTopCenter">
                <span>35kv开关室一楼#1灯控制</span>
              </div>
              <div class="showListTopRight">
                <i class="el-icon-tickets"></i>
              </div>
            </section>
            <section class="showListBottom">
              <div class="showListBottomLeft"></div>
              <div class="showListBottomRight">
                <div>
                  <el-button class="brButton" size="mini" @click="buttonOpen"
                    >开</el-button
                  >
                </div>
                <div>
                  <el-button class="brButton" size="mini" @click="buttonClose"
                    >关</el-button
                  >
                </div>
              </div>
            </section>
          </div>
          <div class="menuListAll">
            <div v-for="(item, index) in menuListArr" :key="index">
              <div class="menuList" @click="menuListClick(index)">
                <section class="menuListleft" :id="'menu' + index">
                  <i class="el-icon-monitor"></i>
                </section>
                <section class="menuListleft1" :id="'menu1' + index">
                  <span>设备控制</span>
                </section>
                <section class="menuListRight">
                  <span>16</span>
                </section>
                <section class="menuListRight1">
                  <span style="color: red"
                    ><i class="el-icon-bottom"></i>12</span
                  >
                  <span style="color: orange"
                    ><i class="el-icon-top"></i>4</span
                  >
                </section>
              </div>
            </div>
          </div>
          <div class="yspListAll">
            <div v-for="(item, index) in yspListArr" :key="index">
              <div class="yspList">
                <section class="yspListleft">
                  <span class="yspListleftSpan">CO</span>
                </section>
                <section class="yspListRight">
                  <div class="yspListRightTop">
                    <span>一氧化碳</span>
                  </div>
                  <div class="yspListRightBottom">
                    <section class="yspListRightBottomLeft">
                      <span>515</span>
                    </section>
                    <section class="yspListRightBottomRight">
                      <span>PPM</span>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="c-fireControl-right">
      <Descriptions :descriptionCigfer="descriptionData.config1" :formHeight="formHeight"/>
      <Descriptions :descriptionCigfer="descriptionData.config2" :formHeight="formHeight"/>
      <Descriptions :descriptionCigfer="descriptionData.config3" :formHeight="formHeight"/>
      <Descriptions :descriptionCigfer="descriptionData.config1" :formHeight="formHeight"/>
      <Descriptions :descriptionCigfer="descriptionData.config1" :formHeight="formHeight"/>
    </section>
  </section>
</template>

<script>
import TableCommonConfig from "../../components/TableCommon/TableCommonConfig";
import descriptionsFormData from "../../components/Descriptions/descriptionsFormConfig";
import Descriptions from "../../components/Descriptions/descriptionsForm.vue";
import Gzp from "../../components/Gzp/Gzp.vue";
import TableCommon from "../../components/TableCommon/TableCommon.vue";
export default {
  components: {
    Descriptions,
    Gzp,
    TableCommon,
  },
  data() {
    return {
      descriptionData: {
        config1: descriptionsFormData.descriptionsConfig1,
        config2: descriptionsFormData.descriptionsConfig2,
        config3: descriptionsFormData.descriptionsConfig3,
      },
      GapData: [
        { labelKey: "1" },
        { labelKey: "2" },
        { labelKey: "3" },
        { labelKey: "4" },
        { labelKey: "5" },
        { labelKey: "6" },
        { labelKey: "7" },
        { labelKey: "8" },
        { labelKey: "9" },
        { labelKey: "10" },
        { labelKey: "11" },
        { labelKey: "12" },
        { labelKey: "13" },
        { labelKey: "14" },
        { labelKey: "15" },
        { labelKey: "16" },
        { labelKey: "17" },
        { labelKey: "18" },
        { labelKey: "19" },
        { labelKey: "20" },
        { labelKey: "21" },
        { labelKey: "22" },
        { labelKey: "23" },
        { labelKey: "24" },
        { labelKey: "25" },
        { labelKey: "26" },
        { labelKey: "27" },
        { labelKey: "28" },
        { labelKey: "29" },
        { labelKey: "30" },
        { labelKey: "31" },
        { labelKey: "32" },
        { labelKey: "33" },
        { labelKey: "34" },
        { labelKey: "35" },
        { labelKey: "36" },
        { labelKey: "37" },
        { labelKey: "38" },
        { labelKey: "39" },
        { labelKey: "40" },
        { labelKey: "41" },
        { labelKey: "42" },
        { labelKey: "43" },
        { labelKey: "44" },
        { labelKey: "45" },
        { labelKey: "46" },
        { labelKey: "47" },
        { labelKey: "48" },
        { labelKey: "49" },
        { labelKey: "50" },
        { labelKey: "51" },
        { labelKey: "52" },
        { labelKey: "53" },
        { labelKey: "54" },
        { labelKey: "55" },
        { labelKey: "56" },
        { labelKey: "57" },
        { labelKey: "58" },
        { labelKey: "59" },
        { labelKey: "60" },
      ],
      options: [
        {
          value: "change",
          label: "改变",
        },
        {
          value: "recovery",
          label: "恢复",
        },
      ],
      message: [
        {
          key: "改变的值1",
        },
        {
          key: "改变的值2",
        },
        {
          key: "改变的值3",
        },
        {
          key: "改变的值4",
        },
        {
          key: "改变的值5",
        },
        {
          key: "改变的值6",
        },
        {
          key: "改变的值7",
        },
        {
          key: "改变的值8",
        },
      ],
      message1: {},
      selectValue: "",
      columns: TableCommonConfig.tableConfig1,
      tableHeight: 200,
      menuListArr: [{}, {}, {}],
      yspListArr: [{}, {}, {}],
      formHeight: 176.6,
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    getData() {
      let _this = this;
      this.$axios.get("https://api.vvhan.com/api/weather").then((res) => {
        // console.log(res);
        _this.message1 = res.data.info;
        console.log(_this.message1);
        _this.autoChangeMessage();
      });
    },
    selectChange() {
      console.log(this.selectValue);
      let value = this.selectValue;
      let data1 = this.descriptionData.config3;
      let data2 = this.message;
      if (value == "change") {
        for (let i = 0; i < data2.length; i++) {
          let rowData1 = data2[i];
          for (let j = i + 1; j < data1.length; j++) {
            let rowData2 = data1[j];
            rowData2.mess = rowData1.key;
          }
        }
      }
    },
    autoChangeMessage() {
      let keyArr = [];
      let keyObj = {};
      let data1 = this.descriptionData.config3;
      let data2 = this.message1;
      console.log(data2);
      for (let key in this.message1) {
        keyArr.push(key);
      }
      console.log(keyArr);
      for (let i = 0; i < keyArr.length; i++) {
        for (let j = 0; j < data1.length; j++) {
          if (data1[j].key == keyArr[i]) {
            data1[j].mess = data2[keyArr[i]];
            console.log(data2[keyArr[i]]);
          }
        }
      }
    },
    buttonOpen() {
      const urlPath = require("../../assets/images/newAdd/kai.jpg");
      document.querySelector(".showListTopLeft").style.backgroundColor =
        "green";
      document.querySelector(".showListTopLeftSpan").innerHTML = "开";
      document.querySelector(".showListBottomLeft").style.backgroundImage =
        'url("' + urlPath + '")';
    },
    buttonClose() {
      const urlPath = require("../../assets/images/newAdd/guan.jpg");
      document.querySelector(".showListTopLeft").style.backgroundColor =
        "rgb(119, 148, 190)";
      document.querySelector(".showListTopLeftSpan").innerHTML = "关";
      document.querySelector(".showListBottomLeft").style.backgroundImage =
        'url("' + urlPath + '")';
    },
    menuListClick(index) {
      for (let i = 0; i < this.menuListArr.length; i++) {
        if (index == i) {
          console.log("修改" + i);
          let menuId = "menu" + index;
          let menuId1 = "menu1" + index;
          document.querySelector("#" + menuId).style.color = "yellow";
          document.querySelector("#" + menuId1).style.color = "yellow";
        } else {
          console.log(i);
          let menuId = "menu" + i;
          let menuId1 = "menu1" + i;
          document.querySelector("#" + menuId).style.color = "";
          document.querySelector("#" + menuId1).style.color = "";
        }
      }
    },
  },
};
</script>

<style scoped>
.c-fireControl {
  display: flex;
  height: 100%;
}
.c-fireControl-left {
  display: flex;
  flex-direction: column;
  flex: 3;
  /* width: 800px; */
  /* background-color: black; */
}
.c-fireControl-left-top {
  flex: 1;
  position: relative;
  /* background-color: pink; */
  display: flex;
}
.c-fireControl-left-bottom {
  flex: 1;
  display: flex;
}
.c-fireControl-left-bottom-left {
  /* background-color: yellow; */
  flex: 1;
}
.c-fireControl-left-bottom-right {
  /* background-image: url("../../assets/images/ZongLan/bg.png"); */
  /* background-color: green; */
  flex: 5;
}
.showList {
  padding: var(--middle-space) var(--extra-space);
  margin-left: var(--middle-space);
  margin-bottom: var(--extra-space);
  margin-top: 5px;
  width: 260px;
  height: 160px;
  border: 1px solid var(--gzp-default-border);
  border-radius: 0 25px 0 25px;
  display: flex;
  flex-direction: column;
}
.showListTop {
  /* background-color: rgb(26, 177, 247); */
  flex: 2;
  display: flex;
}
.showListTopLeft {
  background-color: rgb(119, 148, 190);
  width: 40px;
  height: 30px;
  border-radius: 50%;
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 5px;
  text-align: center;
}
.showListTopLeftSpan {
  position: relative;
  top: 5px;
}
.showListTopCenter {
  width: 150px;
}
.showListTopRight {
  width: 35px;
  font-size: 25px;
  text-align: right;
  margin-left: 5px;
  margin-top: 5px;
}
.showListBottom {
  /* background-color: green; */
  flex: 7;
  display: flex;
}
.showListBottomLeft {
  flex: 3;
  margin: 10px 10px;
  background: url("../../assets/images/newAdd/guan.jpg");
}
.showListBottomRight {
  flex: 4;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.brButton {
  background-color: rgb(0 48 156);
  margin: 5px;
  width: 80px;
}
.brButton:hover {
  background-color: (0 48 156);
}
.c-fireControl-right {
  flex: 2;
  /* background-color: rgb(71, 134, 207); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-image: url("../../assets/images/ZongLan/bg.png"); */
}
.c-descriptions {
  border: 1px solid var(--table-default-border);
}

/* *********************************** */
.menuListAll {
  display: flex;
}
.menuList {
  display: flex;
  width: 200px;
  height: 40px;
  padding: var(--middle-space) var(--extra-space);
  margin-left: var(--middle-space);
  margin-bottom: var(--extra-space);
  margin-top: 5px;
  border: 1px solid var(--gzp-default-border);
  border-radius: 12px 12px;
}
.menuListleft {
  font-size: 25px;
  margin-right: 5px;
}
.menuListleft1 {
  margin-top: 2.5px;
  margin-right: 10px;
  font-size: 18px;
}
.menuListRight {
  margin-top: 2.5px;
  margin-right: 10px;
  font-size: 18px;
  color: green;
}
.menuListRight1 {
  width: 30px;
  font-size: 12px;
  /* text-align: center; */
  display: flex;
  flex-direction: column;
}

/* ******************** */
.yspListAll {
  display: flex;
}
.yspList {
  display: flex;
  width: 180px;
  height: 50px;
  padding: var(--middle-space) var(--extra-space);
  margin-left: var(--middle-space);
  margin-bottom: var(--extra-space);
  margin-top: 5px;
  border: 1px solid var(--gzp-default-border);
  border-radius: 12px 12px;
}
.yspListleft {
  background-color: rgb(49, 101, 199);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 5px;
  /* margin-top: 5px; */
  margin-right: 5px;
  text-align: center;
  box-shadow: 0 0 15px rgb(25, 15, 87);
}
.yspListleftSpan {
  position: relative;
  top: 10px;
}
.yspListRight {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.yspListRightTop {
  /* background: green; */
  display: flex;
  justify-content: center;
  font-size: 12px;
}
.yspListRightBottom {
  /* background: orange; */
  display: flex;
  margin-top: 5px;
}
.yspListRightBottomLeft {
  flex: 1;
  color: green;
  font-size: 12px;
  display: flex;
  justify-content: center;
  font-size: 12px;
}
.yspListRightBottomRight {
  flex: 1;
  font-size: 12px;
  display: flex;
  justify-content: center;
  font-size: 12px;
}
</style>