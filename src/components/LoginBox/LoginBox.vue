<template>
  <el-dialog
    class="c--login-box"
    :title="auth ? '监护权限校验' : '用户登录'"
    :visible.sync="loginVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
  >
    <form
      class="right-form"
      @submit.prevent="onSubmit"
    >
      <div class="label-text">
        <p>操作人：</p>
        <el-select
          v-model="user.name"
          placeholder="请选择您的用户名"
        >
          <el-option
            v-for="(item, index) in userLists"
            :key="index"
            :label="item.loginId"
            :value="item.loginId"
          />
        </el-select>
      </div>
      <div class="label-text">
        <p>密码：</p>
        <input
          v-model="user.password"
          type="password"
          placeholder="请输入您的密码"
          :disabled="isLoading"
        >
      </div>
      <div
        v-if="!auth"
        v-show="useFinger"
        class="label-text"
      >
        <p>双因子验证：</p>
        <input
        ref="doulbFac"
          v-model="doubleConfirm"
          type="text"
          :disabled="true"
        >
      </div>
      <div
        v-if="!auth"
        class="label-text"
      >
        <p>验证码：</p>
        <div class="code-wrapper">
          <input
            v-model="user.captchaValue"
            type="text"
            class="code-input"
          >
          <div
            class="code-box"
            @click="freshCode"
          >
            <img
              ondragstart="return false;"
              class="code-box"
              :src="code"
              style="display: block; max-width: 100%; max-height: 100%;"
            >
          </div>
        </div>
      </div>
      <div
        v-if="!auth"
        class="label-text"
      >
        <p>有效时间：</p>
        <el-select
          v-model="effectTime"
          placeholder="本次登录的有效时间"
        >
          <el-option
            label="15分钟"
            :value="900"
          />
          <el-option
            label="30分钟"
            :value="1800"
          />
          <el-option
            label="1个小时"
            :value="3600"
          />
          <el-option
            label="2个小时"
            :value="7200"
          />
          <el-option
            label="4个小时"
            :value="14400"
          />
          <el-option
            label="8个小时"
            :value="28800"
          />
          <el-option
            label="12个小时"
            :value="43200"
          />
          <el-option
            label="24个小时"
            :value="86400"
          />
        </el-select>
      </div>
      <div
        v-if="false"
        class="user-message"
      >
        <div class="label-text">
          <p>联系人姓名：</p>
          <input
            :value="conactPerson"
            :disabled="true"
          >
        </div>
        <div class="label-text">
          <p>联系人电话：</p>
          <input
            :value="personNumber"
            :disabled="true"
          >
        </div>
        <div class="label-text">
          <p>所属变电站：</p>
          <input

            :disabled="true"
          >
        </div>
      </div>
      <div class="login-dialog-btns">
        <button
          type="submit"
          class="btn-default"
          :disabled="isLoading"
        >
          <template v-if="isLoading">
            正在登录 <i class="el-icon-loading" />
          </template>
          <template v-else>
            {{loginText}}
          </template>
        </button>
        <button
          type="reset"
          class="btn-default"
          :disabled="isLoading"
          @click="onReset"
        >
          取消
        </button>
      </div>
    </form>
    <div class="sider" >
       版本号：{{version}}
    </div>
  </el-dialog>
</template>

<script>
import fs from 'fs'
// import ReqUser from '../../request/request-user'
// import SM4Utils from '../../utils/sm4'
// import { ipcRenderer } from 'electron'
// import utils from '../../utils/utils'
// const version = utils.readConfig('version.json')
// import ReqCommon from '../../request/request-common'

// const sm4 = new SM4Utils()
// sm4.iv = 'UISwD9fW6cFh9SNS'

