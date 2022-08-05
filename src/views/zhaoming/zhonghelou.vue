<!--  -->
<template>
<div class="content-box">
  <div class="side-left-cloum" style=" flex: 7;background-color: black;">
      <div class="top" style="height: 100%; flex: 6; position: relative; background-color: pink; display: flex; "></div>
      <div class="bottom" style="height: 100%; flex: 6; position: relative; background-color: red; display: flex; ">
        <div class="left" style="flex:3">111</div>
        <div class="right" style="flex:1">11111</div>
      </div>
  </div>
  <div class="side-right" style="flex: 3;background-color: white;">
  
  </div>
</div>
</template>

<script>
import SocketJS from 'sockjs-client'
import Webstomp from 'webstomp-client'
// import utils from './utils'
// const config = utils.readConfig('connect.config.json')


export default {
data() {
return {

}
},
created() {
// let stompClient = Webstomp.over(
//   // new SocketJS('https://172.19.3.25:8084/endpointSang', { transports: 'websocket' }),
//    new SocketJS('http://172.18.2.98:12003/socket', { transports: 'websocket' }),
//   { debug: process.env.NODE_ENV !== 'production' }
// )

// stompClient.connect({}, () => {
 
//   stompClient.subscribe('/topic/greetings', function (item) {
      
//       console.log(item);
// })
// })

// if (process.env.NODE_ENV !== 'production') {
//   console.log('%cstompClient=%O', 'background-color: yellow;color:#333', stompClient)
// }
},
mounted() {

}
}
</script>
<style scoped='less'>

</style>