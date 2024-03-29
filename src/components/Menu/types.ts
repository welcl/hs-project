export type MenuType = {
  title: string;
  route?: string;
  key: string;
  children?: MenuType[],
  active?: boolean,
}; 