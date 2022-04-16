import { Role } from '@root/auth/enums/role.enum';

export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  nationalCode: string;
  password: string;
  role: Role;
}
