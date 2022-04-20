export class MenuDto {
  menuItems: MenuItem[];
}

export class MenuItem implements IMenuItem {
  displayName: string;
  iconName: string;
  route: string;
  children?: MenuItem[];
}

export interface IMenuItem {
  displayName: string;
  iconName: string;
  route: string;
  children?: IMenuItem[];
}
