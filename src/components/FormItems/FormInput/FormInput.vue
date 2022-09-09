<template>
  <el-form-item :label="curConfig.title" class="c--form-input">
    <el-input
      placeholder="请输入内容"
      v-model="value"
      @change="inputChange"
      clearable
    >
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      defaultMethods: {
        inputChange(data) {
          console.log(data);
        },
      },
      value: "",
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
  methods: {
    inputChange(data) {
      this.$store.commit("getFormData", [this.curConfig.name, data]);
      console.log(this.$store.state.formData);
    },
  },
};
</script>

<style scoped>
</style>