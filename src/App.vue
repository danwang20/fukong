<template>
  <main
    id="app"
   
    ondragend="dragEvent"
    
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="box" v-if="!isTitle">
      <div
        v-if="visible"
        id="openSetting"
        class="openSetting"
        @click="openSetting"
      >
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#icon-shezhi" />
        </svg>
      </div>
      <div class="minMum" @click="miniWin">
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#icon-zuixiaohua" />
        </svg>
      </div>
      <div class="maxMum" @click="maxWin">
        <svg v-if="!isFull" class="icon icon-size" aria-hidden="true">
          <use xlink:href="#icon-zuida" />
        </svg>
        <svg v-else class="icon icon-size" aria-hidden="true">
          <use xlink:href="#icon-zuidahua" />
        </svg>
      </div>
      <div class="close" @click="closeWin">
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#icon-guanbi" />
        </svg>
      </div>
    </div>
    <router-view  />
    <!-- <div v-else id="socket-info">
      <h2>提示信息：</h2>
      <div class="splitter" />
      <p class="info text-center">
        {{ connMsg }}
      </p>
    </div>
    <el-dialog
      title="设置"
      :visible.sync="settingWindowShow"
      class="settings-dialog"
      @close="cancelChange"
    >
      <el-form label-width="300px">
        <el-form-item label="当前服务器IP地址">
          <el-input v-model="serverIp" auto-complete="off" disabled />
        </el-form-item>
        <el-form-item label=" ">
          <el-button size="mini" @click="ipTest"> 连接测试 </el-button>
        </el-form-item>
      
        <el-form-item label="主服务器IP地址">
          <el-input v-model="serverIp1" auto-complete="off" />
        </el-form-item>
        <el-form-item label="备用服务器IP地址">
          <el-input v-model="serverIp2" auto-complete="off" />
        </el-form-item>
        <el-form-item label="指纹服务器IP地址">
          <el-input v-model="fingerIP" auto-complete="off" />
        </el-form-item>
        <el-form-item label="连接超时判定时间（ms）">
          <el-input
            v-model="timeout"
            auto-complete="off"
            @input="timeout = timeout.replace(/[^\d]/, '')"
          />
        </el-form-item>
        <el-form-item label="失去连接后进行重连的准备时间（ms）">
          <el-input
            v-model="refresh"
            auto-complete="off"
            @input="refresh = refresh.replace(/[^\d]/, '')"
          />
        </el-form-item>
        
        <el-form-item label="数据同步频率（ms）">
          <el-input
            v-model="sync"
            auto-complete="off"
            @input="sync = sync.replace(/[^\d]/, '')"
          />
        </el-form-item>
        <el-form-item label="是否进行自动告警">
          <el-checkbox v-model="showWarning" />
        </el-form-item>
     
        <el-form-item label="系统多长时间未操作自动弹出（min）">
          <el-input
            v-model="uncontrol"
            auto-complete="off"
            @input="uncontrolPop"
          />
        </el-form-item>
        <div class="uncontrolPop" v-if="uncontrolTime">
          请时间控制在一至三十分钟以内
        </div>
      
        <el-form-item v-if="isLinux" label="Linux网卡驱动">
          <el-select v-model="netDevice">
            <el-option
              v-for="item in netInfos"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户端地图区域">
          <el-select v-model="area">
            <el-option value="ZHE_JIANG" label="浙江省"> 浙江省 </el-option>
            <el-option value="HANGZHOU" label="杭州"> 杭州 </el-option>
            <el-option value="NINGBO" label="宁波"> 宁波 </el-option>
            <el-option value="HUZHOU" label="湖州"> 湖州 </el-option>
            <el-option value="QUZHOU" label="衢州"> 衢州 </el-option>
            <el-option value="JINHUA" label="金华"> 金华 </el-option>
            <el-option value="LISHUI" label="丽水"> 丽水 </el-option>
            <el-option value="SHAOXING" label="绍兴"> 绍兴 </el-option>
            <el-option value="TAIZHOU" label="台州"> 台州 </el-option>
            <el-option value="WENZHOU" label="温州"> 温州 </el-option>
            <el-option value="ZHOUSHAN" label="舟山"> 舟山 </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="text-right">
        <button class="btn-default" @click="cancelChange">取 消</button>
        <button class="btn-default" @click="changeServerIp">确 定</button>
      </div>
    </el-dialog> -->
    <!-- <div
      v-show="fingerprintsShow"
      class="finger-prints-wrapper"
    >
      <div class="finger-prints-box">
        <h4 v-if="recording">指纹验证中...</h4>
        <h4 v-else>指纹录入中...</h4>
        <img src="./assets/images/common/fingerprints.png">
        <h4>倒计时：{{ timeCount }}</h4>
      </div>

    </div>
    <JourPop ref="jour" 
    :jourId="jourId"
    :jourStr="jourStr"
    :jourTile="jourTile"
    @jourFalse='jourFalse'
    ></JourPop>
    <UpdateBox
      :progress="precent"
      :status="updateStatus"
      :update-start="isUpdateing"
      :text="updateText"
    />
     <audio
         v-show="false"
         ref="audio"
         src="/media/warning.wav"
       />
      <WarningBox  v-if="isWarn"  /> 
    <ResetPass ref="ResetPass"  @resetFalse='resetFalse' ></ResetPass> -->
  </main>
