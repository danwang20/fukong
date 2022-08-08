<template>
  <el-form-item :label="curConfig.title" class="c--form-input">
    <el-input
      placeholder="请输入内容"
      v-model="curConfig.value"
      @change="curMethods.inputChange"
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
   
  },
};
</script>

<style scoped>
</style>