
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
      isStatic: false,
    };
  },
  watch: {
    "$route.fullPath": {
      deep: true,
      handler(val) {
        console.log("path:", val);
      },
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
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
  padding: 0 calc(var(--extra-space) * 2);
}
</style>
