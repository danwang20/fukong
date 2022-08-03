<template>
  <el-form-item :label="curConfig.title" class="c--form-datePicker">
    <el-date-picker
      v-model="curConfig.datePickerData"
      type="datetimerange"
      :picker-options="curConfig.pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      @change="changeDatePicker"
    >
    </el-date-picker>
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
  },
  methods: {
    changeDatePicker(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
</style>