import { Role } from '@root/auth/enums/role.enum';

export interface IUser {
  _id: string;
  userName: string;
  fullName: string;
  age: number;
  nationalCode: string;
  password: string;
  userRole: Role;
  profileId: string;
  hashedRefreshToken: string;
}
