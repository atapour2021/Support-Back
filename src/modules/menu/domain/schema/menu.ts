import { Role } from '@root/auth/enums/role.enum';

export class MenuDto {
  menuItems: MenuItem[];
}

export class MenuItem implements IMenuItem {
  displayName: string;
  iconName: string;
  route: string;
  role: Role;
  children?: MenuItem[];
}

export interface IMenuItem {
  displayName: string;
  iconName: string;
  route: string;
  role: Role;
  children?: IMenuItem[];
}
