<template>
  <div>
    <el-form
      ref="form"
      :label-width="labelWidth + 'px'"
      :inline="true"
      size="mini"
      class="c-desForm"
      :style="{ height: formHeight + 'px' }"
    >
      <div class="c-formTitle">{{ desTitle }}</div>
      <section
        v-for="(item, index) in descriptionCigfer"
        :key="index"
        class="c-desForm-item"
      >
        <DescriptionsFormItem :itemData="item" />
      </section>
    </el-form>
  </div>
</template>

<script>
import descriptionsFormData from "./descriptionsFormConfig";
import DescriptionsFormItem from "./descriptionsFormItem.vue";
export default {
  components: {
    DescriptionsFormItem,
  },
  data() {
    return {
      datas: descriptionsFormData.descriptionsConfig1,
    };
  },

  mounted() {},
  props: {
    descriptionCigfer: {
      type: Array,
      default: () => [],
    },
    formHeight: {
      type: Number,
      default: 0,
    },
    desTitle: {
      type: String,
      default: "xxxx",
    },
    labelWidth: {
      type: Number,
      default: 120
    }
  },
};
</script>

<style scoped>
.c-desForm {
  border: 1px solid var(--message-box-border);
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
}
.c-desForm-item {
  height: 30px;
}
.c-formTitle {
  width: 100%;
  height: 20px;
  background-color: blue;
  text-align: center;
  padding: 1px 0px;
}
</style>