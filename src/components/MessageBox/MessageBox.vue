<template>
  <section class="message-box c--message-box">
    <div
      v-if="curOption.type === 'msg'"
      class="message-container message-container-msg"
    >
      <h4 class="message-title">
        {{ curOption.title }}
      </h4>
      <div class="message-content">
        <li v-for="(list, index) in curLists" :key="index" class="message-list">
          <span class="message-list-label">{{ list[curOption.labelKey] }}</span
          >：
          <span class="message-list-value">{{ list[curOption.valueKey] }}</span>
        </li>
      </div>
    </div>

    <div
      v-if="curOption.type === 'log'"
      class="message-container message-container-log"
    >
      <h4 class="message-title">
        {{ curOption.title }}
      </h4>
      <div class="message-content">
        <li v-for="(list, index) in lists" :key="index" class="message-list">
          <i class="el-icon-message-solid" />
          {{ list[curOption.labelKey] }}
          <span v-if="curOption.iShow">{{ list[curOption.site] }}</span
          >: {{ list[curOption.valueKey] }}
        </li>
      </div>
    </div>
    <div
      v-if="curOption.type === 'dev'"
      class="message-container message-container-dev"
    >
      <el-button
        size="lager"
        class="message-title"
        @click="linkHandler(curOption.path)"
      >
        {{ curOption.title }}
      </el-button>
      <div class="message-content">
        <li
          v-for="(list, index) in lists"
          :key="index"
          :class="`message-dev-${list.type} message-dev-${
            list.isMain ? 'full' : ''
          }`"
          class="message-list"
        >
          <template v-if="list.status === undefined">
            {{ list[curOption.valueKey] }}
          </template>
          <template v-else>
            <!--主机使用的特殊模板-->
            <div class="message-status">
              <div :class="{ 'message-running': list.status }">运行</div>
              <div :class="{ 'message-error': !list.status }">告警</div>
              <div :class="{ 'message-auto': list.type }">自动</div>
              <div :class="{ 'message-oper': !list.type }">手动</div>
            </div>
          </template>
        </li>
      </div>
    </div>
    <div
      v-if="curOption.type === 'running-control'"
      class="message-container message-container-running-control"
    >
      <h4 class="message-title">
        {{ curOption.title }}
      </h4>
      <div class="message-content">
        <li
          v-for="(list, index) in lists"
          :key="index"
          class="message-list-box"
        >
          <div class="message-list-title">
            {{ list.title }}
          </div>
          <div class="message-list-status">
            <div
              v-for="(item, index) in list.status"
              :key="index"
              class="message-list-item"
            >
              {{ item.label }}： {{ item.value }}
            </div>
          </div>
          <div class="message-list-total">
            <div
              v-for="(total, index) in list.total"
              :key="index"
              class="message-list-total-message"
            >
              {{ total.title }}：
              <div
                class="message-list-total-status"
                :class="{ 'message-list-total-isActive': total.status }"
              />
            </div>
          </div>
          <div v-if="list.actions" class="message-list-actions">
            {{ list.actions.title }}：
            <el-button
              v-for="(action, index) in list.actions.buttons"
              :key="index"
              size="mini"
              @click="actionHandler(action)"
            >
              {{ action.name }}
            </el-button>
          </div>
        </li>
      </div>
    </div>
    <div
      v-if="curOption.type === 'custom'"
      class="message-container message-container-custom"
    >
      <div v-for="(list, index) in lists" :key="index" class="message-list">
        <template
          v-html="
            typeof list.template === 'function'
              ? list.template(list)
              : list.template
          "
        />
        <button
          v-for="(btn, bIndex) in list.buttons || []"
          :key="bIndex"
          :class="
            typeof btn.class === 'function' ? btn.class(btn, list) : btn.class
          "
          @click="btnHandler(btn, list)"
        >
          {{ btn.name }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    option: {
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
    api: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      defaultOption: {
        title: "标题",
        type: "msg",
        template: null,
        labelKey: "id",
        valueKey: "sjNr",
      },
      lists: [
        {
          id: 1054628,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "1号主变跳闸_14",
          sjNr: "1回路14地址-1号主变跳闸",
          gjLx: 3,
          gjJb: 2,
          pgMc: "1号主变",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:38:29.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "一般",
          colorDescribe: "无色",
          status: "11",
        },
        {
          id: 1054627,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "红外光束感烟探测器_15",
          sjNr: "1回路15地址1号主变A相-红外光束火警",
          gjLx: 3,
          gjJb: 1,
          pgMc: "1号主变A相",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:38:27.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "危急",
          colorDescribe: "红",
          status: "11",
        },
        {
          id: 1054626,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "传输单元_3",
          sjNr: "传输单元-火警",
          gjLx: 3,
          gjJb: 1,
          pgMc: "继电器室",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:38:25.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "危急",
          colorDescribe: "红",
          status: "11",
        },
        {
          id: 1054625,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "红外光束感烟探测器_16",
          sjNr: "1回路16地址1号主变A相-红外光束火警",
          gjLx: 3,
          gjJb: 1,
          pgMc: "1号主变A相",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:38:25.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "危急",
          colorDescribe: "红",
          status: "11",
        },
        {
          id: 1054624,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "火灾报警控制器_2",
          sjNr: "火灾报警主机-火警",
          gjLx: 3,
          gjJb: 1,
          pgMc: "继电器室",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:38:25.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "危急",
          colorDescribe: "红",
          status: "11",
        },
        {
          id: 1054623,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "传输单元_3",
          sjNr: "传输单元-远程控制关闭恢复",
          gjLx: 3,
          gjJb: 2,
          pgMc: "继电器室",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:38:08.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "一般",
          colorDescribe: "无色",
          status: "11",
        },
        {
          id: 1054622,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "传输单元_3",
          sjNr: "传输单元-远程控制关闭",
          gjLx: 3,
          gjJb: 2,
          pgMc: "继电器室",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:38:00.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "一般",
          colorDescribe: "无色",
          status: "11",
        },
        {
          id: 1054621,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "传输单元_3",
          sjNr: "传输单元-远程控制关闭恢复",
          gjLx: 3,
          gjJb: 2,
          pgMc: "继电器室",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:37:57.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "一般",
          colorDescribe: "无色",
          status: "11",
        },
        {
          id: 1054620,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "传输单元_3",
          sjNr: "传输单元-远程控制关闭",
          gjLx: 3,
          gjJb: 2,
          pgMc: "继电器室",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 16:37:52.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "一般",
          colorDescribe: "无色",
          status: "11",
        },
        {
          id: 1054618,
          stationId: 1,
          stationMc: "瓶窑变",
          sbMc: "火灾报警控制器_2",
          sjNr: "火灾报警主机-启动恢复",
          gjLx: 3,
          gjJb: 1,
          pgMc: "继电器室",
          firstZxtMc: "火灾报警",
          clJg: 1,
          czJg: 1,
          updater: "hank",
          updateTime: "2022-06-01 15:36:58.0",
          glLxDescribe: "火灾告警",
          gjJbDescribe: "危急",
          colorDescribe: "红",
          status: "11",
        },
      ],
      isRoad: false,
    };
  },
  computed: {
    curOption() {
      return Object.assign({}, this.defaultOption, this.option);
    },
    curLists() {
      return this.lists.filter((list) => {
        return list[this.curOption.labelKey];
      });
    },
  },
  watch: {
    api: {
      deep: true,
      handler(val) {
        this.doRequest();
      },
    },
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      this.lists = this.methods.dataHandler
        ? this.methods.dataHandler(this.lists)
        : this.lists || [];
    },
    // doRequest () {
    //    if (sessionStorage.getItem('userName')=== 'sys' || sessionStorage.getItem('roleIds').includes("auditor")) {
    //      return false
    //    }
    //     if (this.isRoad) {
    //     return false
    //   }
    //   let api = this.$extend(true, {}, this.api)
    //   this.isRoad = true
    //   let headers = api.headers || {}
    //   api.url = api.url || api['dispatch-url'] || headers['dispatch-url'] || ''
    //   api.method = api.method || api['dispatch-method'] || headers['dispatch-method'] || 'get'
    //   api.dataKey = api.dataKey || api['data-key'] || headers['data-key'] || 'get-message'
    //   api.prefix = api.prefix || headers.prefix
    //   let params = typeof api.params === 'function' ? api.params(this) : api.params
    //   if (!api.url) {
    //     this.lists = typeof api.mockData === 'function' ? api.mockData(this) : api.mockData || []
    //     this.isRoad = false
    //     return false
    //   }
    //   this.$request({
    //     headers: {
    //       'dispatch-url': api.url,
    //       'dispatch-method': api.method,
    //       'data-key': api.dataKey,
    //       prefix: api.prefix || ''
    //     },
    //     params: params
    //   })
    //     .on('success', ({ data }) => {
    //       this.isRoad = false
    //       this.lists = this.methods.dataHandler ? this.methods.dataHandler(data, this) : (data || [])
    //       console.log(data,'首页数据')
    //       console.log(this.lists,'首页数据1')
    //     })
    //     .on('error', (err) => {
    //       this.isRoad = false
    //       console.error(err,'基本信息')
    //       this.$showMsg(`请求信息出错`, 'error')
    //     })
    // },
    // linkHandler (path) {
    //   if (!path) return false
    //   let arr = this.curOption.path.split('/')
    //   // console.log(arr[3]*1)
    //   // debugger
    //   this.$store.commit('savePageMessage', arr[3]*1)
    //   this.$nextTick(() => {
    //     this.$router.push(path)
    //   })
    //   // setTimeout(() => {
    //   //   this.$router.push(path)
    //   // }, 1500);
    // },
    // btnHandler (btn, list) {
    //   if (typeof btn.callback === 'function') btn.callback.call(this, btn, list)
    //   if (typeof this.methods.onClick === 'function') this.methods.onClick.call(this, btn, list)
    // },
    // actionHandler (action) {
    //   action.handler && action.handler(action, this)
    // }
  },
};
</script>

<style lang="less" scoped>
.message-box {
  position: relative;
  height: 100%;
}
.message-container {
  position: relative;
  height: 100%;
  overflow: auto;
}
.message-title {
  position: relative;
  text-align: center;
  font-size: 16px;
  margin: calc(var(--small-space) * 2) 0;
}
.message-content {
  position: relative;
  height: auto;
  padding: 0 calc(var(--large-space) * 2);
}
.message-list {
  position: relative;
  height: auto;
  padding-bottom: var(--small-space);
  font-size: 12px;
  color: var(--message-box-color);
}
.message-container-msg {
  border: 1px solid var(--message-box-border);
  padding-bottom: var(--extra-space);
  background-color: var(--message-box-background-color);
}
.message-container-log {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--message-box-border);
  // title
  .message-title {
    font-size: 14px;
    margin: 0;
    padding: var(--middle-space) 0;
    background-color: var(--message-box-title-background-color2);
  }
  //
  .message-content {
    flex: 1;
    overflow: auto;
    background-color: var(--message-box-background-color);
    .message-list {
      padding: calc(var(--middle-space) * 1.5) 0 0 0;
      line-height: 1.2;
      letter-spacing: 0.6px;
      font-size: 12px;
    }
  }
}
.message-container-dev {
  text-align: center;
  border: 1px solid var(--message-box-border);
  .message-title {
    display: inline-block;
    /*background-color: var(--message-box-title-background-color);*/
    padding: var(--middle-space) calc(var(--large-space) * 2);
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .message-content {
    position: relative;
    height: auto;
    text-align: left;
    max-width: 300px;
    display: flex;
    flex-wrap: wrap;
    .message-list {
      width: 50%;
      padding: var(--small-space) var(--large-space);
      font-size: 12px;
      border-radius: 4px;
      margin-bottom: var(--middle-space);
      text-align: center;
    }
    .message-dev-full {
      width: 100%;
    }
    .message-dev-warning {
      background-color: var(--warn-color-default);
    }
    .message-dev-error {
      background-color: var(--error-color-default);
    }
  }
}

.message-status {
  position: relative;
  height: auto;
  display: flex;
  justify-content: space-between;
  > div {
    position: relative;
    padding-top: 30px;
    &:before {
      position: absolute;
      top: 0;
      left: 50%;
      width: 20px;
      height: 20px;
      transform: translateX(-50%);
      display: block;
      content: "";
      border-radius: 50%;
      background-color: var(--message-box-status-default-color);
    }
  }
  .message-running:before {
    background-color: var(--message-box-status-success-color);
  }
  .message-error:before {
    background-color: var(--message-box-status-error-color);
  }
  .message-auto:before {
    background-color: var(--message-box-status-success-color);
  }
  .message-oper:before {
    background-color: var(--message-box-status-success-color);
  }
}
</style>