</template>

<script>
import { ipcRenderer } from "electron";
// import utils from './utils/utils'
// import stompClient from './utils/socket-connect'
// import UpdateBox from './components/UpdateBox/UpdateBox'
import icon from "./assets/icon/iconfont";
import store from "./store";
// import moment from 'moment'
// import reqUser from './request/request-user'
// import ReqCommon from './request/request-common'
// import WarningBox from './components/WarningBox/WarningBox'
// import JourPop from './components/JourPop/JourPop'
// import ResetPass from './components/ResetPass/ResetPass'

// let connectConfig = utils.readConfig('connect.config.json')
// sessionStorage.setItem('sv', connectConfig.serverIp)
// let timer = null;
// const os = require('os')

export default {
  components: {
    // UpdateBox,
    // WarningBox,
    // JourPop,
    // ResetPass
  },
  data() {
    return {
      uncontrolTime: false,
      loadingHome: false,
      isFull: false,
      recording: this.$store.recording,
      visible: true,
      settingWindowShow: false,
      socketConnected: false,
      // ...connectConfig,
      doReset: true,
      timer: null,
      updateChecking: true,
      isUpdateing: false,
      precent: 0,
      updateText: "未开始",
      updateStatus: "",
      confirmIsShow: false,
      // showFinger: false,
      // needFinPass :  false,
      timeCount: 50,
      netInfos: [],
      isLinux: false,
      isTitle: false,
      isWarn: false,
      isReturn: false,
      wsip: null,
      errNum: 0,
      isJour: false,
      jourStr: [],
      jourId: "",
      jourTile: "",
    };
  },
  // computed: {
  //   fingerprintsShow () {
  //     this.countLeftTime(0)
  //     return this.$store.state.fingerBoxVisible
  //   }

  // },
  // watch: {
  //   '$route.fullPath': {
  //     deep: true,
  //     handler (val) {
  //       console.log(val,'录音')
  //       // 警字显示隐藏
  //       if (val != '/' && val != '/GaoJing' && !val.includes('/type_1/') &&sessionStorage.getItem("userName")!=="sys" && !sessionStorage.getItem('roleIds').includes("auditor") ) {
  //         this.isWarn = true
  //       } else {
  //         this.isWarn = false
  //       }
  //       // this.needFinPass=sessionStorage.getItem("userName")==="sys"?true:false
  //       sessionStorage.setItem("entery",0)
  //       if (!sessionStorage.getItem('ticket')) {
  //         this.$router.push('/')
  //         return false
  //       }
  //       this.checkLoginTime()
  //       this.isJour = false
  //       if (val === '/Container/type_6/27'  && sessionStorage.getItem('roleIds').includes("auditor")  ) {
  //         this.getJour()
  //       }
  //       if (val === '/HomePage' && (sessionStorage.getItem("userName") === 'FZR' || sessionStorage.getItem("userName") === 'ZBBZ') ) {
  //         this.getJour()
  //       }
  //       // 审计用户重置密码弹窗
  //       // if (sessionStorage.getItem('roleIds').includes("auditor") && sessionStorage.getItem('reset') == 1 ) {
  //       //   this.$refs["ResetPass"].loginVisible = true;
  //       // }
  //     }
  //   },
  //    '$store.state.isloadingHome' (val) {
  //       this.loadingHome = val
  //   },
  // },
  created() {},
  // beforeUpdate() {
  //   this.isVisibe();
  // },
  // beforeDestroy() {
  //   this.$request(
  //     this.$extend(true, {}, reqUser.userLogout, {
  //       params: {
  //         ticket: sessionStorage.getItem("ticket"),
  //       },
  //     })
  //   );
  // },
  // destroyed() {
  //
  // },
  mounted() {
    // 轮询调用声控
    // this.watchData()
    // const osType = os.type()
    // const netInfo = os.networkInterfaces()
    // if(osType.includes('Linux')){
    //   this.isLinux = true
    //    for(let key in netInfo){
    //      let val = {'value':key}
    //      this.netInfos.push(val)
    //   }
    // }
    // sessionStorage.setItem('nowAdd','')
    // let usr = sessionStorage.getItem('userName')
    // // 指纹控制
    // // let valu = localStorage.getItem('showFinger')
    // // if (valu == 'true') {
    // //   this.showFinger = true
    // // }
    // // else this.showFinger = false
    // localStorage.setItem('showFinger', connectConfig.showFinger)

    ipcRenderer.on("changeSettings", () => {
      this.settingWindowShow = true;
    });
    ipcRenderer.on("maximize", () => {
      this.isFull = true;
    });
    ipcRenderer.on("unmaximize", () => {
      this.isFull = false;
    });
    // 监测软件更新
    // this.updateListener()
    // 通信超时检测重启
    // this.connTimeoutCheck()
    // // 监听websocket连接
    // let ws = stompClient.ws
    // ws.onopen = () => {
    //   console.log('weB socket 开启')
    //   this.socketConnected = true
    // }
    // ws.onclose = () => {
    //   console.log('weB socket 关闭')
    //   this.socketConnected = false
    // }
    // this.checkLoginTime()
    // this.ShowTitle()
    // console.error('当前客户端版本：' + utils.getVersion())
  },
  methods: {
    // jourFalse () {
    //   this.isJour = false
    // },
    // resetFalse () {
    //   // if (this.$refs.jour) {

    //   // }
    //   this.$refs.jour.closeJour()
    // },
    // text () {
    //     this.$confirm('此设备为选控设备，是否继续执行操作?', '日志告警', {
    //       confirmButtonText: '确定',
    //       showCancelButton: false,
    //       showClose:false,
    //       closeOnClickModal:false
    //     }).then(() => {

    //     })
    // },
    // ShowTitle () {
    //   if (this.$route.name === 'ExtendScreenAlarm') {
    //     this.isTitle = true
    //   }
    // },
    // watchData () {
    //   setInterval(() => {
    //      if (sessionStorage.getItem('mute') !== '2') {
    //         if (sessionStorage.getItem('loginId') && sessionStorage.getItem('userId') && sessionStorage.getItem("userName")!=="sys"  && !sessionStorage.getItem('roleIds').includes("auditor")) {
    //           this.mute()
    //         }

    //         if (sessionStorage.getItem('loginId') && sessionStorage.getItem('userId') && (sessionStorage.getItem("userName") === 'FZR' || sessionStorage.getItem("userName") ==='ZBBZ' || sessionStorage.getItem("userName") ==='sys' ||sessionStorage.getItem('roleIds').includes("auditor"))) {
    //           this.getJour()
    //         }

    //      }
    //   }, Math.max(3000, connectConfig.sync * 1))
    // },
    // getJour() {
    //   if (this.isJour) {
    //     return false
    //   }
    //   var jour = ''
    //   if (sessionStorage.getItem("userName") === 'FZR' || sessionStorage.getItem("userName") === 'ZBBZ') {
    //     jour = '业务日志'
    //     this.jourTile = '业务日志告警'
    //   } else {
    //     jour = '系统日志'
    //     this.jourTile = '系统日志告警'
    //   }
    //   this.isJour = true
    //   var noJour = false
    //   this.$request(this.$extend(true, {}, ReqCommon.JourWarning))
    //    .on('success', ({ data }) => {
    //      console.error(data)
    //      var str = []
    //      var arrid = []
    //       data.forEach(el => {
    //         if (el.typeName === jour) {
    //            noJour = true
    //             str.push(el.czUsername +  ' - ' + moment(el.czTime).format('YYYY-MM-DD HH:mm:ss') + ' - ' + el.remark )
    //            arrid.push(el.id)
    //         }
    //       });
    //       if (!noJour) {
    //         this.isJour = false
    //       } else {
    //         this.jourId = arrid.join(',')
    //         this.jourStr = str
    //         this.$refs.jour.loginVisible = true
    //         // let strn = str.join('\r')
    //         // this.$confirm( strn, '日志告警', {
    //         //      confirmButtonText: '确定',
    //         //      showCancelButton: false,
    //         //      showClose:false,
    //         //      closeOnClickModal:false
    //         //    }).then(() => {
    //         //
    //         //     })
    //       }
    //    })
    //    .on('error', err => {
    //      console.error(err)
    //     //  if (this.errNum === 3) {
    //     //    this.socketConnected = false
    //     //  }
    //     //  this.errNum++
    //     //  this.isReturn = false
    //    })
    // },
    // mute () {
    //   if (this.isReturn) {
    //     return false
    //   }
    //   this.isReturn = true
    //   this.$request(this.$extend(true, {}, ReqCommon.voiceWarning))
    //    .on('success', ({ data }) => {
    //      if (data ) {
    //        this.$refs.audio.play()
    //        this.errNum = 0
    //      }
    //      this.isReturn = false
    //      this.ipChange()
    //    })
    //    .on('error', err => {
    //      if (this.errNum === 3) {
    //        this.socketConnected = false
    //      }
    //      this.errNum++
    //      this.isReturn = false
    //    })
    // },
    // clearStorage(){
    //   console.log('clear')
    //   ipcRenderer.send('clear')
    // },
    // countLeftTime( ) {
    //   // 关闭的情况下清空定时器
    // let leftTime = this.timeCount

    // let timer = setTimeout(() => {

    //   if (leftTime <= 0||!this.fingerprintsShow ) {
    //     this.$store.commit('changeFingerBoxVisible', false)
    //      clearTimeout( timer)
    //       this.timeCount = 50
    //       return false
    //     }
    //     this.timeCount -= 1
    //   }, 1000)
    // },
    // // 关闭窗体事件
    // dragEvent(){
    // },
    closeWin() {
      // this.$request(
      //   this.$extend(true, {}, reqUser.userLogout, {
      //     params: {
      //       ticket: sessionStorage.getItem("ticket"),
      //     },
      //   })
      // );
      console.log(1111);
      ipcRenderer.send("closeWin");
    },
    maxWin() {
      ipcRenderer.send("maxWin");
    },
    miniWin() {
      console.log("min");
      ipcRenderer.send("minWin");
    },
    // 打开设置事件
    openSetting() {
      this.settingWindowShow = true;
    },
    // 软件更新事件监听
    // checkUpdate () {
    //   setTimeout(() => {
    //     if (!this.updateChecking || this.isUpdateing) return false
    //     ipcRenderer.send('checkForUpdates')
    //     this.checkUpdate()
    //   }, 5000)
    // },
    // updateListener () {
    //   ipcRenderer.on('updateMessage', (event, text) => {
    //     this.updateText = text || ''
    //   })
    //   ipcRenderer.on('updateReady', (event, object) => {
    //     let message = [
    //       '检测到最新的更新包，是否马上进行更新？',
    //       `<h3>新版本特性: ${object.version}</h3>`,
    //       ...(object.updateMessage || [])
    //     ]
    //     message = message.map((item, index) => {
    //       return `<p>${
    //         index > 1 ? '&nbsp;&nbsp;&nbsp;&nbsp;' + '—— ' : ''
    //       }${item}</p>`
    //     })
    //     if (this.confirmIsShow) return false
    //     this.confirmIsShow = true
    //     let str = message.join('')
    //     this.$confirm(str, '更新提示', {
    //       closeOnClickModal: false,
    //       distinguishCancelAndClose: true,
    //       dangerouslyUseHTMLString: true,
    //       confirmButtonText: '立即更新',
    //       cancelButtonText: '先不更新'
    //     })
    //       .then(() => {
    //         this.updateText = '更新包下载中...'
    //         this.isUpdateing = true
    //         ipcRenderer.send('doUpdate')
    //         this.confirmIsShow = false
    //       })
    //       .catch(() => {
    //         this.updateChecking = false
    //         this.confirmIsShow = false
    //       })
    //   })

    //   ipcRenderer.on('updateProgress', (event, progressObj) => {
    //     let { receivedBytes, totalBytes } = progressObj
    //     this.updateText = '更新包下载中...'
    //     this.isUpdateing = true
    //     clearTimeout(timer)
    //     timer = null
    //     timer = setTimeout(() => {
    //       this.precent = ((receivedBytes * 100) / totalBytes) >> 0
    //     }, 30)
    //   })
    //   ipcRenderer.on('updateError', (event, err) => {
    //     console.error(err)
    //     this.isUpdateing = false
    //     this.$showMsg('软件更新出错', 'warning')
    //     this.updateStatus = 'warning'
    //     this.updateText = '更新失败'
    //   })
    //   ipcRenderer.on('updateUncompress', (event, text) => {
    //     this.updateText = text
    //   })
    //   ipcRenderer.on('updateEnd', () => {
    //     this.isUpdateing = false
    //     this.$confirm('更新已经完成，点击确定进行重启', '更新完成', {
    //       closeOnClickModal: false,
    //       showCancelButton: false,
    //       showClose: false,
    //       confirmButtonText: '确定'
    //     })
    //       .then(() => {
    //         ipcRenderer.send('relaunch')
    //       })
    //       .catch(() => {
    //         ipcRenderer.send('relaunch')
    //       })
    //   })
    //   ipcRenderer.on('updateQuit', () => {
    //     this.$showMsg(
    //       '客户端更新中，为了防止程序异常，目前不允许退出',
    //       'warning'
    //     )
    //   })

    //   this.checkUpdate()
    // },
    // 保存连接配置
    // changeServerIp () {
    //   // localStorage.setItem('showFinger', this.showFinger)
    //    let reg = /(http|https):\/\/([\w.]+\/?)\S*/
    //   if (!reg.test(this.serverIp)||!reg.test(this.serverIp1)) {
    //     this.$showMsg('ip地址格式不正确')
    //     return false
    //   }
    //   if (this.uncontrol *1 > 30 || this.uncontrol*1 <=0) {
    //     this.$showMsg('检测自动弹出时间请控制在一至三十分钟以内')
    //     return false
    //   }
    //   const path = 'connect.config.json'
    //   const config = Object.assign({}, connectConfig, {
    //     serverIp : this.serverIp1 || connectConfig.serverIp1,
    //     serverIp1: this.serverIp1 || connectConfig.serverIp1,
    //     serverIp2: this.serverIp2 || connectConfig.serverIp2,
    //     serverProduction: 'http://114.115.206.22:8084/endpointSang',
    //     // updateServer: this.updateServer || connectConfig.updateServer,
    //     timeout: this.timeout * 1 || connectConfig.timeout || 20000,
    //     refresh: this.refresh * 1 || connectConfig.refresh || 3000,
    //     sync: this.sync * 1 || connectConfig.sync || 5000,
    //     showWarning: this.showWarning,
    //     orcount: this.orcount * 1 || 60,
    //     // ykStatueWsAddr:this.ykStatueWsAddr,
    //     uncontrol: this.uncontrol * 1 || connectConfig.uncontrol || 5,
    //     area: this.area || connectConfig.area,
    //     fingerIP: this.fingerIP || connectConfig.fingerIP,
    //     netDevice: this.netDevice || connectConfig.netDevice
    //   })
    //   // 写入文件
    //   if (utils.writeConfig(path, config)) {
    //     this.doReload()
    //     return false
    //   }

    //   this.$showMsg(`配置写入失败`, 'warning')
    // },
    // // 登出
    // logout () {
    //   this.$request(this.$extend(true, {}, reqUser.userLogout, {
    //     params: {
    //       ticket: sessionStorage.getItem('ticket')
    //     }
    //   }))
    //   if (sessionStorage.getItem('userName') !== 'sys') {
    //     ipcRenderer.send('closeExtendScreen')
    //   }
    //   sessionStorage.clear()
    //   this.isJour = false
    //   this.$router.push('/')
    // },
    // 取消保存配置
    // cancelChange () {
    //   this.settingWindowShow = false
    //   this.uncontrolTime = false
    //   this.serverIp = connectConfig.serverIp1
    //   this.serverIp1 = connectConfig.serverIp1
    //   this.serverIp2 = connectConfig.serverIp2
    //   this.timeout = connectConfig.timeout
    //   this.refresh = connectConfig.refresh
    //   this.sync = connectConfig.sync
    //   this.orcount = connectConfig.orcount
    //   // this.ykStatueWsAddr = connectConfig.ykStatueWsAddr
    //   this.showWarning = connectConfig.showWarning
    //   this.uncontrol = connectConfig.uncontrol
    //   // this.updateServer = connectConfig.updateServer
    //   this.area = connectConfig.area
    //   this.fingerIP = connectConfig.fingerIP
    //   this.netDevice = connectConfig.netDevice
    // },
    // // 通信中断后进行重连
    // disconnCheck () {
    //   let leftTime = this.refresh||connectConfig.refresh
    //   let curIp = ''
    //      if(this.serverIp===this.serverIp1||this.serverIp===connectConfig.serverIp1){
    //        curIp=this.serverIp2||connectConfig.serverIp2
    //      }
    //      else {
    //         curIp=this.serverIp1||connectConfig.serverIp1
    //      }

    //   let inter1 =  setInterval(() => {

    //     if (leftTime <= 0) {
    //       clearInterval(inter1)
    //       const config = Object.assign({}, connectConfig, {
    //         serverIp: curIp,
    //         serverProduction: 'http://114.115.206.22:8084/endpointSang',
    //         // updateServer: this.updateServer || connectConfig.updateServer,
    //         timeout: this.timeout * 1 || connectConfig.timeout || 20000,
    //         refresh: this.refresh * 1 || connectConfig.refresh || 3000,
    //         sync: this.sync * 1 || connectConfig.sync || 5000,
    //         showWarning: this.showWarning,
    //         orcount: this.orcount * 1 || 60,
    //         // ykStatueWsAddr:this.ykStatueWsAddr,
    //         uncontrol: this.uncontrol * 1 || connectConfig.uncontrol || 5,
    //         area: this.area || connectConfig.area,
    //         fingerIP: this.fingerIP || connectConfig.fingerIP,
    //         netDevice: this.netDevice || connectConfig.netDevice
    //       })
    //       if (utils.writeConfig('connect.config.json', config)) {
    //         this.doReload()
    //         return false
    //       }
    //     }
    //     this.connMsg = this.retryMsg.replace(
    //       '($ipad$)',
    //       this.serverIp
    //     ).replace(
    //       '($value$)',
    //       (leftTime / 1000) >> 0
    //     )
    //     leftTime -= 1000
    //   }, 1000)
    // },
    // // ip检测
    // ipTest () {
    //   let addr = this.serverIp
    //   let ip = addr.split(':')[1].split('/')[2]
    //   this.$request({
    //     headers: {
    //       'dispatch-url': '/ping/v1/ping',
    //       'dispatch-method': 'get',
    //       'data-key': 'ip-test',
    //       prefix: '/base'
    //     },
    //     params: {
    //       ipAddress: ip
    //     }
    //   })
    //     .on('success', ({ data }) => {
    //       this.$showMsg(
    //         `地址连接${data ? '成功' : '失败'}`,
    //         `${data ? 'success' : 'warning'}`
    //       )
    //     })
    //     .on('error', () => {
    //       this.$showMsg('地址链接失败', 'warning')
    //     })
    // },
    //  // ip检测
    // ipChange () {
    //   let addr = this.serverIp
    //   let ip = addr.split(':')[1].split('/')[2]
    //   console.log(ip,'查看ip')
    //   this.$request({
    //     headers: {
    //       'dispatch-url': '/ping/v1/ping',
    //       'dispatch-method': 'get',
    //       'data-key': 'ip-test',
    //       prefix: '/base'
    //     },
    //     params: {
    //       ipAddress: ip
    //     }
    //   })
    //     .on('success', ({ data }) => {
    //       if (!data) {
    //          this.socketConnected = false
    //       }
    //     })
    //     .on('error', () => {

    //     })
    // },
    // // 超时检测
    // connTimeoutCheck () {
    //   let leftTime = this.timeout||connectConfig.timeout  // 连接超时判定时间
    //   let interer = setInterval(() => {
    //     if (this.socketConnected){  // 监听websocket连接
    //       return false
    //     }

    //     if (sessionStorage.getItem('userName') && sessionStorage.getItem('userId') ) {
    //       this.logout()
    //     }
    //     if (leftTime<=0) {
    //       clearInterval(interer)
    //       this.disconnCheck()
    //       return false
    //     }

    //     this.connMsg = this.connMsg1.replace(
    //       '($ipad$)',
    //       this.serverIp.replace('https://','').replace(':8084/endpointSang','')
    //     ).replace(
    //       '($value$)',
    //       (leftTime / 1000) >> 0
    //     )
    //     leftTime -= 1000

    //   }, 1000)
    // },
    // // 刷新页面
    // doReload (time) {
    //   if (!time || time <= 0 || typeof time !== 'number') {
    //     window.location.reload()
    //     return false
    //   }
    //   let timer1 =  setTimeout(() => {
    //     window.location.reload()
    //    clearTimeout(timer1)
    //   }, time)
    // },
    // // 窗口变化
    // resize () {
    //   clearTimeout(this.timer)
    //   this.timer = setTimeout(() => {
    //     this.doReset = false
    //     this.$nextTick(() => {
    //       this.doReset = true
    //     })
    //   }, 2000)
    // },
    // // 检测登录时间
    // checkLoginTime () {
    //   // 获取过期时间
    //   let outTime = sessionStorage.getItem('outTime')
    //   if (!outTime) return false
    //   let time = outTime - new Date().getTime()
    //   clearTimeout(window._timer)
    //   window._timer = setTimeout(() => {
    //     this.$request(this.$extend(true, {}, reqUser.userLogout, {
    //       params: {
    //         ticket: sessionStorage.getItem('ticket')
    //       }
    //     }))
    //     if (sessionStorage.getItem('userName') !== 'sys' && !sessionStorage.getItem('roleIds').includes("auditor") ) {
    //      ipcRenderer.send('closeExtendScreen')
    //     }
    //     sessionStorage.clear()
    //     this.$router.push('/')
    //     this.$showMsg('本次登录时间已到期，强制登出')
    //   }, time)
    //   // 检测未操作时间
    //   this.checkLeave()
    // },
    // checkLeave () {
    //   if (window._timer2) return false
    // let uncontroltime = 5
    //     //  console.error(this.uncontrol)
    //     if (this.uncontrol === 0) {
    //       uncontroltime = 5
    //     } else {
    //       uncontroltime = this.uncontrol
    //     }
    //   document.addEventListener('mousemove', () => {
    //     clearTimeout(window._timer2)

    //     // let uncontroltime = 5
    //     window._timer2 = setTimeout(() => {
    //       clearTimeout(window._timer2)
    //       // if (sessionStorage.getItem('userName')) {
    //          this.logout()
    //       // }
    //     }, uncontroltime * 60 * 1000)
    //   })
    // },
    //  logout () {
    //     if (sessionStorage.getItem('userName') !== 'sys' && !sessionStorage.getItem('roleIds').includes("auditor") ) {
    //     ipcRenderer.send('closeExtendScreen')
    //   }
    //   this.$request(this.$extend(true, {}, reqUser.userLogout, {
    //     params: {
    //       ticket: sessionStorage.getItem('ticket')
    //     }
    //   }))
    //   this.isJour = false
    //   sessionStorage.clear()
    //   this.$router.push('/')
    // },
    // // 如果为总览页面则关闭和设置按钮不显示
    // isVisibe () {
    //   let that = this
    //   if (this.$route.path == '/ZongLan1') {
    //     this.visible = false
    //   }
    //   else {
    //     this.visible = true
    //   }

    // },
    // checkFin () {

    // },
    // uncontrolPop () {
    //   this.uncontrol = this.uncontrol.replace(/[^\d]/, '')
    //   if (this.uncontrol > 30 || this.uncontrol <= 0) {
    //     this.uncontrolTime = true
    //   } else {
    //       this.uncontrolTime = false
    //   }

    // }
  },
};
</script>

