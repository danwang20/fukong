import SocketJS from 'sockjs-client'
import Webstomp from 'webstomp-client'
// import utils from './utils'
// const config = utils.readConfig('connect.config.json')
let stompClient = Webstomp.over(
  new SocketJS('http://127.0.0.1:12002/socket', { transports: 'websocket' }),
  { debug: process.env.NODE_ENV !== 'production' }
)

stompClient.connect({}, () => {})

if (process.env.NODE_ENV !== 'production') {
  console.log('%cstompClient=%O', 'background-color: yellow;color:#333', stompClient)
}

export default stompClient
