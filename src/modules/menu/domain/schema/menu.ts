export class MenuDto implements IMenu {
  displayName: string;
  iconName: string;
  route: string;
  children?: IMenu[];
}
export interface IMenu {
  displayName: string;
  iconName: string;
  route: string;
  children?: IMenu[];
}