<style lang="less">
html,
body {
  box-sizing: border-box;
  font-size: var(--body-font-size);
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--body-bg-color);
  color: var(--clear-color-default);
}
.el-loading-mask {
  z-index: 9999 !important;
}
#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1366px;
  height: 100%;
  background: url("./assets/images/common/bg2.jpg") no-repeat center top;
  background-size: cover;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.box {
  position: fixed;
  height: 1.5vw;
  z-index: 10;
  margin: 0 0 0 93vw;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .openSetting {
    height: 2em;
    margin-right: 1vw;
    cursor: pointer;
    background: rgba(0, 0, 0, ff);
  }
  .close {
    height: 2em;
    margin-right: 1vw;
    cursor: pointer;
    background: rgba(0, 0, 0, ff);
  }
  .maxMum {
    height: 2em;
    margin-right: 1vw;
    cursor: pointer;
    background: rgba(0, 0, 0, ff);
  }
  .minMum {
    height: 2em;
    margin-right: 1vw;
    cursor: pointer;
    background: rgba(0, 0, 0, ff);
  }
}

#socket-info {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  min-width: 500px;
  height: auto;
  padding: 0;
  background: linear-gradient(to bottom, #121b41, transparent);
  border-top: 1px solid var(--border-color-default);
  transform: translate(-50%, -50%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 1px;
    height: 80%;
    background: linear-gradient(
      to bottom,
      var(--border-color-default),
      transparent
    );
  }

  &::after {
    left: auto;
    right: 0;
  }

  h2 {
    padding: var(--middle-space) calc(var(--large-space) * 2);
    color: var(--clear-color-default);
    font-size: 18px;
    font-weight: normal;
  }

  .splitter {
    &::before,
    &::after {
      content: "";
      display: block;
      margin-bottom: 1px;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        #448ac9 50%,
        transparent
      );
    }
  }

  .info {
    font-size: 20px;
    text-align: center;
    padding: calc(var(--extra-space) * 4) 0 calc(var(--extra-space) * 7);
  }
}

