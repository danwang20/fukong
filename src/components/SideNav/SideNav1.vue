<template>
  <aside
    class="side-nav c--side-nav"
    :class="{'side-nav-static': type === 'static', 'side-nav-hidden': isHidden}"
    @transitionend="transEnd"
  >
    <div class="side-nav-control" @click="isHidden = !isHidden">
      <i :class="!isHidden ? 'el-icon-caret-left' : 'el-icon-caret-right'" />
    </div>
     <div >
    
    </div>  
    <div class="side-nav-wrapper">
     <el-input
     v-show="isHome"
    placeholder="输入关键字进行过滤"
    v-model="filterText"
     >
    </el-input>
      <el-tree
        default-expand-all
        ref="sTree"
        :data="menuLists"
        :props="defaultProps"
        :render-content="renderContent"
        :highlight-current="true"
        :filter-node-method="filterNode"
        @node-click="linkHandler"
      >
        <span class="custom-tree-node el-icon-platform-eleme">

        </span>
      </el-tree>
    </div>
  </aside>
</template>

<script>
import MixinNav from "../../mixins/mixin.nav";
export default {
  name: "SideNav",
  mixins: [MixinNav],
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
          label: "pageName",
        };
      },
    },
  },
  data() {
    
    return {
      filterText: '', 
      isHome:false,
      defaultProps: this.treeProps,
      isHidden: true,
    };
  },
  watch: {
    "$route.fullPath": {
      deep: true,
      handler() {
        let val = this.$route.params.pid;
        let navList = this.matchNavList(val, this.menuLists);
        if (!navList) return false;
        this.$refs.sTree.setCurrentKey(navList.id);
        this.savePageMsg(navList.id);
      }, 
    },
    filterText(val) {
        this.$refs.sTree.filter(val);
    },
    type(val) {
      if (val === "static") return false;
      this.checkNavDisplay();
    },
    lists: {
        deep: true,
        immediate: true,
        handler (value) {
          this.$nextTick(() => {
            if (this.mode !== 'station' || !value) return false
          })
        }
      }
  },
  beforeUpdate(){
      let path = this.$route.fullPath
      if(path==="/HomePage") {
        this.isHome = true
      }
      else this.isHome = false
  },
  mounted() {
    // 如果是展示全站列表，停止进行重定向
    if (this.mode === "station") return false;
    // 侧栏处于浮动状态的时候自动隐藏
    if (this.type === "fixed") this.checkNavDisplay();
    // 更新首页id
    let navList = this.matchNavList(this.$route.params.pid, this.menuLists);
    // 将合并了PATH后的新的菜单列表进行保存
    sessionStorage.setItem("menuLists", JSON.stringify(this.menuLists));
    // 由于有的用户不一定有首页和系统配置页面，根据其导航列表进行页面重定向
    if (!navList && this.menuLists.length > 0) {
      // 因为首页不在Container子页面内部，需要跳转到Home，所以跳过首页
      let list = this.menuLists[0].pageName.includes("首页") ? this.menuLists[1]: this.menuLists[0];
      if (list.pageName.includes("系统配置")) list = list.children[0];
      list && list.path && this.$router.push(list.path);
      this.$refs.sTree.setCurrentKey(list.id);
      list && this.savePageMsg(list.id);
      return false;
    }
    // 保存页面主键id
    this.$refs.sTree.setCurrentKey(navList.id);
    this.savePageMsg(navList ? navList.id : 2);
  },
  methods: {

    filterNode(value, data) {
      if (!value) return true;
      if(data.pageName){
       return data.pageName.indexOf(value) !== -1
      }
    },
    // 匹配对应的导航对象
    matchNavList(pid = "", items) {
      if (!pid) return null;
      for (let [i, len] = [0, items.length]; i < len; i++) {
        let item = items[i];
        if (item.id * 1 === pid * 1) return item;
        if (!item.children || item.children.length === 0) continue;
        let res = this.matchNavList(pid, item.children);
        if (res) return res;
      }
      return null;
    },

    // 侧栏动画完成时，重新计算表格尺寸
    transEnd() {
      if (this.type === "static") this.$store.commit("refreshTable", true);
    },
    // 检测是否需要默认隐藏侧栏
    checkNavDisplay() {
      this.isHidden = true;
    },
    // 渲染函数
    renderContent(h, { node, data, store }) {
      // eslint-disable-next-line
      return (
        <span class="custom-tree-node" title={node.label}>
          {node.label}
        </span>
      );
    },
  },
};
</script>

<style scoped>
.side-nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  min-width: 220px;
  max-height: 100%;
  height: 100%;
  border: 1px solid var(--side-nav-border);
  padding: var(--large-space);
  background-color: var(--side-nav-background-color);
  transform-style: preserve-3d;
  transform: translateZ(1px);
  transition: margin-left 0.2s linear;
  margin-left: 0;
  z-index: 10;
}
.side-nav-hidden {
  margin-left: -220px;
}
.side-nav-static {
  position: relative;
}
.dian {
  width: 10px;
  height: 10px;
  background: red;
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
  width: 15px;
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
 
</style>
