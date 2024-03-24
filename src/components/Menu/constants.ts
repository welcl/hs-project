import { MenuType } from "./types";

export const  MenuList: MenuType[] = [
  {
    title:'report',
    key: '1',
    children: [
      {
        title: 'study-assumptions',
        route: '/report/study-assumptions',
        key: '1-1'
      },
      {
        title: 'supply-strategy-assumptions',
        route: '/report/supply-strategy-assumptions',
        key: '1-2'
      },
      {
        title: 'assumptions-updates-scenarios',
        route: '/report/assumptions-updates-scenarios',
        key: '1-3'
      },
    ]
  }
];