.settings-dialog /deep/ .el-dialog {
  max-width: 1000px;
  width: 1000px;
}
.text-right {
  position: relative;
  height: auto;
  margin-top: var(--extra-space);
  text-align: right;
  > button {
    margin-left: var(--extra-space);
    padding: calc(var(--middle-space)) calc(var(--extra-space) * 2);
  }
}
.finger-prints-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
}
.finger-prints-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: var(--extra-space) calc(var(--extra-space) * 2);
  background-color: var(--finger-background-color);
  border: 1px solid var(--finger-border-color);
  > h4 {
    text-align: center;
  }
  > img {
    display: block;
    margin: 0 auto;
    max-width: 36px;
  }
  .el-select-dropdown {
    span {
      white-space: pre;
    }
  }
}
.uncontrolPop {
  margin-left: 32%;
  margin-top: -20px;
  margin-bottom: 20px;
  color: #f19393;
  font-size: 14px;
}
.content-box {
  height: 100%; 
  display: flex;
}
.side-left-cloum {
  height: 100%; 
  position: relative; 
  display: flex; 
  flex-direction: column;
}
.side-right {
   height: 100%; 
  position: relative; 
  display: flex; 
}
.side-right-cloum {
  height: 100%; 
  position: relative; 
  display: flex; 
  flex-direction: column;
}
</style>
