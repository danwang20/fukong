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
        />
        <FormSelect
          v-if="item.type == 'select'"
          :key="index"
          :curConfig="item.configData"
        />
        <DatePicker
          v-if="item.type == 'datePicker'"
          :key="index"
          :curConfig="item.configData"
        />
        <Checkbox
          v-if="item.type == 'checkbox'"
          :key="index"
          :curConfig="item.configData"
        />
        <FormButton
          v-if="item.type == 'button'"
          :key="index"
          :curConfig="item.configData"
          :buttonMethods="item.configMethods"
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
    };
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