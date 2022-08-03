<template>
  <footer class="bottom-nav c--bottom-nav">
    <nav class="botton-nav-container">
      <li
        v-for="(list, index) in menuLists"
        :key="index"
        @click="linkHandler(list)"
      >
        {{ list.pageName }}
      </li>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "BottomNav",
  data() {
    return {
      menuLists: [
        { path: "/quanzhan", pageName: "全站报文" },
        { path: "/zhongkong", pageName: "越限信息" },
        { path: "Track", pageName: "异常设备" },
        { path: "Echarts", pageName: "消防系统" },
        { path: "ScrollTry", pageName: "安全防范" },
        { path: "TreeTry", pageName: "在线监测" },
        { path: "Gzp", pageName: "给排水系统" },
        { path: "flexTry", pageName: "环境监测" },
        { path: "TableTry", pageName: "照明控制" },
        { path: "flexTry1", pageName: "智能锁控" },
        { path: "TableTry1", pageName: "智能联动" },
      ],
    };
  },
  methods: {
    linkHandler(data) {
      console.log(data);
      let nowPath = this.$route.path;
      console.log(nowPath);
      if (nowPath != data.path) {
        this.$router.push(data.path);
      }
    },
  },
};
</script>

<style scoped>
.bottom-nav {
  position: relative;
  z-index: 2;
  cursor: pointer;
  font-weight: 700;
  padding-top: 4px;
}

.botton-nav-container {
  position: relative;
  height: 35px;
  line-height: 35px;
  display: flex;
  padding: 0 calc(var(2px));
  text-align: center;
}

li {
  flex-grow: 1;
  background: url("../../assets/images/Nav/BottomNav/no_choose.png") no-repeat
    center center;
  background-size: 100% 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 100%;
  list-style: none;
  color: white;
}

li:hover,
li.active {
  background-image: url("../../assets/images/Nav/BottomNav/yes_choose.png");
}
li.alarm {
  background-image: url("../../assets/images/Nav/BottomNav/alarm_choose.png");
}
</style>