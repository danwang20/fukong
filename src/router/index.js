import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/Login.vue'
import Container from '../views/Container.vue'
import QuanZhan from '../views/quanzhan/quanzhan.vue'
import ZhongHeLou from '../views/zhaoming/zhonghelou.vue'
import FireControlSystem from '../views/firecontrol/FireControlSystem.vue'
import FireAlarm from '../views/firecontrol/fireAlarm/fireAlarm.vue'
import FireAlarmHost from '../views/firecontrol/fireAlarm/fireAlarmHost.vue'
import ProductionComplexBuilding from '../views/firecontrol/fireAlarm/productionComplexBuilding.vue'
import Byqpyzdmh from '../views/firecontrol/byq_pyzdmh/byqpyzdmh.vue'
import Pyzdmhzj from '../views/firecontrol/byq_pyzdmh/host.vue'
import Zbpyzdmh from '../views/firecontrol/byq_pyzdmh/2hzbpyzdmh.vue'
import Byqpmmh from '../views/firecontrol/byq_pmmh/byqpmmh.vue'
import ByqpmmhZj from '../views/firecontrol/byq_pmmh/host.vue'
import Zbpmmh from '../views/firecontrol/byq_pmmh/2hzbpmmh.vue'
import Byqspwmh from '../views/firecontrol/byq_spwmh/byqspwmh.vue'
import ByqspwZj from '../views/firecontrol/byq_spwmh/host.vue'
import Zbspwmh from '../views/firecontrol/byq_spwmh/2hzbspwmh.vue'
import Qtmhxt from '../views/firecontrol/qtmhxt/qtmhxt.vue'
import Xhsxt from '../views/firecontrol/qtmhxt/xhsxt.vue'
import Mhqpz from '../views/firecontrol/qtmhxt/mhqpz.vue'
import Xfyjzmjsszsxt from '../views/firecontrol/qtmhxt/xfyjzmjsszsxt.vue'
import SafetyPrecautions from '../views/safetyPrecautions/safetyPrecautions.vue'
import AroundTheSubstation from '../views/safetyPrecautions/aroundTheSubstation.vue'
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/coantainer',
    name: 'coantainer',
    component: Container,
    children: [{
        path: '/quanzhan',
        name: 'quanzhan',
        component: QuanZhan
      },
      {
        path: '/zhongkong',
        name: 'zhongkong',
        component: ZhongHeLou
      },
      {
        path: '/fireControlSystem',
        name: 'fireControlSystem',
        component: FireControlSystem,
      },
      {
        path: '/fireAlarm',
        name: 'fireAlarm',
        component: FireAlarm
      },
      {
        path: '/fireAlarmHost',
        name: 'fireAlarmHost',
        component: FireAlarmHost
      },
      {
        path: '/productionComplexBuilding',
        name: 'productionComplexBuilding',
        component: ProductionComplexBuilding
      },
      {
        path: '/byqpyzdmh',
        name: 'byqpyzdmh',
        component: Byqpyzdmh
      },
      {
        path: '/pyzdmhzj',
        name: 'pyzdmhzj',
        component: Pyzdmhzj
      },
      {
        path: '/2hzbpyzdmh',
        name: '2hzbpyzdmh',
        component: Zbpyzdmh
      },
      {
        path: '/byqpmmh',
        name: 'byqpmmh',
        component: Byqpmmh
      },
      {
        path: '/byqpmmhZj',
        name: 'byqpmmhZj',
        component: ByqpmmhZj
      },
      {
        path: '/zbpmmh',
        name: 'zbpmmh',
        component: Zbpmmh
      },
      {
        path: '/byqspwmh',
        name: 'byqspwmh',
        component: Byqspwmh
      },
      {
        path: '/byqspwZj',
        name: 'byqspwZj',
        component: ByqspwZj
      },
      {
        path: '/zbspwmh',
        name: 'zbspwmh',
        component: Zbspwmh
      },
      {
        path: '/qtmhxt',
        name: 'qtmhxt',
        component: Qtmhxt
      },
      {
        path: '/xhsxt',
        name: 'xhsxt',
        component: Xhsxt
      },
      {
        path: '/mhqpz',
        name: 'mhqpz',
        component: Mhqpz
      },
      {
        path: '/xfyjzmjsszsxt',
        name: 'xfyjzmjsszsxt',
        component: Xfyjzmjsszsxt
      },
      {
        path: '/safetyPrecautions',
        name: 'safetyPrecautions',
        component: SafetyPrecautions
      },
      {
        path: '/aroundTheSubstation',
        name: 'aroundTheSubstation',
        component: AroundTheSubstation
      },
    ]
  },

  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;