import { Role } from '@root/auth/enums/role.enum';

export class Profile implements IProfile {
  userName: string;
  fullName: string;
  age: number;
  nationalCode: string;
  userRole: Role;
  mobileNumber: string;
  email: string;
  avatar: string;
  description: string;
}
export interface IProfile {
  userName: string;
  fullName: string;
  age: number;
  nationalCode: string;
  userRole: Role;
  mobileNumber: string;
  email: string;
  avatar: string;
  description: string;
}
