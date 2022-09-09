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
    postData: {
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
  mounted() {
    console.log(this.postData);
  },
  methods: {
    buttonClick() {
      // this.$store.commit("getFormData", ['input0','123']);
      // this.$store.commit("getFormData", ['input1','123']);
      // this.$store.commit("getFormData", ['input2','123']);
      // this.$store.commit("getFormData", ['input3','123']);
      // this.$store.commit("getFormData", ['input4','123']);
      console.log(this.$store.state.formData);
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