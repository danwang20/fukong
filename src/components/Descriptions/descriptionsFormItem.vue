<template>
  <div>
    <el-form-item v-if="itemData.type === 'input'" :label="itemData.label">
      <el-input
        v-model="itemData.value"
        :style="{ width: itemData.inputWidth + 'px' }"
        @change="inputChange(itemData.value)"
      ></el-input>
    </el-form-item>
    <el-form-item v-if="itemData.type === 'text'" :label="itemData.label">
      <div class="messBox" :style="{ maxWidth: itemData.textWidth + 'px' }">
        {{ itemData.mess }}
      </div>
    </el-form-item>
    <el-form-item v-if="itemData.type === 'button'" :label="itemData.label">
      <el-button @click="buttonLink">按钮</el-button>
    </el-form-item>
    <el-form-item v-if="itemData.type === 'state'" :label="itemData.label">
      <span
        :class="{ 'network-normal': !itemData.networkStatus }"
        class="network-warning"
        :title="!itemData.networkStatus ? '在线' : '离线'"
      ></span>
    </el-form-item>
    <el-form-item v-if="itemData.type === 'empty'" :label="itemData.label">
      <div :style="{ width: itemData.emptyWidth + 'px' }">
        {{ itemData.mess }}
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.itemData);
  },
  methods: {
    buttonLink() {
      console.log("点击了按钮");
    },
    inputChange(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
.messBox {
  /* background-color: green; */
}

.network-warning {
  position: relative;
  font-size: 14px;
  padding-left: 14px;
  z-index: 2;
}

.network-warning:after {
  position: absolute;
  content: "";
  display: block;
  right: -12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  top: 12px;
  transform: translate(0, -50%);
  background-color: rgb(10, 214, 71);
  cursor: pointer;
}
</style>