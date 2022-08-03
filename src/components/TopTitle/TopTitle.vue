<template>
  <header class="top-title c--top-title">
    <div v-if="station" class="top-title-station">
      <span class="back-btn" @click="back">
        <span> <i class="el-icon-d-arrow-left" />返回上级 </span>
      </span>
      <span>{{ station }}</span>
      <span
        :class="{ 'network-normal': !networkStatus }"
        class="network-warning"
        :title="!networkStatus ? '在线' : '离线'"
        >网络状态：</span
      >
    </div>

    <div class="top-title-center" style="-webkit-app-region: drag">
      <img ondragstart="return false;" src="@/assets/images/common/logo.png" />
      <h3>{{ pageTitle }}</h3>
    </div>

    <div id="user-info-wrap">
      <div class="info-wrap-msg" v-if="iShow">
        <el-dropdown
          v-if="!isLoginPage"
          id="m--user-menu"
          size="medium"
          @command="handleDropdownClick"
        >
          <span class="el-dropdown-link"
            >{{ userName ? "你好，" + userName : "" }}
            <i class="el-icon-caret-bottom"
          /></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <div class="info-wrap-time">
        {{ time | TimeFormat }}
      </div> -->
      <div class="info-wrap-time" id="dateTime"></div>
    </div>
  </header>
</template>

