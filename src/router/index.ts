import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/report/AssumptionsUpdatesScenarios'
    },
    {
      path: '/report/AssumptionsUpdatesScenarios',
      name: 'AssumptionsUpdatesScenarios',
      component: () => import('../views/report/AssumptionsUpdatesScenarios.vue')
    },
    {
      path: '/report/StudyAssumptions',
      name: 'studyAssumptions',
      component: () => import('../views/report/StudyAssumptions.vue')
    },
    {
      path: '/report/SupplyStrategyAssumptions',
      name: 'SupplyStrategyAssumption',
      component: () => import('../views/report/SupplyStrategyAssumptions.vue')
    },
    
  ]
})

export default router
