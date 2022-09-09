<template>
  <el-form-item :label="curConfig.title" class="c--form-datePicker">
    <el-date-picker
      v-model="datePickerData"
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
    return {
      defaultMethods: {
        changeDatePicker(data) {
          console.log(data);
        },
      },
      datePickerData: "",
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
    changeDatePicker(data) {
      let date = JSON.stringify(data)
      this.$store.commit("getFormData", ['datepicker',date]);
      console.log(JSON.parse(this.$store.state.formData.datepicker));
    },
  },
};
</script>

<style scoped>
</style>