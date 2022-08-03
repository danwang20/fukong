<template>
  <el-form-item :label="curConfig.title" class="c--form-input">
    <el-checkbox-group
      v-model="curConfig.checkedCities"
      @change="handleCheckedChange"
    >
      <el-checkbox
        v-for="checked in curConfig.chaeckData"
        :label="checked"
        :key="checked"
        >{{ checked }}</el-checkbox
      >
    </el-checkbox-group>
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
    handleCheckedChange(data) {
      console.log(data);
    },
  },
};
</script>
