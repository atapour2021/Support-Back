export class Auth implements IAuth {
  _id: string;
  hashToken: string;
  userId: string;
  expire: boolean;
}
export interface IAuth {
  _id: string;
  hashToken: string;
  userId: string;
  expire: boolean;
}
