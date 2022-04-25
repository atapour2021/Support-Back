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
}

// export class WorkSample implements IWorkSample {
//   img: string;
//   description: string;
//   finalPrice: number;
//   materials: string[];
// }
// export interface IWorkSample {
//   img: string;
//   description: string;
//   finalPrice: number;
//   materials: string[];
// }
