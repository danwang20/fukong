import extend from 'node.extend'

export default function (Vue) {
  Vue.prototype.$extend = extend
}