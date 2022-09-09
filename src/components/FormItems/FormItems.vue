<template>
  <div class="form-items-wrapper c--form-items">
    <el-form
      ref="formValidate"
      :inline="curOption.inline"
      :size="curOption.size"
      :label-width="curOption.labelWidth"
      :label-position="curOption.labelPosition"
      :disabled="curOption.disabled"
      :model="formValidate"
      class="c--form"
    >
      <template v-for="(item, index) in formItems">
        <FormInput
          v-if="item.type == 'input'"
          :key="index"
          :curConfig="item.configData"
          :methods="item.methods"
        />
        <FormSelect
          v-if="item.type == 'select'"
          :key="index"
          :curConfig="item.configData"
          :methods="item.methods"
        />
        <DatePicker
          v-if="item.type == 'datePicker'"
          :key="index"
          :curConfig="item.configData"
          :methods="item.methods"
        />
        <Checkbox
          v-if="item.type == 'checkbox'"
          :key="index"
          :curConfig="item.configData"
          :methods="item.methods"
        />
        <FormButton
          v-if="item.type == 'button'"
          :key="index"
          :curConfig="item.configData"
          :methods="item.methods"
          :postData="item.postData"
        />
      </template>
    </el-form>
  </div>
</template>

<script>
import FormItemsConfig from "./FormItemsConfig";
import FormInput from "./FormInput/FormInput.vue";
import FormSelect from "./FormSelect/FormSelect.vue";
import DatePicker from "./FormDatePicker/DatePicker.vue";
import Checkbox from "./FormCheckbox/Checkbox.vue";
import FormButton from "./FormButton/FormButton.vue";
export default {
  components: { FormInput, FormSelect, DatePicker, Checkbox, FormButton },
  data() {
    return {
      formValidate: {},
      curOption: FormItemsConfig.curOption,
      // defaultMethods: {
      //   selectChange(data) {
      //     console.log(data);
      //   },
      //   inputChange(data) {
      //     console.log(data);
      //   },
      //   changeDatePicker(data) {
      //     console.log(data);
      //   },
      //   handleCheckedChange(data) {
      //     console.log(data);
      //   },
      // },
    };
  },
  computed: {
    // curMethods() {
    //   return Object.assign({}, this.defaultMethods, this.methods);
    // },
  },
  props: {
    formItems: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.c--form {
  display: flex;
  flex-wrap: wrap;
}
</style>