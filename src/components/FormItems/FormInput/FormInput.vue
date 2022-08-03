<template>
  <el-form-item :label="curConfig.title" class="c--form-input">
    <el-input
      placeholder="请输入内容"
      v-model="curConfig.value"
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
    
    };
  },
  props: {
    curConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    inputChange(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
</style>