<script>
// import mixin from '@/mixins/mixin'
// import ReqUser from '../../request/request-user'
import { ipcRenderer } from "electron";
// import utils from "../../utils/utils";
// let connectConfig = utils.readConfig("connect.config.json");
export default {
  name: "TopTitle",
  // mixins: [mixin],
  data() {
    return {
      userName: sessionStorage.getItem("loginId"),
      time: Date.now(),
      networkStatus: 0,
      iShow: true,
    };
  },
  computed: {
    pageTitle() {
      // console.error(this.$route.path)
      // debugger
      if (this.$route.path === "/") {
        return "辅控系统";
      } else if (this.$route.path === "/ExtendScreenAlarm") {
        this.iShow = false;
        return "变电站消防集中监控系统(全局总览)";
      } else if (this.$store.getters.pageCurrent) {
        return (
          "变电站消防集中监控系统(" +
          this.$store.getters.pageCurrent.pageName +
          ")"
        );
      } else if (this.$route.path === "/GaoJing") {
        return "变电站消防集中监控系统(告警总览)";
      } else if (this.$route.path === "/Overall") {
        return "变电站消防集中监控系统(全局总览)";
      } else if (this.$route.path === "/Yichang") {
        return "变电站消防集中监控系统(异常总览)";
      } else if (this.$route.path === "/Yuexian") {
        return "变电站消防集中监控系统(越限总览)";
      } else {
        return "变电站消防集中监控系统";
      }
    },
    isLoginPage() {
      return this.$route.path === "/" || this.$route.path === "/Login";
    },
    station() {
      // return sessionStorage.getItem("stationName");
      return 'xxxx 变'
    },
  },
  created() {
    this.getTiemnow();
    // this.getNetworkStatus()
  },
  methods: {
    // getTiemnow(){
    //   let timer1 = setTimeout(()=>{
    //     this.time = Date.now()
    //     clearTimeout(timer1)
    //     this.getTiemnow()
    //   },1000)
    // },
    getTiemnow() {
      Date.prototype.format = function (fmt) {
        var o = {
          "y+": this.getFullYear, //年
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      setInterval(
        "document.getElementById('dateTime').innerHTML = (new Date()).format('yyyy-MM-dd hh:mm:ss');",
        1000
      );
    },
    // 下拉框点击事件处理
    handleDropdownClick(command) {
      if (command === "logout") {
        this.logout();
      }
    },
    // 登出
    // logout () {
    //   this.$request(this.$extend(true, {}, ReqUser.userLogout, {
    //     params: {
    //       ticket: sessionStorage.getItem('ticket')
    //     }
    //   }))
    //    if (sessionStorage.getItem('userName') !== 'sys' && !sessionStorage.getItem('roleIds').includes("auditor") ) {
    //     ipcRenderer.send('closeExtendScreen')
    //   }
    //   sessionStorage.clear()
    //   this.$router.push('/')
    // },
    // 返回上级页面
    back() {
      let page = this.$store.getters.pageCurrent;
      if (!page) {
        this.$router.push(`/HomePage`);
        return false;
      }
      let parentPageId = page.parentId;
      // 历史数据-曲线页面特殊处理
      let href = window.location.href;
      if (href.includes("HistoryLine")) {
        parentPageId = page.pageId;
      }

      // 如果不存在父页面的时候转到首页
      if (!parentPageId) this.$router.push("/HomePage");
      let menuLists = JSON.parse(sessionStorage.getItem("menuLists"));
      let tar = this.getTargetByPageId(parentPageId, menuLists);

      if (tar) {
        this.$store.commit("savePageMessage", tar.id);
        this.$router.push(`${tar.path}`);
        return false;
      }
      this.$router.push(`/HomePage`);
    },
    // 根据页面id获取对应的页面对象
    getTargetByPageId(pageId, arr) {
      for (let [i, len] = [0, arr.length]; i < len; i++) {
        let item = arr[i];
        if (item.pageId === pageId) return arr[i];
        if (!item.children || item.children.length === 0) continue;
        let result = this.getTargetByPageId(pageId, item.children);
        if (result) return result;
      }
      return null;
    },
    // 获取车网状态
    // getNetworkStatus () {
    //   if (!sessionStorage.getItem('stationId')) {
    //     return false
    //   }
    //   this.$request({
    //     headers: {
    //       'dispatch-url': '/network/v1/state',
    //       'dispatch-method': 'get',
    //       'data-key': 'nw',
    //       prefix: '/base'
    //     },
    //     params: {
    //       stationIds: sessionStorage.getItem('stationId')
    //     }
    //   })
    //     .on('success', ({ data }) => {
    //       if (!data || data.length === 0) return false
    //       this.networkStatus = data.list[0].network * 1
    //        setTimeout(() => {
    //          this.getNetworkStatus()
    //        }, connectConfig.sync);
    //     })
    //     .on('error', (err) => {
    //        setTimeout(() => {
    //          this.getNetworkStatus()
    //        }, connectConfig.sync);
    //       console.error(err)
    //     })

    // }
  },
};
</script>

<style lang="less" scoped>
header {
  position: relative;
  font-size: 28px;
  text-align: center;
  height: auto;
}
.top-title-center {
  position: relative;
  width: 50%;
  max-width: 700px;
  margin: 0 auto;
  height: auto;
  text-align: center;
  h3 {
    font-size: 24px;
    padding: 0;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 10px;
  }
}
.top-title-station {
  position: absolute;
  height: auto;
  word-break: keep-all;
  white-space: nowrap;
  top: 4.2vh;
  left: 10px;
  font-size: 18px;
  color: var(--top-title-color);
  .back-btn {
    margin-right: calc(var(--extra-space) * 4);
    > span {
      position: relative;
      z-index: 1;
    }
    &:hover {
      cursor: pointer;
      color: var(--top-title-hover-color);
    }
    &:after {
      position: absolute;
      display: block;
      content: "";
      background: url("../../assets/images/common/back.png") no-repeat top
        center;
      background-size: cover;
      width: 126px;
      height: 38px;
      z-index: 0;
      top: -8px;
      left: -10px;
    }
  }
}
#user-info-wrap {
  position: absolute;
  height: auto;
  word-break: keep-all;
  white-space: nowrap;
  top: 4.4vh;
  right: 10px;
  display: flex;
  font-size: 18px;
  color: var(--top-title-color);
  .info-wrap-msg {
    position: relative;
    height: auto;
    margin-right: calc(var(--large-space) * 2);
    margin-top: -1px;
  }
  /deep/ .el-dropdown {
    color: var(--top-title-color);
    font-size: 0.9em;
  }
}
.el-dropdown-link:hover {
  cursor: pointer;
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
  top: 50%;
  transform: translate(0, -50%);
  background-color: gray;
  cursor: pointer;
}

.network-normal:after {
  background-color: var(--success-color-default);
}

@media screen and (max-width: 1400px) {
  .top-title-station {
    top: 3.6vh;
  }
  .top-title-station .back-btn {
    margin-right: calc(var(--extra-space) * 2.4);
  }
  .network-warning {
    padding-left: 12px;
  }
  #user-info-wrap {
    top: 3.8vh;
  }
}
</style>
