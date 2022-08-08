<template>
  <el-form-item :label="curConfig.title">
    <el-button :type="curConfig.type" @click="curMethods.buttonClick" plain>{{
      curConfig.buttonName
    }}</el-button>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      defaultMethods: {
        buttonClick() {
          console.log("点击了按钮");
        },
      },
    };
  },
  props: {
    curConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    methods: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    curMethods() {
      return Object.assign({}, this.defaultMethods, this.methods);
    },
  },
  methods: {},
};
</script>

<style scoped>
.c--form-button {
  position: relative;
  left: 10px;
}
</style>