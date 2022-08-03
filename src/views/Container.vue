
<template>
  <section key="container" class="container p--container">
    <TopTitle />
    <section class="c-container">
      <SideNav :type="isStatic ? 'static' : ''" />
      <div class="c-content">
        <router-view />
      </div>
    </section>
    <BottomNav />
  </section>
</template>

<script>
import SideNav from "../components/SideNav/SideNav.vue";
import TopTitle from "../components/TopTitle/TopTitle";
import BottomNav from "../components/BottomNav/BottomNav.vue";

export default {
  components: {
    SideNav,
    TopTitle,
    BottomNav,
  },
  data() {
    return {
      isStatic: true,
      viewHeight: 883,
    };
  },
  watch: {
    getViewHeight: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
  },
  computed: {
    getViewHeight() {
      return this.getTableMaxHeight();
    },
  },
  created() {},
  mounted() {
    // this.getTableMaxHeight();
    // let _this = this;
    // window.onresize = function () {
    //   _this.getTableMaxHeight();
    // };
  },
  methods: {
    getTableMaxHeight() {
      this.$nextTick(function () {
        let box = document.querySelector(".c-content").attributes;
        let box_clientWidth = box[0].ownerElement.clientWidth;
        console.log(box_clientWidth);
        return box_clientWidth;
      });
    },
  },
};
</script>
<style scoped='less'>
.container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.c-container {
  position: relative;
  flex: 1;
  display: flex;
  overflow: hidden;
}
.c-content {
  position: relative;
  flex: 1;
  /* height: 100% - 153px; */
  padding: 0 calc(var(--extra-space) * 2);
}
</style>
