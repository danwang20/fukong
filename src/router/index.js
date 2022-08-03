import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/Login.vue'
import Container from '../views/Container.vue'
import QuanZhan from '../views/quanzhan/quanzhan.vue'
import ZhongHeLou from '../views/zhaoming/zhonghelou.vue'
import FireControlSystem from '../views/firecontrol/FireControlSystem.vue'
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
        component: FireControlSystem
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