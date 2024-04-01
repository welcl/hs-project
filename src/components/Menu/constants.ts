import { MenuType } from "./types";

export const  MenuList: MenuType[] = [
  {
    title:'report',
    key: '1',
    children: [
      {
        title: 'assumptions-updates-scenarios',
        route: '/report/AssumptionsUpdatesScenarios',
        key: '1-1'
      },
      {
        title: 'supply-strategy-assumptions',
        route: '/report/SupplyStrategyAssumptions',
        key: '1-2'
      },
      {
        title: 'study-assumptions',
        route: '/report/StudyAssumptions',
        key: '1-3'
      }
    ]
  }
];