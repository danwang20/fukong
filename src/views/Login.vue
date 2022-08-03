<template>
  <section class="login-page p--login">
    <div class="login-page-back">
      <top-title />
      <div class="earch">
        <button
        
          class="btn-default"
          @click="visible = true"
        >
          登录框显示
        </button>
      </div>
      <Red>11111</Red>
    </div>
    <LoginBox
      :visible="visible"
      :auth="false"
      @closed="visible = false"
    />
   
  </section>
</template>

<script>

import TopTitle from '../components/TopTitle/TopTitle'
import LoginBox from '../components/LoginBox/LoginBox'
import Red from '../components/XmlRed/Red.vue'

export default {
  components: {
    TopTitle, LoginBox,Red
  },
  data () {
    return {
      visible: true
    }
  }
}
</script>

<style lang="less" scoped>
.login-page{
  background: url("../assets/images/common/bg2.jpg") no-repeat center top;
  background-size: cover;
  height: 100%;
}
.login-page-back{
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.earch {
  position: relative;
  box-sizing: border-box;
  background: url("../assets/images/Login/earch.png") no-repeat center top;
  background-size: 100% 100%;
  flex: 1;
  text-align: center;
}
</style>
