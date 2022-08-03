<template>
  <el-form-item :label="curConfig.title">
    <el-button :type="curConfig.type" @click="buttonClick" plain>{{
      curConfig.buttonName
    }}</el-button>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    curConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    buttonMethods: {
      type: String,
      default: "",
    },
  },
  computed: {
    btnMethods() {
      return this.buttonMethods;
    },
  },
  methods: {
    buttonClick() {
      let funName = this.btnMethods;
      switch (funName) {
        case "methods1": {
          this.methods1();
          break;
        }
        case "methods2": {
          this.methods2();
          break;
        }
      }
      console.log("点击了按钮");
    },
    methods1() {
      console.log("方法一");
    },
    methods2() {
      console.log("方法二");
    },
  },
};
</script>

<style scoped>
.c--form-button {
  position: relative;
  left: 10px;
}
</style>