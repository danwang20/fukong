<template>
  <el-form-item :label="curConfig.title" class="c--form-input">
    <el-checkbox-group
      v-model="curConfig.checkedCities"
      @change="curMethods.handleCheckedChange"
    >
      <el-checkbox
        v-for="(checked, index) in curConfig.chaeckData"
        :label="checked"
        :key="index"
        >{{ checked }}</el-checkbox
      >
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      defaultMethods: {
        handleCheckedChange(data) {
          console.log(data);
        },
      },
      checkedCities: "",
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
  methods: {},
};
</script>
