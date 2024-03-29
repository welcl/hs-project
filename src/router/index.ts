import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/study-assumptions'
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Layout
    // },
    {
      path: '/report/study-assumptions',
      name: 'studyAssumptions',
      component: () => import('../views/report/StudyAssumptions.vue')
    },
    {
      path: '/report/supply-strategy-assumptions',
      name: 'SupplyStrategyAssumption',
      component: () => import('../views/report/SupplyStrategyAssumptions.vue')
    },
    {
      path: '/report/assumptions-updates-scenarios',
      name: 'AssumptionsUpdatesScenarios',
      component: () => import('../views/report/AssumptionsUpdatesScenarios.vue')
    },
  ]
})

export default router
