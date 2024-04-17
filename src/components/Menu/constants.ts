import { MenuType } from './types';

export const MenuList: MenuType[] = [
  {
    title: 'report',
    key: '1',
    children: [
      {
        title: 'AssumptionsUpdatesScenarios',
        route: '/report/assumptions-updates-scenarios',
        key: '1-1'
      },
      {
        title: 'SupplyStrategyAssumptions',
        route: '/report/supply-strategy-assumptions',
        key: '1-2'
      },
      {
        title: 'StudyAssumptions',
        route: '/report/study-assumptions',
        key: '1-3'
      }
    ]
  }
];
