<template>
  <el-form-item :label="curConfig.title" class="c--form-select">
    <el-select
      v-model="curConfig.selected"
      :disabled="curConfig.disabled"
      :placeholder="curConfig.placeholder"
      :clearable="curConfig.clearable"
      popper-class="itemSelect"
      :popper-append-to-body="true"
      @change="curMethods.selectChange"
    >
      <el-option
        v-for="(list, idx) in filterLists"
        :key="idx"
        :label="list[curConfig.labelKey]"
        :value="list[curConfig.valueKey]"
      >
        {{ list[curConfig.labelKey] }}
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      filterLists: [
        {
          labelKey: "选项1",
          valueKey: "value1",
        },
        {
          labelKey: "选项2",
          valueKey: "value2",
        },
        {
          labelKey: "选项3",
          valueKey: "value3",
        },
      ],
      defaultMethods: {
        selectChange(data) {
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