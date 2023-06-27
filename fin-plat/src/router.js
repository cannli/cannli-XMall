import Vue from 'vue';
import VueRouter from 'vue-router';
import login from './views/login/index';
import Layout from '@/components/layout/index.vue';
 import dome1 from '@/views/IndividualFunction/dome1.vue'
import dome2 from '@/views/IndividualFunction/dome2.vue'
// 处理各模块路由
const modulesList = [];
const modulesFiles = require.context('./views', true, /^\.\/.*\/router\.js$/);

// you do not need `import routerModule form '@/view/module/router.js'`
// it will auto require all vuex module from modules file
modulesFiles.keys().reduce((modules, modulePath) => {
  // const noduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const moduleName = modulePath.split('/')[1];
  modules[moduleName] = modulesFiles(modulePath).default;
  modulesList.push(modules[moduleName]);

  return modules;
}, {});

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    meta: {title: '', path: '/',},
    children: [
      {path: '', redirect: '/individualFunction/dome1'},
      {path: '/individualFunction/dome1', component: dome1, name: 'dome1'},
      {path: '/individualFunction/dome2', component: dome2, name: 'dome2'}
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  ...modulesList,
];

const router = new VueRouter({
  routes,
});

export default router;