export default {
  name: 'LoginBox',
  components: {
  },
  props: {
    auth: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allUser: [],
      loginVisible: this.visible,
      finVisible: this.finVisi,
      doubleConfirm: '',
      isLoading: false,
      user: {
        // password: 'csnc@2019'
      },
      personNumber: '',
      effectTime: '',
      useFinger: true,
      code: '',
      conactPerson: '',
      loginText: this.auth ? '验证' : '登录',
      version: ''
    }
  },
  computed: {
    // 在监护验证模式时，需要显示过滤管理员后的用户列表
    // userLists () {
    //   return this.auth ? this.allUser.filter((item) => {
    //     return !item.userType
    //   }) : this.allUser
    // },
    // currentUser () {
    //   for (let [i, len] = [0, this.userLists.length]; i < len; i++) {
    //     if (this.userLists[i].loginId === this.user.name) return this.userLists[i]
    //   }
    //   return {}
    // }
  },
  watch: {
    // visible (val) {
    //   this.loginVisible = val
    // },
    // finVisi (val) {
    //   this.finVisible = val
    // }
  },
  beforeUpdate () {
  },
  mounted () {
    // this.freshCode()
    // // 更新用户列表
    // this.getAllUsers()
    // this.version = version.versionNo
    // this.findIP(function(ip){
    //     console.log(ip + "你的本地IP地址")
    // });
  },
  created () {
    console.log(fs);
    console.log(11111);
  },
  methods: {
    // 获取所有用户
    // getAllUsers () {
    //   this.$request(this.$extend(true, {}, ReqUser.getAllUser))
    //     .on('success', (data) => {
    //       this.allUser = data.data || []
    //       let alluserId = this.allUser.map(item => {
    //         return item.loginId
    //       })
    //       sessionStorage.setItem('userLoginid', JSON.stringify(alluserId))
    //     }).on('error', (err) => {
    //       console.log(err)
    //     })
    // },
    // 关闭弹框
    closed () {
      this.$emit('closed')
      this.onReset()
    },
    // 验证确认
    onSubmit () {
      
      // 进行监护人验证的情况
      if (this.auth) {
        this.checking()
        return false
      }
      if (!this.user.name) {
        this.$showMsg('请输入账号')
        return false
      }
      if (!this.user.password) {
        this.$showMsg('请输入密码')
        return false
      }
      if (this.user.password.length < 8) {
        this.$showMsg('您输入的密码不合法, 密码最小长度至少是8位')
        return false
      }
      if (!this.user.captchaValue) {
        this.$showMsg('请填写验证码')
        return false
      }
      if (!this.effectTime) {
        this.$showMsg('请选择本次登录的有效时间')
        return false
      }

      
      // 如果需要进行指纹验证的情况
      this.useFinger = localStorage.getItem('showFinger')

      if (this.useFinger == 'true') {
        this.fingerAuth()
        return false
      }
      
      this.sendData()
    },
    // 指纹验证
    fingerAuth () {
      if (this.user.name === 'sys' || this.user.name === 'auth') {
        this.sendData()
        return false
      }
      // 显示指纹弹框
      this.$store.commit('changeFingerBoxVisible', true)
      // this.$axios.get('/fingerprint/Finger/v1/Search'  + '?loginId=' + this.user.name).then((res) => {

      //   console.log(res)
      //   this.$store.commit('changeFingerBoxVisible', false)
      //   if (res.data.data* 1 === 0) {
      //     this.$showMsg(`指纹验证失败，请重试`, 'error')
      //     // this.freshCode()
      //     return false
      //   }
      //   else  if (res.data.data* 1 === 1) {
      //     this.$showMsg(`指纹验证成功`, 'success')
      //     this.doubleConfirm="指纹验证通过"
      //     this.sendData()

      //   }
      //   else if(res.data.data* 1 === -1){
      //     this.$showMsg(`指纹验证失败，请重试`, 'error')
      //     // this.freshCode()
      //     return false
      //   }
      //   else{
      //      this.$showMsg(`指纹验证出错`, 'error')
      //     // this.freshCode()
      //     return false
      //   }

      // })
      // .catch((err) => {
      //   console.error(err)
      //   this.$showMsg(`指纹验证出错`, 'error')
      //   // this.freshCode()
      //   this.$store.commit('changeFingerBoxVisible', false)
      // })
    },
    // text () {
    //   var password = 'csnc@2019'
    //   var password1 = sm4.encryptData_CBC(password)
    //   var password2 = utils.passwordSlat(password1)
    //   console.log(password1,password2)
    // },
    // 监护人验证
    // checking () {
    //   // 获取需要进行监护校验的按钮id
    //   const bid = sessionStorage.getItem('bid')
    //   // 获取当前页面id
    //   let pageId = this.$store.getters.pageCurrent
    //     ? this.$store.getters.pageCurrent.pageId
    //     : '首页1'

    //     let secretKey = utils.createNonceStr()
    //     sessionStorage.setItem('secretKey',secretKey)
    //     sm4.secretKey = secretKey


    //     var password = utils.sm3Util(this.user.password)
    //     password = sm4.encryptData_CBC(password)
    //     console.error(password)
        

    //     // password = utils.passwordSlat(password)
    //     // this.$request(this.$extend(true, {}, ReqUser.watcherValidate, {
    //     //   params: {
    //     //     loginId: this.user.name,
    //     //     // password: md5(this.user.password),
    //     //     password: password,
    //     //     pageId: pageId,
    //     //     buttonId: bid,
    //     //     stationId: sessionStorage.getItem('stationId') || ''
    //     //   }
    //     // }))
    //     // .on('success', ({ data }) => {
    //     //   // 返回回调信息
    //     //   this.$watcherValidateEnd(data)
    //     //   sessionStorage.setItem('bid', '')
    //     //   this.$showMsg(`密码验证成功`, 'success')
    //     //   this.$emit('passed')
    //     //   this.$store.commit('showWatcherValidate', false)
          
    //     //   this.$emit('closed')
    //     // })
    //     // .on('error', (err) => {
    //     //   console.error(err)
    //     //   this.$showMsg(err.msg, 'error')
    //     //   this.$watcherValidateEnd(false)
    //     // })
    // },
    // 取消按钮操作
    onReset () {
      this.$router.push({
        path:'/zhongkong'
      })
      this.user = {}
      this.effectTime = ''
      // this.freshCode()
      // 处于监护验证模式的情况下需要隐藏登录框并返回“取消调用”的回调信息
      if (this.auth) {
        // 修改store中的显示值
        this.$store.commit('showWatcherValidate', false)
        // 返回回调信息
        this.$watcherValidateEnd(false)
        // 清空按钮id
        sessionStorage.setItem('bid', '')
        this.$emit('closed')
      }
    },
    // 登录成功后
    // loginSuccess (data) {
      
    //   console.error(data)
    //   let time = this.effectTime * 1000
    //   let lastTime = new Date().getTime() + time
    //   // var password = sm4.encryptData_CBC(this.user.password)
    //   // password = utils.passwordSlat(password)
    //   // 清除本次登录的告警限制
    //   sessionStorage.setItem('hasWarn', 'no')
    //   // 设定本次登录过期时间
    //   sessionStorage.setItem('outTime', lastTime)
    //   // 保存其它信息
    //   sessionStorage.setItem('reset', data.isReset)
    //   if (data.fingerId) {
    //     sessionStorage.setItem('fingerId', data.fingerId)
    //   }
    //   sessionStorage.setItem('userName', data.userName)
    //   // sessionStorage.setItem('phone', data.phone)

    //   sessionStorage.setItem('loginId', data.loginId)
    //   sessionStorage.setItem('userId', data.id)
    //   // sessionStorage.setItem('p', password)
      
    //   if (data.userType || data.userType === 0) {
    //     sessionStorage.setItem('userType', data.userType)
    //   }
    //   sessionStorage.setItem('ticket', data.ticket)
    //   sessionStorage.setItem('roleIds', data.roleIds)

    //   sessionStorage.setItem('stationIds', data.stationIds.join(','))
    //   let roleIds = data.roleIds.join(',')
    //   if (data.userName === 'sys' || roleIds.includes("auditor")) {
    //     if (data.userName === 'sys' ) {
    //          this.$request(this.$extend(true, {}, ReqUser.versionDate, {
    //          params: {
    //            ...version
    //          }
    //        }))
    //          .on('success', ({ data }) => {
    //          })
    //          .on('error', (err) => {
    //          })
    //     }
    //     this.getSysList()
    //   }
    //    else {
    //      this.$router.push('/HomePage')
    //   }

    //   if (data.userName !== 'sys' && !roleIds.includes("auditor") ) {
    //     ipcRenderer.send('showExtendScreen')
    //   } 
        
    //     // let vers = JSON.parse(version)
    //     // console.log(version.md5,'查看1111')
     
    // },
    //  getSysList () {
    //         // this.$router.push('/Container/type_4/')
    //         let roleIds = sessionStorage.getItem('roleIds')
    //         this.$request(
    //           this.$extend(true, {}, ReqCommon.getMenu, {
    //             params: {
    //               stationIds: sessionStorage.getItem('stationIds'),
    //               roleIds: Array.isArray(roleIds) ? roleIds.join(',') : roleIds
    //             }
    //           })
    //         ).on('success', ({ data }) => {
    //           data.sort(function (a, b) {
    //             return a.id - b.id
    //           })
    //          this.$store.commit('changeIsloading', false)
    //           this.$store.commit('saveMenuLists', data)
    //           this.$router.push('/Container/type_4/')
    //          this.$store.commit('changeIsloading', false)

    //         })
    // },
    // 发送信息
    // sendData () {
    //   this.$store.commit('changeIsloading', true)
    //   this.isLoading = true

    //   let secretKey = utils.createNonceStr()
    //     sessionStorage.setItem('secretKey',secretKey)
    //     sm4.secretKey = secretKey

    //   var password = utils.sm3Util(this.user.password)
    //   password = sm4.encryptData_CBC(password)
      
    //     this.$request(this.$extend(true, {}, ReqUser.userLogin, {
    //     params: {
    //       loginId: this.user.name,
    //       password: password,
    //       captchaId: this.user.captchaId,
    //       captchaValue: this.user.captchaValue
    //     }
    //   })).on('success', ({ data }) => {
    //     this.isLoading = false
    //     console.error(data)
    //     if (!data || Object.keys(data).length === 0) {
    //       this.$store.commit('changeIsloading', false)
    //       this.$showMsg('登陆失败', 'error')
    //       this.freshCode()
    //       return false
    //     }
        
    //     this.loginSuccess(data)
    //   }).on('error', (err) => {
    //     this.$store.commit('changeIsloading', false)
    //     this.isLoading = false
    //     this.freshCode()
    //     console.error(err)
    //     this.$showMsg(`${err.msg}`, 'error')
    //   })
    // },
    // 刷新验证码
    // freshCode () {
    //   // 获取验证码
    //   if (this.user.captchaValue) {
    //     this.user.captchaValue = ''
    //   }
    //   this.doubleConfirm=""
    //   this.$request(this.$extend(true, {}, ReqUser.getAuthCode))
    //     .on('success', (data) => {
    //       this.user.captchaId = data.captcha
    //       this.code = 'data:image/jpeg;base64,' + data.img
    //       console.log(this.code)
    //     })
    //     .on('error', (err) => {
    //       console.log(err)
    //     })
    // },
  //  findIP(callback) {
  //       var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
  //       var pc = new myPeerConnection({iceServers: []}),
  //           noop = function() {},
  //           localIPs = {},
  //           ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
  //           key;

  //       function ipIterate(ip) {
  //           if (!localIPs[ip]) callback(ip);
  //           localIPs[ip] = true;
  //       }
  //       pc.createDataChannel("");
  //       pc.createOffer().then(function(sdp) {
  //           sdp.sdp.split('\n').forEach(function(line) {
  //               if (line.indexOf('candidate') < 0) return;
  //               line.match(ipRegex).forEach(ipIterate);
  //           });
  //           pc.setLocalDescription(sdp, noop, noop);
  //       });
  //       pc.onicecandidate = function(ice) {
  //           if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
  //           ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
  //       };
  //   }
  }
}
</script>

