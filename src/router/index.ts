import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/Layout.vue';
import {  LoginValid } from '@/utils/auth';
// 不重定向白名单
const whiteList = ['/login'];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/report',
      name: 'Report',
      component: Layout,
      children:[
        {
          path: '/report/assumptions-updates-scenarios',
          name: 'AssumptionsUpdatesScenarios',
          component: () => import('../views/report/AssumptionsUpdatesScenarios.vue')
        },
        {
          path: '/report/supply-strategy-assumptions',
          name: 'SupplyStrategyAssumption',
          component: () => import('../views/report/SupplyStrategyAssumptions.vue')
        },
        {
          path: '/report/study-assumptions',
          name: 'studyAssumptions',
          component: () => import('../views/report/StudyAssumptions.vue')
        },
    ]
  }
   
  ]
});
router.beforeEach((to, from, next) => {
  console.log({to,from,next});
  if(LoginValid()){
    next();
  }
  if (whiteList.includes(to.path)) {
    next();
  } else {
    next('/login');
  }
 
})

export default router;
