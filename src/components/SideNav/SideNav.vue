<template>
  <aside
    class="side-nav c--side-nav"
    :class="{
      'side-nav-static': type === 'static',
      'side-nav-hidden': isHidden,
    }"
  >
    <div
      class="side-nav-control"
      @click="changeIsHidden"
      @mousemove="mouseEvent"
    >
      <i :class="!isHidden ? 'el-icon-caret-left' : 'el-icon-caret-right'" />
    </div>
    <div class="side-nav-wrapper">
      <!-- <el-input
        v-show="isHome"
        placeholder="输入关键字进行过滤"
        v-model="filterText"
      >
      </el-input> -->
      <el-tree
        class="tree"
        :default-expand-all="true"
        ref="sTree"
        :data="menuLists"
        :props="defaultProps"
        :render-content="renderContent"
        node-key="id"
        :expand-on-click-node="false"
        :highlight-current="true"
        :filter-node-method="filterNode"
        :current-node-key="currentKey"
        @node-click="linkHandler"
      />
    </div>
  </aside>
</template>

<script>
// import MixinNav from "../../mixins/mixin.nav";

export default {
  name: "SideNav",
  // mixins: [MixinNav],
  props: {
    type: {
      type: String,
      default: "fixed",
    },
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "value",
        };
      },
    },
  },
  data() {
    return {
      filterText: "",
      isHome: true,
      defaultProps: this.treeProps,
      isHidden: false,
      id: "",
      currentKey: 0,
      menuLists: [
        {
          id: 0,
          text: "全站总览",
          value: "全站总览",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          children: [],
        },
        {
          id: 1,
          text: "Same but with checkboxes",
          value: "消防系统",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          path: "/fireControlSystem",
          children: [
            {
              id: 100,
              text: "火灾报警",
              value: "火灾报警",
              icon: "",
              opened: false,
              selected: true,
              disabled: false,
              loading: false,
              path: "/fireAlarm",
              children: [
                {
                  id: 1000,
                  text: "火灾报警主机",
                  value: "火灾报警主机",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/fireAlarmHost",
                },
                {
                  id: 1001,
                  text: "生产综合楼1楼",
                  value: "生产综合楼1楼",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/productionComplexBuilding",
                },
              ],
            },
            {
              id: 101,
              text: "custom icon",
              value: "变压器排油注氮灭火",
              icon: "fa fa-warning icon-state-danger",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              path: "/byqpyzdmh",
              children: [
                {
                  id: 1010,
                  text: "火灾报警主机",
                  value: "主机",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/pyzdmhzj",
                },
                {
                  id: 1011,
                  text: "生产综合楼1楼",
                  value: "2号主变排油注氮灭火",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/2hzbpyzdmh",
                },
              ],
            },
            {
              id: 102,
              text: "custom icon",
              value: "遥控操作查询",
              icon: "fa fa-warning icon-state-danger",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 103,
              text: "custom icon",
              value: "变压器泡沫灭火",
              icon: "fa fa-warning icon-state-danger",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              path: "/byqpmmh",
              children: [
                {
                  id: 1030,
                  text: "火灾报警主机",
                  value: "主机",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/byqpmmhZj",
                },
                {
                  id: 1031,
                  text: "生产综合楼1楼",
                  value: "2号主变泡沫灭火",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/zbpmmh",
                },
              ],
            },
            {
              id: 104,
              text: "custom icon",
              value: "变压器水喷雾灭火",
              icon: "fa fa-warning icon-state-danger",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              path: "/byqspwmh",
              children: [
                {
                  id: 1040,
                  text: "火灾报警主机",
                  value: "主机",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/byqspwZj",
                },
                {
                  id: 1041,
                  text: "生产综合楼1楼",
                  value: "2号主变水喷雾灭火",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/zbspwmh",
                },
              ],
            },
            {
              id: 105,
              text: "custom icon",
              value: "气体灭火系统界面",
              icon: "fa fa-warning icon-state-danger",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              path: "/qtmhxt",
              children: [
                {
                  id: 1050,
                  text: "火灾报警主机",
                  value: "消火栓系统",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/xhsxt",
                },
                {
                  id: 1051,
                  text: "生产综合楼1楼",
                  value: "灭火器配置",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/mhqpz",
                },
                {
                  id: 1052,
                  text: "生产综合楼1楼",
                  value: "消防应急照明及疏散指示系统",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                  path: "/xfyjzmjsszsxt",
                },
              ],
            },
            {
              id: 106,
              text: "custom icon",
              value: "电缆沟系统界面",
              icon: "fa fa-warning icon-state-danger",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
          ],
        },
        {
          id: 2,
          text: "Same but with checkboxes",
          value: "安全防范",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          path: "/safetyPrecautions",
          children: [
            {
              id: 200,
              text: "火灾报警",
              value: "变电站周边",
              icon: "",
              opened: false,
              selected: true,
              disabled: false,
              loading: false,
              path: "/aroundTheSubstation",
            },
            {
              id: 201,
              text: "火灾报警",
              value: "室内红外双鉴",
              icon: "",
              opened: false,
              selected: true,
              disabled: false,
              loading: false,
            },
            {
              id: 202,
              text: "火灾报警",
              value: "门禁系统",
              icon: "",
              opened: false,
              selected: true,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 2020,
                  text: "火灾报警主机",
                  value: "生产综合一楼门禁控制器1",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 2021,
                  text: "火灾报警主机",
                  value: "生产综合一楼门禁控制器2",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 2022,
                  text: "火灾报警主机",
                  value: "生产综合一楼门禁控制器3",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 2023,
                  text: "火灾报警主机",
                  value: "门禁记录",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
          ],
        },
        {
          id: 3,
          text: "Same but with checkboxes",
          value: "在线监测",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          children: [
            {
              id: 300,
              text: "Same but with checkboxes",
              value: "油色谱在线监测",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 3001,
                  text: "Same but with checkboxes",
                  value: "2号主变油色谱",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 3002,
                  text: "Same but with checkboxes",
                  value: "阈值配置",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
            {
              id: 301,
              text: "Same but with checkboxes",
              value: "Gis局放在线监测",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 3011,
                  text: "Same but with checkboxes",
                  value: "2215开关间隔",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 3012,
                  text: "Same but with checkboxes",
                  value: "Gis阈值配置",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
            {
              id: 302,
              text: "Same but with checkboxes",
              value: "主变局放在线监测",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 3020,
                  text: "Same but with checkboxes",
                  value: "2号主变局放",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 3021,
                  text: "Same but with checkboxes",
                  value: "主变阈值配置",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
            {
              id: 303,
              text: "Same but with checkboxes",
              value: "避雷器在线监测",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 3030,
                  text: "Same but with checkboxes",
                  value: "220v避雷器在线监测",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 3031,
                  text: "Same but with checkboxes",
                  value: "避雷器阈值配置",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
            {
              id: 304,
              text: "Same but with checkboxes",
              value: "GISSF6压力在线监测",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 3040,
                  text: "Same but with checkboxes",
                  value: "2245甲母联间隙",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 3041,
                  text: "Same but with checkboxes",
                  value: "GISSF6阈值配置",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
            {
              id: 305,
              text: "Same but with checkboxes",
              value: "室内SF6压力在线监测",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 3050,
                  text: "Same but with checkboxes",
                  value: "220kvGIS室",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
                {
                  id: 3051,
                  text: "Same but with checkboxes",
                  value: "室内SF6阈值配置",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
          ],
        },
        {
          id: 4,
          text: "Same but with checkboxes",
          value: "给排水系统",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          path: '/waterSupplyAndDrainage',
          children: [
            {
              id: 400,
              text: "Same but with checkboxes",
              value: "给水系统",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              path: '/waterSupplySystem',
            },
            {
              id: 401,
              text: "Same but with checkboxes",
              value: "排水系统",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              path: '/drainageSystem',
            },
            {
              id: 402,
              text: "Same but with checkboxes",
              value: "给排水阈值设置",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
          ],
        },
        {
          id: 5,
          text: "Same but with checkboxes",
          value: "环境监测",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          path: '/environmentalMonitoring',
          children: [
            {
              id: 500,
              text: "Same but with checkboxes",
              value: "生产综合楼1楼空调暖通",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              children: [
                {
                  id: 5001,
                  text: "Same but with checkboxes",
                  value: "生产综合楼1楼空调暖通",
                  icon: "",
                  opened: false,
                  selected: false,
                  disabled: false,
                  loading: false,
                },
              ],
            },
            {
              id: 501,
              text: "Same but with checkboxes",
              value: "环境监测阈值配置",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 502,
              text: "Same but with checkboxes",
              value: "站区气象监测",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
          ],
        },
        {
          id: 6,
          text: "Same but with checkboxes",
          value: "照明控制",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          path: '/zhaoming',
          children: [
            {
              id: 600,
              text: "Same but with checkboxes",
              value: "办公综合楼",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
              path: "/zhongkong",
            },
            {
              id: 601,
              text: "Same but with checkboxes",
              value: "联动配置",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
          ],
        },
        {
          id: 7,
          text: "Same but with checkboxes",
          value: "智能锁控",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          children: [
            {
              id: 700,
              text: "Same but with checkboxes",
              value: "锁具管理",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 701,
              text: "Same but with checkboxes",
              value: "开锁任务",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 702,
              text: "Same but with checkboxes",
              value: "开锁任务历史",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
          ],
        },
        {
          id: 8,
          text: "Same but with checkboxes",
          value: "智能联动",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          children: [
            {
              id: 800,
              text: "Same but with checkboxes",
              value: "联动事件历史查询",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 801,
              text: "Same but with checkboxes",
              value: "主设备智能联动配置",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 802,
              text: "Same but with checkboxes",
              value: "智能联动配置",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
          ],
        },
        {
          id: 9,
          text: "Same but with checkboxes",
          value: "门禁控制",
          icon: "",
          opened: false,
          selected: false,
          disabled: false,
          loading: false,
          children: [
            {
              id: 900,
              text: "Same but with checkboxes",
              value: "门禁参数控制",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 901,
              text: "Same but with checkboxes",
              value: "门禁记录网络设置",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 902,
              text: "Same but with checkboxes",
              value: "门禁控制状态记录信息",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
            {
              id: 903,
              text: "Same but with checkboxes",
              value: "门禁权限管理",
              icon: "",
              opened: false,
              selected: false,
              disabled: false,
              loading: false,
            },
          ],
        },
      ],
    };
  },
  watch: {
    // "$route.fullPath": {
    //   deep: true,
    //   handler() {
    //     let path = this.$route.fullPath;
    //     if (path === "/HomePage") {
    //       this.isHome = true;
    //     } else {
    //       this.isHome = false;
    //     }
    //     let val = this.$route.params.pid;
    //     let navList = this.matchNavList(val, this.menuLists);
    //     if (!navList) return false;
    //     this.$refs.sTree.setCurrentKey(navList.id);
    //     this.savePageMsg(navList.id);
    //   },
    // },
    // type(val) {
    //   if (val === "static") return false;
    //   this.checkNavDisplay();
    // },
    // filterText(val) {
    //   this.$refs.sTree.filter(val);
    // },
    // lists: {
    //   deep: true,
    //   immediate: true,
    //   handler(value) {
    //     this.$nextTick(() => {
    //       if (this.mode !== "station" || !value) return false;
    //     });
    //   },
    // },
  },
  mounted() {
    this.$nextTick(function () {
      // this.currentKey=this.menuLists[0].id
      this.$nextTick(() => {
        // myTree 数组件的ref  默认让第一项高亮
        // data是树组件对应的数据
        // 通过data中的第一项的id找到对应的节点，然后把这个节点设置为高亮
        this.$refs.sTree.setCurrentKey(this.menuLists[0].id);
      });
    });

    // if (this.$route.fullPath === "/HomePage") {
    //   this.isHome = true;
    // } else {
    //   this.isHome = false;
    // }
    // // 如果是展示全站列表，停止进行重定向
    // if (this.mode === "station") return false;
    // // 侧栏处于浮动状态的时候自动隐藏
    // if (this.type === "fixed") this.checkNavDisplay();
    // // 更新首页id
    // let navList = this.matchNavList(this.$route.params.pid, this.menuLists);
    // console.log(navList, "数据2");
    // // 将合并了PATH后的新的菜单列表进行保存
    // sessionStorage.setItem("menuLists", JSON.stringify(this.menuLists));
    // // 由于有的用户不一定有首页和系统配置页面，根据其导航列表进行页面重定向
    // if (!navList && this.menuLists.length > 0) {
    //   // 因为首页不在Container子页面内部，需要跳转到Home，所以跳过首页

    //   let list = this.menuLists[0].pageName.includes("首页")
    //     ? this.menuLists[1]
    //     : this.menuLists[0];
    //   if (list.pageName.includes("系统配置")) list = list.children[0];
    //   list && list.path && this.$router.push(list.path);
    //   this.$refs.sTree.setCurrentKey(list.id);
    //   list && this.savePageMsg(list.id);
    //   return false;
    // }
    // // 保存页面主键id
    // this.$refs.sTree.setCurrentKey(navList.id);
    // this.savePageMsg(navList ? navList.id : 2);
  },
  beforeUpdate() {
    // const that = this;
    // if (
    //   (this.$route.fullPath === "/GaoJing" ||
    //     this.$route.fullPath === "/Yichang" ||
    //     this.$route.fullPath === "/Yuexian") &&
    //   this.menuLists[0].children[0].name !== "首页"
    // ) {
    //   this.menuLists[0].children.unshift({
    //     children: [],
    //     creator: "点位导入",
    //     id: 0,
    //     isDisable: 0,
    //     pageId: "首页0",
    //     name: "首页",
    //     parentId: "PAGE_ROOT_ID",
    //     path: "/HomePage",
    //     stationId: 0,
    //     stationMc: "",
    //     swUrl: "",
    //     typeId: 0,
    //   });
    // }
  },
  methods: {
    linkHandler(data, value) {
      console.log(data, value);
      if (data.path) {
        this.$router.push(data.path);
      } else {
        alert("暂没有路由！");
      }
    },
    changeIsHidden() {
      if (this.isHidden === false) {
        this.isHidden = true;
        this.$store.commit("changeIsHidden", true);
        sessionStorage.setItem("isHiddle", true);
        // this.$emit('changeHidden', true)
        // console.log(this.$store.state.isHidden);
      }
    },
    mouseEvent() {
      if (this.isHidden === true) {
        this.isHidden = false;
        this.$store.commit("changeIsHidden", false);
        sessionStorage.setItem("isHiddle", false);
        // this.$emit('changeHidden', false)
        // console.log(this.$store.state.isHidden);
      } else return false;
    },
    // // 匹配对应的导航对象
    // matchNavList(pid = "", items) {
    //   if (!pid) return null;
    //   for (let [i, len] = [0, items.length]; i < len; i++) {
    //     let item = items[i];
    //     if (item.id * 1 === pid * 1) return item;
    //     if (!item.children || item.children.length === 0) continue;
    //     let res = this.matchNavList(pid, item.children);
    //     if (res) return res;
    //   }
    //   return null;
    // },
    // // 侧栏动画完成时，重新计算表格尺寸
    // transEnd() {
    //   if (this.type === "static") this.$store.commit("refreshTable", true);
    // },
    // // 检测是否需要默认隐藏侧栏
    // checkNavDisplay() {
    //   this.isHidden = true;
    // },
    // 渲染函数
    renderContent(h, { node, data, store }) {
      // eslint-disable-next-line
      return (
        <span class="custom-tree-node" title={node.value}>
          {node.label}
        </span>
      );
    },
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      let roleIds = sessionStorage.getItem("roleIds");
      let userName = sessionStorage.getItem("userName");
      // return !data.name.includes(value)
      return data.name.indexOf(value) !== -1;
    },
  },
};
</script>

<style scoped>
.side-nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 320px;
  min-width: 320px;
  height: 100%;
  border: 1px solid var(--side-nav-border);
  padding: var(--large-space);
  background-color: var(--side-nav-background-color);
  transform-style: preserve-3d;
  transform: translateZ(1px);
  transition: margin-left 0.2s linear;
  margin-left: 0;
  z-index: 4999;
}
.side-nav-hidden {
  margin-left: -320px;
}
.side-nav-static {
  position: relative;
}
.side-nav-wrapper {
  position: relative;
  height: 100%;
  overflow-y: auto;
  border: 1px solid var(--side-nav-border);
}
.side-nav-control {
  position: absolute;
  top: 30px;
  left: 100%;
  width: 10px;
  height: 100px;
  line-height: 100px;
  background-color: var(--side-nav-border);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-size: 12px;
}

.tree {
  background: transparent;
}
.treeColor {
  color: #feeb92;
  padding-left: 10px;
}
.tree /deep/ .el-tree-node__content {
  height: 24px;
}
.tree /deep/ .el-tree-node {
  position: relative;
  padding-left: 0;
}
.tree /deep/ .el-tree-node__expand-icon {
  font-size: 18px;
  color: #def5fe;
}
.tree /deep/ .el-tree-node__expand-icon.is-leaf {
  color: transparent;
  cursor: default;
}
.tree /deep/ .el-tree-node__children {
  padding-left: 19px;
}

.tree /deep/ .el-tree-node :last-child:before {
  height: 12px;
}

.tree /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree /deep/ .el-tree-node:before {
  content: "";
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
  border-left: 1px dotted #5abcde;
  bottom: 0px;
  height: 100%;
  top: 0px;
  width: 1px;
}

.tree /deep/ .el-tree-node:after {
  content: "";
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
  border-top: 1px dotted #5abcde;
  height: 20px;
  top: 12px;
  width: 10px;
}
</style>