<style lang="less" scoped>

.right-form{
  --rf-height: calc(var(--large-space) * 4);
}
.label-text {
  display: flex;
  margin-bottom: 40px;
  p {
    margin: 0;
    width: 110px;
    height: var(--rf-height);
    line-height: var(--rf-height);
    text-align: right;
    color: var(--login-box-label-color);
  }
}
.el-select {
  width: calc(100% - 30px);
  margin-left: 30px;
  /deep/ input{
    height: calc(var(--rf-height) + 4px);
  }
}
.right-form input {
  border: none;
  outline: none;
  text-indent: 1em;
  margin-left: 30px;
  height: var(--rf-height);
  width: calc(100% - 30px);
}

.right-form input.code-input{
  width: calc(100% - 200px);
  margin-left: 0;
}

.code-wrapper{
  position: relative;
  margin-left: 30px;
  width: calc(100% - 30px);
  display: flex;
}

.code-box{
  position: relative;
  max-width: 200px;
  width: 200px;
  height: 32px;
  cursor: pointer;
}

.login-dialog-btns{
  position: relative;
  height: auto;
  display: flex;
  justify-content: space-around;
}
.right-form button {
  width: 48%;
  height: 30px;
}
.sider {
  text-align: right;
  padding-top: 30px;
  line-height: 20px;
}
/deep/ .el-dialog__body {
  padding: 30px 20px 0;
}
</style>
