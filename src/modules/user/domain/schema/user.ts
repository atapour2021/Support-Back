import { Role } from "@root/auth/enums/role.enum";

export interface IUser {
  userName: string;
  fullName: string;
  age: number;
  nationalCode: string;
  password: string;
  userRole: Role;
}
