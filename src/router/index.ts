import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/report/assumptions-updates-scenarios'
    },
    {
      path: '/report/assumptions-updates-scenarios',
      name: 'AssumptionsUpdatesScenarios',
      component: () => import('../views/report/AssumptionsUpdatesScenarios.vue')
    },
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
    
  ]
})

export default router
